import { Bell, Camera, CheckCircle2, KeyRound, Mail, MapPin, Phone, Shield, UserCog } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";

const recentActivity = [
  { action: "Approved purchase order", entity: "PO-2403", time: "2026-06-03 11:05 AM" },
  { action: "Recorded stock in", entity: "Amoxicillin 500mg", time: "2026-06-03 10:30 AM" },
  { action: "Updated reorder level", entity: "Surgical Masks", time: "2026-06-02 04:10 PM" },
  { action: "Exported audit report", entity: "Last 7 days", time: "2026-06-02 01:45 PM" },
];

export function UserProfile() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">User Profile</h1>
        <p className="text-slate-600 mt-1">
          Manage account details, role context, and security preferences
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-6">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex flex-col items-center text-center">
              <div className="relative">
                <Avatar className="h-28 w-28">
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=180&h=180&fit=crop" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button size="icon" className="absolute bottom-0 right-0 h-9 w-9 rounded-full bg-emerald-500 hover:bg-emerald-600">
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h2 className="mt-4 text-2xl font-bold text-slate-800">John Doe</h2>
              <div className="mt-2 flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-700">Administrator</Badge>
                <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
              </div>
              <p className="mt-2 text-sm text-slate-500">IT & Operations Department</p>
            </div>

            <Separator className="my-6" />

            <div className="space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-slate-700">john.doe@inventrackpro.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-slate-400" />
                <span className="text-slate-700">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="h-4 w-4 text-slate-400" />
                <span className="text-slate-700">New York Distribution Center</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-4 w-4 text-slate-400" />
                <span className="text-slate-700">Full system access</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <UserCog className="h-5 w-5 text-emerald-600" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="John Doe" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Input defaultValue="Administrator" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label>Department</Label>
                  <Input defaultValue="IT & Operations" className="bg-white" />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input defaultValue="+1 (555) 123-4567" className="bg-white" />
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button className="bg-emerald-500 hover:bg-emerald-600">Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivity.map((item) => (
                  <div key={`${item.action}-${item.time}`} className="flex gap-3 rounded-lg bg-slate-50 p-3">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                    <div>
                      <p className="font-semibold text-slate-800">{item.action}</p>
                      <p className="text-sm text-slate-500">{item.entity}</p>
                      <p className="text-xs text-slate-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardHeader>
                <CardTitle className="text-lg">Account Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="font-semibold text-slate-800">Inventory Alerts</p>
                      <p className="text-sm text-slate-500">Low stock and expiry notifications</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between rounded-lg border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <KeyRound className="h-5 w-5 text-slate-500" />
                    <div>
                      <p className="font-semibold text-slate-800">Two-Factor Authentication</p>
                      <p className="text-sm text-slate-500">Protect account access</p>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Button variant="outline" className="w-full bg-white">
                  Change Password
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
