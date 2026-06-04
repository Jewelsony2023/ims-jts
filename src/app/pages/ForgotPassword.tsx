import { useState } from "react";
import { ArrowLeft, CheckCircle2, KeyRound, Mail, Package, ShieldCheck } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

type Step = "email" | "sent";

export function ForgotPassword() {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setStep("sent");
  };

  return (
    <div className="flex min-h-screen overflow-x-hidden bg-slate-50">
      <div className="relative hidden w-[46%] flex-col overflow-hidden bg-[#0d1b2a] p-12 lg:flex">
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
            <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl border border-teal-500/25 bg-teal-500/15">
              <KeyRound className="h-8 w-8 text-teal-400" />
            </div>
            <h2 className="mb-4 text-[1.9rem] font-bold leading-tight text-white">
              Secure Account
              <br />
              <span className="text-teal-400">Recovery</span>
            </h2>
            <p className="mb-10 text-sm leading-7 text-slate-300">
              We take your account security seriously. Password resets are
              verified through your registered enterprise email address.
            </p>
            <div className="space-y-4">
              {[
                { number: "01", title: "Submit your email", desc: "Enter your registered email address below." },
                { number: "02", title: "Check your inbox", desc: "A secure password reset link will be emailed to you." },
                { number: "03", title: "Reset and secure", desc: "Follow the link to create a new strong password." },
              ].map((stepItem) => (
                <div key={stepItem.number} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg border border-teal-500/25 bg-teal-500/15">
                    <span className="text-xs font-bold text-teal-400">{stepItem.number}</span>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">{stepItem.title}</div>
                    <div className="text-xs text-slate-400">{stepItem.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <p className="text-xs text-slate-500">
              Enterprise Inventory Platform - Version 1.0
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center bg-white p-8">
        <div className="mb-6 flex items-center gap-3 lg:hidden">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-500">
            <Package className="h-5 w-5 text-white" />
          </div>
          <span className="font-semibold text-slate-800">IIMS</span>
        </div>

        <div className="w-full max-w-[400px]">
          {step === "email" ? (
            <>
              <div className="mb-8">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
                  <span className="text-xs font-medium text-teal-700">
                    Secure Password Reset
                  </span>
                </div>
                <h2 className="mb-2 text-2xl font-bold text-slate-900">
                  Forgot your password?
                </h2>
                <p className="text-sm leading-6 text-slate-500">
                  Enter the email address linked to your account and we will send
                  you a secure reset link.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-slate-700">
                    Registered Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      className="h-11 border-slate-200 bg-slate-50 pl-9 focus:border-teal-500"
                      required
                    />
                  </div>
                  <p className="text-xs text-slate-400">
                    Use the email address registered with your enterprise account.
                  </p>
                </div>
                <Button type="submit" className="h-11 w-full bg-teal-600 font-semibold text-white shadow-sm hover:bg-teal-700">
                  Send Reset Link
                </Button>
              </form>

              <div className="mt-6 flex justify-center">
                <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-teal-600">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Sign In
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border-2 border-teal-200 bg-teal-50">
                <CheckCircle2 className="h-10 w-10 text-teal-500" />
              </div>
              <h2 className="mb-3 text-2xl font-bold text-slate-900">
                Check your email
              </h2>
              <p className="mb-2 text-sm leading-6 text-slate-500">
                We sent a password reset link to
              </p>
              <p className="mb-8 font-semibold text-teal-600">{email}</p>

              <div className="mb-8 rounded-xl border border-slate-200 bg-slate-50 p-5 text-left">
                <p className="mb-3 text-sm font-semibold text-slate-600">
                  Did not receive the email?
                </p>
                <ul className="space-y-2">
                  {[
                    "Check your spam or junk folder",
                    "Make sure you entered the correct email",
                    "The link expires in 30 minutes",
                  ].map((tip) => (
                    <li key={tip} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-slate-400" />
                      <span className="text-xs text-slate-500">{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                type="button"
                onClick={() => setStep("email")}
                className="mb-4 h-11 w-full rounded-lg border border-slate-200 text-sm font-medium text-slate-600 transition-all hover:border-teal-400 hover:text-teal-600"
              >
                Resend Reset Link
              </button>
              <Link to="/login" className="inline-flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-teal-600">
                <ArrowLeft className="h-4 w-4" />
                Back to Sign In
              </Link>
            </div>
          )}

          <div className="mt-10 border-t border-slate-100 pt-6 text-center">
            <p className="text-xs text-slate-400">
              Enterprise Inventory Platform - Version 1.0 - Copyright 2024 IIMS Corp.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
