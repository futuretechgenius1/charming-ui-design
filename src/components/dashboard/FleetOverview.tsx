import { Truck } from "lucide-react";

const fleetData = [
  { type: "Container", total: 45, active: 38, color: "bg-blue-500" },
  { type: "HCV", total: 120, active: 98, color: "bg-purple-500" },
  { type: "LCV", total: 85, active: 72, color: "bg-amber-500" },
  { type: "Mini", total: 60, active: 55, color: "bg-emerald-500" },
  { type: "Reefer", total: 30, active: 24, color: "bg-rose-500" },
];

const FleetOverview = () => {
  const totalTrucks = fleetData.reduce((acc, f) => acc + f.total, 0);
  const activeTrucks = fleetData.reduce((acc, f) => acc + f.active, 0);
  const utilizationRate = ((activeTrucks / totalTrucks) * 100).toFixed(1);

  return (
    <div className="rounded-2xl bg-card border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Fleet Overview</h3>
        <div className="text-right">
          <span className="text-2xl font-bold text-accent">{utilizationRate}%</span>
          <p className="text-xs text-muted-foreground">Utilization</p>
        </div>
      </div>

      <div className="space-y-4">
        {fleetData.map((fleet) => {
          const percentage = (fleet.active / fleet.total) * 100;
          return (
            <div key={fleet.type} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg ${fleet.color}/10 flex items-center justify-center`}>
                    <Truck className={`w-4 h-4 ${fleet.color.replace('bg-', 'text-')}`} />
                  </div>
                  <span className="text-sm font-medium text-foreground">{fleet.type}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-foreground">{fleet.active}</span>
                  <span className="text-sm text-muted-foreground">/{fleet.total}</span>
                </div>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div 
                  className={`h-full rounded-full ${fleet.color} transition-all duration-500 group-hover:shadow-glow`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-border grid grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-2xl font-bold text-foreground">{totalTrucks}</p>
          <p className="text-xs text-muted-foreground">Total Fleet</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-success">{activeTrucks}</p>
          <p className="text-xs text-muted-foreground">Active Now</p>
        </div>
      </div>
    </div>
  );
};

export default FleetOverview;
