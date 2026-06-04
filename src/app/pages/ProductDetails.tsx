import { useState } from "react";
import { Link, useParams } from "react-router";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

interface Specification {
  specificationId: string;
  productId: string;
  attributeName: string;
  attributeValue: string;
}

const batches = [
  { batchId: "PB-001", batch: "BAT-2401", mfg: "2025-05-15", expiry: "2027-05-15", quantity: 280, costPrice: 45, sellingPrice: 50, createdDate: "2026-05-15", status: "Active" },
  { batchId: "PB-002", batch: "BAT-2402", mfg: "2025-04-20", expiry: "2027-04-20", quantity: 115, costPrice: 52, sellingPrice: 55, createdDate: "2026-04-20", status: "Active" },
  { batchId: "PB-003", batch: "BAT-2405", mfg: "2025-06-01", expiry: "2026-06-15", quantity: 42, costPrice: 48, sellingPrice: 54, createdDate: "2026-06-01", status: "Near Expiry" },
];

const stockHistory = [
  { date: "2026-06-03", type: "Stock In", batch: "BAT-2401", quantity: 500, reference: "INV001" },
  { date: "2026-06-02", type: "Stock Out", batch: "BAT-2402", quantity: 120, reference: "ISS-5432", sellingPriceUsed: "₹53.00" },
  { date: "2026-06-01", type: "Stock In", batch: "BAT-2403", quantity: 300, reference: "PO-2398" },
];

const suppliers = [
  { name: "MediPharm Solutions Ltd.", phone: "+1 (555) 123-4567", email: "orders@medipharm.com", leadTime: "4 days" },
  { name: "Global Medical Supplies", phone: "+1 (555) 230-1188", email: "supply@globalmedical.com", leadTime: "6 days" },
];

export function ProductDetails() {
  const { id = "1" } = useParams();
  const [specifications, setSpecifications] = useState<Specification[]>([
    { specificationId: "spec-1", productId: id, attributeName: "Strength", attributeValue: "500mg" },
    { specificationId: "spec-2", productId: id, attributeName: "Dosage Form", attributeValue: "Tablet" },
    { specificationId: "spec-3", productId: id, attributeName: "Pack Size", attributeValue: "10" },
  ]);

  const updateSpecification = (
    specificationId: string,
    key: keyof Specification,
    value: string,
  ) => {
    setSpecifications((current) =>
      current.map((spec) =>
        spec.specificationId === specificationId ? { ...spec, [key]: value } : spec,
      ),
    );
  };

  return (
    <div className="space-y-6">
      <Link to="/products">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Button>
      </Link>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop"
              alt="Amoxicillin 500mg"
              className="mb-5 aspect-square w-full rounded-lg bg-slate-100 object-cover"
            />
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-800">Amoxicillin 500mg</h1>
                <Badge className="mt-2 bg-emerald-100 text-emerald-700">In Stock</Badge>
              </div>
              {[
                ["SKU", "MED-001"],
                ["Barcode", "8901234567890"],
                ["Category", "Antibiotics"],
                ["Current Stock", "450 units"],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between border-b border-slate-100 pb-2 text-sm">
                  <span className="text-slate-500">{label}</span>
                  <span className="font-semibold text-slate-800">{value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="specifications" className="min-w-0">
          <TabsList className="w-full justify-start overflow-x-auto rounded-lg bg-slate-100">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="batches">Batches</TabsTrigger>
            <TabsTrigger value="history">Stock History</TabsTrigger>
            <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
          </TabsList>

          <TabsContent value="specifications">
            <Card className="border-none shadow-md">
              <CardHeader className="flex-row items-center justify-between">
                <CardTitle className="text-lg">Product Specifications</CardTitle>
                <Button
                  variant="outline"
                  className="bg-white"
                  onClick={() =>
                    setSpecifications((current) => [
                      ...current,
                      {
                        specificationId: `spec-${Date.now()}`,
                        productId: id,
                        attributeName: "",
                        attributeValue: "",
                      },
                    ])
                  }
                >
                  <Plus className="h-4 w-4" />
                  Add Specification
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg border border-slate-200">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Attribute Name</TableHead>
                        <TableHead>Attribute Value</TableHead>
                        <TableHead className="w-12" />
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {specifications.map((spec) => (
                        <TableRow key={spec.specificationId}>
                          <TableCell>
                            <Input
                              value={spec.attributeName}
                              onChange={(event) => updateSpecification(spec.specificationId, "attributeName", event.target.value)}
                              placeholder="Strength"
                              className="bg-white"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              value={spec.attributeValue}
                              onChange={(event) => updateSpecification(spec.specificationId, "attributeValue", event.target.value)}
                              placeholder="500mg"
                              className="bg-white"
                            />
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => setSpecifications((current) => current.filter((item) => item.specificationId !== spec.specificationId))}>
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
                <div className="flex justify-end">
                  <Button className="bg-emerald-500 hover:bg-emerald-600">
                    <Save className="h-4 w-4" />
                    Save Specifications
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="batches">
            <DataTable title="Batches" columns={["Batch ID", "Batch", "Manufacture Date", "Expiry Date", "Quantity", "Cost Price", "Selling Price", "Created Date", "Status"]} rows={batches.map((b) => [b.batchId, b.batch, b.mfg, b.expiry, b.quantity, `₹${b.costPrice.toFixed(2)}`, `₹${b.sellingPrice.toFixed(2)}`, b.createdDate, b.status])} />
          </TabsContent>
          <TabsContent value="history">
            <DataTable title="Stock History" columns={["Date", "Type", "Batch", "Quantity", "Reference", "Selling Price Used"]} rows={stockHistory.map((s) => [s.date, s.type, s.batch, s.quantity, s.reference, "sellingPriceUsed" in s ? s.sellingPriceUsed : "-"])} />
          </TabsContent>
          <TabsContent value="suppliers">
            <DataTable title="Suppliers" columns={["Supplier", "Phone", "Email", "Lead Time"]} rows={suppliers.map((s) => [s.name, s.phone, s.email, s.leadTime])} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function DataTable({
  title,
  columns,
  rows,
}: {
  title: string;
  columns: string[];
  rows: Array<Array<string | number>>;
}) {
  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column}>{column}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {row.map((cell, cellIndex) => (
                  <TableCell key={`${cell}-${cellIndex}`}>{cell}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
