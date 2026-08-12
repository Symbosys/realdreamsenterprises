import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  MapPin,
  CheckCircle2,
  Truck,
  Building,
  Search,
  Check,
  Clock,
  Navigation,
  Plus,
  Edit2,
  Trash2,
  X,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import {
  useGetAdminLocations,
  useCreateLocation,
  useUpdateLocation,
  useDeleteLocation,
  ServingLocationData,
} from "@/api/location.api";

export const Route = createFileRoute("/admin/locations")({
  component: AdminLocationsPage,
});

function AdminLocationsPage() {
  const { data: locations = [], isLoading, isRefetching, refetch } = useGetAdminLocations();
  const createLocationMutation = useCreateLocation();
  const updateLocationMutation = useUpdateLocation();
  const deleteLocationMutation = useDeleteLocation();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedZone, setSelectedZone] = useState<string>("ALL");
  const [successToast, setSuccessToast] = useState("");
  const [errorToast, setErrorToast] = useState("");

  // Add / Edit Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState<ServingLocationData | null>(null);
  const [form, setForm] = useState({
    code: "",
    name: "",
    zone: "South Chotanagpur",
    state: "Jharkhand",
    isHub: false,
    activeSupply: true,
    leadTime: "24-48 Hours",
    stockStatus: "Ready Stock",
  });

  const handleToggleStatus = async (loc: ServingLocationData) => {
    try {
      await updateLocationMutation.mutateAsync({
        id: loc.id,
        input: { activeSupply: !loc.activeSupply },
      });
      setSuccessToast(`District "${loc.name}" supply status set to ${!loc.activeSupply ? "Active" : "Inactive"}.`);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to update status.");
    }
  };

  const handleStartEdit = (loc: ServingLocationData) => {
    setEditingLocation(loc);
    setForm({
      code: loc.code,
      name: loc.name,
      zone: loc.zone,
      state: loc.state,
      isHub: loc.isHub,
      activeSupply: loc.activeSupply,
      leadTime: loc.leadTime,
      stockStatus: loc.stockStatus,
    });
    setShowModal(true);
  };

  const handleDeleteLocation = async (loc: ServingLocationData) => {
    if (!confirm(`Are you sure you want to delete location "${loc.name}"?`)) return;
    try {
      await deleteLocationMutation.mutateAsync(loc.id);
      setSuccessToast(`Location "${loc.name}" deleted.`);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to delete location.");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.zone) {
      setErrorToast("Please fill in location name and zone.");
      return;
    }

    try {
      if (editingLocation) {
        await updateLocationMutation.mutateAsync({
          id: editingLocation.id,
          input: form,
        });
        setSuccessToast(`Location "${form.name}" updated successfully!`);
      } else {
        await createLocationMutation.mutateAsync(form);
        setSuccessToast(`Location "${form.name}" added successfully!`);
      }
      setShowModal(false);
      setEditingLocation(null);
      setForm({
        code: "",
        name: "",
        zone: "South Chotanagpur",
        state: "Jharkhand",
        isHub: false,
        activeSupply: true,
        leadTime: "24-48 Hours",
        stockStatus: "Ready Stock",
      });
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to save location.");
    }
  };

  const filteredLocations = locations.filter((loc) => {
    const matchesSearch =
      loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.zone.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loc.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesZone = selectedZone === "ALL" || loc.zone === selectedZone;
    return matchesSearch && matchesZone;
  });

  const activeCount = locations.filter((l) => l.activeSupply).length;
  const hubList = locations.filter((l) => l.isHub);

  const zones = Array.from(new Set(locations.map((l) => l.zone)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <MapPin className="h-5 w-5 text-ember" /> Serving Locations & Delivery Network
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure supply hubs, lead delivery timeframes, and active district coverage across Jharkhand.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => refetch()}
            className="p-2 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Refresh List"
          >
            <RefreshCw className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingLocation(null);
              setForm({
                code: "",
                name: "",
                zone: "South Chotanagpur",
                state: "Jharkhand",
                isHub: false,
                activeSupply: true,
                leadTime: "24-48 Hours",
                stockStatus: "Ready Stock",
              });
              setShowModal(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-ember px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-ember/20 hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add New Location
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successToast && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-400">
          <CheckCircle2 className="h-5 w-5 shrink-0" /> {successToast}
        </div>
      )}
      {errorToast && (
        <div className="flex items-center justify-between rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-xs font-bold text-destructive">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 shrink-0" /> {errorToast}
          </div>
          <button type="button" onClick={() => setErrorToast("")} className="p-1 text-destructive hover:opacity-80 cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Primary Hubs Info Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-ember/30 bg-ember/10 p-4">
          <div className="flex items-center gap-2 text-ember text-xs font-bold uppercase tracking-wider">
            <Building className="h-4 w-4" /> Active Coverage
          </div>
          <p className="font-extrabold text-foreground text-2xl mt-2">{activeCount} / {locations.length || 24}</p>
          <p className="text-[11px] text-muted-foreground mt-1">Districts actively served across Jharkhand</p>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-4">
          <div className="flex items-center gap-2 text-foreground text-xs font-bold uppercase tracking-wider">
            <Truck className="h-4 w-4 text-blue-400" /> Dispatch Hubs
          </div>
          <p className="font-extrabold text-foreground text-2xl mt-2">{hubList.length} Central Hubs</p>
          <p className="text-[11px] text-muted-foreground mt-1">{hubList.map((h) => h.name).join(", ") || "Ranchi, Jamshedpur, Dhanbad"}</p>
        </div>

        <div className="rounded-xl border border-border/80 bg-card p-4">
          <div className="flex items-center gap-2 text-foreground text-xs font-bold uppercase tracking-wider">
            <Navigation className="h-4 w-4 text-purple-400" /> Express Delivery
          </div>
          <p className="font-extrabold text-foreground text-2xl mt-2">24 Hours Lead</p>
          <p className="text-[11px] text-muted-foreground mt-1">Direct dispatch to major industrial zones</p>
        </div>
      </div>

      {/* Search & Zone Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl border border-border/80 bg-card">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search district name, zone, or code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-ember"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-muted-foreground">Zone:</span>
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-3 py-2 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-ember"
          >
            <option value="ALL">All Zones ({locations.length})</option>
            {zones.map((z) => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* District Cards Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-xs text-muted-foreground">
            <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2 text-ember" />
            Loading serving locations...
          </div>
        ) : filteredLocations.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs text-muted-foreground">
            No locations found matching your filter.
          </div>
        ) : (
          filteredLocations.map((loc) => (
            <div
              key={loc.id}
              className={`rounded-xl border p-4 transition-all flex flex-col justify-between ${
                loc.activeSupply
                  ? "border-border/80 bg-card hover:border-ember/60 shadow-xs"
                  : "border-border/40 bg-muted/20 opacity-70"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
                    {loc.code}
                  </span>
                  <div className="flex items-center gap-1">
                    {loc.isHub && (
                      <span className="bg-ember text-white text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">
                        Hub
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => handleStartEdit(loc)}
                      className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                      title="Edit Location"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteLocation(loc)}
                      className="p-1 text-destructive/80 hover:text-destructive cursor-pointer"
                      title="Delete Location"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
                <h3 className="font-extrabold text-sm text-foreground mt-1">{loc.name}</h3>
                <p className="text-[11px] text-muted-foreground">{loc.zone}, {loc.state}</p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/40 space-y-2">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3 text-ember" /> Delivery Lead:
                  </span>
                  <span className="font-bold text-foreground">{loc.leadTime}</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">Availability:</span>
                  <span className="font-semibold text-emerald-400">{loc.stockStatus}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleStatus(loc)}
                  disabled={updateLocationMutation.isPending}
                  className={`mt-2 w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    loc.activeSupply
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {loc.activeSupply ? (
                    <>
                      <Check className="h-3.5 w-3.5" /> Active Supply
                    </>
                  ) : (
                    "Inactive"
                  )}
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add / Edit Location Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-extrabold text-base text-foreground">
                {editingLocation ? "Edit Serving Location" : "Add New Serving Location"}
              </h3>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">District / Location Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ranchi, Jamshedpur, Bokaro"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Zone / Division</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. South Chotanagpur"
                    value={form.zone}
                    onChange={(e) => setForm({ ...form, zone: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">State</label>
                  <input
                    type="text"
                    required
                    value={form.state}
                    onChange={(e) => setForm({ ...form, state: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Delivery Lead Time</label>
                  <select
                    value={form.leadTime}
                    onChange={(e) => setForm({ ...form, leadTime: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  >
                    <option value="24 Hours">24 Hours</option>
                    <option value="24-48 Hours">24-48 Hours</option>
                    <option value="48 Hours">48 Hours</option>
                    <option value="3-5 Days">3-5 Days</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Stock Availability</label>
                  <select
                    value={form.stockStatus}
                    onChange={(e) => setForm({ ...form, stockStatus: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  >
                    <option value="High Stock">High Stock</option>
                    <option value="Ready Stock">Ready Stock</option>
                    <option value="On Demand">On Demand</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Central Dispatch Hub</label>
                  <select
                    value={form.isHub ? "true" : "false"}
                    onChange={(e) => setForm({ ...form, isHub: e.target.value === "true" })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  >
                    <option value="false">Standard District</option>
                    <option value="true">Central Hub</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Supply Status</label>
                  <select
                    value={form.activeSupply ? "true" : "false"}
                    onChange={(e) => setForm({ ...form, activeSupply: e.target.value === "true" })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  >
                    <option value="true">Active Supply</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-bold hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createLocationMutation.isPending || updateLocationMutation.isPending}
                  className="px-4 py-2 rounded-lg bg-ember text-xs font-bold text-white hover:bg-ember/90 cursor-pointer disabled:opacity-50"
                >
                  {editingLocation ? "Save Location Changes" : "Create Location"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
