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

        <Card className="border-none shadow-md border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>

              </div>
              <Badge className="bg-blue-100 text-blue-700"></Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1"></p>
                <h3 className="text-2xl font-bold text-slate-800">
                  {users.filter((u) => u.role === "Operator").length}
                </h3>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700"></Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md border-l-4 border-l-slate-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Viewers</p>
                <h3 className="text-2xl font-bold text-slate-800">
                  {users.filter((u) => u.role === "Viewer").length}
                </h3>
              </div>
              <Badge className="bg-slate-100 text-slate-700">Read Only</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">All Users</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="hidden md:table-cell">Department</TableHead>
                <TableHead className="hidden md:table-cell">Last Login</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-slate-800">{user.name}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {user.email}
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell className="text-sm hidden md:table-cell">{user.department}</TableCell>
                  <TableCell className="text-sm text-slate-600 hidden md:table-cell">
                    {user.lastLogin}
                  </TableCell>
                  <TableCell>
                    <Switch checked={user.status === "Active"} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4 text-slate-600" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Permissions Overview */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Role Permissions Matrix</CardTitle>
        </CardHeader>
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
