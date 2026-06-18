import { useEffect, useState } from "react";
import api from "../../lib/api";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { ConfirmDialog } from "@/components/common/ConfirmDialog";

type Category = {
  id: number;
  name: string;
  description: string;
  productCount: number;
  color: string;
};

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Category | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const totalProducts = categories.reduce(
    (total, category) => total + category.productCount,
    0,
  );
  const averageProducts =
    categories.length === 0 ? 0 : Math.round(totalProducts / categories.length);
  const largestCategory = categories.reduce(
    (largest, category) => Math.max(largest, category.productCount),
    0,
  );

  const fetchCategories = async () => {
    try {
      const response = await api.get<Category[]>(
        `${import.meta.env.VITE_API_URL}/api/categories`,
      );

      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setErrors({});
    setFormData({
      name: "",
      description: "",
    });
  };

  const handleAddCategory = () => {
    setErrors({});
    resetForm();
    setOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setErrors({});
    setEditingId(category.id);
    setFormData({
      name: category.name,
      description: category.description,
    });
    setOpen(true);
  };

  const handleSaveCategory = async () => {
    const nextErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      nextErrors.name = "Category name is required";
    }

    if (!formData.description.trim()) {
      nextErrors.description = "Description is required";
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    if (isSaving) return;

    setIsSaving(true);
    setErrors({});

    try {
      const payload = {
        name: formData.name.trim(),
        description: formData.description.trim(),
      };

      if (editingId === null) {
        await api.post(
          `${import.meta.env.VITE_API_URL}/api/categories`,
          payload,
        );
      } else {
        await api.put(
          `${import.meta.env.VITE_API_URL}/api/categories/${editingId}`,
          payload,
        );
      }

      await fetchCategories();
      resetForm();
      setOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await api.delete(
        `${import.meta.env.VITE_API_URL}/api/categories/${id}`,
      );

      await fetchCategories();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Categories</h1>
          <p className="text-slate-600 mt-1">
            Manage product categories and classifications
          </p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600" onClick={handleAddCategory}>
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Categories</p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {categories.length}
                </h3>
              </div>
              <div className="bg-blue-500 p-3 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Products</p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {totalProducts.toLocaleString()}
                </h3>
              </div>
              <div className="bg-emerald-500 p-3 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Avg per Category</p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {averageProducts.toLocaleString()}
                </h3>
              </div>
              <div className="bg-purple-500 p-3 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Largest Category</p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {largestCategory.toLocaleString()}
                </h3>
              </div>
              <div className="bg-orange-500 p-3 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Card key={category.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`${category.color} p-3 rounded-lg`}>
                  <Package className="w-6 h-6 text-white" />
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleEditCategory(category)}
                  >
                    <Edit className="w-4 h-4 text-slate-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => setDeleteTarget(category)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">
                {category.name}
              </h3>
              <p className="text-sm text-slate-600 mb-4 line-clamp-2">
                {category.description}
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                <span className="text-sm text-slate-600">Products</span>
                <span className="text-lg font-bold text-slate-800">
                  {category.productCount}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);

          if (!value) {
            resetForm();
          }
        }}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              {editingId === null ? "Add New Category" : "Edit Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Category Name</Label>
              <Input
                id="name"
                placeholder="Enter category name"
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
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter category description"
                rows={3}
                value={formData.description}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  });
                  setErrors((prev) => ({
                    ...prev,
                    description: "",
                  }));
                }}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-sm text-red-500">{errors.description}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="bg-emerald-500 hover:bg-emerald-600"
              onClick={handleSaveCategory}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save Category"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete Category"
        description="Are you sure you want to delete this category?"
        confirmText="Delete"
        cancelText="Cancel"
        onCancel={() => setDeleteTarget(null)}
        onConfirm={async () => {
          if (!deleteTarget) return;
          await handleDeleteCategory(deleteTarget.id);
          setDeleteTarget(null);
        }}
      />
    </div>
  );
}
