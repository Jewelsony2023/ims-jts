import { Search, Filter, Download } from "lucide-react";
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
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const inventory = [
  {
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop",
    product: "Amoxicillin 500mg",
    sku: "MED-001",
    batch: "BAT-2401",
    quantity: 450,
    expiry: "2027-05-15",
    daysRemaining: 346,
    status: "Good",
  },
  {
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=100&h=100&fit=crop",
    product: "Paracetamol 500mg",
    sku: "MED-002",
    batch: "BAT-2402",
    quantity: 890,
    expiry: "2027-04-20",
    daysRemaining: 321,
    status: "Good",
  },
  {
    image: "https://images.unsplash.com/photo-1550572017-4814c5a3f8e4?w=100&h=100&fit=crop",
    product: "Insulin Vials",
    sku: "MED-003",
    batch: "BAT-2403",
    quantity: 180,
    expiry: "2027-03-10",
    daysRemaining: 280,
    status: "Good",
  },
  {
    image: "https://images.unsplash.com/photo-1582719366531-3f7e0eccd93a?w=100&h=100&fit=crop",
    product: "Surgical Masks",
    sku: "PPE-001",
    batch: "BAT-2404",
    quantity: 45,
    expiry: "2028-01-20",
    daysRemaining: 596,
    status: "Low Stock",
  },
  {
    image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=100&h=100&fit=crop",
    product: "Hand Sanitizer 500ml",
    sku: "HYG-001",
    batch: "BAT-2405",
    quantity: 320,
    expiry: "2026-12-15",
    daysRemaining: 195,
    status: "Good",
  },
  {
    image: "https://images.unsplash.com/photo-1571769267292-a9089022f7f6?w=100&h=100&fit=crop",
    product: "Vitamin C Tablets",
    sku: "VIT-001",
    batch: "BAT-2406",
    quantity: 12,
    expiry: "2026-06-20",
    daysRemaining: 17,
    status: "Expiring Soon",
  },
  {
    image: "https://images.unsplash.com/photo-1505575967455-8e8f83e8511f?w=100&h=100&fit=crop",
    product: "Organic Apple Juice",
    sku: "BEV-001",
    batch: "BAT-2407",
    quantity: 245,
    expiry: "2026-08-10",
    daysRemaining: 68,
    status: "Good",
  },
  {
    image: "",
    product: "Fresh Yogurt Strawberry",
    sku: "DAI-001",
    batch: "BAT-2408",
    quantity: 0,
    expiry: "2026-05-28",
    daysRemaining: -6,
    status: "Expired",
  },
  {
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop",
    product: "Aspirin 100mg",
    sku: "MED-004",
    batch: "BAT-2409",
    quantity: 35,
    expiry: "2027-02-15",
    daysRemaining: 257,
    status: "Low Stock",
  },
  {
    image: "",
    product: "Bandages Sterile",
    sku: "MED-005",
    batch: "BAT-2410",
    quantity: 520,
    expiry: "2028-06-30",
    daysRemaining: 757,
    status: "Good",
  },
];

export function Inventory() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Good":
        return <Badge className="bg-emerald-100 text-emerald-700">Good</Badge>;
      case "Low Stock":
        return <Badge className="bg-amber-100 text-amber-700">Low Stock</Badge>;
      case "Expiring Soon":
        return <Badge className="bg-orange-100 text-orange-700">Expiring Soon</Badge>;
      case "Expired":
        return <Badge className="bg-red-100 text-red-700">Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Inventory</h1>
          <p className="text-slate-600 mt-1">
            Current stock levels and batch information
          </p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-slate-600 mb-1">Total Items</p>
            <h3 className="text-3xl font-bold text-slate-800">
              {inventory.length}
            </h3>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-slate-600 mb-1">Good Status</p>
            <h3 className="text-3xl font-bold text-emerald-600">
              {inventory.filter((i) => i.status === "Good").length}
            </h3>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-slate-600 mb-1">Low Stock</p>
            <h3 className="text-3xl font-bold text-amber-600">
              {inventory.filter((i) => i.status === "Low Stock").length}
            </h3>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-slate-600 mb-1">Expiring Soon</p>
            <h3 className="text-3xl font-bold text-orange-600">
              {inventory.filter((i) => i.status === "Expiring Soon").length}
            </h3>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <p className="text-sm text-slate-600 mb-1">Expired</p>
            <h3 className="text-3xl font-bold text-red-600">
              {inventory.filter((i) => i.status === "Expired").length}
            </h3>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search by product name, SKU, or batch..."
            className="pl-10 bg-white"
          />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[200px] bg-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="low">Low Stock</SelectItem>
            <SelectItem value="expiring">Expiring Soon</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Inventory Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Current Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Batch Number</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Days Remaining</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={item.image || "missing-product-image"}
                        alt={item.product}
                        className="h-10 w-10 rounded-lg object-cover bg-slate-100"
                      />
                      <div>
                        <p className="font-medium">{item.product}</p>
                        {!item.image && (
                          <p className="text-xs text-slate-500">Placeholder</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                  <TableCell className="font-mono text-sm">{item.batch}</TableCell>
                  <TableCell>
                    <span
                      className={
                        item.quantity < 50
                          ? "font-semibold text-red-600"
                          : "text-slate-800"
                      }
                    >
                      {item.quantity}
                    </span>
                  </TableCell>
                  <TableCell>{item.expiry}</TableCell>
                  <TableCell>
                    <span
                      className={
                        item.daysRemaining < 0
                          ? "font-semibold text-red-600"
                          : item.daysRemaining < 30
                          ? "font-semibold text-orange-600"
                          : "text-slate-800"
                      }
                    >
                      {item.daysRemaining < 0
                        ? `${Math.abs(item.daysRemaining)} days ago`
                        : `${item.daysRemaining} days`}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(item.status)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
