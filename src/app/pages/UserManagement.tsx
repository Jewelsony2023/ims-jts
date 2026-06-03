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

const users = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@inventrackpro.com",
    role: "Administrator",
    department: "IT & Operations",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    status: "Active",
    lastLogin: "2026-06-03 10:30 AM",
  },
  {
    id: "2",
    name: "Sarah Smith",
    email: "sarah.smith@inventrackpro.com",
    role: "Manager",
    department: "Warehouse",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    status: "Active",
    lastLogin: "2026-06-03 09:15 AM",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@inventrackpro.com",
    role: "Manager",
    department: "Pharmacy",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    status: "Active",
    lastLogin: "2026-06-02 04:45 PM",
  },
  {
    id: "4",
    name: "Emily Brown",
    email: "emily.brown@inventrackpro.com",
    role: "Operator",
    department: "Receiving",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    status: "Active",
    lastLogin: "2026-06-02 02:20 PM",
  },
  {
    id: "5",
    name: "David Lee",
    email: "david.lee@inventrackpro.com",
    role: "Operator",
    department: "Distribution",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    status: "Active",
    lastLogin: "2026-06-01 11:30 AM",
  },
  {
    id: "6",
    name: "Lisa Anderson",
    email: "lisa.anderson@inventrackpro.com",
    role: "Viewer",
    department: "Quality Control",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    status: "Active",
    lastLogin: "2026-06-01 09:00 AM",
  },
  {
    id: "7",
    name: "Robert Williams",
    email: "robert.williams@inventrackpro.com",
    role: "Manager",
    department: "Procurement",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    status: "Inactive",
    lastLogin: "2026-05-25 03:15 PM",
  },
  {
    id: "8",
    name: "Jennifer Davis",
    email: "jennifer.davis@inventrackpro.com",
    role: "Operator",
    department: "Inventory",
    avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop",
    status: "Active",
    lastLogin: "2026-06-03 08:45 AM",
  },
];

export function UserManagement() {
  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Administrator":
        return <Badge className="bg-purple-100 text-purple-700">Administrator</Badge>;
      case "Manager":
        return <Badge className="bg-blue-100 text-blue-700">Manager</Badge>;
      case "Operator":
        return <Badge className="bg-emerald-100 text-emerald-700">Operator</Badge>;
      case "Viewer":
        return <Badge className="bg-slate-100 text-slate-700">Viewer</Badge>;
      default:
        return <Badge>{role}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">User Management</h1>
          <p className="text-slate-600 mt-1">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <p className="text-sm text-slate-600 mb-1">Managers</p>
                <h3 className="text-2xl font-bold text-slate-800">
                  {users.filter((u) => u.role === "Manager").length}
                </h3>
              </div>
              <Badge className="bg-blue-100 text-blue-700">Department</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md border-l-4 border-l-emerald-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Operators</p>
                <h3 className="text-2xl font-bold text-slate-800">
                  {users.filter((u) => u.role === "Operator").length}
                </h3>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700">Basic</Badge>
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
                <TableHead>Department</TableHead>
                <TableHead>Last Login</TableHead>
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
                  <TableCell className="text-sm">{user.department}</TableCell>
                  <TableCell className="text-sm text-slate-600">
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
              <tbody>
                {[
                  { name: "View Inventory", admin: true, manager: true, operator: true, viewer: true },
                  { name: "Add Products", admin: true, manager: true, operator: true, viewer: false },
                  { name: "Edit Products", admin: true, manager: true, operator: true, viewer: false },
                  { name: "Delete Products", admin: true, manager: true, operator: false, viewer: false },
                  { name: "Stock In/Out", admin: true, manager: true, operator: true, viewer: false },
                  { name: "Manage Suppliers", admin: true, manager: true, operator: false, viewer: false },
                  { name: "Create Purchase Orders", admin: true, manager: true, operator: false, viewer: false },
                  { name: "View Reports", admin: true, manager: true, operator: true, viewer: true },
                  { name: "Manage Users", admin: true, manager: false, operator: false, viewer: false },
                  { name: "System Settings", admin: true, manager: false, operator: false, viewer: false },
                ].map((perm, index) => (
                  <tr key={index} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-3 px-4 font-medium">{perm.name}</td>
                    <td className="py-3 px-4 text-center">
                      <span className={perm.admin ? "text-emerald-600 text-xl" : "text-slate-300 text-xl"}>
                        {perm.admin ? "✓" : "✗"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={perm.manager ? "text-emerald-600 text-xl" : "text-slate-300 text-xl"}>
                        {perm.manager ? "✓" : "✗"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={perm.operator ? "text-emerald-600 text-xl" : "text-slate-300 text-xl"}>
                        {perm.operator ? "✓" : "✗"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <span className={perm.viewer ? "text-emerald-600 text-xl" : "text-slate-300 text-xl"}>
                        {perm.viewer ? "✓" : "✗"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
