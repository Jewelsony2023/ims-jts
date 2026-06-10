import { useEffect, useState } from "react";
import { Plus, Mail, Phone, MapPin, Package, Edit, Trash2, Star, Clock, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

type Supplier = {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
  address: string;
  productsSupplied: number;
  leadTime: number;
  status: string;
  linkedProducts?: string;
  onTimeRate?: string;
  defectRate?: string;
  rating?: number;
};

const linkedProducts = [
  "Antibiotics, Pain Relief, Diabetes",
  "PPE, Hygiene, Surgical Supplies",
  "Medical Devices, Diagnostics",
  "Dairy, Beverages, Fresh Foods",
  "Cold Chain, Injectables",
  "Masks, Gloves, Sanitizers"
];

const onTimeRates = ["96%", "93%", "98%", "91%", "88%", "95%"];
const defectRates = ["0.8%", "1.1%", "0.5%", "1.6%", "2.3%", "0.9%"];
const ratings = [4.8, 4.6, 4.9, 4.5, 4.3, 4.7];

export function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);

  useEffect(() => {
    const fetchSuppliers = async () => {
      const response = await axios.get<Supplier[]>(
        `${import.meta.env.VITE_API_URL}/api/suppliers`,
      );

      setSuppliers(response.data);
    };

    fetchSuppliers().catch((error) => {
      console.error(error);
    });
  }, []);

  const suppliersWithExtras = suppliers.map((supplier, index) => ({
    ...supplier,
    linkedProducts: supplier.linkedProducts || linkedProducts[index % linkedProducts.length] || "",
    leadTime: `${supplier.leadTime} days`,
    onTimeRate: supplier.onTimeRate || onTimeRates[index % onTimeRates.length] || "0%",
    defectRate: supplier.defectRate || defectRates[index % defectRates.length] || "0%",
    rating: supplier.rating ?? ratings[index % ratings.length] ?? 0
  }));

  const totalProducts = suppliersWithExtras.reduce((sum, s) => sum + s.productsSupplied, 0);
  const avgRating = suppliersWithExtras.length > 0
    ? (suppliersWithExtras.reduce((sum, s) => sum + s.rating, 0) / suppliersWithExtras.length).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Suppliers</h1>
          <p className="text-slate-600 mt-1">
            Manage supplier relationships and contacts
          </p>
        </div>
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Suppliers</p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {suppliersWithExtras.length}
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
                <p className="text-sm text-slate-600 mb-1">Active Suppliers</p>
                <h3 className="text-3xl font-bold text-slate-800">
                  {suppliersWithExtras.filter((s) => s.status === "Active").length}
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
                <p className="text-sm text-slate-600 mb-1">Total Products</p>
                <h3 className="text-3xl font-bold text-slate-800">{totalProducts}</h3>
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
                <p className="text-sm text-slate-600 mb-1">Avg Rating</p>
                <h3 className="text-3xl font-bold text-slate-800">{avgRating}</h3>
              </div>
              <div className="bg-amber-500 p-3 rounded-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* View Toggle */}
      <Tabs defaultValue="cards" className="w-full">
        <TabsList>
          <TabsTrigger value="cards">Card View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
        </TabsList>

        <TabsContent value="cards" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {suppliersWithExtras.map((supplier) => (
              <Card key={supplier.id} className="border-none shadow-md hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{supplier.name}</CardTitle>
                      <Badge
                        className={
                          supplier.status === "Active"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-slate-100 text-slate-700"
                        }
                      >
                        {supplier.status}
                      </Badge>
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
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 mt-1 flex-shrink-0" />
                      <p className="text-sm text-slate-600">{supplier.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <p className="text-sm text-slate-600">{supplier.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <p className="text-sm text-slate-600">{supplier.phone}</p>
                    </div>
                    <div className="pt-3 border-t border-slate-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500">Contact Person</p>
                          <p className="font-semibold text-slate-800">
                            {supplier.contact}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-slate-500">Products</p>
                          <p className="font-semibold text-emerald-600">
                            {supplier.productsSupplied}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 rounded-lg bg-slate-50 p-3 text-center">
                      <div>
                        <p className="text-xs text-slate-500">OTIF</p>
                        <p className="font-semibold text-emerald-700">{supplier.onTimeRate}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Lead</p>
                        <p className="font-semibold text-slate-800">{supplier.leadTime}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Defects</p>
                        <p className="font-semibold text-amber-700">{supplier.defectRate}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-slate-500">Linked Products</p>
                      <p className="text-sm text-slate-700">{supplier.linkedProducts}</p>
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Rating</span>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-semibold text-slate-800">
                            {supplier.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-6">
          <Card className="border-none shadow-md">
            <CardContent className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200">
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">
                        Supplier Name
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">
                        Contact Person
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">
                        Phone
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">
                        Products
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">
                        Performance
                      </th>
                      <th className="text-left py-3 px-4 font-semibold text-slate-700">
                        Status
                      </th>
                      <th className="text-right py-3 px-4 font-semibold text-slate-700">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliersWithExtras.map((supplier) => (
                      <tr key={supplier.id} className="border-b border-slate-100 hover:bg-slate-50">
                        <td className="py-4 px-4 font-medium">{supplier.name}</td>
                        <td className="py-4 px-4">{supplier.contact}</td>
                        <td className="py-4 px-4 text-sm text-slate-600">{supplier.email}</td>
                        <td className="py-4 px-4 text-sm text-slate-600">{supplier.phone}</td>
                        <td className="py-4 px-4 font-semibold text-emerald-600">
                          {supplier.productsSupplied}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex flex-col gap-1 text-sm">
                            <span className="flex items-center gap-1 text-emerald-700">
                              <CheckCircle2 className="h-3.5 w-3.5" />
                              {supplier.onTimeRate} on time
                            </span>
                            <span className="flex items-center gap-1 text-slate-600">
                              <Clock className="h-3.5 w-3.5" />
                              {supplier.leadTime} lead time
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge
                            className={
                              supplier.status === "Active"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-slate-100 text-slate-700"
                            }
                          >
                            {supplier.status}
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Edit className="w-4 h-4 text-slate-600" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Trash2 className="w-4 h-4 text-red-600" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}