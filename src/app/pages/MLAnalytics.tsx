import { useEffect, useMemo, useState } from "react";
import { BarChart3 } from "lucide-react";
import api from "../../lib/api";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Skeleton } from "../components/ui/skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
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

function MetricCard({
  title,
  value,
  loading,
}: {
  title: string;
  value: string;
  loading: boolean;
}) {
  return (
    <Card className="border-none shadow-md">
      <CardContent className="p-5">
        <div className="mb-4 flex items-center justify-center">
          <div className="rounded-lg bg-slate-700 p-3">
            <BarChart3 className="h-5 w-5 text-white" />
          </div>
        </div>
        <div className="text-center">
          {loading ? (
            <Skeleton className="mx-auto h-8 w-24" />
          ) : (
            <h3 className="text-2xl font-bold text-slate-800">{value}</h3>
          )}
          {loading ? (
            <Skeleton className="mx-auto mt-2 h-4 w-28" />
          ) : (
            <p className="text-sm text-slate-500">{title}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export function MLAnalytics() {
  const [forecastResults, setForecastResults] = useState<ForecastResult[]>([]);
  const [mlMetrics, setMlMetrics] = useState<MlMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        const [forecastResponse, metricsResponse] = await Promise.all([
          api.get<ForecastResult[]>(`${import.meta.env.VITE_API_URL}/api/forecasts`),
          api.get<MlMetric[]>(`${import.meta.env.VITE_API_URL}/api/Ml/metrics`),
        ]);

        setForecastResults(forecastResponse.data);
        setMlMetrics(metricsResponse.data);
        setLoadError(null);
      } catch (error) {
        console.error(error);
        setForecastResults([]);
        setMlMetrics([]);
        setLoadError("Unable to load live model metrics right now.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalyticsData();
  }, []);

  const sortedForecastResults = useMemo(
    () => [...forecastResults].sort((left, right) => right.forecastDemand - left.forecastDemand),
    [forecastResults],
  );

  const metricLookup = useMemo(
    () => new Map(mlMetrics.map((metric) => [metric.modelName.toLowerCase(), metric.mape])),
    [mlMetrics],
  );

  const selectedModel = useMemo(() => {
    if (mlMetrics.length === 0) {
      return null;
    }

    return [...mlMetrics].sort((left, right) => left.mape - right.mape)[0] ?? null;
  }, [mlMetrics]);

  const topForecastChartData = sortedForecastResults
    .map((forecast) => ({
      productName: formatDisplayName(forecast.productName, productDisplayMap),
      forecastDemand: forecast.forecastDemand,
    }))
    .slice(0, 10) satisfies ForecastChartPoint[];

  const forecastTableData = sortedForecastResults.length <= 10 ? sortedForecastResults : sortedForecastResults.slice(0, 10);

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

  const renderMetricValue = (modelName: string) => {
    const value = metricLookup.get(modelName.toLowerCase());
    return typeof value === "number" ? `${value.toFixed(2)}%` : "-";
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <MetricCard title="Prophet" value={renderMetricValue("Prophet")} loading={isLoading} />
        <MetricCard title="LightGBM" value={renderMetricValue("LightGBM")} loading={isLoading} />
        <MetricCard title="ARIMA" value={renderMetricValue("ARIMA")} loading={isLoading} />
      </div>

      <Card className="border-none shadow-md">
        <CardContent className="p-5">
          {isLoading ? (
            <Skeleton className="h-12 w-full" />
          ) : loadError ? (
            <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              {loadError}
            </div>
          ) : selectedModel ? (
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-blue-500 text-white">Best Performing Model</Badge>
              <div className="text-sm text-slate-700">
                <span className="font-semibold">{selectedModel.modelName}</span>
                <span className="mx-2 text-slate-400">|</span>
                <span>Lowest MAPE: {selectedModel.mape.toFixed(2)}%</span>
              </div>
            </div>
          ) : (
            <div className="text-sm text-slate-500">No model metrics available.</div>
          )}
        </CardContent>
      </Card>

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
          ) : topForecastChartData.length === 0 ? (
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
                <YAxis type="category" dataKey="productName" stroke="#64748b" width={180} />
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

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Forecast Results</CardTitle>
          <p className="text-sm text-slate-600">Forecast outputs ordered by demand, highest first.</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>#</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Current Inventory</TableHead>
                <TableHead>Forecast Demand</TableHead>
                <TableHead>Recommended Order</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forecastTableData.map((forecast, index) => (
                <TableRow key={forecast.forecastId}>
                  <TableCell className="font-medium">#{index + 1}</TableCell>
                  <TableCell className="font-medium">{formatDisplayName(forecast.productName, productDisplayMap)}</TableCell>
                  <TableCell>{formatDisplayName(forecast.categoryName, categoryDisplayMap)}</TableCell>
                  <TableCell>{Number(forecast.currentInventory).toLocaleString()}</TableCell>
                  <TableCell>{Number(forecast.forecastDemand).toLocaleString()}</TableCell>
                  <TableCell>{Number(forecast.recommendedOrder).toLocaleString()}</TableCell>
                  <TableCell>{getRiskBadge(forecast.riskLevel)}</TableCell>
                </TableRow>
              ))}
              {!isLoading && forecastResults.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-slate-500">
                    No forecast results available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}