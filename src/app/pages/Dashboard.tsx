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
import api from "../../lib/api";
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
import { Skeleton } from "../components/ui/skeleton";






const kpiData = [
  {
    title: "Revenue",
    value: "₹0",
    trend: "+0%",
    positive: true,
    icon: DollarSign,
    color: "bg-emerald-500",
  },
  {
    title: "Profit",
    value: "₹0",
    trend: "+0%",
    positive: true,
    icon: TrendingUp,
    color: "bg-cyan-500",
  },
  {
    title: "Inventory Value",
    value: "₹0",
    trend: "+0%",
    positive: true,
    icon: Package,
    color: "bg-blue-500",
  },
  {
    title: "Total Products",
    value: "0",
    trend: "+0",
    positive: true,
    icon: Package,
    color: "bg-slate-600",
  },
  {
    title: "Total Suppliers",
    value: "0",
    trend: "+0",
    positive: true,
    icon: Truck,
    color: "bg-purple-500",
  },
  {
    title: "Inactive Suppliers",
    value: "0",
    trend: "+0",
    positive: false,
    icon: XCircle,
    color: "bg-slate-500",
  },
  {
    title: "Total Users",
    value: "0",
    trend: "+0",
    positive: true,
    icon: Users,
    color: "bg-orange-500",
  },
];




type DashboardStats = {
  totalUsers: number;
  totalProducts: number;
  totalSuppliers: number;
  inactiveSuppliers: number;
  lowStockItems: number;
  inventoryValue: number;
  revenue: number;
  profit: number;
};
type ActivityFeedItem = {
  title: string;
  description: string;
  createdAt: string;
};
type StockMovementData = {
  month: string;
  stockIn: number;
  stockOut: number;
};
type DashboardAlerts = {
  lowStockProducts: string[];
  expiringProducts: string[];
  expiredProducts: string[];
};

export function Dashboard() {
  const [dashboardStats, setDashboardStats] =
    useState<DashboardStats>({
      totalUsers: 0,
      totalProducts: 0,
      totalSuppliers: 0,
      inactiveSuppliers: 0,
      lowStockItems: 0,
      inventoryValue: 0,
      revenue: 0,
      profit: 0,
    });
  //state variables for activity feed and alerts
  const [activityFeed, setActivityFeed] =
    useState<ActivityFeedItem[]>([]);
  const [revenueView, setRevenueView] =
    useState("monthly");
  //state variable for stock movement data
  const [stockMovementData, setStockMovementData] =
    useState<StockMovementData[]>([]);
  
  const [dashboardAlerts, setDashboardAlerts] =
    useState<DashboardAlerts>({
      lowStockProducts: [],
      expiringProducts: [],
      expiredProducts: [],
    });
  const [revenueTrend, setRevenueTrend] =
    useState<any[]>([]);

  const [inventoryValue, setInventoryValue] =
    useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [
          statsRes,
          activityRes,
          alertsRes,
          stockMovementRes,
          revenueTrendRes,
          inventoryValueRes
        ] = await Promise.all([
          api.get(
            `${import.meta.env.VITE_API_URL}/api/dashboard/stats`
          ),
          api.get(
            `${import.meta.env.VITE_API_URL}/api/dashboard/activity-feed`
          ),
          api.get(
            `${import.meta.env.VITE_API_URL}/api/dashboard/alerts`
          ),
          api.get(
            `${import.meta.env.VITE_API_URL}/api/dashboard/stock-movement`
          ),
          api.get(
            `${import.meta.env.VITE_API_URL}/api/dashboard/revenue-trend?view=${revenueView}`
          ),
          api.get(
            `${import.meta.env.VITE_API_URL}/api/dashboard/inventory-value-trend`
          )
        ]);

        setDashboardStats(statsRes.data);
        setActivityFeed(activityRes.data);
        setDashboardAlerts(alertsRes.data);
        setStockMovementData(stockMovementRes.data);
        setRevenueTrend(revenueTrendRes.data);
        setInventoryValue(inventoryValueRes.data);
      }
      catch (error) {
        console.error(error);
      }
      finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      }
    };

    fetchDashboardData();
  }, [revenueView]);
    const dashboardKpiData = kpiData.map((kpi) => {
      if (kpi.title === "Revenue") {
        return {
          ...kpi,
          value: `₹${dashboardStats.revenue.toLocaleString()}`
        };
      }

      if (kpi.title === "Profit") {
        return {
          ...kpi,
          value: `₹${dashboardStats.profit.toLocaleString()}`
        };
      }

      if (kpi.title === "Inventory Value") {
        return {
          ...kpi,
          value: `₹${dashboardStats.inventoryValue.toLocaleString()}`
        };
      }

      if (kpi.title === "Total Products") {
        return {
          ...kpi,
          value: dashboardStats.totalProducts.toString()
        };
      }

      if (kpi.title === "Total Suppliers") {
        return {
          ...kpi,
          value: dashboardStats.totalSuppliers.toString()
        };
      }

      if (kpi.title === "Total Users") {
        return {
          ...kpi,
          value: dashboardStats.totalUsers.toString()
        };
      }

      if (kpi.title === "Inactive Suppliers") {
        return {
          ...kpi,
          value: dashboardStats.inactiveSuppliers.toString()
        };
      }

      return kpi;
    });



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
                  {isLoading ? (
                    <Skeleton className="h-6 w-14" />
                  ) : (
                    <Badge
                      className={
                        kpi.positive
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {kpi.trend}
                    </Badge>
                  )}
                </div>
                {isLoading ? (
                  <Skeleton className="h-8 w-24" />
                ) : (
                  <h3 className="text-2xl font-bold text-slate-800">
                    {kpi.value}
                  </h3>
                )}
                {isLoading ? (
                  <Skeleton className="mt-2 h-4 w-20" />
                ) : (
                  <p className="text-sm text-slate-500">
                    {kpi.title}
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>
              Low Stock Products
            </CardTitle>
          </CardHeader>

          <CardContent>
            {dashboardAlerts.lowStockProducts.map(product => (
              <div
                key={product}
                className="rounded-lg bg-slate-50 p-3"
              >
                {product}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>
              Expiring Products
            </CardTitle>
          </CardHeader>

          <CardContent>
            {dashboardAlerts.expiringProducts.map(product => (
              <div
                key={product}
                className="rounded-lg bg-slate-50 p-3"
              >
                {product}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle>
              Expired Products
            </CardTitle>
          </CardHeader>

          <CardContent>
            {dashboardAlerts.expiredProducts.map(product => (
              <div
                key={product}
                className="rounded-lg bg-slate-50 p-3"
              >
                {product}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ChartCard title="Revenue Trend">

          <div className="mb-4 flex gap-2">

            <button
              onClick={() => setRevenueView("weekly")}
              className={
                revenueView === "weekly"
                  ? "rounded bg-blue-600 px-3 py-1 text-white"
                  : "rounded bg-slate-200 px-3 py-1"
              }
            >
              Weekly
            </button>

            <button
              onClick={() => setRevenueView("monthly")}
              className={
                revenueView === "monthly"
                  ? "rounded bg-blue-600 px-3 py-1 text-white"
                  : "rounded bg-slate-200 px-3 py-1"
              }
            >
              Monthly
            </button>

          </div>

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
            <BarChart data={stockMovementData}>
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
          <CardContent className="space-y-4 max-h-[600px] overflow-y-auto">
            {activityFeed.map((activity, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-200 bg-white p-4"
              >
                <Badge
                  className={
                    activity.title === "StockIn"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-orange-100 text-orange-700"
                  }
                >
                  {activity.title}
                </Badge>

                <p className="mt-3 font-semibold text-slate-800">
                  {activity.description}
                </p>

                <p className="text-sm text-slate-500">
                  {new Date(activity.createdAt)
                    .toLocaleString()}
                </p>
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
