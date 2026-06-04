import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Package,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

const roleOptions = [
  { value: "administrator", label: "Administrator", desc: "Full system access" },
  { value: "inventory_manager", label: "Inventory Manager", desc: "Manage stock and orders" },
  { value: "inventory_staff", label: "Inventory Staff", desc: "View and update stock" },
];

const departmentOptions = [
  "Warehouse Operations",
  "Procurement",
  "Pharmacy",
  "Retail",
  "Logistics",
  "Finance",
  "IT / System Admin",
  "Other",
];

export function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [selectedRole, setSelectedRole] = useState("inventory_staff");
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const setField =
    (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((current) => ({ ...current, [key]: event.target.value }));

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-slate-50">
      <div className="relative hidden w-[42%] flex-col overflow-hidden bg-[#0d1b2a] p-12 lg:flex">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-teal-500/20 blur-[80px]" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 h-72 w-72 rounded-full bg-cyan-600/10 blur-[60px]" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-auto flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-500 shadow-lg">
              <Package className="h-6 w-6 text-white" />
            </div>
            <span className="font-semibold tracking-wide text-white">IIMS</span>
          </div>

          <div className="my-auto">
            <h2 className="mb-4 text-[1.9rem] font-bold leading-tight text-white">
              Join the Enterprise
              <br />
              <span className="text-teal-400">Inventory Platform</span>
            </h2>
            <p className="mb-10 text-sm leading-7 text-slate-300">
              Create your account and start managing inventory with precision,
              efficiency, and full audit transparency.
            </p>
            <div className="space-y-3">
              {roleOptions.map((role) => (
                <div key={role.value} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
                  <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-teal-400" />
                  <div>
                    <div className="text-sm font-semibold text-white">{role.label}</div>
                    <div className="text-xs text-slate-400">{role.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-xl border border-teal-500/20 bg-teal-500/10 p-4">
              <div className="mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-teal-400" />
                <span className="text-xs font-semibold text-teal-300">
                  Enterprise Security
                </span>
              </div>
              <p className="text-xs leading-6 text-slate-400">
                All accounts are role-restricted and audited. Access is
                provisioned by system administrators after approval.
              </p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-xs text-slate-500">
              Enterprise Inventory Platform - Version 1.0
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center overflow-y-auto bg-white p-8">
        <div className="mb-6 flex items-center gap-3 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500">
            <Package className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-slate-800">IIMS</span>
        </div>

        <div className="w-full max-w-[480px]">
          <div className="mb-7">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1">
              <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
              <span className="text-xs font-medium text-teal-700">
                New Account Registration
              </span>
            </div>
            <h2 className="mb-1 text-2xl font-bold text-slate-900">
              Create your account
            </h2>
            <p className="text-sm text-slate-500">
              Fill in your details to request access to the platform.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Full Name" icon={User}>
                <Input id="fullName" placeholder="John Dela Cruz" value={form.fullName} onChange={setField("fullName")} className="h-10 border-slate-200 bg-slate-50 pl-9" required />
              </Field>
              <Field label="Username">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">@</span>
                <Input id="username" placeholder="jdelacruz" value={form.username} onChange={setField("username")} className="h-10 border-slate-200 bg-slate-50 pl-7" required />
              </Field>
            </div>

            <Field label="Email Address" icon={Mail}>
              <Input id="email" type="email" placeholder="john@company.com" value={form.email} onChange={setField("email")} className="h-10 border-slate-200 bg-slate-50 pl-9" required />
            </Field>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Phone Number" icon={Phone}>
                <Input id="phone" type="tel" placeholder="+63 9XX XXX XXXX" value={form.phone} onChange={setField("phone")} className="h-10 border-slate-200 bg-slate-50 pl-9" />
              </Field>
              <div className="space-y-1.5">
                <Label htmlFor="department" className="text-slate-700">Department</Label>
                <div className="relative">
                  <Building2 className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <select id="department" value={form.department} onChange={setField("department")} className="h-10 w-full appearance-none rounded-md border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-800 focus:border-teal-500 focus:outline-none" required>
                    <option value="">Select dept.</option>
                    {departmentOptions.map((department) => (
                      <option key={department} value={department}>{department}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-700">Role</Label>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                {roleOptions.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setSelectedRole(role.value)}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      selectedRole === role.value
                        ? "border-teal-500 bg-teal-50 ring-2 ring-teal-500/20"
                        : "border-slate-200 bg-slate-50 hover:border-teal-300"
                    }`}
                  >
                    <div className={selectedRole === role.value ? "text-xs font-semibold text-teal-700" : "text-xs font-semibold text-slate-700"}>
                      {role.label}
                    </div>
                    <div className="mt-0.5 text-xs text-slate-400">{role.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <PasswordField
                id="password"
                label="Password"
                placeholder="Min. 8 characters"
                value={form.password}
                visible={showPassword}
                onToggle={() => setShowPassword((visible) => !visible)}
                onChange={setField("password")}
              />
              <PasswordField
                id="confirmPassword"
                label="Confirm Password"
                placeholder="Re-enter password"
                value={form.confirmPassword}
                visible={showConfirm}
                onToggle={() => setShowConfirm((visible) => !visible)}
                onChange={setField("confirmPassword")}
              />
            </div>

            <div className="flex items-start gap-3 pt-1">
              <Checkbox id="terms" checked={agreed} onCheckedChange={(value) => setAgreed(Boolean(value))} className="mt-0.5" />
              <label htmlFor="terms" className="cursor-pointer text-sm leading-snug text-slate-600">
                I agree to the{" "}
                <a href="#" className="font-medium text-teal-600 hover:text-teal-700">Terms and Conditions</a>
                {" "}and{" "}
                <a href="#" className="font-medium text-teal-600 hover:text-teal-700">Privacy Policy</a>
              </label>
            </div>

            <Button type="submit" disabled={!agreed} className="h-11 w-full bg-teal-600 font-semibold text-white shadow-sm hover:bg-teal-700 disabled:opacity-50">
              Create Account
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-teal-600 hover:text-teal-700">Sign In</Link>
          </p>
          <div className="mt-6 border-t border-slate-100 pt-5 text-center">
            <p className="text-xs text-slate-400">
              Enterprise Inventory Platform - Version 1.0 - Copyright 2024 IIMS Corp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-slate-700">{label}</Label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />}
        {children}
      </div>
    </div>
  );
}

function PasswordField({
  id,
  label,
  placeholder,
  value,
  visible,
  onToggle,
  onChange,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  visible: boolean;
  onToggle: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-slate-700">{label}</Label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input id={id} type={visible ? "text" : "password"} placeholder={placeholder} value={value} onChange={onChange} className="h-10 border-slate-200 bg-slate-50 pl-9 pr-9" required />
        <button type="button" onClick={onToggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
          {visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
