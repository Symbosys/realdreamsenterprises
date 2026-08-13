import { createFileRoute, Link, Outlet, useRouterState, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  Users,
  MapPin,
  TrendingUp,
  UserCheck,
  Sliders,
  Menu,
  X,
  ArrowLeft,
  ShieldCheck,
  ChevronRight,
  Sparkles,
  LogOut,
  MessageSquare,
  Image,
  MessageSquareQuote,
  UserCog,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Portal — Real Dreams Enterprises" },
      { name: "description", content: "Management console for Real Dreams Enterprises." },
    ],
  }),
  component: AdminLayout,
});

const NAV_ITEMS = [
  {
    label: "Dashboard",
    to: "/admin",
    icon: LayoutDashboard,
    badge: undefined,
  },
  {
    label: "Enquiries & Leads",
    to: "/admin/enquiries",
    icon: MessageSquare,
    badge: "Leads",
  },
  {
    label: "My Clients",
    to: "/admin/clients",
    icon: Users,
    badge: "24 Active",
  },
  {
    label: "Testimonials",
    to: "/admin/testimonials",
    icon: MessageSquareQuote,
    badge: "Reviews",
  },
  {
    label: "Our Team",
    to: "/admin/team",
    icon: UserCog,
    badge: "Staff",
  },
  {
    label: "Media Gallery",
    to: "/admin/gallery",
    icon: Image,
    badge: "Photos",
  },
  {
    label: "Serving Locations",
    to: "/admin/locations",
    icon: MapPin,
    badge: "24 Districts",
  },
  {
    label: "Live Pricing",
    to: "/admin/pricing",
    icon: TrendingUp,
    badge: "Live Rate",
  },
  {
    label: "Admins",
    to: "/admin/admins",
    icon: UserCheck,
    badge: "Users",
  },
  {
    label: "Web Config",
    to: "/admin/webconfig",
    icon: Sliders,
    badge: undefined,
  },
];

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<{ name: string; email: string; role?: string } | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const stored = localStorage.getItem("adminUser");
      if (stored) {
        setAdminUser(JSON.parse(stored));
      }
    } catch {
      // ignore JSON parse error
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    navigate({ to: "/admin/login" });
  };

  // Get current active section title
  const activeItem =
    NAV_ITEMS.find((item) =>
      item.to === "/admin"
        ? pathname === "/admin" || pathname === "/admin/dashboard"
        : pathname.startsWith(item.to)
    ) || NAV_ITEMS[0];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col md:flex-row relative">
      {/* Mobile Top Navigation Header */}
      <header className="md:hidden flex shrink-0 items-center justify-between px-4 py-3 border-b border-border/60 bg-card/80 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md border border-border bg-muted/40 text-foreground hover:bg-accent transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="flex items-center gap-2">
            <img src="/logo/logo.png" alt="Logo" className="h-7 w-auto object-contain" />
            <span className="font-bold text-xs tracking-wider uppercase text-foreground">
              Admin Panel
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground hover:text-ember transition-colors cursor-pointer"
        >
          <LogOut className="h-3.5 w-3.5" /> Logout
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-xs z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-card/95 border-r border-border/80 flex flex-col transition-transform duration-300 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 shrink-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-6 border-b border-border/60 flex items-center justify-between shrink-0">
          <Link
            to="/admin"
            className="flex items-center gap-3 group"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="relative">
              <img
                src="/logo/logo.png"
                alt="Real Dreams Enterprises"
                className="h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-sm tracking-tight text-foreground">
                  Real Dreams
                </span>
              </div>
              <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-ember flex items-center gap-1">
                <ShieldCheck className="h-3 w-3 inline" /> Admin Control
              </p>
            </div>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-muted-foreground hover:text-foreground p-1 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation Menu */}
        <div className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-bold tracking-[0.25em] uppercase text-muted-foreground/70 mb-3">
            Main Options
          </p>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.to === "/admin"
                ? pathname === "/admin" || pathname === "/admin/dashboard"
                : pathname.startsWith(item.to);

            return (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center justify-between px-3.5 py-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-ember/15 text-ember border border-ember/30 shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-4 w-4 ${isActive ? "text-ember" : "text-muted-foreground"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-ember text-white"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : (
                  isActive && <ChevronRight className="h-3.5 w-3.5 text-ember" />
                )}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer Info */}
        <div className="p-4 m-4 rounded-xl border border-border/60 bg-muted/30 flex flex-col gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-medium text-foreground">System Status: Online</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            Jharkhand Exclusive TMT & SME Steel Supply Network
          </p>
          <Link
            to="/"
            className="mt-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md border border-border/80 bg-card hover:border-ember hover:text-ember text-[11px] font-bold tracking-wider uppercase text-foreground transition-all"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Main Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar */}
        <header className="hidden md:flex sticky top-0 z-30 shrink-0 items-center justify-between px-8 py-4 border-b border-border/60 bg-card/80 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-ember/10 border border-ember/20">
              <activeItem.icon className="h-5 w-5 text-ember" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">
                {activeItem.label}
              </h1>
              <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                <span>Admin</span>
                <ChevronRight className="h-3 w-3" />
                <span className="text-ember font-medium">{activeItem.label}</span>
              </p>
            </div>
          </div>

          {/* Header Quick Actions */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-muted/30 text-xs text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-ember" />
              <span>Authorized Jharkhand Supplier</span>
            </div>

            <div className="h-4 w-px bg-border/60" />

            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-ember/20 border border-ember/40 flex items-center justify-center text-ember font-bold text-xs">
                {adminUser ? adminUser.name.charAt(0).toUpperCase() : "RD"}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-foreground leading-tight">
                  {adminUser ? adminUser.name : "Admin User"}
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {adminUser ? adminUser.email : "superadmin@realdreams.in"}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-2 p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-ember hover:border-ember transition-colors cursor-pointer"
                title="Logout"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
