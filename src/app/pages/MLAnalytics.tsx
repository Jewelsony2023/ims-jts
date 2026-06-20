import { useEffect, useState } from "react";
import { BarChart3, BrainCircuit, ShieldAlert, Target } from "lucide-react";
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

type ForecastResult = {
  forecastId: number;
  productCode: string;
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

  const highRiskProducts = forecastResults.filter(
    (forecast) => forecast.riskLevel.toUpperCase() === "HIGH",
  ).length;

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
      </div>

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
                <TableHead>Product Code</TableHead>
                <TableHead>Forecast Demand</TableHead>
                <TableHead>Recommended Order</TableHead>
                <TableHead>Risk Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {forecastResults.map((forecast) => (
                <TableRow key={forecast.forecastId}>
                  <TableCell className="font-medium">
                    {forecast.productCode}
                  </TableCell>
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
                  <TableCell colSpan={4} className="py-8 text-center text-slate-500">
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
