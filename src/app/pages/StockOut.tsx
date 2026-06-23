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
import { Badge } from "../components/ui/badge";
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

interface StockOutRow {
  id: number;
  productId: number;
  productBatchId: number;
  product: string;
  batch: string;
  expiryDate: string;
  availableQuantity: number;
  batchCostPrice: number;
  batchSellingPrice: number;
  transactionSellingPrice: string;
  quantityToIssue: string;
}

type StockOutRowErrors = {
  product?: string;
  batch?: string;
  quantityToIssue?: string;
  transactionSellingPrice?: string;
};

type StockOutErrors = {
  referenceNumber?: string;
  issuedTo?: string;
  rows: Record<number, StockOutRowErrors>;
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
  expiryDate?: string | null;
  ExpiryDate?: string | null;
  expiry?: string | null;
  Expiry?: string | null;
  supplierId: number;
  supplierName: string;
};

type ExpiryStatus = "Good" | "Expiring Soon" | "Expired";

const createRow = (id: number): StockOutRow => ({
  id,
  productId: 0,
  productBatchId: 0,
  product: "",
  batch: "",
  expiryDate: "",
  availableQuantity: 0,
  batchCostPrice: 0,
  batchSellingPrice: 0,
  transactionSellingPrice: "",
  quantityToIssue: "",
});

const getSelectedExpiryDate = (row: StockOutRow) => row.expiryDate || "";

const getDaysRemaining = (expiryDate?: string | null) => {
  if (!expiryDate) return null;

  const current = new Date();
  const today = new Date(current.getFullYear(), current.getMonth(), current.getDate());
  const parsedExpiry = new Date(expiryDate);

  if (isNaN(parsedExpiry.getTime())) return null;

  const expiry = new Date(
    parsedExpiry.getFullYear(),
    parsedExpiry.getMonth(),
    parsedExpiry.getDate()
  );

  return Math.floor((expiry.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
};

const getExpiryStatus = (expiryDate?: string | null): ExpiryStatus | null => {
  const daysRemaining = getDaysRemaining(expiryDate);
  if (daysRemaining === null) return null;
  if (daysRemaining < 0) return "Expired";
  if (daysRemaining <= 30) return "Expiring Soon";
  return "Good";
};

const formatExpiryLabel = (expiryDate?: string | null) => {
  if (!expiryDate)
    return "No Expiry";

  const date = new Date(expiryDate);

  if (isNaN(date.getTime()))
    return "Invalid Expiry";

  return date.toLocaleDateString("en-GB");
};

const getExpiryTimestamp = (expiryDate?: string | null) => {
  if (!expiryDate) return Number.MAX_SAFE_INTEGER;

  const timestamp = new Date(expiryDate).getTime();

  return isNaN(timestamp)
    ? Number.MAX_SAFE_INTEGER
    : timestamp;
};

const getBatchExpiryValue = (batch: ProductBatchOption) =>
  batch.expiryDate ?? batch.ExpiryDate ?? batch.expiry ?? batch.Expiry ?? null;

const isBlankStockOutRow = (row: StockOutRow) =>
  row.productId === 0 &&
  row.productBatchId === 0 &&
  row.quantityToIssue.trim() === "" &&
  row.transactionSellingPrice.trim() === "";

export function StockOut() {
  const [rows, setRows] = useState<StockOutRow[]>([createRow(1), createRow(2)]);
  const [batchOptions, setBatchOptions] = useState<ProductBatchOption[]>([]);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [errors, setErrors] = useState<StockOutErrors>({ rows: {} });
  const [activityOpen, setActivityOpen] = useState(false);
  const [activityLoading, setActivityLoading] = useState(false);
  const [activities, setActivities] = useState<StockActivity[]>([]);

  const rowsWithExpiryStatus = rows.map((row) => ({
    ...row,
    daysRemaining: getDaysRemaining(getSelectedExpiryDate(row)),
    expiryStatus: getExpiryStatus(getSelectedExpiryDate(row)),
  }));
  const hasExpiredSelectedBatch = rowsWithExpiryStatus.some(
    (row) => row.productBatchId > 0 && row.expiryStatus === "Expired"
  );
  const expiryWarnings = rowsWithExpiryStatus.filter(
    (row) =>
      row.productBatchId > 0 &&
      (row.expiryStatus === "Expired" || row.expiryStatus === "Expiring Soon")
  );

  const fetchBatchData = async () => {
    const response = await api.get<ProductBatchOption[]>(
      `${import.meta.env.VITE_API_URL}/api/products/batches`,
    );

    console.log("Batch Data:", response.data);
    setBatchOptions(response.data);
  };

  const getProductBatches = (productName: string) =>
    batchOptions
      .filter((item) => item.productName === productName)
      .sort(
        (a, b) =>
          getExpiryTimestamp(getBatchExpiryValue(a)) -
          getExpiryTimestamp(getBatchExpiryValue(b))
      );

  const sortedProductNames = [
    ...new Set(batchOptions.map((item) => item.productName))
  ].sort((a, b) => a.localeCompare(b));


  const applyBatchSelection = (rowId: number, batch: ProductBatchOption | undefined) => {
    updateRow(rowId, "productBatchId", batch?.productBatchId ?? 0);
    updateRow(rowId, "batch", batch?.batchNumber ?? "");
    updateRow(rowId, "expiryDate", getBatchExpiryValue(batch ?? ({} as ProductBatchOption)) ?? "");
    updateRow(rowId, "availableQuantity", batch?.quantityAvailable ?? 0);
    updateRow(rowId, "batchCostPrice", batch?.costPrice ?? 0);
    updateRow(rowId, "batchSellingPrice", batch?.sellingPrice ?? 0);
    updateRow(rowId, "transactionSellingPrice", String(batch?.sellingPrice ?? ""));
    updateRow(rowId, "productId", batch?.productId ?? 0);
  };

  useEffect(() => {
    fetchBatchData().catch(console.error);
  }, []);

  const fetchRecentActivity = async () => {
    setActivityLoading(true);
    try {
      const response = await api.get<StockActivity[]>(
        `${import.meta.env.VITE_API_URL}/api/stocktransactions/recent-stock-out`,
      );
      setActivities(response.data);
    } catch (error) {
      console.error(error);
      setActivities([]);
    } finally {
      setActivityLoading(false);
    }
  };

  const updateRow = (id: number, key: keyof StockOutRow, value: string | number) => {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, [key]: value } : row)),
    );
    setErrors((current) => ({
      ...current,
      rows: {
        ...current.rows,
        [id]: {
          ...current.rows[id],
          ...(key === "product" ? { product: undefined, batch: undefined } : {}),
          ...(key === "productBatchId" ? { batch: undefined } : {}),
          ...(key === "quantityToIssue" ? { quantityToIssue: undefined } : {}),
          ...(key === "transactionSellingPrice" ? { transactionSellingPrice: undefined } : {}),
        },
      },
    }));
  };

  const handleSubmit = async () => {
    const referenceNumber =
      (document.getElementById("reference") as HTMLInputElement)?.value?.trim() || "";
    const issuedTo =
      (document.getElementById("issuedTo") as HTMLInputElement)?.value?.trim() || "";
    const activeRows = rows.filter((row) => !isBlankStockOutRow(row));

    const nextErrors: StockOutErrors = { rows: {} };
    let hasValidationErrors = false;

    if (!referenceNumber) {
      nextErrors.referenceNumber = "Invoice Number is required";
      hasValidationErrors = true;
    }

    if (!issuedTo) {
      nextErrors.issuedTo = "Issued To is required";
      hasValidationErrors = true;
    }

    if (activeRows.length === 0) {
      setIsError(true);
      setMessage("Please add at least one stock out row.");
      setErrors(nextErrors);
      return;
    }

    for (const row of activeRows) {
      const rowErrors: StockOutRowErrors = {};

      if (!row.product) {
        rowErrors.product = "Product is required";
        hasValidationErrors = true;
      }

      if (!row.productBatchId) {
        rowErrors.batch = "Batch is required";
        hasValidationErrors = true;
      }

      if (Number(row.quantityToIssue) <= 0) {
        rowErrors.quantityToIssue = "Quantity must be greater than 0";
        hasValidationErrors = true;
      }

      if (Number(row.transactionSellingPrice) <= 0) {
        rowErrors.transactionSellingPrice = "Selling Price must be greater than 0";
        hasValidationErrors = true;
      }

      if (Object.keys(rowErrors).length > 0) {
        nextErrors.rows[row.id] = rowErrors;
      }
    }

    if (hasValidationErrors) {
      setIsError(true);
      setMessage("Please fix the highlighted fields.");
      setErrors(nextErrors);
      return;
    }

    const selectedBatches = activeRows
      .filter((r) => r.productBatchId > 0)
      .map((r) => r.productBatchId);

    if (selectedBatches.length !== new Set(selectedBatches).size) {
      setIsError(true);
      setMessage("Duplicate batches are not allowed.");
      return;
    }

    for (const row of activeRows) {
      if (Number(row.quantityToIssue) > row.availableQuantity) {
        setIsError(true);
        setMessage(`Cannot issue more than available stock for ${row.product}`);
        return;
      }
    }

    const requestData = {
      ReferenceNumber: referenceNumber || undefined,
      IssuedTo: issuedTo || undefined,
      Items: activeRows
        .filter((row) => row.productBatchId > 0 && row.quantityToIssue)
        .map((row) => ({
          ProductId: row.productId,
          ProductBatchId: row.productBatchId,
          Quantity: parseInt(row.quantityToIssue) || 0,
          SellingPrice: parseFloat(row.transactionSellingPrice) || row.batchSellingPrice,
        })),
    };

    try {
      console.log("STOCK OUT REQUEST");
      console.log(JSON.stringify(requestData, null, 2));
      console.log("REQUEST:", requestData);
      const response = await api.post(
        `${import.meta.env.VITE_API_URL}/api/stocktransactions/stock-out`,
        requestData,
      );

      setIsError(false);
      setMessage("Stock Out completed successfully.");
      setErrors({ rows: {} });
      await fetchBatchData();
      setRows([createRow(1), createRow(2)]);
      console.log(response.data);
    } catch (error: any) {
      console.log("FULL ERROR RESPONSE");
      console.log(JSON.stringify(error.response?.data, null, 2));
      console.error(error);
      setIsError(true);
      setMessage(error?.response?.data?.message ?? "Stock Out failed.");
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
              <Input
                id="issuedTo"
                placeholder="Recipient, shop, or department"
                className="bg-white"
                onChange={(event) =>
                  setErrors((current) => ({
                    ...current,
                    issuedTo: event.currentTarget.value.trim() ? undefined : current.issuedTo,
                  }))
                }
              />
              {errors.issuedTo && <p className="text-sm text-red-600">{errors.issuedTo}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="issueDate">Issue Date</Label>
              <Input id="issueDate" type="date" className="bg-white" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reference">Invoice Number</Label>
              <Input
                id="reference"
                placeholder="Enter invoice number"
                className="bg-white"
                onChange={(event) =>
                  setErrors((current) => ({
                    ...current,
                    referenceNumber: event.currentTarget.value.trim()
                      ? undefined
                      : current.referenceNumber,
                  }))
                }
              />
              {errors.referenceNumber && <p className="text-sm text-red-600">{errors.referenceNumber}</p>}
            </div>
          </div>

          <div className="rounded-lg border border-slate-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="min-w-[220px]">Product</TableHead>
                  <TableHead className="min-w-[180px]">Batch</TableHead>
                  <TableHead className="min-w-[150px]">Available Quantity</TableHead>
                  <TableHead className="min-w-[190px]">Expiry Status</TableHead>
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
                      <div className="space-y-2">
                      <Select
                        value={row.product}
                        onValueChange={(value) => {
                          const productBatches = getProductBatches(value);
                          const selected = productBatches[0];
                          updateRow(row.id, "product", value);
                          applyBatchSelection(row.id, selected);
                        }}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select product" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          {sortedProductNames.map((product) => (
                            <SelectItem key={product} value={product}>
                              {product}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.rows[row.id]?.product && (
                        <p className="text-sm text-red-600">{errors.rows[row.id]?.product}</p>
                      )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                      <Select
                        value={row.productBatchId ? row.productBatchId.toString() : ""}
                        onValueChange={(value) => {
                          const selected = batchOptions.find(
                            (item) => item.productBatchId === parseInt(value)
                          );

                          applyBatchSelection(row.id, selected);
                        }}
                      >
                        <SelectTrigger className="bg-white">
                          <SelectValue placeholder="Select batch" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px] overflow-y-auto">
                          {batchOptions
                            .filter((item) => {
                              const alreadySelected = rows.some(
                                (r) => r.id !== row.id && r.productBatchId === item.productBatchId
                              );

                              return (
                                (!row.product || item.productName === row.product) &&
                                !alreadySelected
                              );
                            })
                            .map((item) => (
                              <SelectItem
                                key={item.productBatchId}
                                value={item.productBatchId.toString()}
                              >
                                {`${item.batchNumber} | ${formatExpiryLabel(getBatchExpiryValue(item))} | Qty ${item.quantityAvailable}`}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      {errors.rows[row.id]?.batch && (
                        <p className="text-sm text-red-600">{errors.rows[row.id]?.batch}</p>
                      )}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-slate-800">
                      {row.availableQuantity.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {(() => {
                        const selectedExpiryDate = getSelectedExpiryDate(row);
                        const daysRemaining = getDaysRemaining(selectedExpiryDate);
                        const status = getExpiryStatus(selectedExpiryDate);

                        if (!status || daysRemaining === null) {
                          return <span className="text-sm text-slate-400">-</span>;
                        }

                        if (status === "Good") {
                          return (
                            <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                              Good
                            </Badge>
                          );
                        }

                        if (status === "Expiring Soon") {
                          return (
                            <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                              Expiring Soon ({daysRemaining} days left)
                            </Badge>
                          );
                        }

                        return (
                          <Badge className="bg-red-100 text-red-700 hover:bg-red-100">
                            Expired ({Math.abs(daysRemaining)} days overdue)
                          </Badge>
                        );
                      })()}
                    </TableCell>
                    <TableCell className="font-semibold text-slate-800">₹{row.batchCostPrice.toFixed(2)}</TableCell>
                    <TableCell className="font-semibold text-slate-800">₹{row.batchSellingPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <div className="space-y-2">
                      <Input
                        type="number"
                        step="0.01"
                        value={row.transactionSellingPrice}
                        onChange={(event) => updateRow(row.id, "transactionSellingPrice", event.target.value)}
                        className="bg-white"
                      />
                      {errors.rows[row.id]?.transactionSellingPrice && (
                        <p className="text-sm text-red-600">
                          {errors.rows[row.id]?.transactionSellingPrice}
                        </p>
                      )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-2">
                      <Input
                        type="number"
                        value={row.quantityToIssue}
                        onChange={(event) => updateRow(row.id, "quantityToIssue", event.target.value)}
                        className="bg-white"
                      />
                      {errors.rows[row.id]?.quantityToIssue && (
                        <p className="text-sm text-red-600">{errors.rows[row.id]?.quantityToIssue}</p>
                      )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setRows((current) => current.filter((item) => item.id !== row.id))}
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {expiryWarnings.length > 0 && (
            <div className="space-y-2 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">
              <div className="font-medium">Expiry warning</div>
              <ul className="space-y-1">
                {expiryWarnings.map((row) => {
                  const daysRemaining = getDaysRemaining(row.expiryDate) ?? 0;
                  const label =
                    row.expiryStatus === "Expired"
                      ? `${row.product || "Selected batch"} is expired (${Math.abs(daysRemaining)} days overdue).`
                      : `${row.product || "Selected batch"} is expiring soon (${daysRemaining} days left).`;

                  return <li key={row.id}>{label}</li>;
                })}
              </ul>
            </div>
          )}

          {hasExpiredSelectedBatch && (
            <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">
              Expired inventory cannot be issued.
            </div>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="bg-white"
                onClick={() => setRows((current) => [...current, createRow(Date.now())])}
              >
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
            <Button
              className="bg-orange-500 hover:bg-orange-600"
              onClick={handleSubmit}
              disabled={hasExpiredSelectedBatch}
            >
              <Save className="h-4 w-4" />
              Save
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={activityOpen} onOpenChange={setActivityOpen}>
        <DialogContent className="max-w-5xl">
          <DialogHeader>
            <DialogTitle>Recent Stock Out Activity</DialogTitle>
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
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Reference</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Batch</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Quantity</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Issued To</th>
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

