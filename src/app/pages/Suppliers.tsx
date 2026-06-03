import { useState } from "react";
import { Plus, Mail, Phone, MapPin, Package, Edit, Trash2, Star, Clock, CheckCircle2 } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const suppliers = [
  {
    id: "1",
    name: "MediPharm Solutions Ltd.",
    contact: "Robert Williams",
    email: "robert@medipharm.com",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Plaza, New York, NY 10001",
    productsSupplied: 145,
    linkedProducts: "Antibiotics, Pain Relief, Diabetes",
    leadTime: "4.2 days",
    onTimeRate: "96%",
    defectRate: "0.8%",
    status: "Active",
    rating: 4.8,
  },
  {
    id: "2",
    name: "HealthCare Distributors Inc.",
    contact: "Sarah Johnson",
    email: "sarah@healthcare-dist.com",
    phone: "+1 (555) 234-5678",
    address: "456 Healthcare Ave, Los Angeles, CA 90001",
    productsSupplied: 98,
    linkedProducts: "PPE, Hygiene, Surgical Supplies",
    leadTime: "5.1 days",
    onTimeRate: "93%",
    defectRate: "1.1%",
    status: "Active",
    rating: 4.6,
  },
  {
    id: "3",
    name: "Global Medical Supplies",
    contact: "Michael Chen",
    email: "michael@globalmeds.com",
    phone: "+1 (555) 345-6789",
    address: "789 Supply Chain Rd, Chicago, IL 60601",
    productsSupplied: 234,
    linkedProducts: "Medical Devices, Diagnostics",
    leadTime: "3.8 days",
    onTimeRate: "98%",
    defectRate: "0.5%",
    status: "Active",
    rating: 4.9,
  },
  {
    id: "4",
    name: "FreshFood Wholesalers",
    contact: "Emma Davis",
    email: "emma@freshfood.com",
    phone: "+1 (555) 456-7890",
    address: "321 Fresh Market St, Houston, TX 77001",
    productsSupplied: 187,
    linkedProducts: "Dairy, Beverages, Fresh Foods",
    leadTime: "2.1 days",
    onTimeRate: "91%",
    defectRate: "1.6%",
    status: "Active",
    rating: 4.5,
  },
  {
    id: "5",
    name: "BioTech Pharmaceuticals",
    contact: "David Lee",
    email: "david@biotech-pharma.com",
    phone: "+1 (555) 567-8901",
    address: "654 Science Park, Boston, MA 02101",
    productsSupplied: 76,
    linkedProducts: "Cold Chain, Injectables",
    leadTime: "7.5 days",
    onTimeRate: "88%",
    defectRate: "2.3%",
    status: "Inactive",
    rating: 4.3,
  },
  {
    id: "6",
    name: "PPE Direct Suppliers",
    contact: "Lisa Anderson",
    email: "lisa@ppedirect.com",
    phone: "+1 (555) 678-9012",
    address: "987 Safety Blvd, Phoenix, AZ 85001",
    productsSupplied: 123,
    linkedProducts: "Masks, Gloves, Sanitizers",
    leadTime: "4.7 days",
    onTimeRate: "95%",
    defectRate: "0.9%",
    status: "Active",
    rating: 4.7,
  },
];

export function Suppliers() {
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards");

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
                  {suppliers.length}
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
                  {suppliers.filter((s) => s.status === "Active").length}
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
                <h3 className="text-3xl font-bold text-slate-800">863</h3>
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
                <h3 className="text-3xl font-bold text-slate-800">4.6</h3>
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
            {suppliers.map((supplier) => (
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
                    {suppliers.map((supplier) => (
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
