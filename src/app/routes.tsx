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
      { path: "stock-in", Component: StockIn },
      { path: "stock-out", Component: StockOut },
      { path: "inventory", Component: Inventory },
      { path: "audit-logs", Component: AuditLogs },
      { path: "users", Component: UserManagement },
      { path: "profile", Component: UserProfile },
    ],
  },
]);
