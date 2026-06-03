import { useState } from "react";
import { useNavigate } from "react-router";
import { Package, Lock, User } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Checkbox } from "../components/ui/checkbox";

export function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
              <Package className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">InvenTrack</h1>
              <p className="text-sm text-slate-500">Inventory Management System</p>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-slate-800 mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-600">
              Sign in to manage your inventory efficiently
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username">Username or Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10 bg-slate-50 border-slate-300 h-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 bg-slate-50 border-slate-300 h-12"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className="text-sm text-slate-600 cursor-pointer"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Forgot Password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            <p>Enterprise-grade inventory management for pharmaceutical,</p>
            <p>food, and retail industries</p>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 items-center justify-center p-8">
        <div className="max-w-lg text-white">
          <div className="mb-8">
            <div className="w-24 h-24 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <Package className="w-14 h-14 text-emerald-400" />
            </div>
            <h2 className="text-4xl font-bold mb-4 text-center">
              Enterprise Inventory Management
            </h2>
            <p className="text-slate-300 text-center text-lg">
              Manage your pharmaceutical, food, and retail inventory with
              precision. Track expiry dates, monitor stock levels, and optimize
              your supply chain operations.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-12">
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
              <h3 className="font-semibold text-emerald-400 mb-2">Real-time Tracking</h3>
              <p className="text-sm text-slate-300">
                Monitor inventory levels across all locations
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
              <h3 className="font-semibold text-emerald-400 mb-2">Expiry Management</h3>
              <p className="text-sm text-slate-300">
                Prevent losses with automated expiry alerts
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
              <h3 className="font-semibold text-emerald-400 mb-2">Audit Trails</h3>
              <p className="text-sm text-slate-300">
                Complete visibility into all transactions
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4">
              <h3 className="font-semibold text-emerald-400 mb-2">Multi-user Support</h3>
              <p className="text-sm text-slate-300">
                Role-based access for team collaboration
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
