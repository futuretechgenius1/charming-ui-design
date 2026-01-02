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

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-[10%] animate-float opacity-20">
        <Truck className="w-16 h-16 text-accent" />
      </div>
      <div className="absolute top-1/3 right-[15%] animate-float animation-delay-200 opacity-20">
        <MapPin className="w-12 h-12 text-accent" />
      </div>
      <div className="absolute bottom-1/3 left-[20%] animate-float animation-delay-400 opacity-20">
        <Package className="w-14 h-14 text-accent" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-8 animate-fade-in">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-accent text-sm font-medium">AI-Powered Logistics Platform</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6 animate-slide-up">
            Transform Your
            <span className="block text-gradient">Transportation</span>
            Operations
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto mb-10 animate-slide-up animation-delay-100">
            Unified digital ecosystem for route-based logistics, dynamic pricing, 
            fleet management, and real-time tracking — all in one platform.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-200">
            <Link to="/dashboard">
              <Button variant="hero" size="xl">
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Button variant="hero-outline" size="xl">
              <Play className="w-5 h-5" />
              Watch Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-primary-foreground/10 animate-slide-up animation-delay-300">
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
    <div className="text-3xl md:text-4xl font-bold text-accent mb-2">{value}</div>
    <div className="text-sm text-primary-foreground/60">{label}</div>
  </div>
);

export default Hero;
