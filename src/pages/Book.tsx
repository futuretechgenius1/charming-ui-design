import { Link } from "react-router-dom";
import { ArrowLeft, Truck } from "lucide-react";
import BookingForm from "@/components/booking/BookingForm";

const Book = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link 
                to="/" 
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </Link>
              <div className="w-px h-8 bg-border" />
              <Link to="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center">
                  <Truck className="w-4 h-4 text-accent-foreground" />
                </div>
                <span className="text-lg font-bold text-foreground">
                  Trans<span className="text-accent">Logic</span>
                </span>
              </Link>
            </div>
            
            <div className="text-sm text-muted-foreground">
              Need help? <a href="#" className="text-accent hover:underline">Contact Support</a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Book Your Shipment
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Enter your route details, package information, and select a truck type to get an instant quote.
            </p>
          </div>

          <BookingForm />
        </div>
      </main>
    </div>
  );
};

export default Book;
