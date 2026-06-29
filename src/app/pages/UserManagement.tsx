import { Plus, Edit, Trash2, UserCog } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Switch } from "../components/ui/switch";



export function UserManagement() {
  

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-600 mt-1">
          </p>
        </div>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Users</p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {users.length}
                </h3>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <UserCog className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Active Users</p>
                <h3 className="text-3xl font-bold text-emerald-600">
                  {users.filter((u) => u.status === "Active").length}
                </h3>
              </div>
              <div className="bg-emerald-500 p-3 rounded-lg">
                <UserCog className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Administrators</p>
                <h3 className="text-3xl font-bold text-purple-600">
                  {users.filter((u) => u.role === "Administrator").length}
                </h3>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <UserCog className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Online Now</p>
                <h3 className="text-3xl font-bold text-blue-600">3</h3>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <UserCog className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role Statistics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Card className="border-none shadow-md border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Administrators</p>
                <h3 className="text-2xl font-bold text-slate-800">
                  {users.filter((u) => u.role === "Administrator").length}
                </h3>
              </div>
              <Badge className="bg-purple-100 text-purple-700">Full Access</Badge>
            </div>
          </CardContent>
        </Card>



      


      </div>

      

      {/* Permissions Overview */}
      <Card className="border-none shadow-md">

        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="text-left py-3 px-4 font-semibold text-slate-700">
                    Permission
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-700">
                    Administrator
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-700">
                    Manager
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-700">
                    Operator
                  </th>
                  <th className="text-center py-3 px-4 font-semibold text-slate-700">
                    Viewer
                  </th>
                </tr>
              </thead>

            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
