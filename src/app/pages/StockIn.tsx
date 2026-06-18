import { useEffect, useState } from "react";
import { Plus, Save, Trash2, History } from "lucide-react";
import api from "../../lib/api";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
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
import { Badge } from "../components/ui/badge";

type StockActivity = {
  createdAt: string;
  transactionType: string;
  productName: string;
  batchNumber: string;
  quantity: number;
  userName: string;
  reference: string;
  supplierOrIssuedTo: string;
};


interface StockInRow {
  id: number;
  productId: number;
  productBatchId: number | null;
  productName: string;
  batchSelection: string;
  batchNumber: string;
  manufactureDate: string;
  expiryDate: string;
  quantity: string;
  costPrice: string;
  sellingPrice: string;
  supplierId: number;
  supplierName: string;

  isExistingBatch: boolean;
}

type ProductOption = {
  id: number;
  name: string;
};

type SupplierOption = {
  id: number;
  name: string;
};

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

const createRow = (id: number): StockInRow => ({
  id,
  productId: 0,
  productBatchId: null,
  productName: "",
  batchSelection: "",
  batchNumber: "",
  manufactureDate: "",
  expiryDate: "",
  quantity: "",
  costPrice: "",
  sellingPrice: "",
  supplierId: 0,
  supplierName: "",
  isExistingBatch: false
});

export function StockIn() {
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [rows, setRows] = useState<StockInRow[]>([createRow(1), createRow(2)]);
  const [products, setProducts] = useState<ProductOption[]>([]);
  const [suppliers, setSuppliers] = useState<SupplierOption[]>([]);
  const [batchOptions, setBatchOptions] = useState<ProductBatchOption[]>([]);
  const [activityOpen, setActivityOpen] = useState(false);
  const [activityLoading, setActivityLoading] = useState(false);
  const [activities, setActivities] = useState<StockActivity[]>([]);

  useEffect(() => {
    const fetchDropdownData = async () => {
      const [productsRes, suppliersRes] = await Promise.all([
        api.get<ProductOption[]>(`${import.meta.env.VITE_API_URL}/api/products/options`),
        api.get<SupplierOption[]>(`${import.meta.env.VITE_API_URL}/api/suppliers`)
      ]);
      setProducts(productsRes.data);
      setSuppliers(suppliersRes.data);
      const batchesRes = await api.get<ProductBatchOption[]>(
        `${import.meta.env.VITE_API_URL}/api/products/batches`
      );
      setBatchOptions(batchesRes.data);
    };
    fetchDropdownData().catch(console.error);
  }, []);

  const fetchRecentActivity = async () => {
    setActivityLoading(true);
    try {
      const response = await api.get<StockActivity[]>(
        `${import.meta.env.VITE_API_URL}/api/stocktransactions/recent-stock-in`,
      );
      setActivities(response.data);
    } catch (error) {
      console.error(error);
      setActivities([]);
    } finally {
      setActivityLoading(false);
    }
  };

  const updateRow = (id: number, key: keyof StockInRow, value: string | number | null) => {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [key]: value } : row)),
    );
  };
  const getBatchesForProduct = (productId: number) =>
    batchOptions.filter((batch) => batch.productId === productId);

  const handleProductChange = (rowId: number, value: string) => {
    const productId = parseInt(value);
    const selectedProduct = products.find((product) => product.id === productId);

    setRows((current) =>
      current.map((row) =>
        row.id === rowId
          ? {
              ...row,
              productId,
              productName: selectedProduct?.name ?? "",
              productBatchId: null,
              batchSelection: "",
              batchNumber: "",
              manufactureDate: "",
              expiryDate: "",
              quantity: "",
              costPrice: "",
              sellingPrice: "",
              supplierId: 0,
              supplierName: "",
              isExistingBatch: false,
            }
          : row
      )
    );
  };

  const handleBatchSelectionChange = (rowId: number, value: string) => {
    const row = rows.find((item) => item.id === rowId);
    if (!row) return;

    if (value === "__new__") {
      setRows((current) =>
        current.map((item) =>
          item.id === rowId
            ? {
                ...item,
                batchSelection: value,
                productBatchId: null,
                batchNumber: "",
                manufactureDate: "",
                expiryDate: "",
                costPrice: "",
                sellingPrice: "",
                supplierId: 0,
                supplierName: "",
                isExistingBatch: false,
              }
            : item
        )
      );
      return;
    }

    const selectedBatch = batchOptions.find(
      (batch) => batch.productBatchId.toString() === value
    );

    if (!selectedBatch) {
      setRows((current) =>
        current.map((item) =>
          item.id === rowId
            ? {
                ...item,
                batchSelection: value,
                productBatchId: null,
                batchNumber: "",
                manufactureDate: "",
                expiryDate: "",
                costPrice: "",
                sellingPrice: "",
                supplierId: 0,
                supplierName: "",
                isExistingBatch: false,
              }
            : item
        )
      );
      return;
    }

    setRows((current) =>
      current.map((item) =>
        item.id === rowId
          ? {
              ...item,
              batchSelection: value,
              productBatchId: selectedBatch.productBatchId,
              batchNumber: selectedBatch.batchNumber,
              manufactureDate: "",
              expiryDate: "",
              costPrice: "",
              sellingPrice: "",
              supplierId: selectedBatch.supplierId,
              supplierName: selectedBatch.supplierName,
              isExistingBatch: true,
            }
          : item
      )
    );

    fetchBatchDetails(rowId, selectedBatch.productId, selectedBatch.batchNumber).catch(
      console.error
    );
  };

  const fetchBatchDetails = async (
    rowId: number,
    productId: number,
    batchNumber: string
  ) => {
    if (!productId || !batchNumber.trim()) return;

    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/api/stocktransactions/batch-details`,
        {
          params: {
            productId,
            batchNumber,
          },
        }
      );

      const batch = response.data;

      setRows((current) =>
        current.map((row) =>
          row.id === rowId
            ? {
                ...row,
                productBatchId: batch.productBatchId,
                batchSelection: batch.productBatchId.toString(),
                supplierId: batch.supplierId,
                manufactureDate:
                  batch.manufactureDate.split("T")[0],
                expiryDate:
                  batch.expiryDate.split("T")[0],
                costPrice: batch.costPrice.toString(),
                sellingPrice: batch.sellingPrice.toString(),
                isExistingBatch: true,
              }
            : row
        )
      );
    } catch {
      setRows((current) =>
        current.map((row) =>
          row.id === rowId
            ? {
                ...row,
                productBatchId: null,
                batchSelection: "__new__",
                isExistingBatch: false,
              }
            : row
        )
      );
    }
  };

  const handleSubmit = async () => {
    setMessage("");
    setIsError(false);

    const requestData = {
      InvoiceNumber:
        (document.getElementById("purchaseOrder") as HTMLInputElement)?.value || "",

      Notes: undefined,

      Items: rows
        .filter((row) => row.productId > 0 && row.quantity)
        .map((row) => ({
          ProductId: row.productId,
          ProductBatchId: row.productBatchId,
          Quantity: parseInt(row.quantity) || 0,
          BatchNumber: row.batchNumber,
          ManufactureDate: row.manufactureDate
            ? new Date(row.manufactureDate).toISOString()
            : new Date().toISOString(),
          ExpiryDate: row.expiryDate
            ? new Date(row.expiryDate).toISOString()
            : new Date().toISOString(),
          CostPrice: parseFloat(row.costPrice) || 0,
          SellingPrice: parseFloat(row.sellingPrice) || 0,
          SupplierId: row.supplierId,
        })),
    };

    try {
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/stocktransactions/stock-in`,
        requestData,
      );

      console.log("SUCCESS RESPONSE:", response.data);

      setIsError(false);

      setMessage(
        `✅ Stock In completed successfully. Transaction ID: ${
          response.data.transactionId ??
          response.data.TransactionId ??
          "Created"
        }`
      );

      setRows([createRow(1), createRow(2)]);
    } catch (error: any) {
      console.error(error);

      setIsError(true);

      if (error?.response?.data?.errors) {
        setMessage(
          Object.values(error.response.data.errors)
            .flat()
            .join(", ")
        );
      } else if (error?.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage("Stock In failed.");
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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
        {message && (
          <div
            className={`rounded-md border p-3 text-sm font-medium ${
              isError
                ? "border-red-300 bg-red-100 text-red-700"
                : "border-green-300 bg-green-100 text-green-700"
            }`}
          >
            {message}
          </div>
        )}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
                      <Select
                        value={row.productId.toString()}
                        onValueChange={(value) => handleProductChange(row.id, value)}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent>
                          {products.map((product) => (
                            <SelectItem key={product.id.toString()} value={product.id.toString()}>{product.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                        <Select
                          value={row.batchSelection}
                          onValueChange={(value) => handleBatchSelectionChange(row.id, value)}
                          disabled={!row.productId}
                        >
                          <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Select batch" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="__new__">Create New Batch</SelectItem>
                            {getBatchesForProduct(row.productId)
                              .filter((batch) => {
                                const alreadySelected = rows.some(
                                  (item) =>
                                    item.id !== row.id &&
                                    item.productBatchId === batch.productBatchId
                                );

                                return !alreadySelected;
                              })
                              .map((batch) => (
                                <SelectItem
                                  key={batch.productBatchId}
                                  value={batch.productBatchId.toString()}
                                >
                                  {batch.batchNumber}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        {row.batchSelection === "__new__" && (
                          <Input
                            value={row.batchNumber}
                            onChange={(event) =>
                              updateRow(
                                row.id,
                                "batchNumber",
                                event.target.value.toUpperCase()
                              )
                            }
                            onBlur={() =>
                              fetchBatchDetails(
                                row.id,
                                row.productId,
                                row.batchNumber
                              )
                            }
                            placeholder="Enter new batch number"
                            className="bg-white"
                          />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={row.manufactureDate}
                        disabled={row.isExistingBatch}
                        onChange={(event) =>
                          updateRow(
                            row.id,
                            "manufactureDate",
                            event.target.value
                          )
                        }
                        className="bg-white"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        value={row.expiryDate}
                        disabled={row.isExistingBatch}
                        onChange={(event) =>
                          updateRow(
                            row.id,
                            "expiryDate",
                            event.target.value
                          )
                        }
                        className="bg-white"
                      />
                    </TableCell>
                    <TableCell>
                      <Input type="number" value={row.quantity} onChange={(event) => updateRow(row.id, "quantity", event.target.value)} className="bg-white" />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.01"
                        value={row.costPrice}
                        disabled={row.isExistingBatch}
                        onChange={(event) =>
                          updateRow(
                            row.id,
                            "costPrice",
                            event.target.value
                          )
                        }
                        className="bg-white"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        step="0.01"
                        value={row.sellingPrice}
                        disabled={row.isExistingBatch}
                        onChange={(event) =>
                          updateRow(
                            row.id,
                            "sellingPrice",
                            event.target.value
                          )
                        }
                        className="bg-white"
                      />
                    </TableCell>
                    <TableCell>
                      <Select
                        disabled={row.isExistingBatch}
                        value={row.supplierId.toString()}
                        onValueChange={(value) =>
                          updateRow(
                            row.id,
                            "supplierId",
                            parseInt(value)
                          )
                        }
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                          {suppliers.map((supplier) => (
                            <SelectItem key={supplier.id.toString()} value={supplier.id.toString()}>{supplier.name}</SelectItem>
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
            <div className="flex gap-3">
              <Button variant="outline" className="bg-white" onClick={() => setRows((current) => [...current, createRow(Date.now())])}>
                <Plus className="h-4 w-4" />
                Add Row
              </Button>
              <Button
                variant="outline"
                className="bg-white"
                onClick={() => {
                  setActivityOpen(true);
                  fetchRecentActivity();
                }}
              >
                <History className="h-4 w-4" />
                Recent Activity
              </Button>
            </div>
            <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={handleSubmit}>
              <Save className="h-4 w-4" />
              Submit Transaction
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={activityOpen} onOpenChange={setActivityOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>Recent Stock In Activity</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-auto rounded-lg border border-slate-200">
            {activityLoading ? (
              <div className="p-6 text-slate-600">Loading recent activity...</div>
            ) : activities.length === 0 ? (
              <div className="p-6 text-slate-600">No recent activity found.</div>
            ) : (
              <table className="w-full">
                <thead className="sticky top-0 bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Date</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Invoice</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Batch</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Supplier</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">User</th>
                  </tr>
                </thead>
                <tbody>
                  {activities.map((activity, index) => (
                    <tr key={`${activity.reference}-${index}`} className="border-b border-slate-100">
                      <td className="px-4 py-3 text-sm text-slate-600">
                        {new Date(activity.createdAt).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className="bg-slate-100 text-slate-700">{activity.reference}</Badge>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-800">{activity.productName}</td>
                      <td className="px-4 py-3 font-mono text-sm text-slate-600">{activity.batchNumber}</td>
                      <td className="px-4 py-3 text-sm text-slate-800">{activity.quantity}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{activity.supplierOrIssuedTo}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{activity.userName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
