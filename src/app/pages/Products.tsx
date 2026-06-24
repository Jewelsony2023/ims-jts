import { useEffect, useState } from "react";
import api from "../../lib/api";
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
import { ConfirmDialog } from "@/components/common/ConfirmDialog";
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

type Category = {
  id: number;
  name: string;
  description: string;
  productCount: number;
  color: string;
};

type ProductDetails = Product;

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [selectedProduct, setSelectedProduct] = useState<ProductDetails | null>(null);

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
  const sortedCategories = [...categories].sort((a, b) =>
    a.name.localeCompare(b.name),
  );

  const fetchCategories = async () => {
    try {
      const response = await api.get<Category[]>(
        `${import.meta.env.VITE_API_URL}/api/categories`,
      );

      setCategories(response.data);
    } catch (error) {
      console.error(error);
      setCategories([]);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await api.get(
        `${import.meta.env.VITE_API_URL}/api/products`
      );

      setProducts(response.data);
    }
    catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);
  const resetForm = () => {
    setEditingId(null);
    setErrors({});

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
    const nextErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) nextErrors.name = "Product name is required";
    if (!formData.sku.trim()) nextErrors.sku = "SKU is required";
    if (!formData.barcode.trim()) nextErrors.barcode = "Barcode is required";
    if (!formData.categoryId) nextErrors.categoryId = "Category is required";
    if (formData.minimumStockLevel <= 0) {
      nextErrors.minimumStockLevel = "Minimum stock level must be greater than 0";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (isSaving) return;

    setIsSaving(true);
    setErrors({});

    try {

      if (editingId === null) {

        await api.post(
          `${import.meta.env.VITE_API_URL}/api/products`,
          formData
        );

      } else {

        await api.put(
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
  const handleDeleteProduct = async (id: number) => {
    try {

      await api.delete(
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
              {sortedCategories.map((category) => (
                <SelectItem key={category.id} value={category.name.toLowerCase()}>
                  {category.name}
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
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      name: e.target.value,
                    });
                    setErrors((prev) => ({
                      ...prev,
                      name: "",
                    }));
                  }}
                  className={`bg-white ${errors.name ? "border-red-500" : ""}`}
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      sku: e.target.value,
                    });
                    setErrors((prev) => ({
                      ...prev,
                      sku: "",
                    }));
                  }}
                  className={`bg-white ${errors.sku ? "border-red-500" : ""}`}
                />
                {errors.sku && (
                  <p className="text-sm text-red-500">{errors.sku}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="barcode">Barcode</Label>
                <Input
                  id="barcode"
                  value={formData.barcode}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      barcode: e.target.value,
                    });
                    setErrors((prev) => ({
                      ...prev,
                      barcode: "",
                    }));
                  }}
                  className={`bg-white ${errors.barcode ? "border-red-500" : ""}`}
                />
                {errors.barcode && (
                  <p className="text-sm text-red-500">{errors.barcode}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="minimumStockLevel">Minimum Stock Level</Label>
                <Input
                  id="minimumStockLevel"
                  type="number"
                  value={formData.minimumStockLevel}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      minimumStockLevel: Number(e.target.value),
                    });
                    setErrors((prev) => ({
                      ...prev,
                      minimumStockLevel: "",
                    }));
                  }}
                  className={`bg-white ${errors.minimumStockLevel ? "border-red-500" : ""}`}
                />
                {errors.minimumStockLevel && (
                  <p className="text-sm text-red-500">{errors.minimumStockLevel}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={String(formData.categoryId)} onValueChange={(value) => {
                  setFormData({
                    ...formData,
                    categoryId: Number(value),
                  });
                  setErrors((prev) => ({
                    ...prev,
                    categoryId: "",
                  }));
                }}>
                  <SelectTrigger className={`bg-white ${errors.categoryId ? "border-red-500" : ""}`}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortedCategories.map((category) => (
                      <SelectItem key={category.id} value={String(category.id)}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.categoryId && (
                  <p className="text-sm text-red-500">{errors.categoryId}</p>
                )}
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    });
                  }}
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
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        image: e.target.value,
                      });
                    }}
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
          <p className="text-sm text-slate-600">
            Products sorted by transaction activity (Most Trending First)
          </p>
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
                          <p className="text-xs text-slate-500"></p>
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
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedProduct(product);
                          setDetailsOpen(true);
                        }}
                      >
                        <Eye className="w-4 h-4 text-blue-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => {
                        setErrors({});
                        setEditingId(product.id);

                        setFormData({
                          name: product.name,
                          sku: product.sku,
                          barcode: product.barcode,
                          description: product.description,
                          categoryId:
                            categories.find(
                              (category) =>
                                category.name.toLowerCase() ===
                                product.category.toLowerCase(),
                            )?.id ?? 1,
                          image: product.image,
                          minimumStockLevel: 0,
                        });

                        setOpen(true);
                      }}>
                        <Edit className="w-4 h-4 text-slate-600" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() =>
                        setDeleteTarget(product)
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

      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Product Details</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid gap-4 md:grid-cols-[160px_1fr]">
              <ImageWithFallback
                src={selectedProduct.image || "missing-product-image"}
                alt={selectedProduct.name}
                className="h-40 w-full rounded-lg object-cover bg-slate-100"
              />
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-500">Product Name</p>
                  <p className="font-semibold text-slate-800">{selectedProduct.name}</p>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500">SKU</p>
                    <p className="font-mono text-sm text-slate-800">{selectedProduct.sku}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Barcode</p>
                    <p className="font-mono text-sm text-slate-800">{selectedProduct.barcode}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Category</p>
                    <p className="text-sm text-slate-800">{selectedProduct.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Current Stock</p>
                    <p className="text-sm text-slate-800">{selectedProduct.stock}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Status</p>
                  {getStatusBadge(selectedProduct.status)}
                </div>
                <div>
                  <p className="text-sm text-slate-500">Description</p>
                  <p className="text-sm text-slate-700">
                    {selectedProduct.description || "No description available."}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Product"
        description="Are you sure you want to delete this product?"
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          await handleDeleteProduct(deleteTarget.id);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
