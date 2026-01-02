import { Link } from "react-router-dom";
import { 
  Package, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Plus,
  ArrowRight,
  Truck,
  CheckCircle,
  AlertCircle,
  Navigation
} from "lucide-react";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsCard from "@/components/dashboard/StatsCard";
import customerHero from "@/assets/customer-hero.png";

const myBookings = [
  {
    id: "BK-2024201",
    route: "Mumbai → Delhi",
    status: "in_transit",
    truck: "Container",
    eta: "2h 30m",
    progress: 65,
    price: "₹45,000"
  },
  {
    id: "BK-2024195",
    route: "Bangalore → Chennai",
    status: "delivered",
    truck: "LCV",
    eta: "Delivered",
    progress: 100,
    price: "₹12,500"
  },
  {
    id: "BK-2024188",
    route: "Kolkata → Hyderabad",
    status: "pending",
    truck: "HCV",
    eta: "Scheduled",
    progress: 0,
    price: "₹78,000"
  },
];

const trackingSteps = [
  { label: "Order Placed", completed: true, time: "Jan 1, 10:00 AM" },
  { label: "Picked Up", completed: true, time: "Jan 1, 2:30 PM" },
  { label: "In Transit", completed: true, current: true, time: "Jan 2, 8:00 AM" },
  { label: "Out for Delivery", completed: false, time: "Expected" },
  { label: "Delivered", completed: false, time: "Expected" },
];

const CustomerDashboard = () => {
  return (
    <DashboardLayout role="customer">
      <div className="space-y-6">
        {/* Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-teal-500 to-emerald-600">
          <img 
            src={customerHero} 
            alt="Customer Dashboard" 
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30"
          />
          <div className="relative p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">My Shipments</h1>
                <p className="text-white/80">Track your orders and book new shipments</p>
              </div>
              <Link to="/book">
                <Button variant="secondary" className="w-fit">
                  <Plus className="w-4 h-4 mr-2" />
                  Book New Shipment
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <StatsCard
            title="Total Shipments"
            value="24"
            change="All time"
            changeType="neutral"
            icon={Package}
            iconColor="bg-teal-500/10 text-teal-500"
          />
          <StatsCard
            title="In Transit"
            value="3"
            change="Active now"
            changeType="neutral"
            icon={Truck}
            iconColor="bg-warning/10 text-warning"
          />
          <StatsCard
            title="Delivered"
            value="20"
            change="98% on time"
            changeType="positive"
            icon={CheckCircle}
            iconColor="bg-success/10 text-success"
          />
          <StatsCard
            title="Total Spent"
            value="₹8.5L"
            change="This year"
            changeType="neutral"
            icon={TrendingUp}
            iconColor="bg-accent/10 text-accent"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* My Bookings */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Recent Bookings</h3>
              <Button variant="ghost" size="sm">
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            
            {myBookings.map((booking) => (
              <div key={booking.id} className="rounded-xl sm:rounded-2xl bg-card border border-border p-4 sm:p-6 hover:shadow-medium transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      booking.status === 'in_transit' ? 'bg-warning/10' :
                      booking.status === 'delivered' ? 'bg-success/10' :
                      'bg-muted'
                    }`}>
                      {booking.status === 'in_transit' ? <Truck className="w-5 h-5 text-warning" /> :
                       booking.status === 'delivered' ? <CheckCircle className="w-5 h-5 text-success" /> :
                       <Clock className="w-5 h-5 text-muted-foreground" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-accent">{booking.id}</p>
                      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        {booking.route}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2.5 py-1 rounded-full ${
                      booking.status === 'in_transit' ? 'bg-warning/10 text-warning' :
                      booking.status === 'delivered' ? 'bg-success/10 text-success' :
                      'bg-muted text-muted-foreground'
                    }`}>
                      {booking.status.replace('_', ' ')}
                    </span>
                    <span className="text-sm font-semibold text-foreground">{booking.price}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                    <span>{booking.truck}</span>
                    <span>{booking.eta}</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
                        booking.status === 'delivered' ? 'bg-success' :
                        booking.status === 'in_transit' ? 'bg-warning' :
                        'bg-muted-foreground'
                      }`}
                      style={{ width: `${booking.progress}%` }}
                    />
                  </div>
                </div>

                {booking.status === 'in_transit' && (
                  <Button variant="outline" size="sm" className="w-full sm:w-auto">
                    <Navigation className="w-4 h-4 mr-2" />
                    Track Live
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Live Tracking */}
            <div className="rounded-xl sm:rounded-2xl bg-card border border-border p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">Live Tracking</h3>
                <span className="text-xs text-accent font-medium">BK-2024201</span>
              </div>
              
              {/* Tracking Steps */}
              <div className="space-y-4">
                {trackingSteps.map((step, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-accent' : 'bg-muted'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4 text-accent-foreground" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                        )}
                      </div>
                      {i < trackingSteps.length - 1 && (
                        <div className={`w-0.5 h-8 ${step.completed ? 'bg-accent' : 'bg-muted'}`} />
                      )}
                    </div>
                    <div className="flex-1 pb-4">
                      <p className={`text-sm font-medium ${step.current ? 'text-accent' : 'text-foreground'}`}>
                        {step.label}
                        {step.current && <span className="ml-2 text-xs">●</span>}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-xl sm:rounded-2xl bg-card border border-border p-4 sm:p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Link to="/book" className="block">
                  <Button variant="accent" className="w-full justify-start">
                    <Plus className="w-4 h-4 mr-2" />
                    Book New Shipment
                  </Button>
                </Link>
                <Button variant="outline" className="w-full justify-start">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Report an Issue
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Clock className="w-4 h-4 mr-2" />
                  View Booking History
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CustomerDashboard;
