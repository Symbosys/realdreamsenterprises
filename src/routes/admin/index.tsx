import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  MapPin,
  TrendingUp,
  Sliders,
  ArrowUpRight,
  ShieldCheck,
  MessageSquare,
  RefreshCw,
  Phone,
  Clock,
  CheckCircle2,
  Building2,
  Tag,
} from "lucide-react";
import { useGetDashboardStats } from "@/api/dashboard.api";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboardPage,
});

function AdminDashboardPage() {
  const { data: stats, isLoading, isRefetching, refetch } = useGetDashboardStats();

  return (
    <div className="space-y-6">
      {/* Top Banner / Welcome Callout */}
      <div className="relative overflow-hidden rounded-2xl border border-border/80 bg-linear-to-r from-card via-card/90 to-background p-6 md:p-8 shadow-xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 h-64 w-64 rounded-full bg-ember/10 blur-3xl" />
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-[11px] font-bold text-ember uppercase tracking-wider">
              <ShieldCheck className="h-3.5 w-3.5" /> Sole Authorized Supplier
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
              Welcome to Real Dreams Control Panel
            </h2>
            <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
              Live metric monitoring for customer enquiries, 24 Jharkhand supply districts, client contracts, and live TMT steel bar rates.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => refetch()}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3.5 py-2 text-xs font-bold uppercase text-muted-foreground hover:text-foreground hover:border-ember transition-colors cursor-pointer"
              title="Refresh Dashboard"
            >
              <RefreshCw className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`} /> Refresh
            </button>
            <Link
              to="/admin/enquiries"
              className="inline-flex items-center gap-2 rounded-lg bg-ember px-4 py-2.5 text-xs font-bold tracking-wider uppercase text-white shadow-lg shadow-ember/25 transition-transform hover:scale-[1.02]"
            >
              <MessageSquare className="h-4 w-4" /> View Enquiries
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Dynamic Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Metric 1: Enquiries */}
        <div className="rounded-xl border border-border/70 bg-card p-5 shadow-sm hover:border-ember/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Enquiries & Leads</span>
            <div className="p-2 rounded-lg bg-ember/10 text-ember">
              <MessageSquare className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-foreground">
              {isLoading ? "..." : stats?.enquiries.total || 0}
            </span>
            <span className="text-xs text-amber-400 font-extrabold bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
              {stats?.enquiries.newCount || 0} New
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {stats?.enquiries.inFollowUpCount || 0} Leads currently in follow-up
          </p>
          <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Live Customer Submissions</span>
            <Link to="/admin/enquiries" className="text-ember font-bold hover:underline flex items-center gap-0.5">
              CRM Panel →
            </Link>
          </div>
        </div>

        {/* Metric 2: Clients */}
        <div className="rounded-xl border border-border/70 bg-card p-5 shadow-sm hover:border-blue-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">My Clients</span>
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-foreground">
              {isLoading ? "..." : stats?.clients.total || 0}
            </span>
            <span className="text-xs text-emerald-400 font-extrabold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              {stats?.clients.active || 0} Active
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">Government & PWD Contractors</p>
          <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Verified Client Records</span>
            <Link to="/admin/clients" className="text-blue-400 font-bold hover:underline flex items-center gap-0.5">
              Client List →
            </Link>
          </div>
        </div>

        {/* Metric 3: Locations */}
        <div className="rounded-xl border border-border/70 bg-card p-5 shadow-sm hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Serving Locations</span>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <MapPin className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-foreground">
              {isLoading ? "..." : `${stats?.locations.active || 0} / ${stats?.locations.total || 0}`}
            </span>
            <span className="text-xs text-emerald-400 font-extrabold bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded-full">
              Jharkhand
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">Active supply districts</p>
          <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Primary Hub: Ranchi</span>
            <Link to="/admin/locations" className="text-emerald-400 font-bold hover:underline flex items-center gap-0.5">
              Districts →
            </Link>
          </div>
        </div>

        {/* Metric 4: Live Steel Brands */}
        <div className="rounded-xl border border-border/70 bg-card p-5 shadow-sm hover:border-amber-500/40 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Steel Brands</span>
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold tracking-tight text-foreground">
              {isLoading ? "..." : stats?.brands.total || 0}
            </span>
            <span className="text-xs text-amber-400 font-extrabold bg-amber-500/10 border border-amber-500/30 px-2 py-0.5 rounded-full">
              Live Rates
            </span>
          </div>
          <p className="mt-1 text-[11px] text-muted-foreground">Rashmi, JSW Neosteel & SME-TMT</p>
          <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Rate Cards Active</span>
            <Link to="/admin/pricing" className="text-amber-400 font-bold hover:underline flex items-center gap-0.5">
              Manage Rates →
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Customer Enquiries Feed */}
      <div className="rounded-xl border border-border/80 bg-card p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div>
            <h3 className="text-sm font-extrabold text-foreground uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-ember" /> Recent Customer Enquiries
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Latest project briefs submitted from main website contact page.
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-bold text-ember hover:underline flex items-center gap-1"
          >
            View All ({stats?.enquiries.total || 0}) →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="border-b border-border/60 bg-muted/40 text-muted-foreground uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-2.5 px-3">Ref #</th>
                <th className="py-2.5 px-3">Customer</th>
                <th className="py-2.5 px-3">Phone</th>
                <th className="py-2.5 px-3">Requirement</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-muted-foreground">
                    <RefreshCw className="h-4 w-4 animate-spin mx-auto mb-1 text-ember" />
                    Loading recent enquiries...
                  </td>
                </tr>
              ) : stats?.enquiries.recent && stats.enquiries.recent.length > 0 ? (
                stats.enquiries.recent.map((enq) => (
                  <tr key={enq.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3 px-3 font-extrabold text-foreground">{enq.enquiryNumber}</td>
                    <td className="py-3 px-3">
                      <div>
                        <span className="font-bold text-foreground">{enq.name}</span>
                        {enq.companyName && <p className="text-[10px] text-muted-foreground">{enq.companyName}</p>}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground font-medium">{enq.phone}</td>
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-muted text-foreground border border-border/60">
                        <Tag className="h-3 w-3 text-ember" /> {enq.requirementType || "General Quote"}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-extrabold ${
                          enq.status === "NEW"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/30"
                            : enq.status === "WON"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : enq.status === "LOST"
                            ? "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                            : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-muted-foreground text-[10px]">
                      {new Date(enq.createdAt).toLocaleDateString("en-IN", { dateStyle: "medium" })}
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        to="/admin/enquiries"
                        className="px-2.5 py-1 rounded border border-border bg-card text-muted-foreground hover:text-foreground hover:border-ember transition-colors text-[11px] font-bold inline-block"
                      >
                        Manage
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-xs text-muted-foreground">
                    No customer enquiries submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Main Options Shortcut Grid */}
      <div className="rounded-xl border border-border/80 bg-card p-6 space-y-4 shadow-sm">
        <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">
          Quick Access Management Console
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/admin/enquiries"
            className="group flex flex-col p-4 rounded-xl border border-border/60 bg-muted/20 hover:border-ember hover:bg-ember/5 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-ember/10 text-ember group-hover:scale-110 transition-transform">
                <MessageSquare className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-ember transition-colors" />
            </div>
            <h4 className="font-bold text-sm text-foreground">Enquiries & Leads</h4>
            <p className="text-xs text-muted-foreground mt-1">
              View customer briefs, assign sales admins, and record follow-up logs.
            </p>
          </Link>

          <Link
            to="/admin/clients"
            className="group flex flex-col p-4 rounded-xl border border-border/60 bg-muted/20 hover:border-ember hover:bg-ember/5 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-ember/10 text-ember group-hover:scale-110 transition-transform">
                <Users className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-ember transition-colors" />
            </div>
            <h4 className="font-bold text-sm text-foreground">My Clients</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Manage client records, contract details, and supply allocations.
            </p>
          </Link>

          <Link
            to="/admin/locations"
            className="group flex flex-col p-4 rounded-xl border border-border/60 bg-muted/20 hover:border-ember hover:bg-ember/5 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-ember/10 text-ember group-hover:scale-110 transition-transform">
                <MapPin className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-ember transition-colors" />
            </div>
            <h4 className="font-bold text-sm text-foreground">Serving Locations</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Configure active delivery zones across Jharkhand's 24 districts.
            </p>
          </Link>

          <Link
            to="/admin/pricing"
            className="group flex flex-col p-4 rounded-xl border border-border/60 bg-muted/20 hover:border-ember hover:bg-ember/5 transition-all"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 rounded-lg bg-ember/10 text-ember group-hover:scale-110 transition-transform">
                <TrendingUp className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-ember transition-colors" />
            </div>
            <h4 className="font-bold text-sm text-foreground">Live Pricing</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Set real-time rates per metric ton for Fe-500D, Fe-550D, and SME-TMT.
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
