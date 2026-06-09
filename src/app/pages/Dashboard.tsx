import { useEffect, useState } from "react";
import {
  AlertTriangle,
  Clock,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Truck,
  Users,
  XCircle,
} from "lucide-react";
import axios from "axios";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const kpiData = [
  { title: "Revenue", value: "$124,850", trend: "+14.2%", icon: DollarSign, color: "bg-emerald-500", positive: true },
  { title: "Profit", value: "$38,420", trend: "+9.8%", icon: TrendingUp, color: "bg-cyan-500", positive: true },
  { title: "Inventory Value", value: "₹847,392", trend: "+8.2%", icon: Package, color: "bg-blue-500", positive: true },
  { title: "Total Products", value: "1,247", trend: "+12", icon: Package, color: "bg-slate-600", positive: true },
  { title: "Total Suppliers", value: "86", trend: "+4", icon: Truck, color: "bg-purple-500", positive: true },
  { title: "Total Purchase Orders", value: "214", trend: "+18", icon: ShoppingCart, color: "bg-orange-500", positive: true },
];

const revenueTrend = [
  { month: "Jan", revenue: 83000, profit: 22400 },
  { month: "Feb", revenue: 91000, profit: 26800 },
  { month: "Mar", revenue: 88000, profit: 24100 },
  { month: "Apr", revenue: 104000, profit: 31800 },
  { month: "May", revenue: 116000, profit: 35200 },
  { month: "Jun", revenue: 124850, profit: 38420 },
];

const inventoryValue = [
  { month: "Jan", value: 650000 },
  { month: "Feb", value: 720000 },
  { month: "Mar", value: 680000 },
  { month: "Apr", value: 780000 },
  { month: "May", value: 821000 },
  { month: "Jun", value: 847392 },
];

const stockMovement = [
  { month: "Jan", stockIn: 45000, stockOut: 38000 },
  { month: "Feb", stockIn: 52000, stockOut: 42000 },
  { month: "Mar", stockIn: 48000, stockOut: 45000 },
  { month: "Apr", stockIn: 58000, stockOut: 48000 },
  { month: "May", stockIn: 62000, stockOut: 52000 },
  { month: "Jun", stockIn: 65000, stockOut: 55000 },
];

const alerts = [
  { title: "Low Stock Products", count: 23, color: "border-l-amber-500", icon: AlertTriangle, items: ["Aspirin 100mg", "Surgical Masks", "Hand Sanitizer 250ml"] },
  { title: "Expiring Products", count: 18, color: "border-l-orange-500", icon: Clock, items: ["Vitamin C Tablets", "Fresh Orange Juice", "Yogurt Strawberry"] },
  { title: "Expired Products", count: 7, color: "border-l-red-500", icon: XCircle, items: ["Fresh Yogurt Strawberry", "Milk Batch DAI-223", "Juice Batch BEV-118"] },
];

const activityFeed = [
  { type: "Recent Stock In", entity: "Invoice INV001", detail: "Paracetamol, Vitamin C, Aspirin", tone: "emerald" },
  { type: "Recent Stock Out", entity: "Issue ISS-5432", detail: "Retail Store A, 4 products", tone: "orange" },
  { type: "Recent Purchase Order", entity: "PO-2407", detail: "MediPharm Solutions Ltd.", tone: "cyan" },
  { type: "Recent Stock In", entity: "Invoice INV002", detail: "Insulin Vials, Surgical Masks", tone: "emerald" },
];

type DashboardStats = {
  totalUsers: number;
  totalProducts: number;
  totalSuppliers: number;
  lowStockItems: number;
};

export function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalSuppliers: 0,
    lowStockItems: 0,
  });

  useEffect(() => {
    const fetchDashboardStats = async () => {
      const response = await axios.get<DashboardStats>(
        `${import.meta.env.VITE_API_URL}/api/dashboard/stats`,
      );

      setDashboardStats(response.data);
    };

    fetchDashboardStats().catch((error) => {
      console.error(error);
    });
  }, []);

  const dashboardKpiData = kpiData.map((kpi) => {
    if (kpi.title === "Total Products") {
      return { ...kpi, value: dashboardStats.totalProducts.toLocaleString() };
    }

    if (kpi.title === "Total Suppliers") {
      return { ...kpi, value: dashboardStats.totalSuppliers.toLocaleString() };
    }

    if (kpi.title === "Total Purchase Orders") {
      return {
        ...kpi,
        title: "Total Users",
        value: dashboardStats.totalUsers.toLocaleString(),
        icon: Users,
      };
    }

    return kpi;
  });

  const dashboardAlerts = alerts.map((alert) =>
    alert.title === "Low Stock Products"
      ? { ...alert, count: dashboardStats.lowStockItems }
      : alert,
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {dashboardKpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="border-none shadow-md">
              <CardContent className="p-5">
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className={`${kpi.color} rounded-lg p-3`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <Badge className={kpi.positive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"}>
                    {kpi.trend}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">{kpi.value}</h3>
                <p className="text-sm text-slate-500">{kpi.title}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {dashboardAlerts.map((alert) => {
          const Icon = alert.icon;
          return (
            <Card key={alert.title} className={`border-none border-l-4 ${alert.color} shadow-md`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-orange-500" />
                    {alert.title}
                  </span>
                  <Badge className="bg-slate-100 text-slate-700">{alert.count}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alert.items.map((item) => (
                  <div key={item} className="rounded-lg bg-slate-50 p-3 font-medium text-slate-700">
                    {item}
                  </div>
                ))}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChartCard title="Monthly Revenue Trend">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} name="Revenue" />
              <Line type="monotone" dataKey="profit" stroke="#06b6d4" strokeWidth={3} name="Profit" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Inventory Value Trend (Qty x Batch Cost)">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={inventoryValue}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#0ea5e9" strokeWidth={3} dot={{ fill: "#0ea5e9", r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <ChartCard title="Stock Movement Trend">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={stockMovement}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip />
              <Legend />
              <Bar dataKey="stockIn" fill="#10b981" name="Stock In" />
              <Bar dataKey="stockOut" fill="#f97316" name="Stock Out" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Activity Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activityFeed.map((activity) => (
              <div key={`${activity.type}-${activity.entity}`} className="rounded-lg border border-slate-200 bg-white p-4">
                <Badge className={
                  activity.tone === "emerald"
                    ? "bg-emerald-100 text-emerald-700"
                    : activity.tone === "orange"
                    ? "bg-orange-100 text-orange-700"
                    : "bg-cyan-100 text-cyan-700"
                }>
                  {activity.type}
                </Badge>
                <p className="mt-3 font-semibold text-slate-800">{activity.entity}</p>
                <p className="text-sm text-slate-500">{activity.detail}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function ChartCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card className="min-w-0 border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
