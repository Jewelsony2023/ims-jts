import { createBrowserRouter } from "react-router";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { ForgotPassword } from "./pages/ForgotPassword";
import { Dashboard } from "./pages/Dashboard";
import { Products } from "./pages/Products";
import { Categories } from "./pages/Categories";
import { Suppliers } from "./pages/Suppliers";
import { StockIn } from "./pages/StockIn";
import { StockOut } from "./pages/StockOut";
import { Inventory } from "./pages/Inventory";
import { UserManagement } from "./pages/UserManagement";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { MainLayout } from "./components/layout/MainLayout";

export const router = createBrowserRouter([
  { path: "/login", Component: Login },
  { path: "/register", Component: Register },
  { path: "/forgot-password", Component: ForgotPassword },
  {
    path: "/",
    Component: ProtectedRoute,
    children: [
      {
        Component: MainLayout,
        children: [
          { index: true, Component: Dashboard },
          { path: "products", Component: Products },
          { path: "categories", Component: Categories },
          { path: "suppliers", Component: Suppliers },
          { path: "stock-in", Component: StockIn },
          { path: "stock-out", Component: StockOut },
          { path: "inventory", Component: Inventory },
          {
            path: "users",
            Component: () => <ProtectedRoute allowedRoles={["Administrator"]} />,
            children: [{ index: true, Component: UserManagement }],
          },
        ],
      },
    ],
  },
]);
