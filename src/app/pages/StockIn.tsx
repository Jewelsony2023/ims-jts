import { Save, ImageIcon } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function StockIn() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Stock In</h1>
        <p className="text-slate-600 mt-1">
          Record incoming inventory and update stock levels
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock In Form */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">New Stock Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=160&h=160&fit=crop"
                  alt="Selected product"
                  className="h-20 w-20 rounded-lg object-cover bg-white"
                />
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">Product image preview</p>
                  <p className="text-sm text-slate-500">
                    Preview updates after product selection or barcode scan.
                  </p>
                </div>
                <div className="hidden h-10 w-10 items-center justify-center rounded-lg bg-white md:flex">
                  <ImageIcon className="h-5 w-5 text-slate-400" />
                </div>
              </div>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="product">Product</Label>
                    <Select>
                      <SelectTrigger id="product">
                        <SelectValue placeholder="Select product" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Amoxicillin 500mg</SelectItem>
                        <SelectItem value="2">Paracetamol 500mg</SelectItem>
                        <SelectItem value="3">Insulin Vials</SelectItem>
                        <SelectItem value="4">Surgical Masks</SelectItem>
                        <SelectItem value="5">Hand Sanitizer 500ml</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supplier">Supplier</Label>
                    <Select>
                      <SelectTrigger id="supplier">
                        <SelectValue placeholder="Select supplier" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">MediPharm Solutions Ltd.</SelectItem>
                        <SelectItem value="2">HealthCare Distributors Inc.</SelectItem>
                        <SelectItem value="3">Global Medical Supplies</SelectItem>
                        <SelectItem value="4">FreshFood Wholesalers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="batch">Batch Number</Label>
                    <Input
                      id="batch"
                      placeholder="Enter batch number"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Enter quantity"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="manufacturing">Manufacturing Date</Label>
                    <Input
                      id="manufacturing"
                      type="date"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      type="date"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost Price (per unit)</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="selling">Selling Price (per unit)</Label>
                    <Input
                      id="selling"
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="invoice">Invoice Number</Label>
                    <Input
                      id="invoice"
                      placeholder="Enter invoice number"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="po">Purchase Order</Label>
                    <Input
                      id="po"
                      placeholder="Enter PO number"
                      className="bg-white"
                    />
                  </div>
                </div>

                <div className="flex gap-3 justify-end pt-4">
                  <Button type="button" variant="outline">
                    Clear Form
                  </Button>
                  <Button
                    type="submit"
                    className="bg-emerald-500 hover:bg-emerald-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Confirm Stock In
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Recent Stock In Entries */}
        <div className="lg:col-span-1">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Recent Entries</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    product: "Amoxicillin 500mg",
                    quantity: 500,
                    date: "2026-06-03",
                    batch: "BAT-2401",
                  },
                  {
                    product: "Paracetamol 500mg",
                    quantity: 1000,
                    date: "2026-06-02",
                    batch: "BAT-2402",
                  },
                  {
                    product: "Insulin Vials",
                    quantity: 200,
                    date: "2026-06-02",
                    batch: "BAT-2403",
                  },
                  {
                    product: "Surgical Masks",
                    quantity: 5000,
                    date: "2026-06-01",
                    batch: "BAT-2404",
                  },
                  {
                    product: "Hand Sanitizer",
                    quantity: 300,
                    date: "2026-05-31",
                    batch: "BAT-2405",
                  },
                ].map((entry, index) => (
                  <div
                    key={index}
                    className="p-4 bg-emerald-50 rounded-lg border border-emerald-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-slate-800 text-sm">
                        {entry.product}
                      </h4>
                      <span className="text-xs font-mono text-slate-600">
                        {entry.batch}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-600">{entry.date}</span>
                      <span className="font-semibold text-emerald-700">
                        +{entry.quantity}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
