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

interface StockOutRow {
  id: number;
  product: string;
  batch: string;
  availableQuantity: number;
  batchCostPrice: number;
  batchSellingPrice: number;
  transactionSellingPrice: string;
  quantityToIssue: string;
}

const batchOptions = [
  { product: "Paracetamol 500mg", batch: "BAT-2402", available: 890, costPrice: 45, sellingPrice: 55 },
  { product: "Vitamin C Tablets", batch: "BAT-2406", available: 12, costPrice: 52, sellingPrice: 55 },
  { product: "Surgical Masks", batch: "BAT-2404", available: 45, costPrice: 8.5, sellingPrice: 14.99 },
  { product: "Hand Sanitizer 500ml", batch: "BAT-2405", available: 320, costPrice: 3.25, sellingPrice: 6.99 },
];

const createRow = (id: number): StockOutRow => ({
  id,
  product: "",
  batch: "",
  availableQuantity: 0,
  batchCostPrice: 0,
  batchSellingPrice: 0,
  transactionSellingPrice: "",
  quantityToIssue: "",
});

export function StockOut() {
  const [rows, setRows] = useState<StockOutRow[]>([createRow(1), createRow(2)]);

  const updateRow = (id: number, key: keyof StockOutRow, value: string | number) => {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [key]: value } : row)),
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">Stock Out</h1>
        <p className="mt-1 text-slate-600">
          Issue multiple products in one controlled stock-out transaction.
        </p>
      </div>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Issue Transaction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="issuedTo">Issued To</Label>
              <Input id="issuedTo" placeholder="Recipient, shop, or department" className="bg-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input id="issueDate" type="date" className="bg-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference">Reference Number</Label>
              <Input id="reference" placeholder="Invoice or transfer reference" className="bg-white" />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[220px]">Product</TableHead>
                  <TableHead className="min-w-[180px]">Batch</TableHead>
                  <TableHead className="min-w-[150px]">Available Quantity</TableHead>
                  <TableHead className="min-w-[140px]">Batch Cost Price</TableHead>
                  <TableHead className="min-w-[150px]">Batch Selling Price</TableHead>
                  <TableHead className="min-w-[170px]">Final Selling Price</TableHead>
                  <TableHead className="min-w-[170px]">Quantity To Issue</TableHead>
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
                          {[...new Set(batchOptions.map((item) => item.product))].map((product) => (
                            <SelectItem key={product} value={product}>{product}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={row.batch}
                        onValueChange={(value) => {
                          const selected = batchOptions.find((item) => item.batch === value);
                          updateRow(row.id, "batch", value);
                          updateRow(row.id, "availableQuantity", selected?.available ?? 0);
                          updateRow(row.id, "batchCostPrice", selected?.costPrice ?? 0);
                          updateRow(row.id, "batchSellingPrice", selected?.sellingPrice ?? 0);
                          updateRow(row.id, "transactionSellingPrice", String(selected?.sellingPrice ?? ""));
                        }}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select batch" />
                        </SelectTrigger>
                        <SelectContent>
                          {batchOptions
                            .filter((item) => !row.product || item.product === row.product)
                            .map((item) => (
                              <SelectItem key={item.batch} value={item.batch}>{item.batch}</SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell className="font-semibold text-slate-800">
                      {row.availableQuantity.toLocaleString()}
                    </TableCell>
                    <TableCell className="font-semibold text-slate-800">₹{row.batchCostPrice.toFixed(2)}</TableCell>
                    <TableCell className="font-semibold text-slate-800">₹{row.batchSellingPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <Input type="number" step="0.01" value={row.transactionSellingPrice} onChange={(event) => updateRow(row.id, "transactionSellingPrice", event.target.value)} className="bg-white" />
                    </TableCell>
                    <TableCell>
                      <Input type="number" value={row.quantityToIssue} onChange={(event) => updateRow(row.id, "quantityToIssue", event.target.value)} className="bg-white" />
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
            <Button className="bg-orange-500 hover:bg-orange-600">
              <Save className="h-4 w-4" />
              Submit Transaction
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
