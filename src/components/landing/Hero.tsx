import { Link } from "react-router-dom";
import { ArrowRight, Play, Truck, MapPin, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Floating Elements - Hidden on mobile */}
      <div className="hidden md:block absolute top-1/4 left-[10%] animate-float opacity-20">
        <Truck className="w-12 lg:w-16 h-12 lg:h-16 text-accent" />
      </div>
      <div className="hidden md:block absolute top-1/3 right-[15%] animate-float animation-delay-200 opacity-20">
        <MapPin className="w-10 lg:w-12 h-10 lg:h-12 text-accent" />
      </div>
      <div className="hidden md:block absolute bottom-1/3 left-[20%] animate-float animation-delay-400 opacity-20">
        <Package className="w-12 lg:w-14 h-12 lg:h-14 text-accent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 border border-accent/20 mb-6 sm:mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-xs sm:text-sm font-medium">AI-Powered Logistics Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-4 sm:mb-6 animate-slide-up">
            Transform Your
            <span className="block text-gradient">Transportation</span>
            Operations
          </h1>

          {/* Subheadline */}
          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-8 sm:mb-10 px-2 animate-slide-up animation-delay-100">
            Unified digital ecosystem for route-based logistics, dynamic pricing, 
            fleet management, and real-time tracking — all in one platform.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 animate-slide-up animation-delay-200 px-4 sm:px-0">
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button variant="hero" size="xl" className="w-full sm:w-auto">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="hero-outline" size="xl" className="w-full sm:w-auto">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-10 sm:mt-16 pt-8 sm:pt-16 border-t border-primary-foreground/10 animate-slide-up animation-delay-300">
            <StatItem value="10K+" label="Active Shipments" />
            <StatItem value="99.9%" label="Uptime" />
            <StatItem value="500+" label="Fleet Partners" />
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="text-center">
    <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-accent mb-1 sm:mb-2">{value}</div>
    <div className="text-xs sm:text-sm text-primary-foreground/60">{label}</div>
  </div>
);

export default Hero;
