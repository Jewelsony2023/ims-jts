import { Link, useLocation } from "react-router";
import {
  Archive,
  ChevronDown,
  FileText,
  FolderTree,
  Package,
  TrendingDown,
  TrendingUp,
  UserCog,
  Users,
  X,
  LayoutDashboard,
} from "lucide-react";
import { Button } from "../ui/button";

export const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: Users, label: "Suppliers", path: "/suppliers" },
  { icon: FolderTree, label: "Categories", path: "/categories" },
  { icon: Package, label: "Products", path: "/products" },
  {
    icon: Archive,
    label: "Inventory",
    path: "/inventory",
  },
  {
    icon: FileText,
    label: "Stock Register",
    path: "/stock-in",
    children: [
      { icon: TrendingUp, label: "Stock In", path: "/stock-in" },
      { icon: TrendingDown, label: "Stock Out", path: "/stock-out" },
    ],
  },
  { icon: UserCog, label: "User Management", path: "/users" },
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

type SidebarProps = {
  isMenuOpen: boolean;
  onCloseMenu: () => void;
};

export function Sidebar({ isMenuOpen, onCloseMenu }: SidebarProps) {
  const location = useLocation();
  const role = localStorage.getItem("role");
  const visibleNavItems =
    role === "Administrator"
      ? navItems
      : navItems.filter((item) => item.path !== "/users");

  return (
    <>
      {isMenuOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-slate-900/40"
          onClick={onCloseMenu}
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
          <Button variant="ghost" size="icon" onClick={onCloseMenu}>
            <X className="h-5 w-5 text-slate-200" />
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const active = isItemActive(location.pathname, item);

            return (
              <div key={item.path} className="group">
                <Link
                  to={item.path}
                  onClick={() => !item.children && onCloseMenu()}
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
                          onClick={onCloseMenu}
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
    </>
  );
}
