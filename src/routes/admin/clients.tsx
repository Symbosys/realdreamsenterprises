import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Users,
  Search,
  Plus,
  Building2,
  MapPin,
  CheckCircle2,
  X,
  Upload,
  Image as ImageIcon,
  Edit2,
  Trash2,
  RefreshCw,
  AlertCircle,
  Award,
} from "lucide-react";
import {
  useGetAdminClients,
  useCreateClient,
  useUpdateClient,
  useDeleteClient,
  MyClientData,
} from "@/api/client.api";
import { useUploadImage } from "@/api/pricing.api";

export const Route = createFileRoute("/admin/clients")({
  component: AdminClientsPage,
});

function AdminClientsPage() {
  const { data: clients = [], isLoading, isRefetching, refetch } = useGetAdminClients();
  const uploadMutation = useUploadImage();
  const createClientMutation = useCreateClient();
  const updateClientMutation = useUpdateClient();
  const deleteClientMutation = useDeleteClient();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [successToast, setSuccessToast] = useState("");
  const [errorToast, setErrorToast] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState<MyClientData | null>(null);
  const [form, setForm] = useState({
    clientName: "",
    category: "Government & Infra",
    location: "",
    badge: "Client Partner",
    clientImage: "",
    isActive: true,
  });

  // Image Upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setImagePreview(base64);

      setUploadingImage(true);
      try {
        const url = await uploadMutation.mutateAsync({ image: base64, folder: "realdreams/clients" });
        setForm((prev) => ({ ...prev, clientImage: url }));
        setSuccessToast("Client logo uploaded to Cloudinary!");
        setTimeout(() => setSuccessToast(""), 3500);
      } catch (err: any) {
        setErrorToast(err.message || "Failed to upload image.");
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleToggleStatus = async (client: MyClientData) => {
    try {
      await updateClientMutation.mutateAsync({
        id: client.id,
        input: { isActive: !client.isActive },
      });
      setSuccessToast(`Client "${client.clientName}" set to ${!client.isActive ? "Active" : "Inactive"}.`);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to update status.");
    }
  };

  const handleStartEdit = (client: MyClientData) => {
    setEditingClient(client);
    setForm({
      clientName: client.clientName,
      category: client.category,
      location: client.location || "",
      badge: client.badge || "Client Partner",
      clientImage: client.clientImage,
      isActive: client.isActive,
    });
    setImagePreview(client.clientImage);
    setShowModal(true);
  };

  const handleDeleteClient = async (client: MyClientData) => {
    if (!confirm(`Delete client "${client.clientName}"? This will also remove its Cloudinary logo image.`)) return;
    try {
      await deleteClientMutation.mutateAsync(client.id);
      setSuccessToast(`Client "${client.clientName}" and its Cloudinary logo deleted.`);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to delete client.");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.clientName) {
      setErrorToast("Please enter client name.");
      return;
    }
    if (!form.clientImage) {
      setErrorToast("Please upload a client logo image.");
      return;
    }

    try {
      if (editingClient) {
        await updateClientMutation.mutateAsync({
          id: editingClient.id,
          input: form,
        });
        setSuccessToast(`Client "${form.clientName}" updated successfully! Old logo replaced.`);
      } else {
        await createClientMutation.mutateAsync(form);
        setSuccessToast(`Client "${form.clientName}" created successfully!`);
      }
      setShowModal(false);
      setEditingClient(null);
      setForm({
        clientName: "",
        category: "Government & Infra",
        location: "",
        badge: "Client Partner",
        clientImage: "",
        isActive: true,
      });
      setImagePreview("");
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to save client.");
    }
  };

  const filteredClients = clients.filter((c) => {
    const matchesSearch =
      c.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (c.location && c.location.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (c.badge && c.badge.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || c.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Government & Infra", "Industrial & Energy", "Commercial & Developers"];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Users className="h-5 w-5 text-ember" /> My Clients Directory
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage government departments, infrastructure contractors, and corporate client logos.
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
              setEditingClient(null);
              setForm({
                clientName: "",
                category: "Government & Infra",
                location: "",
                badge: "Client Partner",
                clientImage: "",
                isActive: true,
              });
              setImagePreview("");
              setShowModal(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-ember px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-ember/20 hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add New Client
          </button>
        </div>
      </div>

      {/* Toast Notifications */}
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

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-border/80 bg-card">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by client name, location, or badge..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-ember"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? "bg-ember text-white shadow-sm"
                  : "bg-muted/40 text-muted-foreground hover:bg-muted"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading ? (
          <div className="col-span-full py-12 text-center text-xs text-muted-foreground">
            <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2 text-ember" />
            Loading clients directory...
          </div>
        ) : filteredClients.length === 0 ? (
          <div className="col-span-full py-12 text-center text-xs text-muted-foreground">
            No clients found matching your filter criteria.
          </div>
        ) : (
          filteredClients.map((client) => (
            <div
              key={client.id}
              className={`rounded-xl border p-4 transition-all flex flex-col justify-between ${
                client.isActive
                  ? "border-border/80 bg-card hover:border-ember/60 shadow-xs"
                  : "border-border/40 bg-muted/20 opacity-70"
              }`}
            >
              <div>
                {/* Logo Image Preview */}
                <div className="h-24 w-full rounded-lg bg-muted/40 border border-border/60 flex items-center justify-center p-3 mb-3">
                  <img
                    src={client.clientImage}
                    alt={client.clientName}
                    className="max-h-16 w-auto max-w-full object-contain"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[9px] font-bold bg-ember/10 text-ember border border-ember/30">
                    <Building2 className="h-3 w-3" /> {client.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleStartEdit(client)}
                      className="p-1 text-muted-foreground hover:text-foreground cursor-pointer"
                      title="Edit Client"
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteClient(client)}
                      className="p-1 text-destructive/80 hover:text-destructive cursor-pointer"
                      title="Delete Client"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="font-extrabold text-sm text-foreground mt-2">{client.clientName}</h3>
                {client.location && (
                  <p className="text-[11px] text-muted-foreground flex items-center gap-1 mt-0.5">
                    <MapPin className="h-3 w-3 text-ember" /> {client.location}
                  </p>
                )}
                {client.badge && (
                  <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1 mt-1">
                    <Award className="h-3 w-3" /> {client.badge}
                  </p>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-border/40">
                <button
                  type="button"
                  onClick={() => handleToggleStatus(client)}
                  disabled={updateClientMutation.isPending}
                  className={`w-full py-1.5 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer ${
                    client.isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {client.isActive ? (
                    <>
                      <CheckCircle2 className="h-3.5 w-3.5" /> Active Client
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

      {/* Add / Edit Client Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-extrabold text-base text-foreground">
                {editingClient ? "Edit Client Credentials" : "Add New Client & Logo"}
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
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Client / Department Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jharkhand PWD or Tata Steel"
                  value={form.clientName}
                  onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  >
                    <option value="Government & Infra">Government & Infra</option>
                    <option value="Industrial & Energy">Industrial & Energy</option>
                    <option value="Commercial & Developers">Commercial & Developers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Location / District</label>
                  <input
                    type="text"
                    placeholder="e.g. Ranchi, Jharkhand"
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Badge / Tagline</label>
                <input
                  type="text"
                  placeholder="e.g. Government Sector or EPC Contractor"
                  value={form.badge}
                  onChange={(e) => setForm({ ...form, badge: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              {/* Gallery Image Picker & Cloudinary Upload */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Client Logo Image <span className="text-[10px] text-amber-400 font-normal">(Cloudinary Gallery Upload)</span>
                </label>
                <div className="flex items-center gap-4 p-3 rounded-xl border border-dashed border-border/80 bg-muted/20">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-14 w-14 object-contain rounded-lg border border-border bg-background" />
                  ) : (
                    <div className="h-14 w-14 rounded-lg bg-muted border border-border flex items-center justify-center text-muted-foreground">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                  )}

                  <div className="flex-1 space-y-1">
                    <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ember/10 text-ember border border-ember/30 text-xs font-bold cursor-pointer hover:bg-ember hover:text-white transition-colors">
                      <Upload className="h-3.5 w-3.5" />
                      <span>{uploadingImage ? "Uploading to Cloudinary..." : "Choose Image from Gallery"}</span>
                      <input type="file" accept="image/*" onChange={handleImageFileChange} className="hidden" />
                    </label>
                    {form.clientImage && (
                      <p className="text-[10px] text-emerald-400 truncate max-w-xs font-semibold">
                        Cloudinary URL: {form.clientImage}
                      </p>
                    )}
                  </div>
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
                  disabled={createClientMutation.isPending || updateClientMutation.isPending || uploadingImage}
                  className="px-4 py-2 rounded-lg bg-ember text-xs font-bold text-white hover:bg-ember/90 cursor-pointer disabled:opacity-50"
                >
                  {editingClient ? "Save Client Changes" : "Create Client"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
