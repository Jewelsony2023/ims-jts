import { Plus, Eye, FileText } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

const purchaseOrders = [
  {
    id: "PO-2401",
    supplier: "MediPharm Solutions Ltd.",
    date: "2026-06-01",
    items: 12,
    totalAmount: 15420.0,
    status: "Completed",
    deliveryDate: "2026-06-05",
    contact: "Robert Williams",
    lines: ["Amoxicillin 500mg x 500", "Paracetamol 500mg x 1000", "Insulin Vials x 200"],
  },
  {
    id: "PO-2402",
    supplier: "HealthCare Distributors Inc.",
    date: "2026-06-02",
    items: 8,
    totalAmount: 8950.0,
    status: "Pending",
    deliveryDate: "2026-06-08",
    contact: "Sarah Johnson",
    lines: ["Surgical Masks x 5000", "Hand Sanitizer 500ml x 300"],
  },
  {
    id: "PO-2403",
    supplier: "Global Medical Supplies",
    date: "2026-06-02",
    items: 15,
    totalAmount: 22340.0,
    status: "In Transit",
    deliveryDate: "2026-06-10",
    contact: "Michael Chen",
    lines: ["Bandages Sterile x 800", "Diagnostic Kits x 120"],
  },
  {
    id: "PO-2404",
    supplier: "FreshFood Wholesalers",
    date: "2026-06-03",
    items: 20,
    totalAmount: 12780.0,
    status: "Pending",
    deliveryDate: "2026-06-06",
    contact: "Emma Davis",
    lines: ["Organic Apple Juice 1L x 240", "Fresh Yogurt Strawberry x 400"],
  },
  {
    id: "PO-2405",
    supplier: "PPE Direct Suppliers",
    date: "2026-05-28",
    items: 10,
    totalAmount: 6540.0,
    status: "Completed",
    deliveryDate: "2026-06-01",
    contact: "Lisa Anderson",
    lines: ["Nitrile Gloves x 2000", "Surgical Masks x 5000"],
  },
  {
    id: "PO-2406",
    supplier: "BioTech Pharmaceuticals",
    date: "2026-05-25",
    items: 6,
    totalAmount: 18920.0,
    status: "Cancelled",
    deliveryDate: "2026-05-30",
    contact: "David Lee",
    lines: ["Cold Chain Containers x 12", "Insulin Vials x 100"],
  },
];

export function PurchaseOrders() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Completed":
        return <Badge className="bg-emerald-100 text-emerald-700">Completed</Badge>;
      case "Pending":
        return <Badge className="bg-amber-100 text-amber-700">Pending</Badge>;
      case "In Transit":
        return <Badge className="bg-blue-100 text-blue-700">In Transit</Badge>;
      case "Cancelled":
        return <Badge className="bg-red-100 text-red-700">Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Purchase Orders</h1>
          <p className="text-slate-600 mt-1">
            Manage and track purchase orders from suppliers
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <Plus className="w-4 h-4 mr-2" />
              Create Purchase Order
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create Purchase Order</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Supplier</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select supplier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="medipharm">MediPharm Solutions Ltd.</SelectItem>
                    <SelectItem value="freshfood">FreshFood Wholesalers</SelectItem>
                    <SelectItem value="ppe">PPE Direct Suppliers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Expected Delivery</Label>
                <Input type="date" className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label>Product</Label>
                <Input placeholder="Search or scan SKU" className="bg-white" />
              </div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input type="number" placeholder="0" className="bg-white" />
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">Draft total</span>
                <span className="text-xl font-bold text-emerald-600">$0.00</span>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button variant="outline">Save Draft</Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600">Create PO</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Orders</p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {purchaseOrders.length}
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
                <p className="text-sm text-slate-600 mb-1">Pending</p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {purchaseOrders.filter((po) => po.status === "Pending").length}
                </h3>
              </div>
              <div className="bg-amber-500 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Completed</p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {purchaseOrders.filter((po) => po.status === "Completed").length}
                </h3>
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
                <p className="text-sm text-slate-600 mb-1">Total Value</p>
                <h3 className="text-3xl font-bold text-slate-800">$84.9K</h3>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Purchase Orders Table */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_360px] gap-6">
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">All Purchase Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>PO Number</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total Amount</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchaseOrders.map((po) => (
                <TableRow key={po.id}>
                  <TableCell className="font-mono font-semibold">{po.id}</TableCell>
                  <TableCell className="font-medium">{po.supplier}</TableCell>
                  <TableCell>{po.date}</TableCell>
                  <TableCell>{po.items}</TableCell>
                  <TableCell className="font-semibold">
                    ${po.totalAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>{po.deliveryDate}</TableCell>
                  <TableCell>{getStatusBadge(po.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <FileText className="w-4 h-4 text-slate-600" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Order Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-slate-50 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-mono font-semibold text-slate-800">{purchaseOrders[2].id}</p>
                <p className="text-sm text-slate-500">{purchaseOrders[2].supplier}</p>
              </div>
              {getStatusBadge(purchaseOrders[2].status)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-slate-500">Supplier Contact</p>
              <p className="font-semibold text-slate-800">{purchaseOrders[2].contact}</p>
            </div>
            <div>
              <p className="text-slate-500">Delivery Date</p>
              <p className="font-semibold text-slate-800">{purchaseOrders[2].deliveryDate}</p>
            </div>
            <div>
              <p className="text-slate-500">Items</p>
              <p className="font-semibold text-slate-800">{purchaseOrders[2].items}</p>
            </div>
            <div>
              <p className="text-slate-500">Total</p>
              <p className="font-semibold text-emerald-600">${purchaseOrders[2].totalAmount.toLocaleString()}</p>
            </div>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-slate-800">Order Lines</p>
            {purchaseOrders[2].lines.map((line) => (
              <div key={line} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                {line}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
