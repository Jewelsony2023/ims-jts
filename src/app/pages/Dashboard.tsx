import {
  Package,
  FolderTree,
  DollarSign,
  AlertTriangle,
  Clock,
  XCircle,
  TrendingUp,
  TrendingDown,
  Star,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Badge } from "../components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

const kpiData = [
  {
    title: "Total Products",
    value: "1,247",
    icon: Package,
    trend: "+12.5%",
    trendUp: true,
    bgColor: "bg-blue-500",
  },
  {
    title: "Total Categories",
    value: "32",
    icon: FolderTree,
    trend: "+3",
    trendUp: true,
    bgColor: "bg-purple-500",
  },
  {
    title: "Total Inventory Value",
    value: "$847,392",
    icon: DollarSign,
    trend: "+8.2%",
    trendUp: true,
    bgColor: "bg-emerald-500",
  },
  {
    title: "Low Stock Products",
    value: "23",
    icon: AlertTriangle,
    trend: "-5",
    trendUp: false,
    bgColor: "bg-amber-500",
  },
  {
    title: "Expiring Soon",
    value: "18",
    icon: Clock,
    trend: "+2",
    trendUp: false,
    bgColor: "bg-orange-500",
  },
  {
    title: "Expired Products",
    value: "7",
    icon: XCircle,
    trend: "-3",
    trendUp: true,
    bgColor: "bg-red-500",
  },
];

const inventoryTrendData = [
  { month: "Jan", value: 65000 },
  { month: "Feb", value: 72000 },
  { month: "Mar", value: 68000 },
  { month: "Apr", value: 78000 },
  { month: "May", value: 82000 },
  { month: "Jun", value: 84739 },
];

const stockMovementData = [
  { month: "Jan", stockIn: 45000, stockOut: 38000 },
  { month: "Feb", stockIn: 52000, stockOut: 42000 },
  { month: "Mar", stockIn: 48000, stockOut: 45000 },
  { month: "Apr", stockIn: 58000, stockOut: 48000 },
  { month: "May", stockIn: 62000, stockOut: 52000 },
  { month: "Jun", stockIn: 65000, stockOut: 55000 },
];

const recentTransactions = [
  {
    id: "TXN-001234",
    product: "Amoxicillin 500mg",
    type: "Stock In",
    quantity: 500,
    date: "2026-06-03 10:30 AM",
    user: "John Doe",
  },
  {
    id: "TXN-001233",
    product: "Organic Apple Juice",
    type: "Stock Out",
    quantity: 120,
    date: "2026-06-03 09:15 AM",
    user: "Sarah Smith",
  },
  {
    id: "TXN-001232",
    product: "Paracetamol 500mg",
    type: "Stock In",
    quantity: 1000,
    date: "2026-06-02 04:45 PM",
    user: "Mike Johnson",
  },
  {
    id: "TXN-001231",
    product: "Sanitizer Gel 500ml",
    type: "Stock Out",
    quantity: 75,
    date: "2026-06-02 02:20 PM",
    user: "Emily Brown",
  },
  {
    id: "TXN-001230",
    product: "Insulin Vials",
    type: "Stock In",
    quantity: 200,
    date: "2026-06-02 11:00 AM",
    user: "John Doe",
  },
];

const lowStockAlerts = [
  { product: "Aspirin 100mg", current: 45, minimum: 100, category: "Pharmaceutical" },
  { product: "Surgical Masks", current: 120, minimum: 500, category: "PPE" },
  { product: "Organic Milk 1L", current: 28, minimum: 50, category: "Dairy" },
  { product: "Hand Sanitizer 250ml", current: 65, minimum: 200, category: "Hygiene" },
];

const expiryAlerts = [
  { product: "Amoxicillin 250mg", batch: "BAT-2401", expiry: "2026-06-15", days: 12 },
  { product: "Yogurt Strawberry", batch: "BAT-2402", expiry: "2026-06-08", days: 5 },
  { product: "Fresh Orange Juice", batch: "BAT-2403", expiry: "2026-06-05", days: 2 },
  { product: "Vitamin C Tablets", batch: "BAT-2404", expiry: "2026-06-20", days: 17 },
];

const topProducts = [
  { name: "Paracetamol 500mg", sku: "MED-002", movement: 1240, value: "$8,891" },
  { name: "Surgical Masks", sku: "PPE-001", movement: 980, value: "$14,690" },
  { name: "Organic Apple Juice 1L", sku: "BEV-001", movement: 740, value: "$4,063" },
  { name: "Hand Sanitizer 500ml", sku: "HYG-001", movement: 610, value: "$4,264" },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${kpi.bgColor} p-3 rounded-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <Badge
                    variant={kpi.trendUp ? "default" : "destructive"}
                    className="text-xs"
                  >
                    {kpi.trend}
                  </Badge>
                </div>
                <h3 className="text-2xl font-bold text-slate-800 mb-1">
                  {kpi.value}
                </h3>
                <p className="text-sm text-slate-500">{kpi.title}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Trend Chart */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Inventory Value Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={inventoryTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Stock In vs Stock Out Chart */}
        <Card className="border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">Stock In vs Stock Out</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stockMovementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip />
                <Legend />
                <Bar dataKey="stockIn" fill="#10b981" name="Stock In" />
                <Bar dataKey="stockOut" fill="#ef4444" name="Stock Out" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((txn) => (
                <TableRow key={txn.id}>
                  <TableCell className="font-mono text-sm">{txn.id}</TableCell>
                  <TableCell className="font-medium">{txn.product}</TableCell>
                  <TableCell>
                    <Badge
                      variant={txn.type === "Stock In" ? "default" : "secondary"}
                      className={
                        txn.type === "Stock In"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {txn.type === "Stock In" ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {txn.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{txn.quantity}</TableCell>
                  <TableCell className="text-sm text-slate-600">
                    {txn.date}
                  </TableCell>
                  <TableCell>{txn.user}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Alerts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Low Stock Alerts */}
        <Card className="border-none shadow-md border-l-4 border-l-amber-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {lowStockAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-amber-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-slate-800">{alert.product}</p>
                    <p className="text-sm text-slate-600">{alert.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-amber-700">
                      {alert.current} / {alert.minimum}
                    </p>
                    <p className="text-xs text-slate-500">Current / Min</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expiry Alerts */}
        <Card className="border-none shadow-md border-l-4 border-l-red-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-red-500" />
              Expiry Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {expiryAlerts.map((alert, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-red-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-slate-800">{alert.product}</p>
                    <p className="text-sm text-slate-600">Batch: {alert.batch}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-red-700">
                      {alert.days} days
                    </p>
                    <p className="text-xs text-slate-500">{alert.expiry}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-md border-l-4 border-l-emerald-500">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="w-5 h-5 text-emerald-500" />
              Top Products
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product) => (
                <div
                  key={product.sku}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-slate-800">{product.name}</p>
                    <p className="text-sm font-mono text-slate-500">{product.sku}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-emerald-700">
                      {product.movement} units
                    </p>
                    <p className="text-xs text-slate-500">{product.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
