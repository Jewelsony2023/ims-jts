import { Search, Filter, Download, FileText } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const auditLogs = [
  {
    id: "LOG-001234",
    user: "John Doe",
    action: "Stock In",
    entity: "Amoxicillin 500mg",
    details: "Added 500 units, Batch: BAT-2401",
    timestamp: "2026-06-03 10:30:45",
    ipAddress: "192.168.1.100",
  },
  {
    id: "LOG-001233",
    user: "Sarah Smith",
    action: "Stock Out",
    entity: "Organic Apple Juice",
    details: "Issued 120 units to Retail Store A",
    timestamp: "2026-06-03 09:15:22",
    ipAddress: "192.168.1.101",
  },
  {
    id: "LOG-001232",
    user: "Mike Johnson",
    action: "Product Update",
    entity: "Paracetamol 500mg",
    details: "Updated selling price from $9.50 to $9.99",
    timestamp: "2026-06-02 04:45:18",
    ipAddress: "192.168.1.102",
  },
  {
    id: "LOG-001231",
    user: "Emily Brown",
    action: "Category Created",
    entity: "Baby Care",
    details: "Created new category",
    timestamp: "2026-06-02 02:20:56",
    ipAddress: "192.168.1.103",
  },
  {
    id: "LOG-001230",
    user: "John Doe",
    action: "Supplier Added",
    entity: "PPE Direct Suppliers",
    details: "Added new supplier with contact details",
    timestamp: "2026-06-02 11:00:33",
    ipAddress: "192.168.1.100",
  },
  {
    id: "LOG-001229",
    user: "Sarah Smith",
    action: "Purchase Order",
    entity: "PO-2402",
    details: "Created purchase order for $8,950",
    timestamp: "2026-06-01 03:45:12",
    ipAddress: "192.168.1.101",
  },
  {
    id: "LOG-001228",
    user: "Admin User",
    action: "User Created",
    entity: "Emily Brown",
    details: "Created new user account with Operator role",
    timestamp: "2026-06-01 10:15:08",
    ipAddress: "192.168.1.1",
  },
  {
    id: "LOG-001227",
    user: "Mike Johnson",
    action: "Product Deleted",
    entity: "Expired Medicine XYZ",
    details: "Deleted expired product from inventory",
    timestamp: "2026-05-31 05:30:44",
    ipAddress: "192.168.1.102",
  },
  {
    id: "LOG-001226",
    user: "John Doe",
    action: "Stock Out",
    entity: "Surgical Masks",
    details: "Issued 75 units to Hospital Ward B",
    timestamp: "2026-05-31 02:10:29",
    ipAddress: "192.168.1.100",
  },
  {
    id: "LOG-001225",
    user: "Sarah Smith",
    action: "Stock In",
    entity: "Hand Sanitizer 500ml",
    details: "Added 300 units, Batch: BAT-2405",
    timestamp: "2026-05-30 11:55:17",
    ipAddress: "192.168.1.101",
  },
];

export function AuditLogs() {
  const getActionBadge = (action: string) => {
    switch (action) {
      case "Stock In":
        return <Badge className="bg-emerald-100 text-emerald-700">Stock In</Badge>;
      case "Stock Out":
        return <Badge className="bg-red-100 text-red-700">Stock Out</Badge>;
      case "Product Update":
        return <Badge className="bg-blue-100 text-blue-700">Product Update</Badge>;
      case "Category Created":
        return <Badge className="bg-purple-100 text-purple-700">Category Created</Badge>;
      case "Supplier Added":
        return <Badge className="bg-teal-100 text-teal-700">Supplier Added</Badge>;
      case "Purchase Order":
        return <Badge className="bg-indigo-100 text-indigo-700">Purchase Order</Badge>;
      case "User Created":
        return <Badge className="bg-amber-100 text-amber-700">User Created</Badge>;
      case "Product Deleted":
        return <Badge className="bg-red-100 text-red-700">Product Deleted</Badge>;
      default:
        return <Badge>{action}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Audit Logs</h1>
          <p className="text-slate-600 mt-1">
            Complete activity history and transaction logs
          </p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Logs</p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {auditLogs.length}
                </h3>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Today's Activity</p>
                <h3 className="text-3xl font-bold text-slate-800">24</h3>
              </div>
              <div className="bg-emerald-500 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Active Users</p>
                <h3 className="text-3xl font-bold text-slate-800">8</h3>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">This Week</p>
                <h3 className="text-3xl font-bold text-slate-800">156</h3>
              </div>
              <div className="bg-orange-500 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search logs by user, action, or entity..."
            className="pl-10 bg-white"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[200px] bg-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by action" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Actions</SelectItem>
            <SelectItem value="stock-in">Stock In</SelectItem>
            <SelectItem value="stock-out">Stock Out</SelectItem>
            <SelectItem value="product">Product Changes</SelectItem>
            <SelectItem value="user">User Actions</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="7days">
          <SelectTrigger className="w-[180px] bg-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="7days">Last 7 Days</SelectItem>
            <SelectItem value="30days">Last 30 Days</SelectItem>
            <SelectItem value="90days">Last 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Audit Logs Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Activity Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Log ID</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Entity</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>IP Address</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-mono text-sm">{log.id}</TableCell>
                  <TableCell className="font-medium">{log.user}</TableCell>
                  <TableCell>{getActionBadge(log.action)}</TableCell>
                  <TableCell className="font-medium">{log.entity}</TableCell>
                  <TableCell className="text-sm text-slate-600 max-w-xs truncate">
                    {log.details}
                  </TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {log.timestamp}
                  </TableCell>
                  <TableCell className="font-mono text-sm text-slate-600">
                    {log.ipAddress}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
