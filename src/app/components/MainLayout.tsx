import { useState, useEffect } from "react";
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
  Menu,
  X,
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const pageTitle =
    navItems.find((item) => item.path === location.pathname)?.label ||
    (location.pathname.startsWith("/products/") ? "Product Details" : "") ||
    (location.pathname === "/profile" ? "User Profile" : "") ||
    "Dashboard";

  // Close sidebar when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-[#0f172a] to-[#1a2332] text-white flex flex-col shadow-xl transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Logo & Company Branding */}
        <div className="p-6 border-b border-slate-700 bg-[#0f172a]">
          <div className="flex items-center gap-3">
            {/* Logo */}
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
              <Package className="w-7 h-7 text-white" />
            </div>
            {/* Company Name */}
            <div className="flex-1 min-w-0">
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent truncate">
                InvenTrack
              </h1>
              <p className="text-xs text-slate-400 truncate">Inventory System</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 space-y-1 px-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                  isActive
                    ? "bg-emerald-500 text-white shadow-lg"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? "text-white" : "text-slate-400 group-hover:text-emerald-400"}`} />
                <span className="text-sm font-medium truncate">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1 h-6 bg-white rounded-full"></div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-700 bg-slate-900 text-center">
          <p className="text-xs text-slate-400">
            © 2026 InvenTrack Pro
          </p>
          <p className="text-xs text-slate-500 mt-1">v1.0.0</p>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden w-full">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 gap-4">
            {/* Mobile Menu & Title */}
            <div className="flex items-center gap-4 flex-1 min-w-0">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? (
                  <X className="w-6 h-6 text-slate-700" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-700" />
                )}
              </button>

              {/* Page Title */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800 truncate">
                  {pageTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 hidden sm:block">
                  Welcome back, manage your inventory efficiently
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 sm:gap-3 hover:bg-slate-100 px-2 sm:px-3"
                  >
                    <Avatar className="w-8 h-8 sm:w-9 sm:h-9">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="text-left hidden sm:block">
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
        <main className="flex-1 overflow-auto bg-slate-50 p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
