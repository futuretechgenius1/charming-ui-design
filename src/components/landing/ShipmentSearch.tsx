import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, MicOff, Search, Package, MapPin, Loader2, Check, ArrowRight, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TruckType {
  id: string;
  name: string;
  code: string;
  description: string | null;
  icon: string | null;
  capacity_kg: number;
  price_per_km: number;
}

const ShipmentSearch = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2>(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [userLocation, setUserLocation] = useState<string>("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [packages, setPackages] = useState<TruckType[]>([]);
  const [filteredPackages, setFilteredPackages] = useState<TruckType[]>([]);
  const [selectedPackage, setSelectedPackage] = useState<TruckType | null>(null);
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);

  // Detect user location on mount
  useEffect(() => {
    detectLocation();
    fetchPackages();
  }, []);

  // Filter packages based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredPackages(packages);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = packages.filter(
        (pkg) =>
          pkg.name.toLowerCase().includes(query) ||
          pkg.code.toLowerCase().includes(query) ||
          (pkg.description && pkg.description.toLowerCase().includes(query))
      );
      setFilteredPackages(filtered);
    }
  }, [searchQuery, packages]);

  const detectLocation = async () => {
    setIsLoadingLocation(true);
    try {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            // Use reverse geocoding via edge function
            try {
              const { data, error } = await supabase.functions.invoke("mapbox-directions", {
                body: {
                  action: "geocode",
                  query: `${longitude},${latitude}`,
                },
              });
              if (data?.features?.[0]?.place_name) {
                setUserLocation(data.features[0].place_name);
              } else {
                setUserLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
              }
            } catch {
              setUserLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
            }
            setIsLoadingLocation(false);
          },
          () => {
            setUserLocation("Location unavailable");
            setIsLoadingLocation(false);
          },
          { timeout: 10000 }
        );
      } else {
        setUserLocation("Geolocation not supported");
        setIsLoadingLocation(false);
      }
    } catch {
      setUserLocation("Location unavailable");
      setIsLoadingLocation(false);
    }
  };

  const fetchPackages = async () => {
    setIsLoadingPackages(true);
    try {
      const { data, error } = await supabase
        .from("truck_types")
        .select("*")
        .eq("is_active", true)
        .order("price_per_km", { ascending: true });

      if (error) throw error;
      setPackages(data || []);
      setFilteredPackages(data || []);
    } catch (error) {
      console.error("Error fetching packages:", error);
      toast.error("Failed to load packages");
    } finally {
      setIsLoadingPackages(false);
    }
  };

  const startVoiceSearch = useCallback(() => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      toast.error("Voice search is not supported in your browser");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast.error("Voice recognition failed. Please try again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  }, []);

  const handlePackageSelect = (pkg: TruckType) => {
    setSelectedPackage(pkg);
    setStep(2);
  };

  const handleProceed = () => {
    if (!selectedPackage) return;
    
    const params = new URLSearchParams({
      origin: userLocation,
      truckType: selectedPackage.code,
    });
    navigate(`/book?${params.toString()}`);
  };

  const getPackageIcon = (icon: string | null) => {
    const iconMap: { [key: string]: string } = {
      mini: "🚐",
      lcv: "🚛",
      hcv: "🚚",
      container: "📦",
      reefer: "❄️",
    };
    return icon || iconMap[icon?.toLowerCase() || ""] || "📦";
  };

  return (
    <div className="w-full max-w-3xl mx-auto animate-slide-up animation-delay-150">
      {/* Location Display */}
      <div className="flex items-center justify-center gap-2 mb-6 text-primary-foreground/70">
        {isLoadingLocation ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <Navigation className="w-4 h-4 text-accent" />
        )}
        <span className="text-sm">
          {isLoadingLocation ? "Detecting location..." : userLocation || "Location unavailable"}
        </span>
        {!isLoadingLocation && (
          <button 
            onClick={detectLocation}
            className="text-accent hover:text-accent/80 text-sm underline"
          >
            Refresh
          </button>
        )}
      </div>

      {/* Step 1: Search */}
      {step === 1 && (
        <div className="space-y-6">
          {/* Search Input */}
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <Search className="w-5 h-5 text-muted-foreground" />
            </div>
            <Input
              placeholder="Search packages (e.g., mini truck, container, reefer)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 sm:h-16 pl-12 pr-14 text-base sm:text-lg bg-card/95 backdrop-blur-xl border-border/50 focus:border-accent rounded-2xl shadow-heavy"
            />
            <button
              onClick={startVoiceSearch}
              className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full transition-all ${
                isListening 
                  ? "bg-destructive text-destructive-foreground animate-pulse" 
                  : "bg-accent/10 text-accent hover:bg-accent/20"
              }`}
            >
              {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>

          {/* Packages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 max-h-[400px] overflow-y-auto px-1">
            {isLoadingPackages ? (
              <div className="col-span-full flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-accent" />
              </div>
            ) : filteredPackages.length === 0 ? (
              <div className="col-span-full text-center py-12 text-primary-foreground/60">
                <Package className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No packages found matching "{searchQuery}"</p>
              </div>
            ) : (
              filteredPackages.map((pkg) => (
                <Card
                  key={pkg.id}
                  onClick={() => handlePackageSelect(pkg)}
                  className="cursor-pointer bg-card/90 backdrop-blur-xl border-border/50 hover:border-accent/50 hover:shadow-glow transition-all group"
                >
                  <CardContent className="p-4 sm:p-5">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl sm:text-3xl">
                        {getPackageIcon(pkg.icon)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                          {pkg.name}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {pkg.description || `Up to ${pkg.capacity_kg.toLocaleString()} kg`}
                        </p>
                        <p className="text-sm font-medium text-accent mt-1">
                          ₹{pkg.price_per_km}/km
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}

      {/* Step 2: Confirmation */}
      {step === 2 && selectedPackage && (
        <div className="space-y-6 animate-fade-in">
          <Card className="bg-card/95 backdrop-blur-xl border-accent/30 shadow-glow">
            <CardContent className="p-6 sm:p-8">
              <div className="flex items-center gap-2 text-accent mb-4">
                <Check className="w-5 h-5" />
                <span className="text-sm font-medium">Package Selected</span>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="text-4xl">{getPackageIcon(selectedPackage.icon)}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground">{selectedPackage.name}</h3>
                  <p className="text-muted-foreground">{selectedPackage.description}</p>
                  <div className="flex flex-wrap gap-4 mt-3 text-sm">
                    <span className="flex items-center gap-1.5">
                      <Package className="w-4 h-4 text-accent" />
                      {selectedPackage.capacity_kg.toLocaleString()} kg capacity
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-accent" />
                      ₹{selectedPackage.price_per_km}/km
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border/50">
                <Button
                  variant="outline"
                  onClick={() => setStep(1)}
                  className="flex-1"
                >
                  Change Package
                </Button>
                <Button
                  variant="accent"
                  onClick={handleProceed}
                  className="flex-1"
                >
                  Proceed to Booking
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ShipmentSearch;
