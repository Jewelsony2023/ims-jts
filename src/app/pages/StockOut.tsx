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

export function StockOut() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Stock Out</h1>
        <p className="text-slate-600 mt-1">
          Issue inventory and update stock levels
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stock Out Form */}
        <div className="lg:col-span-2">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Stock Issuance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 flex items-center gap-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1505575967455-8e8f83e8511f?w=160&h=160&fit=crop"
                  alt="Selected product"
                  className="h-20 w-20 rounded-lg object-cover bg-white"
                />
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">Product image preview</p>
                  <p className="text-sm text-slate-500">
                    Confirms the selected product before batch issue.
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
                    <Label htmlFor="batch">Batch Number</Label>
                    <Select>
                      <SelectTrigger id="batch">
                        <SelectValue placeholder="Select batch" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">BAT-2401 (Exp: 2027-05-15)</SelectItem>
                        <SelectItem value="2">BAT-2402 (Exp: 2027-04-20)</SelectItem>
                        <SelectItem value="3">BAT-2403 (Exp: 2027-03-10)</SelectItem>
                        <SelectItem value="4">BAT-2404 (Exp: 2026-06-15)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="md:col-span-2 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Available Quantity:</p>
                        <p className="text-xl font-bold text-slate-800">450 units</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Expiry Date:</p>
                        <p className="text-xl font-bold text-slate-800">2027-05-15</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity to Issue</Label>
                    <Input
                      id="quantity"
                      type="number"
                      placeholder="Enter quantity"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reason">Reason</Label>
                    <Select>
                      <SelectTrigger id="reason">
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sale">Sale</SelectItem>
                        <SelectItem value="transfer">Transfer</SelectItem>
                        <SelectItem value="damage">Damage/Wastage</SelectItem>
                        <SelectItem value="sample">Sample</SelectItem>
                        <SelectItem value="return">Return</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="issuedTo">Issued To</Label>
                    <Input
                      id="issuedTo"
                      placeholder="Enter recipient name"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department/Location</Label>
                    <Input
                      id="department"
                      placeholder="Enter department"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="reference">Reference Number</Label>
                    <Input
                      id="reference"
                      placeholder="Invoice/Receipt number"
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="date">Issue Date</Label>
                    <Input
                      id="date"
                      type="date"
                      className="bg-white"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="notes">Notes (Optional)</Label>
                    <Input
                      id="notes"
                      placeholder="Add any additional notes"
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
                    className="bg-red-500 hover:bg-red-600"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Confirm Stock Out
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Recent Stock Out Entries */}
        <div className="lg:col-span-1">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">Recent Issuances</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    product: "Organic Apple Juice",
                    quantity: 120,
                    date: "2026-06-03",
                    issuedTo: "Retail Store A",
                  },
                  {
                    product: "Surgical Masks",
                    quantity: 75,
                    date: "2026-06-02",
                    issuedTo: "Hospital Ward B",
                  },
                  {
                    product: "Hand Sanitizer",
                    quantity: 50,
                    date: "2026-06-02",
                    issuedTo: "Office Department",
                  },
                  {
                    product: "Paracetamol 500mg",
                    quantity: 200,
                    date: "2026-06-01",
                    issuedTo: "Pharmacy Counter",
                  },
                  {
                    product: "Vitamin C Tablets",
                    quantity: 80,
                    date: "2026-05-31",
                    issuedTo: "Wellness Center",
                  },
                ].map((entry, index) => (
                  <div
                    key={index}
                    className="p-4 bg-red-50 rounded-lg border border-red-100"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-slate-800 text-sm">
                        {entry.product}
                      </h4>
                      <span className="font-semibold text-red-700">
                        -{entry.quantity}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1 text-xs text-slate-600">
                      <span>{entry.issuedTo}</span>
                      <span>{entry.date}</span>
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
