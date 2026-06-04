import { useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

interface StockInRow {
  id: number;
  product: string;
  batchNumber: string;
  manufactureDate: string;
  expiryDate: string;
  quantity: string;
  costPrice: string;
  sellingPrice: string;
  supplier: string;
}

const products = ["Paracetamol 500mg", "Vitamin C Tablets", "Aspirin 100mg", "Surgical Masks", "Insulin Vials"];
const suppliers = ["MediPharm Solutions Ltd.", "HealthCare Distributors Inc.", "Global Medical Supplies", "FreshFood Wholesalers"];

const createRow = (id: number): StockInRow => ({
  id,
  product: "",
  batchNumber: "",
  manufactureDate: "",
  expiryDate: "",
  quantity: "",
  costPrice: "",
  sellingPrice: "",
  supplier: "",
});

export function StockIn() {
  const [rows, setRows] = useState<StockInRow[]>([createRow(1), createRow(2)]);

  const updateRow = (id: number, key: keyof StockInRow, value: string) => {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [key]: value } : row)),
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Stock In</h1>
        <p className="mt-1 text-slate-600">
          Record one inbound transaction with multiple products, batches, and suppliers.
        </p>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Inbound Transaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="invoice">Invoice Number</Label>
              <Input id="invoice" defaultValue="INV001" className="bg-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="receivedDate">Received Date</Label>
              <Input id="receivedDate" type="date" className="bg-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchaseOrder">Purchase Order</Label>
              <Input id="purchaseOrder" placeholder="PO reference" className="bg-white" />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[190px]">Product</TableHead>
                  <TableHead className="min-w-[140px]">Batch Number</TableHead>
                  <TableHead className="min-w-[150px]">Manufacture Date</TableHead>
                  <TableHead className="min-w-[150px]">Expiry Date</TableHead>
                  <TableHead className="min-w-[120px]">Quantity</TableHead>
                  <TableHead className="min-w-[130px]">Cost Price</TableHead>
                  <TableHead className="min-w-[130px]">Selling Price</TableHead>
                  <TableHead className="min-w-[210px]">Supplier</TableHead>
                  <TableHead className="w-12" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>
                      <Select value={row.product} onValueChange={(value) => updateRow(row.id, "product", value)}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product} value={product}>{product}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Input value={row.batchNumber} onChange={(event) => updateRow(row.id, "batchNumber", event.target.value)} className="bg-white" />
                    </TableCell>
                    <TableCell>
                      <Input type="date" value={row.manufactureDate} onChange={(event) => updateRow(row.id, "manufactureDate", event.target.value)} className="bg-white" />
                    </TableCell>
                    <TableCell>
                      <Input type="date" value={row.expiryDate} onChange={(event) => updateRow(row.id, "expiryDate", event.target.value)} className="bg-white" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" value={row.quantity} onChange={(event) => updateRow(row.id, "quantity", event.target.value)} className="bg-white" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" step="0.01" value={row.costPrice} onChange={(event) => updateRow(row.id, "costPrice", event.target.value)} className="bg-white" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" step="0.01" value={row.sellingPrice} onChange={(event) => updateRow(row.id, "sellingPrice", event.target.value)} className="bg-white" />
                    </TableCell>
                    <TableCell>
                      <Select value={row.supplier} onValueChange={(value) => updateRow(row.id, "supplier", value)}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                          {suppliers.map((supplier) => (
                            <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))}>
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <Button variant="outline" className="bg-white" onClick={() => setRows((current) => [...current, createRow(Date.now())])}>
              <Plus className="h-4 w-4" />
              Add Row
            </Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <Save className="h-4 w-4" />
              Submit Transaction
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
