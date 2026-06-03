import { CalendarPlus, KeyRound, RotateCcw, ShieldCheck } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import type { UserEntity } from "../../types/profile";

interface AccountSecurityCardProps {
  user: UserEntity;
  onChangePassword: () => void;
}

export function AccountSecurityCard({
  user,
  onChangePassword,
}: AccountSecurityCardProps) {
  const fields = [
    { label: "Password Last Changed", value: user.passwordLastChanged },
    { label: "Account Created Date", value: user.accountCreatedDate },
    { label: "Last Login", value: user.lastLogin },
    { label: "Role", value: user.role },
    { label: "Account Status", value: user.accountStatus },
  ];

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <ShieldCheck className="h-5 w-5 text-emerald-600" />
          Account & Security
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-3">
          {fields.map((field) => (
            <div key={field.label} className="flex items-center justify-between gap-4 rounded-lg bg-slate-50 p-3">
              <span className="text-sm text-slate-500">{field.label}</span>
              {field.label === "Account Status" ? (
                <Badge className="bg-emerald-100 text-emerald-700">
                  {field.value}
                </Badge>
              ) : (
                <span className="text-right text-sm font-semibold text-slate-800">
                  {field.value}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={onChangePassword}>
            <KeyRound className="h-4 w-4" />
            Change Password
          </Button>
          <Button variant="outline" className="bg-white">
            <RotateCcw className="h-4 w-4" />
            Reset Password
          </Button>
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-cyan-100 bg-cyan-50 p-3 text-sm text-cyan-800">
          <CalendarPlus className="h-4 w-4" />
          Admin-only reset action is visible for administrator users.
        </div>
      </CardContent>
    </Card>
  );
}
