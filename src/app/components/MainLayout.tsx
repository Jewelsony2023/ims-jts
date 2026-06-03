import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  Users,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Archive,
  FileText,
  UserCog,
  UserCircle,
  Bell,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Package, label: "Products", path: "/products" },
  { icon: FolderTree, label: "Categories", path: "/categories" },
  { icon: Users, label: "Suppliers", path: "/suppliers" },
  { icon: ShoppingCart, label: "Purchase Orders", path: "/purchase-orders" },
  { icon: TrendingUp, label: "Stock In", path: "/stock-in" },
  { icon: TrendingDown, label: "Stock Out", path: "/stock-out" },
  { icon: Archive, label: "Inventory", path: "/inventory" },
  { icon: FileText, label: "Audit Logs", path: "/audit-logs" },
  { icon: UserCog, label: "User Management", path: "/users" },
  { icon: UserCircle, label: "Profile", path: "/profile" },
];

export function MainLayout() {
  const location = useLocation();
  const pageTitle =
    navItems.find((item) => item.path === location.pathname)?.label ||
    (location.pathname.startsWith("/products/") ? "Product Details" : "") ||
    (location.pathname === "/profile" ? "User Profile" : "") ||
    "Dashboard";

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0f172a] text-white flex flex-col shadow-xl">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">InvenTrack</h1>
              <p className="text-xs text-slate-400">Inventory System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                  isActive
                    ? "bg-emerald-500 text-white border-l-4 border-emerald-400"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700">
          <p className="text-xs text-slate-400 text-center">
            © 2026 InvenTrack Pro
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200">
          <div className="flex items-center justify-between px-8 py-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                {pageTitle}
              </h2>
              <p className="text-sm text-slate-500">
                Welcome back, manage your inventory efficiently
              </p>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 hover:bg-slate-100"
                  >
                    <Avatar className="w-9 h-9">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="text-sm font-semibold text-slate-800">
                        John Doe
                      </p>
                      <p className="text-xs text-slate-500">Administrator</p>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Preferences</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto bg-slate-50 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
