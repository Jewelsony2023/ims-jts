import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";

type Category = {
  id: number;
  name: string;
  description: string;
  productCount: number;
  color: string;
};

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
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

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await axios.get<Category[]>(
        `${import.meta.env.VITE_API_URL}/api/categories`,
      );

      setCategories(response.data);
    };

    fetchCategories().catch((error) => {
      console.error(error);
    });
  }, []);

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
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-emerald-500 hover:bg-emerald-600">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Category Name</Label>
                <Input id="name" placeholder="Enter category name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter category description"
                  rows={3}
                />
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button
                  className="bg-emerald-500 hover:bg-emerald-600"
                  onClick={() => setIsAddDialogOpen(false)}
                >
                  Create Category
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Edit className="w-4 h-4 text-slate-600" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
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
    </div>
  );
}
