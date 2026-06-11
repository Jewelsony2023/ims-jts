import { useEffect, useState } from "react";
import { Plus, Save, Trash2 } from "lucide-react";
import axios from "axios";
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
  productId: number;
  productBatchId: number;
  product: string;
  batch: string;
  availableQuantity: number;
  batchCostPrice: number;
  batchSellingPrice: number;
  transactionSellingPrice: string;
  quantityToIssue: string;
}

type ProductBatchOption = {
  productBatchId: number;
  productId: number;
  productName: string;
  productImageUrl: string;
  sku: string;
  batchNumber: string;
  quantityAvailable: number;
  costPrice: number;
  sellingPrice: number;
  expiryDate: string;
  supplierId: number;
  supplierName: string;
};

const createRow = (id: number): StockOutRow => ({
  id,
  productId: 0,
  productBatchId: 0,
  product: "",
  batch: "",
  availableQuantity: 0,
  batchCostPrice: 0,
  batchSellingPrice: 0,
  transactionSellingPrice: "",
  quantityToIssue: ""
});

export function StockOut() {
  const [rows, setRows] = useState<StockOutRow[]>([createRow(1), createRow(2)]);
  const [batchOptions, setBatchOptions] = useState<ProductBatchOption[]>([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchBatchData = async () => {
      const response = await axios.get<ProductBatchOption[]>(
        `${import.meta.env.VITE_API_URL}/api/products/batches`,
      );
      setBatchOptions(response.data);
    };
    fetchBatchData().catch(console.error);
  }, []);

  const updateRow = (id: number, key: keyof StockOutRow, value: string | number) => {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [key]: value } : row)),
    );
  };

  const handleSubmit = async () => {
    for (const row of rows) {
      if (
        Number(row.quantityToIssue) >
        row.availableQuantity
      ) {
        setIsError(true);

        setMessage(
          `Cannot issue more than available stock for ${row.product}`
        );

        return;
      }
    }
    const requestData = {
      ReferenceNumber: (document.getElementById("reference") as HTMLInputElement)?.value || undefined,
      IssuedTo: (document.getElementById("issuedTo") as HTMLInputElement)?.value || undefined,
      Items: rows
        .filter(row => row.productBatchId > 0 && row.quantityToIssue)
        .map(row => ({
          ProductId: row.productId,
          ProductBatchId: row.productBatchId,
          Quantity: parseInt(row.quantityToIssue) || 0,
          SellingPrice: parseFloat(row.transactionSellingPrice) || row.batchSellingPrice
        }))
    };

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/stocktransactions/stock-out`,
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsError(false);

      setMessage(
        "Stock Out completed successfully."
      );

      console.log(response.data);

    } catch (error: any) {

      console.error(error);

      setIsError(true);

      setMessage(
        error?.response?.data?.message ??
        "Stock Out failed."
      );
    }
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
          {message && (
            <div
              className={`rounded-md p-3 text-sm font-medium ${
                isError
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : "bg-green-100 text-green-700 border border-green-300"
              }`}
            >
              {message}
            </div>
          )}
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
                      <Select value={row.product} onValueChange={(value) => {
                        const selected = batchOptions.find((item) => item.productName === value);
                        updateRow(row.id, "product", value);
                        updateRow(row.id, "productBatchId", selected?.productBatchId ?? 0);
                        updateRow(row.id, "batch", selected?.batchNumber ?? "");
                        updateRow(row.id, "availableQuantity", selected?.quantityAvailable ?? 0);
                        updateRow(row.id, "batchCostPrice", selected?.costPrice ?? 0);
                        updateRow(row.id, "batchSellingPrice", selected?.sellingPrice ?? 0);
                        updateRow(row.id, "transactionSellingPrice", String(selected?.sellingPrice ?? ""));
                        updateRow(row.id, "productId", selected?.productId ?? 0);
                      }}>
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...new Set(batchOptions.map((item) => item.productName))].map((product) => (
                            <SelectItem key={product} value={product}>{product}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select
                        value={
                          row.productBatchId
                            ? row.productBatchId.toString()
                            : ""
                        }
                        onValueChange={(value) => {
                          const selected = batchOptions.find(
                            (item) => item.productBatchId === parseInt(value)
                          );

                          updateRow(row.id, "batch", selected?.batchNumber ?? "");
                          updateRow(row.id, "productBatchId", selected?.productBatchId ?? 0);
                          updateRow(row.id, "availableQuantity", selected?.quantityAvailable ?? 0);
                          updateRow(row.id, "batchCostPrice", selected?.costPrice ?? 0);
                          updateRow(row.id, "batchSellingPrice", selected?.sellingPrice ?? 0);
                          updateRow(
                            row.id,
                            "transactionSellingPrice",
                            String(selected?.sellingPrice ?? "")
                          );
                          updateRow(row.id, "productId", selected?.productId ?? 0);
                        }}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select batch" />
                        </SelectTrigger>
                        <SelectContent>
                          {batchOptions
                            .filter((item) => !row.product || item.productName === row.product)
                            .map((item) => (
                              <SelectItem
                                key={item.productBatchId}
                                value={item.productBatchId.toString()}
                              >
                                {item.batchNumber}
                              </SelectItem>
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
            <Button className="bg-orange-500 hover:bg-orange-600" onClick={handleSubmit}>
              <Save className="h-4 w-4" />
              Submit Transaction
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}