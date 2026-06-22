import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  BrainCircuit,
  Lightbulb,
  ShieldAlert,
  Target,
  TrendingUp,
  ShoppingCart,
} from "lucide-react";
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
  createdAt: string;
};

type StatCard = {
  title: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

type InsightCard = {
  title: string;
  message: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

type ForecastChartPoint = {
  productName: string;
  forecastDemand: number;
  recommendedOrder: number;
  riskLevel: string;
};

const forecastAccuracy = "37.28%";

export function MLAnalytics() {
  const [forecastResults, setForecastResults] = useState<ForecastResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchForecastResults = async () => {
      try {
        const response = await api.get<ForecastResult[]>(
          `${import.meta.env.VITE_API_URL}/api/forecasts`,
        );

        setForecastResults(response.data);
      } catch (error) {
        console.error(error);
        setForecastResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchForecastResults();
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

  const highestForecastProduct =
    forecastResults.length > 0
      ? forecastResults.reduce((highest, current) =>
          current.forecastDemand > highest.forecastDemand ? current : highest,
        )
      : null;

  const totalRecommendedOrders = forecastResults.reduce(
    (sum, item) => sum + item.recommendedOrder,
    0,
  );

  const highestDemandCategory = useMemo(() => {
    if (forecastResults.length === 0) {
      return null;
    }

    const categoryTotals = forecastResults.reduce<Record<string, number>>(
      (totals, item) => {
        totals[item.categoryName] = (totals[item.categoryName] ?? 0) + item.forecastDemand;
        return totals;
      },
      {},
    );

    const [categoryName, forecastDemand] = Object.entries(categoryTotals).sort(
      (left, right) => right[1] - left[1],
    )[0] ?? [];

    return categoryName ? { categoryName, forecastDemand } : null;
  }, [forecastResults]);

  const statCards: StatCard[] = [
    {
      title: "Best Model",
      value: "Prophet",
      icon: BrainCircuit,
      color: "bg-slate-700",
    },
    {
      title: "Forecast Accuracy",
      value: forecastAccuracy,
      icon: Target,
      color: "bg-emerald-500",
    },
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
    productName: forecast.productName,
    forecastDemand: forecast.forecastDemand,
    recommendedOrder: forecast.recommendedOrder,
    riskLevel: forecast.riskLevel,
  })) satisfies ForecastChartPoint[];

  const topForecastChartData = chartData.slice(0, 10);

  const insightCards: InsightCard[] = [
    {
      title: "Highest Demand",
      message: highestForecastProduct
        ? `${highestForecastProduct.productName} is expected to experience the highest demand.`
        : "Forecast demand insight will appear once data is available.",
      icon: Lightbulb,
      color: "bg-amber-500",
    },
    {
      title: "High Risk Count",
      message: `${highRiskProducts} products are currently classified as HIGH risk.`,
      icon: ShieldAlert,
      color: "bg-red-500",
    },
    {
      title: "Replenishment Need",
      message: `${totalRecommendedOrders.toLocaleString()} units are recommended for replenishment.`,
      icon: ShoppingCart,
      color: "bg-cyan-500",
    },
    {
      title: "Top Category",
      message: highestDemandCategory
        ? `${highestDemandCategory.categoryName} has the highest total forecast demand at ${Number(highestDemandCategory.forecastDemand).toLocaleString()}.`
        : "Category-level demand insight will appear once data is available.",
      icon: BarChart3,
      color: "bg-blue-500",
    },
  ];

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

  const renderForecastTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{ payload?: ForecastChartPoint }>;
  }) => {
    if (!active || !payload?.length || !payload[0]?.payload) {
      return null;
    }

    const item = payload[0].payload;

    return (
      <div className="rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-lg">
        <p className="text-sm font-semibold text-slate-900">
          {item.productName}
        </p>
        <div className="mt-2 space-y-1 text-sm text-slate-600">
          <p>
            <span className="font-medium text-slate-500">Forecast Demand:</span>{" "}
            {Number(item.forecastDemand).toLocaleString()}
          </p>
          <p>
            <span className="font-medium text-slate-500">Recommended Order:</span>{" "}
            {Number(item.recommendedOrder).toLocaleString()}
          </p>
          <p>
            <span className="font-medium text-slate-500">Risk Level:</span>{" "}
            {item.riskLevel}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-6">
        {statCards.map((card) => {
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

        <Card className="border-none shadow-md">
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-center">
              <div className="rounded-lg bg-slate-700 p-3">
                <TrendingUp className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="text-center">
              {isLoading ? (
                <>
                  <Skeleton className="mx-auto h-8 w-28" />
                  <Skeleton className="mx-auto mt-2 h-4 w-32" />
                </>
              ) : highestForecastProduct ? (
                <>
                  <h3 className="text-lg font-bold text-slate-800">
                    {highestForecastProduct.productName}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {Number(highestForecastProduct.forecastDemand).toLocaleString()}
                  </p>
                  <p className="text-sm text-slate-500">Forecast Demand</p>
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-slate-800">-</h3>
                  <p className="text-sm text-slate-500">Forecast Demand</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-5">
            <div className="mb-4 flex items-center justify-center">
              <div className="rounded-lg bg-cyan-500 p-3">
                <ShoppingCart className="h-5 w-5 text-white" />
              </div>
            </div>
            <div className="text-center">
              {isLoading ? (
                <>
                  <Skeleton className="mx-auto h-8 w-28" />
                  <Skeleton className="mx-auto mt-2 h-4 w-36" />
                </>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {totalRecommendedOrders.toLocaleString()}
                  </h3>
                  <p className="text-sm text-slate-500">
                    Units recommended for replenishment
                  </p>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="border-none shadow-md">
                <CardContent className="p-5">
                  <Skeleton className="h-6 w-28" />
                  <Skeleton className="mt-4 h-10 w-full" />
                </CardContent>
              </Card>
            ))
          : insightCards.map((insight) => {
              const Icon = insight.icon;

              return (
                <Card key={insight.title} className="border-none shadow-md">
                  <CardContent className="p-5">
                    <div className="mb-4 flex items-center gap-3">
                      <div className={`${insight.color} rounded-lg p-2`}>
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                      <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                        {insight.title}
                      </h3>
                    </div>
                    <p className="text-sm leading-6 text-slate-700">
                      {insight.message}
                    </p>
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
                  content={renderForecastTooltip}
                  cursor={{ fill: "rgba(15, 118, 110, 0.08)" }}
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
          <p className="text-sm text-slate-600">
            Forecast outputs ordered by demand, highest first.
          </p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Forecast Demand</TableHead>
                <TableHead>Recommended Order</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forecastResults.map((forecast) => (
                <TableRow key={forecast.forecastId}>
                  <TableCell className="font-medium">
                    {forecast.productName}
                  </TableCell>
                  <TableCell>{forecast.categoryName}</TableCell>
                  <TableCell>
                    {Number(forecast.forecastDemand).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {Number(forecast.recommendedOrder).toLocaleString()}
                  </TableCell>
                  <TableCell>{getRiskBadge(forecast.riskLevel)}</TableCell>
                </TableRow>
              ))}
              {!isLoading && forecastResults.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-slate-500">
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

