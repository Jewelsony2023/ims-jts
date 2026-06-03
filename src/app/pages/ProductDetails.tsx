import { useParams, Link } from "react-router";
import { ArrowLeft, Package, DollarSign, Calendar, TrendingUp, TrendingDown, ImageIcon } from "lucide-react";
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
import { Separator } from "../components/ui/separator";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const batchHistory = [
  { batch: "BAT-2401", mfg: "2025-05-15", quantity: 280, received: "2026-05-15", expiry: "2027-05-15", status: "Active" },
  { batch: "BAT-2402", mfg: "2025-04-20", quantity: 115, received: "2026-04-20", expiry: "2027-04-20", status: "Active" },
  { batch: "BAT-2403", mfg: "2025-03-10", quantity: 55, received: "2026-03-10", expiry: "2027-03-10", status: "Active" },
  { batch: "BAT-2404", mfg: "2025-02-05", quantity: 0, received: "2026-02-05", expiry: "2026-05-28", status: "Expired" },
  { batch: "BAT-2405", mfg: "2025-06-01", quantity: 42, received: "2026-06-01", expiry: "2026-06-15", status: "Near Expiry" },
];

const gallery = [
  "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=400&h=400&fit=crop",
  "",
];

const stockMovements = [
  {
    date: "2026-06-03",
    type: "Stock In",
    batch: "BAT-2401",
    quantity: 500,
    reference: "PO-2401",
    user: "John Doe",
  },
  {
    date: "2026-06-02",
    type: "Stock Out",
    batch: "BAT-2402",
    quantity: 120,
    reference: "INV-5432",
    user: "Sarah Smith",
  },
  {
    date: "2026-06-01",
    type: "Stock In",
    batch: "BAT-2403",
    quantity: 300,
    reference: "PO-2398",
    user: "John Doe",
  },
  {
    date: "2026-05-30",
    type: "Stock Out",
    batch: "BAT-2402",
    quantity: 80,
    reference: "INV-5421",
    user: "Mike Johnson",
  },
];

export function ProductDetails() {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link to="/products">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Button>
      </Link>

      {/* Product Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Product Image & Basic Info */}
        <Card className="border-none shadow-md lg:col-span-1">
          <CardContent className="p-6">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop"
              alt="Product"
              className="w-full h-64 object-cover rounded-lg mb-4 bg-slate-100"
            />
            <div className="mb-4 grid grid-cols-3 gap-3">
              {gallery.map((image, index) => (
                <div key={index} className="h-20 rounded-lg border border-slate-200 bg-slate-50 overflow-hidden">
                  {image ? (
                    <ImageWithFallback
                      src={image}
                      alt={`Product gallery ${index + 1}`}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <ImageIcon className="h-6 w-6 text-slate-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">
              Amoxicillin 500mg
            </h2>
            <Badge className="bg-emerald-100 text-emerald-700 mb-4">
              In Stock
            </Badge>
            <Separator className="my-4" />
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-600">SKU:</span>
                <span className="font-mono font-semibold">MED-001</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Category:</span>
                <span className="font-semibold">Antibiotics</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Barcode:</span>
                <span className="font-mono">8901234567890</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-slate-600">Cost Price:</span>
                <span className="font-semibold">$12.50</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Selling Price:</span>
                <span className="font-semibold text-emerald-600 text-lg">
                  $18.99
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Current Stock:</span>
                <span className="font-semibold">450 units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Reorder Level:</span>
                <span className="font-semibold text-amber-600">100 units</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Profit Margin:</span>
                <span className="font-semibold text-emerald-600">34.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Statistics & Barcode */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="bg-blue-500 p-3 rounded-lg">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">450</h3>
                <p className="text-sm text-slate-500">Current Stock</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="bg-emerald-500 p-3 rounded-lg">
                    <DollarSign className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">$8,545</h3>
                <p className="text-sm text-slate-500">Total Value</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="bg-purple-500 p-3 rounded-lg">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-slate-800">4</h3>
                <p className="text-sm text-slate-500">Active Batches</p>
              </CardContent>
            </Card>
          </div>

          {/* Barcode Display */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Barcode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white p-6 rounded-lg border-2 border-dashed border-slate-300 flex flex-col items-center">
                <svg className="w-64 h-24 mb-2">
                  <rect x="0" width="2" height="96" fill="black" />
                  <rect x="4" width="1" height="96" fill="black" />
                  <rect x="8" width="3" height="96" fill="black" />
                  <rect x="14" width="1" height="96" fill="black" />
                  <rect x="18" width="2" height="96" fill="black" />
                  <rect x="24" width="1" height="96" fill="black" />
                  <rect x="28" width="3" height="96" fill="black" />
                  <rect x="34" width="2" height="96" fill="black" />
                  <rect x="40" width="1" height="96" fill="black" />
                  <rect x="44" width="2" height="96" fill="black" />
                  <rect x="50" width="3" height="96" fill="black" />
                  <rect x="56" width="1" height="96" fill="black" />
                  <rect x="60" width="2" height="96" fill="black" />
                  <rect x="66" width="1" height="96" fill="black" />
                  <rect x="70" width="3" height="96" fill="black" />
                  <rect x="76" width="2" height="96" fill="black" />
                </svg>
                <p className="font-mono text-lg font-semibold">8901234567890</p>
              </div>
            </CardContent>
          </Card>

          {/* Supplier Information */}
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Supplier Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-slate-600 mb-1">Supplier Name</p>
                  <p className="font-semibold">MediPharm Solutions Ltd.</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Contact Person</p>
                  <p className="font-semibold">Robert Williams</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Email</p>
                  <p className="font-semibold">robert@medipharm.com</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600 mb-1">Phone</p>
                  <p className="font-semibold">+1 (555) 123-4567</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Batch History */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Batch History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch Number</TableHead>
                <TableHead>Manufacturing Date</TableHead>
                <TableHead>Quantity Available</TableHead>
                <TableHead>Received Date</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batchHistory.map((batch) => (
                <TableRow key={batch.batch}>
                  <TableCell className="font-mono font-semibold">
                    {batch.batch}
                  </TableCell>
                  <TableCell>{batch.mfg}</TableCell>
                  <TableCell className="font-semibold">{batch.quantity}</TableCell>
                  <TableCell>{batch.received}</TableCell>
                  <TableCell>{batch.expiry}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        batch.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : batch.status === "Expired"
                          ? "bg-red-100 text-red-700"
                          : "bg-orange-100 text-orange-700"
                      }
                    >
                      {batch.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Stock Movement History */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Stock Movement History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>User</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stockMovements.map((movement, index) => (
                <TableRow key={index}>
                  <TableCell>{movement.date}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        movement.type === "Stock In"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-red-100 text-red-700"
                      }
                    >
                      {movement.type === "Stock In" ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      )}
                      {movement.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{movement.batch}</TableCell>
                  <TableCell>{movement.quantity}</TableCell>
                  <TableCell className="font-mono">{movement.reference}</TableCell>
                  <TableCell>{movement.user}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
