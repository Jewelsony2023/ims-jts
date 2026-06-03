import { useState } from "react";
import { Link } from "react-router";
import { Plus, Search, Filter, Edit, Trash2, Eye, ImageIcon, Upload } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Badge } from "../components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const products = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=100&h=100&fit=crop",
    name: "Amoxicillin 500mg",
    sku: "MED-001",
    barcode: "8901234567890",
    category: "Antibiotics",
    costPrice: 12.5,
    sellingPrice: 18.99,
    stock: 450,
    status: "In Stock",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=100&h=100&fit=crop",
    name: "Paracetamol 500mg",
    sku: "MED-002",
    barcode: "8901234567891",
    category: "Pain Relief",
    costPrice: 5.25,
    sellingPrice: 9.99,
    stock: 890,
    status: "In Stock",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1550572017-4814c5a3f8e4?w=100&h=100&fit=crop",
    name: "Insulin Vials",
    sku: "MED-003",
    barcode: "8901234567892",
    category: "Diabetes",
    costPrice: 45.0,
    sellingPrice: 68.99,
    stock: 180,
    status: "In Stock",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1582719366531-3f7e0eccd93a?w=100&h=100&fit=crop",
    name: "Surgical Masks (Box)",
    sku: "PPE-001",
    barcode: "8901234567893",
    category: "PPE",
    costPrice: 8.5,
    sellingPrice: 14.99,
    stock: 45,
    status: "Low Stock",
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?w=100&h=100&fit=crop",
    name: "Hand Sanitizer 500ml",
    sku: "HYG-001",
    barcode: "8901234567894",
    category: "Hygiene",
    costPrice: 3.25,
    sellingPrice: 6.99,
    stock: 320,
    status: "In Stock",
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1571769267292-a9089022f7f6?w=100&h=100&fit=crop",
    name: "Vitamin C Tablets",
    sku: "VIT-001",
    barcode: "8901234567895",
    category: "Vitamins",
    costPrice: 7.5,
    sellingPrice: 12.99,
    stock: 12,
    status: "Expiring Soon",
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1505575967455-8e8f83e8511f?w=100&h=100&fit=crop",
    name: "Organic Apple Juice 1L",
    sku: "BEV-001",
    barcode: "8901234567896",
    category: "Beverages",
    costPrice: 2.75,
    sellingPrice: 5.49,
    stock: 245,
    status: "In Stock",
  },
  {
    id: "8",
    image: "",
    name: "Fresh Yogurt Strawberry",
    sku: "DAI-001",
    barcode: "8901234567897",
    category: "Dairy",
    costPrice: 1.85,
    sellingPrice: 3.99,
    stock: 0,
    status: "Expired",
  },
];

export function Products() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-emerald-100 text-emerald-700">In Stock</Badge>;
      case "Low Stock":
        return <Badge className="bg-amber-100 text-amber-700">Low Stock</Badge>;
      case "Expiring Soon":
        return <Badge className="bg-orange-100 text-orange-700">Expiring Soon</Badge>;
      case "Expired":
        return <Badge className="bg-red-100 text-red-700">Expired</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              type="text"
              placeholder="Search products by name, SKU, or barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[200px] bg-white">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="antibiotics">Antibiotics</SelectItem>
              <SelectItem value="pain-relief">Pain Relief</SelectItem>
              <SelectItem value="diabetes">Diabetes</SelectItem>
              <SelectItem value="ppe">PPE</SelectItem>
              <SelectItem value="hygiene">Hygiene</SelectItem>
              <SelectItem value="vitamins">Vitamins</SelectItem>
              <SelectItem value="beverages">Beverages</SelectItem>
              <SelectItem value="dairy">Dairy</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_320px] gap-6">
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Products Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead>Barcode</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Cost Price</TableHead>
                <TableHead>Selling Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <ImageWithFallback
                        src={product.image || "missing-product-image"}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover bg-slate-100"
                      />
                      <div>
                        <span className="font-medium">{product.name}</span>
                        {!product.image && (
                          <p className="text-xs text-slate-500">Placeholder image</p>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {product.sku}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {product.barcode}
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.costPrice.toFixed(2)}</TableCell>
                  <TableCell className="font-semibold">
                    ${product.sellingPrice.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <span
                      className={
                        product.stock < 50
                          ? "text-red-600 font-semibold"
                          : "text-slate-800"
                      }
                    >
                      {product.stock}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(product.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/products/${product.id}`}>
                        <Button variant="ghost" size="icon">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </Button>
                      </Link>
                      <Button variant="ghost" size="icon">
                        <Edit className="w-4 h-4 text-slate-600" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="w-4 h-4 text-red-600" />
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
          <CardTitle className="text-lg">Product Images</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
              <Upload className="h-6 w-6 text-emerald-600" />
            </div>
            <p className="font-semibold text-slate-800">Upload product image</p>
            <p className="mt-1 text-sm text-slate-500">
              JPG, PNG, or WebP up to 5MB
            </p>
            <Button variant="outline" className="mt-4 bg-white">
              Browse files
            </Button>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-slate-100">
                <ImageIcon className="h-6 w-6 text-slate-400" />
              </div>
              <div>
                <p className="font-semibold text-slate-800">Placeholder support</p>
                <p className="text-sm text-slate-500">
                  Missing images render with a stable thumbnail footprint.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
