import { useLocation, useNavigate } from "react-router";
import { Bell, LogOut, Menu } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { navItems } from "./Sidebar";

type HeaderProps = {
  onToggleMenu: () => void;
};

export function Header({ onToggleMenu }: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const flatItems = navItems.flatMap((item) =>
    item.children ? [item, ...item.children] : [item],
  );
  const pageTitle =
    flatItems.find((item) => item.path === location.pathname)?.label ||
    (location.pathname.startsWith("/products/") ? "Product Details" : "") ||
    "Dashboard";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white shadow-sm">
      <div className="flex min-w-0 items-center justify-between gap-4 px-4 py-4 md:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            className="bg-white"
            onClick={onToggleMenu}
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
              <DropdownMenuItem>My Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
