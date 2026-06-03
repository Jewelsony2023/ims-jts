import { ClipboardList, PackagePlus, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import type { UserProfileSummary } from "../../types/profile";

interface ProfileSummaryCardsProps {
  summary: UserProfileSummary;
}

const summaryConfig = [
  {
    key: "productsAdded",
    label: "Products Added",
    icon: PackagePlus,
    color: "bg-blue-500",
  },
  {
    key: "stockInTransactions",
    label: "Stock In Transactions",
    icon: TrendingUp,
    color: "bg-emerald-500",
  },
  {
    key: "stockOutTransactions",
    label: "Stock Out Transactions",
    icon: TrendingDown,
    color: "bg-orange-500",
  },
  {
    key: "purchaseOrdersCreated",
    label: "Purchase Orders Created",
    icon: ClipboardList,
    color: "bg-cyan-500",
  },
] as const;

export function ProfileSummaryCards({ summary }: ProfileSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {summaryConfig.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.key} className="border-none shadow-md">
            <CardContent className="p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-800">
                    {summary[item.key].toLocaleString()}
                  </p>
                </div>
                <div className={`${item.color} rounded-lg p-3`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
