import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  BarChart3,
  Boxes,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Package,
  ScanBarcode,
  ShieldCheck,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const features = [
  "Batch Tracking",
  "Expiry Management",
  "Purchase Orders",
  "Stock Monitoring",
  "Real-Time Inventory Visibility",
];

const stats = [
  { value: "99.9%", label: "Uptime SLA" },
  { value: "50K+", label: "SKUs Managed" },
  { value: "200+", label: "Enterprises" },
];

export function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-slate-50">
      <div className="relative hidden w-[54%] flex-col overflow-hidden bg-[#0d1b2a] lg:flex">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute -right-32 -top-32 h-[480px] w-[480px] rounded-full bg-teal-500/20 blur-[96px]" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-[320px] w-[320px] rounded-full bg-cyan-600/10 blur-[80px]" />

        <div className="relative z-10 flex h-full flex-col p-12">
          <div className="mb-auto flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="font-semibold tracking-wide text-white">IIMS</span>
          </div>

          <div className="my-auto">
            <h1 className="mb-5 text-[2.1rem] font-bold leading-tight text-white">
              Intelligent Inventory
              <br />
              <span className="text-teal-400">Management System</span>
            </h1>
            <p className="mb-10 max-w-md text-base leading-7 text-slate-300">
              Manage inventory, stock movement, suppliers, batches, and purchase
              orders from a single enterprise platform.
            </p>

            <ul className="mb-12 space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-teal-400" />
                  <span className="text-sm text-slate-200">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-amber-400" />
                <div className="h-3 w-3 rounded-full bg-teal-400" />
                <span className="ml-2 text-xs text-slate-400">
                  inventory-dashboard.iims
                </span>
              </div>
              <div className="mb-4 grid grid-cols-3 gap-3">
                {[
                  { label: "Total SKUs", value: "12,480", icon: Boxes, color: "text-teal-400" },
                  { label: "Low Stock", value: "34", icon: ScanBarcode, color: "text-amber-400" },
                  { label: "Orders", value: "128", icon: BarChart3, color: "text-cyan-400" },
                ].map((kpi) => {
                  const Icon = kpi.icon;
                  return (
                    <div key={kpi.label} className="rounded-xl border border-white/10 bg-white/5 p-3">
                      <Icon className={`mb-2 h-4 w-4 ${kpi.color}`} />
                      <div className={`text-lg font-semibold ${kpi.color}`}>
                        {kpi.value}
                      </div>
                      <div className="text-xs text-slate-400">{kpi.label}</div>
                    </div>
                  );
                })}
              </div>
              <div className="flex h-12 items-end gap-1.5">
                {[60, 80, 45, 90, 70, 55, 85, 75, 65, 95, 50, 88].map((height, index) => (
                  <div
                    key={`${height}-${index}`}
                    className="flex-1 rounded-sm"
                    style={{
                      height: `${height}%`,
                      background:
                        index % 3 === 0
                          ? "rgba(20,184,166,0.7)"
                          : index % 3 === 1
                          ? "rgba(6,182,212,0.4)"
                          : "rgba(20,184,166,0.25)",
                    }}
                  />
                ))}
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Stock movement - last 12 months
              </p>
            </div>
          </div>

          <div className="mt-10 flex gap-10 border-t border-white/10 pt-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-xl font-bold text-teal-400">{stat.value}</div>
                <div className="text-xs text-slate-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center bg-white p-8">
        <div className="mb-8 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500">
            <Package className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="font-semibold text-slate-800">IIMS</div>
            <div className="text-xs text-slate-500">
              Intelligent Inventory Management
            </div>
          </div>
        </div>

        <div className="w-full max-w-[420px]">
          <div className="mb-8">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
              <span className="text-xs font-medium text-teal-700">
                Enterprise Secure Login
              </span>
            </div>
            <h2 className="mb-2 text-3xl font-bold text-slate-900">Welcome back</h2>
            <p className="text-sm text-slate-500">
              Sign in to your IIMS account to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-slate-700">
                Email / Username
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="email"
                  type="text"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="h-11 border-slate-200 bg-slate-50 pl-10 focus:border-teal-500 focus:ring-teal-500/20"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-slate-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="h-11 border-slate-200 bg-slate-50 pl-10 pr-10 focus:border-teal-500 focus:ring-teal-500/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(value) => setRememberMe(Boolean(value))}
                />
                <label htmlFor="remember" className="cursor-pointer select-none text-sm text-slate-600">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm font-medium text-teal-600 hover:text-teal-700">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="h-11 w-full bg-teal-600 font-semibold text-white shadow-sm hover:bg-teal-700">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-teal-600 hover:text-teal-700">
              Create Account
            </Link>
          </p>

          <div className="mt-8 border-t border-slate-100 pt-6 text-center">
            <p className="text-xs text-slate-400">
              Enterprise Inventory Platform - Version 1.0
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Copyright 2024 IIMS Corp. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
