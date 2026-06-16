import { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import { Plus, Search, Filter, Edit, Trash2, Eye, Upload } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

type Product = {
  id: number;
  image: string;
  name: string;
  sku: string;
  barcode: string;
  category: string;
  description: string;
  stock: number;
  status: string;
};

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [open, setOpen] = useState(false);

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [isSaving, setIsSaving] =
    useState(false);

  const [formData, setFormData] =
    useState({
      name: "",
      sku: "",
      barcode: "",
      description: "",
      categoryId: 1,
      image: "",
      minimumStockLevel: 0,
    });
  const filteredProducts = products.filter((product) => {
    const search = searchTerm.trim().toLowerCase();
    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.sku.toLowerCase().includes(search) ||
      product.barcode.toLowerCase().includes(search);
    const matchesCategory =
      categoryFilter === "all" ||
      product.category.toLowerCase() === categoryFilter.toLowerCase();

    return matchesSearch && matchesCategory;
  });
  const categoryOptions = Array.from(
    new Set(products.map((product) => product.category).filter(Boolean)),
  ).sort();
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`
      );

      setProducts(response.data);
    }
    catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, []);
  const resetForm = () => {
    setEditingId(null);

    setFormData({
      name: "",
      sku: "",
      barcode: "",
      description: "",
      categoryId: 1,
      image: "",
      minimumStockLevel: 0,
    });
  };
  const handleSaveProduct = async () => {

    if (
      !formData.name.trim() ||
      !formData.sku.trim() ||
      !formData.barcode.trim()
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (formData.minimumStockLevel <= 0) {
      alert("Minimum stock level cannot be negative");
      return;
    }

    if (isSaving) return;

    setIsSaving(true);

    try {

      if (editingId === null) {

        await axios.post(
          `${import.meta.env.VITE_API_URL}/api/products`,
          formData
        );

      } else {

        await axios.put(
          `${import.meta.env.VITE_API_URL}/api/products/${editingId}`,
          formData
        );

      }

      await fetchProducts();

      resetForm();

      setOpen(false);

    }
    catch (error) {
      console.error(error);
    }
    finally {
      setIsSaving(false);
    }
  };
  const handleDeleteProduct = async (
    id: number
  ) => {

    if (!confirm("Delete product?"))
      return;

    try {

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`
      );

      await fetchProducts();

    }
    catch (error) {
      console.error(error);
    }
  };
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
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex min-w-0 flex-1 flex-col gap-3 md:flex-row md:items-center">
          <div className="relative w-full md:max-w-md">
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
            <SelectTrigger className="w-full bg-white md:w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categoryOptions.map((category) => (
                <SelectItem key={category} value={category.toLowerCase()}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Dialog open={open} onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            resetForm();
          }
        }}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={() => {
              resetForm();
              setOpen(true);
            }}>
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingId ? "Edit Product" : "Add Product"}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    })
                  }
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      sku: e.target.value,
                    })
                  }
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="barcode">Barcode</Label>
                <Input
                  id="barcode"
                  value={formData.barcode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      barcode: e.target.value,
                    })
                  }
                  className="bg-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="minimumStockLevel">Minimum Stock Level</Label>
                <Input
                  id="minimumStockLevel"
                  type="number"
                  value={formData.minimumStockLevel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      minimumStockLevel: Number(e.target.value),
                    })
                  }
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={String(formData.categoryId)} onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    categoryId: Number(value),
                  })
                }}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Antibiotics</SelectItem>
                    <SelectItem value="2">Pain Relief</SelectItem>
                    <SelectItem value="3">Diabetes</SelectItem>
                    <SelectItem value="4">PPE</SelectItem>
                    <SelectItem value="5">Hygiene</SelectItem>
                    <SelectItem value="6">Vitamins</SelectItem>
                    <SelectItem value="7">Beverages</SelectItem>
                    <SelectItem value="8">Dairy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Product description"
                  className="bg-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Product Image</Label>
                <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-3">
                  <Upload className="h-5 w-5 text-emerald-600" />
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        image: e.target.value,
                      })
                    }
                    placeholder="Image URL"
                    className="bg-white"
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={handleSaveProduct} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save Product"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Products Table */}
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle className="text-lg">Products Catalog</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="hidden md:table-cell">SKU</TableHead>
                <TableHead className="hidden md:table-cell">Barcode</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden lg:table-cell">Description</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
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
                  <TableCell className="font-mono text-sm hidden md:table-cell">
                    {product.sku}
                  </TableCell>
                  <TableCell className="font-mono text-sm hidden md:table-cell">
                    {product.barcode}
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="max-w-xs truncate text-sm text-slate-600 hidden lg:table-cell">
                    {product.description}
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
                      <Button variant="ghost" size="icon" onClick={() => {
                        setEditingId(product.id);

                        setFormData({
                          name: product.name,
                          sku: product.sku,
                          barcode: product.barcode,
                          description: product.description,
                          categoryId: 1,
                          image: product.image,
                          minimumStockLevel: 0,
                        });

                        setOpen(true);
                      }}>
                        <Edit className="w-4 h-4 text-slate-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() =>
                        handleDeleteProduct(product.id)
                      }>
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
    </div>
  );
}
