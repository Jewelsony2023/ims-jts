import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { ProductDetails } from "./pages/ProductDetails";
import { Categories } from "./pages/Categories";
import { Suppliers } from "./pages/Suppliers";
import { PurchaseOrders } from "./pages/PurchaseOrders";
import { StockIn } from "./pages/StockIn";
import { StockOut } from "./pages/StockOut";
import { Inventory } from "./pages/Inventory";
import { AuditLogs } from "./pages/AuditLogs";
import { UserManagement } from "./pages/UserManagement";
import { UserProfile } from "./pages/UserProfile";
import { Settings } from "./pages/Settings";
import { MainLayout } from "./components/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    Component: MainLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "products", Component: Products },
      { path: "products/:id", Component: ProductDetails },
      { path: "categories", Component: Categories },
      { path: "suppliers", Component: Suppliers },
      { path: "purchase-orders", Component: PurchaseOrders },
      { path: "inventory", Component: Inventory },
      { path: "inventory/stock-in", Component: StockIn },
      { path: "inventory/stock-out", Component: StockOut },
      { path: "stock-in", Component: StockIn },
      { path: "stock-out", Component: StockOut },
      { path: "audit-logs", Component: AuditLogs },
      { path: "users", Component: UserManagement },
      { path: "profile", Component: UserProfile },
      { path: "settings", Component: Settings },
    ],
  },
]);
