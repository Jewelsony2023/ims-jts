import { Settings as SettingsIcon, Shield, Tags, Warehouse } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Switch } from "../components/ui/switch";

const settings = [
  { label: "Require batch number on stock in", icon: Warehouse, enabled: true },
  { label: "Warn before issuing near-expiry stock", icon: Shield, enabled: true },
  { label: "Require batch-level cost and selling prices", icon: Tags, enabled: true },
  { label: "Auto-create audit log entries", icon: SettingsIcon, enabled: true },
];

export function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
        <p className="mt-1 text-slate-600">
          Configure inventory workflows, security controls, and enterprise preferences.
        </p>
      </div>
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Inventory Controls</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {settings.map((setting) => {
            const Icon = setting.icon;
            return (
              <div key={setting.label} className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-slate-100 p-2">
                    <Icon className="h-5 w-5 text-slate-600" />
                  </div>
                  <p className="font-semibold text-slate-800">{setting.label}</p>
                </div>
                <Switch defaultChecked={setting.enabled} />
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
