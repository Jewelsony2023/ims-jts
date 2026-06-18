import { useEffect, useMemo, useState } from "react";
import { Search, Filter, Download } from "lucide-react";
import api from "../../lib/api";
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

type InventoryItem = {
  productBatchId: number;
  product: string;
  productImageUrl: string;
  sku: string;
  batch: string;
  quantity: number;
  costPrice: number;
  expiry: string;
  daysRemaining: number;
  status: string;
};

export function Inventory() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await api.get<InventoryItem[]>(
        `${import.meta.env.VITE_API_URL}/api/stocktransactions/inventory`,
      );
      setInventory(response.data);
    };

    fetchInventory().catch((error) => {
      console.error(error);
    });
  }, []);

  const inventoryValue = inventory.reduce(
    (total, item) => total + item.quantity * item.costPrice,
    0,
  );

  const filteredInventory = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return inventory.filter((item) => {
      const matchesSearch =
        !normalizedSearch ||
        item.product.toLowerCase().includes(normalizedSearch) ||
        item.sku.toLowerCase().includes(normalizedSearch) ||
        item.batch.toLowerCase().includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [inventory, searchTerm, statusFilter]);

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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
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
            <p className="text-sm text-slate-600 mb-1">Inventory Value</p>
            <h3 className="text-3xl font-bold text-emerald-600">₹{inventoryValue.toLocaleString()}</h3>
            <p className="mt-1 text-xs text-slate-500">Qty x batch cost</p>
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
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[200px] bg-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Good">Good</SelectItem>
            <SelectItem value="Low Stock">Low Stock</SelectItem>
            <SelectItem value="Expiring Soon">Expiring Soon</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
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
                <TableHead className="hidden md:table-cell">SKU</TableHead>
                <TableHead className="hidden md:table-cell">Batch Number</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead className="hidden md:table-cell">Batch Cost Price</TableHead>
                <TableHead className="hidden md:table-cell">Batch Value</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Days Remaining</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
          <TableBody>
              {filteredInventory.map((item) => (
                <TableRow key={item.productBatchId}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={item.productImageUrl || "missing-product-image"}
                        alt={item.product}
                        className="h-10 w-10 rounded-lg object-cover bg-slate-100"
                      />
                      <div>
                        <p className="font-medium">{item.product}</p>
                        {!item.productImageUrl && (
                          <p className="text-xs text-slate-500">Placeholder</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm hidden md:table-cell">{item.sku}</TableCell>
                  <TableCell className="font-mono text-sm hidden md:table-cell">{item.batch}</TableCell>
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
                  <TableCell className="hidden md:table-cell">₹{item.costPrice.toFixed(2)}</TableCell>
                  <TableCell className="font-semibold hidden md:table-cell">
                    ₹{(item.quantity * item.costPrice).toLocaleString()}
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
