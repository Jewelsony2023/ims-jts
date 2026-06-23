import { useEffect, useMemo, useState } from "react";
import { BarChart3, ShieldAlert } from "lucide-react";
import api from "../../lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import { Skeleton } from "../components/ui/skeleton";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

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

type MlMetric = {
  modelName: string;
  mape: number;
};

type StatCard = {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

type ForecastChartPoint = {
  productName: string;
  forecastDemand: number;
};

const productDisplayMap: Record<string, string> = {
  P0015: "AmoxiCare 500mg",
  P0014: "Cefloxin 250mg",
  P0005: "Paracet Plus",
  P0020: "VitaBoost Capsules",
  P0016: "ColdRelief DS",
};

const categoryDisplayMap: Record<string, string> = {
  Electronics: "Antibiotics",
  Furniture: "Pain Relief",
  Clothing: "Vitamins",
  Groceries: "Hygiene",
  Toys: "Diabetes Care",
};

function formatDisplayName(value: string, mapping: Record<string, string>) {
  return mapping[value] ?? value;
}

function MetricCardIcon({ className }: { className?: string }) {
  return <BarChart3 className={className} />;
}

export function MLAnalytics() {
  const [forecastResults, setForecastResults] = useState<ForecastResult[]>([]);
  const [mlMetrics, setMlMetrics] = useState<MlMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [forecastResponse, metricsResponse] = await Promise.all([
          api.get<ForecastResult[]>(`${import.meta.env.VITE_API_URL}/api/forecasts`),
          api.get<MlMetric[]>(`${import.meta.env.VITE_API_URL}/api/ml/metrics`),
        ]);

        setForecastResults(forecastResponse.data);
        setMlMetrics(metricsResponse.data);
      } catch (error) {
        console.error(error);
        setForecastResults([]);
        setMlMetrics([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const sortedForecastResults = useMemo(
    () =>
      [...forecastResults].sort(
        (left, right) => right.forecastDemand - left.forecastDemand,
      ),
    [forecastResults],
  );

  const highRiskProducts = forecastResults.filter(
    (forecast) => forecast.riskLevel.toUpperCase() === "HIGH",
  ).length;

  const selectedModel = useMemo(() => {
    if (mlMetrics.length === 0) {
      return null;
    }

    return [...mlMetrics].sort((left, right) => left.mape - right.mape)[0] ?? null;
  }, [mlMetrics]);

  const metricCards: StatCard[] = useMemo(() => {
    const cards: StatCard[] = [
      {
        title: "Prophet MAPE",
        value: mlMetrics.find((metric) => metric.modelName === "Prophet")
          ? `${mlMetrics.find((metric) => metric.modelName === "Prophet")!.mape.toFixed(2)}%`
          : "-",
        icon: MetricCardIcon,
        color: "bg-slate-700",
      },
      {
        title: "LightGBM MAPE",
        value: mlMetrics.find((metric) => metric.modelName === "LightGBM")
          ? `${mlMetrics.find((metric) => metric.modelName === "LightGBM")!.mape.toFixed(2)}%`
          : "-",
        icon: MetricCardIcon,
        color: "bg-emerald-500",
      },
      {
        title: "ARIMA MAPE",
        value: mlMetrics.find((metric) => metric.modelName === "ARIMA")
          ? `${mlMetrics.find((metric) => metric.modelName === "ARIMA")!.mape.toFixed(2)}%`
          : "-",
        icon: MetricCardIcon,
        color: "bg-orange-500",
      },
      {
        title: "Selected Model",
        value: selectedModel ? selectedModel.modelName : "-",
        icon: ShieldAlert,
        color: "bg-blue-500",
      },
    ];

    return cards;
  }, [mlMetrics, selectedModel]);

  const statCards: StatCard[] = [
    {
      title: "Forecasted Products",
      value: forecastResults.length.toString(),
      icon: BarChart3,
      color: "bg-blue-500",
    },
    {
      title: "High Risk Products",
      value: highRiskProducts.toString(),
      icon: ShieldAlert,
      color: "bg-orange-500",
    },
  ];

  const chartData = sortedForecastResults.map((forecast) => ({
    productName: formatDisplayName(forecast.productName, productDisplayMap),
    forecastDemand: forecast.forecastDemand,
  })) satisfies ForecastChartPoint[];

  const topForecastChartData = chartData.slice(0, 10);
  const forecastTableData = sortedForecastResults.length <= 10
    ? sortedForecastResults
    : sortedForecastResults.slice(0, 10);

  const getRiskBadge = (riskLevel: string) => {
    switch (riskLevel.toUpperCase()) {
      case "HIGH":
        return <Badge className="bg-red-100 text-red-700">HIGH</Badge>;
      case "MEDIUM":
        return <Badge className="bg-amber-100 text-amber-700">MEDIUM</Badge>;
      case "LOW":
        return <Badge className="bg-emerald-100 text-emerald-700">LOW</Badge>;
      default:
        return <Badge>{riskLevel}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metricCards.map((card) => {
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
                    <Skeleton className="mx-auto h-8 w-24" />
                  ) : (
                    <h3 className="text-2xl font-bold text-slate-800">
                      {card.value}
                    </h3>
                  )}
                  {isLoading ? (
                    <Skeleton className="mx-auto mt-2 h-4 w-28" />
                  ) : (
                    <p className="text-sm text-slate-500">{card.title}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Forecast Demand Visualization</CardTitle>
          <p className="text-sm text-slate-600">
            Products are sorted by forecast demand from highest to lowest. The top 10 products are shown here.
          </p>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="h-[360px] space-y-4 rounded-lg bg-slate-50 p-4">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-[280px] w-full" />
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex h-[360px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
              No forecast data available for visualization.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={360}>
              <BarChart
                data={topForecastChartData}
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
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
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

        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Forecast Demand by Product</CardTitle>
            <p className="text-sm text-slate-600">
              Top 5 products by forecast demand.
            </p>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-[300px] space-y-4 rounded-lg bg-slate-50 p-4">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-[220px] w-full" />
              </div>
            ) : topForecastChartData.length === 0 ? (
              <div className="flex h-[300px] items-center justify-center rounded-lg border border-dashed border-slate-200 bg-slate-50 text-sm text-slate-500">
                No forecast data available for visualization.
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topForecastChartData} layout="vertical" margin={{ top: 8, right: 24, left: 24, bottom: 8 }}>
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
          </CardContent>
        </Card>
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
