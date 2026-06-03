import { Bell, ClipboardList, FileBarChart, PackageSearch, Timer } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Switch } from "../ui/switch";
import type { NotificationSettings } from "../../types/profile";

interface NotificationSettingsCardProps {
  settings: NotificationSettings;
  onChange: (key: keyof NotificationSettings, checked: boolean) => void;
}

const notificationOptions = [
  {
    key: "lowStockAlerts",
    label: "Low Stock Alerts",
    detail: "Notify when inventory drops below reorder level",
    icon: PackageSearch,
  },
  {
    key: "expiryAlerts",
    label: "Expiry Alerts",
    detail: "Notify before batches approach expiry",
    icon: Timer,
  },
  {
    key: "purchaseOrderAlerts",
    label: "Purchase Order Alerts",
    detail: "Notify on purchase approvals and status changes",
    icon: ClipboardList,
  },
  {
    key: "dailyReports",
    label: "Daily Reports",
    detail: "Receive end-of-day inventory movement summaries",
    icon: FileBarChart,
  },
  {
    key: "weeklyReports",
    label: "Weekly Reports",
    detail: "Receive weekly stock and purchasing summaries",
    icon: FileBarChart,
  },
] as const;

export function NotificationSettingsCard({
  settings,
  onChange,
}: NotificationSettingsCardProps) {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Bell className="h-5 w-5 text-emerald-600" />
          Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {notificationOptions.map((option) => {
          const Icon = option.icon;
          return (
            <div key={option.key} className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 p-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-slate-100 p-2">
                  <Icon className="h-4 w-4 text-slate-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-800">{option.label}</p>
                  <p className="text-sm text-slate-500">{option.detail}</p>
                </div>
              </div>
              <Switch
                checked={settings[option.key]}
                onCheckedChange={(checked) => onChange(option.key, checked)}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
