import { useState } from "react";
import { Outlet, Link, useLocation } from "react-router";
import {
  Archive,
  Bell,
  ChevronDown,
  FileText,
  FolderTree,
  LogOut,
  Menu,
  Package,
  PackageCheck,
  Settings,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  UserCircle,
  UserCog,
  Users,
  X,
  LayoutDashboard,
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
  {
    icon: Archive,
    label: "Inventory",
    path: "/inventory",
    children: [
      { icon: PackageCheck, label: "Inventory View", path: "/inventory" },
      { icon: TrendingUp, label: "Stock In", path: "/inventory/stock-in" },
      { icon: TrendingDown, label: "Stock Out", path: "/inventory/stock-out" },
    ],
  },
  { icon: Package, label: "Products", path: "/products" },
  { icon: ShoppingCart, label: "Purchase Orders", path: "/purchase-orders" },
  { icon: FolderTree, label: "Categories", path: "/categories" },
  { icon: Users, label: "Suppliers", path: "/suppliers" },
  { icon: FileText, label: "Audit Logs", path: "/audit-logs" },
  { icon: UserCog, label: "User Management", path: "/users" },
  { icon: UserCircle, label: "Profile", path: "/profile" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

function isItemActive(pathname: string, item: (typeof navItems)[number]) {
  if (item.path === "/") {
    return pathname === "/";
  }

  return (
    pathname === item.path ||
    pathname.startsWith(`${item.path}/`) ||
    item.children?.some((child) => pathname === child.path)
  );
}

export function MainLayout() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const flatItems = navItems.flatMap((item) =>
    item.children ? [item, ...item.children] : [item],
  );
  const pageTitle =
    flatItems.find((item) => item.path === location.pathname)?.label ||
    (location.pathname.startsWith("/products/") ? "Product Details" : "") ||
    "Dashboard";

  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50">
      {isMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-slate-900/40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 max-w-[88vw] transform flex-col bg-[#0f172a] text-white shadow-xl transition-transform duration-300 ${
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-700 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">InvenTrack</h1>
              <p className="text-xs text-slate-400">Inventory System</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
            <X className="h-5 w-5 text-slate-200" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(location.pathname, item);

            return (
              <div key={item.path} className="group">
                <Link
                  to={item.path}
                  onClick={() => !item.children && setIsMenuOpen(false)}
                  className={`mx-3 flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                    active
                      ? "bg-emerald-500 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="flex-1 text-sm font-medium">{item.label}</span>
                  {item.children && (
                    <ChevronDown className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </Link>
                {item.children && (
                  <div className="mx-3 grid max-h-0 overflow-hidden border-l border-slate-700 pl-4 transition-all duration-300 group-hover:mb-2 group-hover:mt-1 group-hover:max-h-40">
                    <div className="space-y-1">
                    {item.children.map((child) => {
                      const ChildIcon = child.icon;
                      const childActive = location.pathname === child.path;
                      return (
                        <Link
                          key={child.path}
                          to={child.path}
                          onClick={() => setIsMenuOpen(false)}
                          className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                            childActive
                              ? "bg-slate-700 text-white"
                              : "text-slate-400 hover:bg-slate-800 hover:text-white"
                          }`}
                        >
                          <ChildIcon className="h-4 w-4" />
                          {child.label}
                        </Link>
                      );
                    })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      <div className="flex min-h-screen min-w-0 flex-col">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white shadow-sm">
          <div className="flex min-w-0 items-center justify-between gap-4 px-4 py-4 md:px-8">
            <div className="flex min-w-0 items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                className="bg-white"
                onClick={() => setIsMenuOpen((open) => !open)}
              >
                <Menu className="h-5 w-5 text-slate-700" />
              </Button>
              <div className="min-w-0">
                <h2 className="truncate text-xl font-bold text-slate-800 md:text-2xl">
                  {pageTitle}
                </h2>
                <p className="hidden text-sm text-slate-500 sm:block">
                  Manage inventory workflows with full-width workspace
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="gap-3 hover:bg-slate-100">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <div className="hidden text-left md:block">
                      <p className="text-sm font-semibold text-slate-800">John Doe</p>
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
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Preferences</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/login" className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="min-w-0 flex-1 overflow-x-hidden bg-slate-50 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
