import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { ShieldCheck, Mail, Lock, LogIn, AlertCircle, ArrowLeft } from "lucide-react";
import { useAdminLogin } from "@/api/admin.api";

export const Route = createFileRoute("/admin/login")({
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const loginMutation = useAdminLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
      const user = typeof window !== "undefined" ? localStorage.getItem("adminUser") : null;
      if (token && user) {
        navigate({ to: "/admin" });
      }
    } catch {
      // ignore error
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setError("");

    try {
      const data = await loginMutation.mutateAsync({ email, password });

      // Save user session in localStorage
      if (data.token) {
        localStorage.setItem("adminToken", data.token);
      }
      if (data.data) {
        localStorage.setItem("adminUser", JSON.stringify(data.data));
      }

      // Redirect to admin dashboard
      navigate({ to: "/admin" });
    } catch (err: any) {
      setError(err.message || "Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-ember/15 rounded-full blur-3xl pointer-events-none" />
      
      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand / Logo Header */}
        <div className="text-center space-y-3">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-ember transition-colors mb-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Main Site
          </Link>

          <div className="flex justify-center">
            <img
              src="/logo/logo.png"
              alt="Real Dreams Enterprises"
              className="h-14 w-auto object-contain"
            />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-[11px] font-bold text-ember uppercase tracking-wider mb-2">
              <ShieldCheck className="h-3.5 w-3.5" /> Sole Authorized Supplier
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground font-display">
              Admin Portal Login
            </h1>
            <p className="text-xs text-muted-foreground mt-1">
              Real Dreams Enterprises Management Console
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-border/80 bg-card p-6 md:p-8 shadow-2xl space-y-6 backdrop-blur-md">
          {error && (
            <div className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-xs font-semibold text-destructive">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="email"
                  required
                  placeholder="admin@realdreams.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-ember transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-xs rounded-xl border border-border bg-background text-foreground focus:outline-none focus:border-ember transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full py-3 px-4 rounded-xl bg-ember hover:bg-ember/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-ember/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loginMutation.isPending ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <LogIn className="h-4 w-4" /> Secure Admin Sign In
                </>
              )}
            </button>
          </form>

          <div className="pt-4 border-t border-border/60 text-center">
            <p className="text-[11px] text-muted-foreground">
              Unauthorized access is monitored and logged.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
