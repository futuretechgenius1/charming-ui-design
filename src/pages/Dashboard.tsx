import { Package, Truck, MapPin, TrendingUp } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import StatsCard from "@/components/dashboard/StatsCard";
import RecentBookings from "@/components/dashboard/RecentBookings";
import FleetOverview from "@/components/dashboard/FleetOverview";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-background flex w-full">
      <DashboardSidebar />
      
      <div className="flex-1 ml-64">
        <DashboardHeader />
        
        <main className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard
              title="Total Bookings"
              value="1,284"
              change="+12.5%"
              changeType="positive"
              icon={Package}
              iconColor="bg-blue-500/10 text-blue-500"
            />
            <StatsCard
              title="Active Shipments"
              value="156"
              change="+8.2%"
              changeType="positive"
              icon={Truck}
              iconColor="bg-amber-500/10 text-amber-500"
            />
            <StatsCard
              title="Routes Covered"
              value="89"
              change="+3 new"
              changeType="neutral"
              icon={MapPin}
              iconColor="bg-emerald-500/10 text-emerald-500"
            />
            <StatsCard
              title="Revenue (MTD)"
              value="₹24.5L"
              change="+18.3%"
              changeType="positive"
              icon={TrendingUp}
              iconColor="bg-accent/10 text-accent"
            />
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <RecentBookings />
            </div>
            <div>
              <FleetOverview />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
