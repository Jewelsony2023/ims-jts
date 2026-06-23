import { useEffect, useState } from "react";
import {
  AlertTriangle,
  DollarSign,
  Package,
  TrendingUp,
  Truck,
  Users,
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

type DashboardStats = {
  totalUsers: number;
  totalProducts: number;
  totalSuppliers: number;
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

type ForecastResult = {
  forecastId: number;
  productCode: string;
  productName: string;
  categoryName: string;
  forecastDemand: number;
  recommendedOrder: number;
  riskLevel: string;
  currentInventory: number;
  createdAt: string;
};

const kpiData = [
  { title: "Revenue", value: "0", icon: DollarSign, color: "bg-emerald-500" },
  { title: "Profit", value: "0", icon: TrendingUp, color: "bg-cyan-500" },
  { title: "Inventory Value", value: "0", icon: Package, color: "bg-blue-500" },
  { title: "Total Products", value: "0", icon: Package, color: "bg-slate-600" },
  { title: "Total Suppliers", value: "0", icon: Truck, color: "bg-purple-500" },
  { title: "Total Users", value: "0", icon: Users, color: "bg-orange-500" },
];

export function Dashboard() {
  const [dashboardStats, setDashboardStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalProducts: 0,
    totalSuppliers: 0,
    lowStockItems: 0,
    inventoryValue: 0,
    revenue: 0,
    profit: 0,
  });
  const [activityFeed, setActivityFeed] = useState<ActivityFeedItem[]>([]);
  const [revenueView, setRevenueView] = useState("monthly");
  const [stockMovementData, setStockMovementData] = useState<StockMovementData[]>([]);
  const [dashboardAlerts, setDashboardAlerts] = useState<DashboardAlerts>({
    lowStockProducts: [],
    expiringProducts: [],
    expiredProducts: [],
  });
  const [revenueTrend, setRevenueTrend] = useState<any[]>([]);
  const [forecastResults, setForecastResults] = useState<ForecastResult[]>([]);
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
          forecastRes,
        ] = await Promise.all([
          api.get(`${import.meta.env.VITE_API_URL}/api/dashboard/stats`),
          api.get(`${import.meta.env.VITE_API_URL}/api/dashboard/activity-feed`),
          api.get(`${import.meta.env.VITE_API_URL}/api/dashboard/alerts`),
          api.get(`${import.meta.env.VITE_API_URL}/api/dashboard/stock-movement`),
          api.get(`${import.meta.env.VITE_API_URL}/api/dashboard/revenue-trend?view=${revenueView}`),
          api.get(`${import.meta.env.VITE_API_URL}/api/forecasts`),
        ]);

        setDashboardStats(statsRes.data);
        setActivityFeed(activityRes.data);
        setDashboardAlerts(alertsRes.data);
        setStockMovementData(stockMovementRes.data);
        setRevenueTrend(revenueTrendRes.data);
        setForecastResults(forecastRes.data);
      } catch (error) {
        console.error(error);
      } finally {
        setTimeout(() => setIsLoading(false), 1500);
      }
    };

    fetchDashboardData();
  }, [revenueView]);

  const dashboardKpiData = kpiData.map((kpi) => {
    if (kpi.title === "Revenue") {
      return { ...kpi, value: dashboardStats.revenue.toLocaleString() };
    }

    if (kpi.title === "Profit") {
      return { ...kpi, value: dashboardStats.profit.toLocaleString() };
    }

    if (kpi.title === "Inventory Value") {
      return { ...kpi, value: dashboardStats.inventoryValue.toLocaleString() };
    }

    if (kpi.title === "Total Products") {
      return { ...kpi, value: dashboardStats.totalProducts.toString() };
    }

    if (kpi.title === "Total Suppliers") {
      return { ...kpi, value: dashboardStats.totalSuppliers.toString() };
    }

    if (kpi.title === "Total Users") {
      return { ...kpi, value: (dashboardStats.totalUsers ?? 0).toString() };
    }

    return kpi;
  });

  const topForecastProduct =
    forecastResults.length > 0
      ? forecastResults.reduce((highest, current) =>
          current.forecastDemand > highest.forecastDemand ? current : highest,
        )
      : null;

  const highRiskProducts = forecastResults.filter(
    (forecast) => forecast.riskLevel.toUpperCase() === "HIGH",
  ).length;

  const forecastKpiCards = [
    {
      title: "Top Forecast Product",
      value: topForecastProduct ? topForecastProduct.productName : "-",
      subtitle: topForecastProduct
        ? `Forecast demand: ${topForecastProduct.forecastDemand.toLocaleString()}`
        : "No forecast data available",
      icon: TrendingUp,
      color: "bg-slate-700",
    },
    {
      title: "High Risk Products",
      value: highRiskProducts.toString(),
      subtitle: "Products classified as HIGH risk",
      icon: AlertTriangle,
      color: "bg-orange-500",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {dashboardKpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="border-none shadow-md">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-center">
                  <div className={`${kpi.color} rounded-lg p-3`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  {isLoading ? (
                    <Skeleton className="mx-auto h-8 w-24" />
                  ) : (
                    <h3 className="text-2xl font-bold text-slate-800">{kpi.value}</h3>
                  )}
                  {isLoading ? (
                    <Skeleton className="mx-auto mt-2 h-4 w-20" />
                  ) : (
                    <p className="text-sm text-slate-500">{kpi.title}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {forecastKpiCards.map((card) => {
          const Icon = card.icon;

          return (
            <Card key={card.title} className="border-none shadow-md">
              <CardContent className="p-5">
                <div className="mb-4 flex items-center justify-center">
                  <div className={`${card.color} rounded-lg p-3`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="text-center">
                  {isLoading ? (
                    <Skeleton className="mx-auto h-8 w-36" />
                  ) : (
                    <h3 className="text-2xl font-bold text-slate-800">{card.value}</h3>
                  )}
                  {isLoading ? (
                    <Skeleton className="mx-auto mt-2 h-4 w-32" />
                  ) : (
                    <>
                      <p className="text-sm text-slate-500">{card.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{card.subtitle}</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
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

        <ChartCard title="Forecast Demand by Product">
          <p className="mb-4 text-sm text-slate-600">
            Top 5 products by forecast demand.
          </p>
          {isLoading ? (
            <div className="h-[300px] space-y-4 rounded-lg bg-slate-50 p-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-[220px] w-full" />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={forecastResults
                  .slice()
                  .sort((left, right) => right.forecastDemand - left.forecastDemand)
                  .slice(0, 5)
                  .map((forecast) => ({
                    productName: forecast.productName,
                    forecastDemand: forecast.forecastDemand,
                  }))}
                layout="vertical"
                margin={{ top: 8, right: 24, left: 24, bottom: 8 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  type="number"
                  dataKey="forecastDemand"
                  stroke="#64748b"
                  tickFormatter={(value) => Number(value).toLocaleString()}
                />
                <YAxis
                  type="category"
                  dataKey="productName"
                  stroke="#64748b"
                  width={180}
                />
                <Tooltip
                  formatter={(value) => Number(value).toLocaleString()}
                  labelStyle={{ color: "#0f172a" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 8px 24px rgba(15, 23, 42, 0.08)",
                  }}
                />
                <Bar dataKey="forecastDemand" fill="#0f766e" radius={[0, 10, 10, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
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
          <CardContent className="max-h-[600px] space-y-4 overflow-y-auto">
            {activityFeed.map((activity, index) => (
              <div key={index} className="rounded-lg border border-slate-200 bg-white p-4">
                <Badge
                  className={
                    activity.title === "StockIn"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-orange-100 text-orange-700"
                  }
                >
                  {activity.title}
                </Badge>
                <p className="mt-3 font-semibold text-slate-800">{activity.description}</p>
                <p className="text-sm text-slate-500">{new Date(activity.createdAt).toLocaleString()}</p>
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
