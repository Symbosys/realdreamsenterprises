import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Users,
  Search,
  Plus,
  UserCheck,
  Building,
  Mail,
  Phone,
  Linkedin,
  CheckCircle2,
  X,
  Upload,
  Image as ImageIcon,
  Edit2,
  Trash2,
  RefreshCw,
  AlertCircle,
  BadgeCheck,
} from "lucide-react";
import {
  useGetAllTeamMembers,
  useCreateTeamMember,
  useUpdateTeamMember,
  useDeleteTeamMember,
  TeamMemberData,
} from "@/api/team.api";
import { useUploadImage } from "@/api/pricing.api";

export const Route = createFileRoute("/admin/team")({
  component: AdminTeamPage,
});

function AdminTeamPage() {
  const { data: teamMembers = [], isLoading, isRefetching, refetch } = useGetAllTeamMembers();
  const uploadMutation = useUploadImage();
  const createMutation = useCreateTeamMember();
  const updateMutation = useUpdateTeamMember();
  const deleteMutation = useDeleteTeamMember();

  const [searchTerm, setSearchTerm] = useState("");
  const [successToast, setSuccessToast] = useState("");
  const [errorToast, setErrorToast] = useState("");

  // Modal State
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState<TeamMemberData | null>(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
    imageUrl: "",
    email: "",
    phone: "",
    linkedin: "",
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
        const url = await uploadMutation.mutateAsync({ image: base64, folder: "realdreams/team" });
        setForm((prev) => ({ ...prev, imageUrl: url }));
        setSuccessToast("Team member photo uploaded successfully!");
        setTimeout(() => setSuccessToast(""), 3500);
      } catch (err: any) {
        setErrorToast(err.message || "Failed to upload image.");
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleToggleStatus = async (item: TeamMemberData) => {
    try {
      await updateMutation.mutateAsync({
        id: item.id,
        input: { isActive: !item.isActive },
      });
      setSuccessToast(`Team member "${item.name}" set to ${!item.isActive ? "Active" : "Inactive"}.`);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to update status.");
    }
  };

  const handleStartEdit = (item: TeamMemberData) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      role: item.role,
      bio: item.bio || "",
      imageUrl: item.imageUrl || "",
      email: item.email || "",
      phone: item.phone || "",
      linkedin: item.linkedin || "",
      isActive: item.isActive,
    });
    setImagePreview(item.imageUrl || "");
    setShowModal(true);
  };

  const handleDeleteItem = async (item: TeamMemberData) => {
    if (!confirm(`Delete team member "${item.name}"? This action cannot be undone.`)) return;
    try {
      await deleteMutation.mutateAsync(item.id);
      setSuccessToast(`Team member "${item.name}" deleted.`);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to delete team member.");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) {
      setErrorToast("Please enter member name.");
      return;
    }
    if (!form.role.trim()) {
      setErrorToast("Please enter designation / role.");
      return;
    }

    try {
      if (editingItem) {
        await updateMutation.mutateAsync({
          id: editingItem.id,
          input: form,
        });
        setSuccessToast(`Team member "${form.name}" updated successfully!`);
      } else {
        await createMutation.mutateAsync(form);
        setSuccessToast(`Team member "${form.name}" added successfully!`);
      }
      setShowModal(false);
      setEditingItem(null);
      setForm({
        name: "",
        role: "",
        bio: "",
        imageUrl: "",
        email: "",
        phone: "",
        linkedin: "",
        isActive: true,
      });
      setImagePreview("");
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to save team member.");
    }
  };

  const filteredMembers = teamMembers.filter((m) => {
    const q = searchTerm.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.role.toLowerCase().includes(q) ||
      (m.bio && m.bio.toLowerCase().includes(q))
    );
  });

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6">
      {/* Toast Alerts */}
      {successToast && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm animate-in fade-in">
          <CheckCircle2 className="h-5 w-5 shrink-0" />
          <span>{successToast}</span>
        </div>
      )}
      {errorToast && (
        <div className="flex items-center gap-2 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm animate-in fade-in">
          <AlertCircle className="h-5 w-5 shrink-0" />
          <span className="flex-1">{errorToast}</span>
          <button onClick={() => setErrorToast("")} className="hover:text-foreground">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-ember text-sm font-semibold uppercase tracking-wider">
            <Users className="h-4 w-4" />
            Team Management
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight mt-1">
            Our Team Members & Leadership
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Manage company leaders, executives, and team members shown on the About Us page.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => refetch()}
            disabled={isRefetching}
            className="p-2.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:bg-accent transition-colors disabled:opacity-50 cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`} />
          </button>
          <button
            onClick={() => {
              setEditingItem(null);
              setForm({
                name: "",
                role: "",
                bio: "",
                imageUrl: "",
                email: "",
                phone: "",
                linkedin: "",
                isActive: true,
              });
              setImagePreview("");
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-ember text-ember-foreground font-semibold text-sm hover:brightness-110 transition-all shadow-md cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add Team Member
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl border border-border bg-card">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, role or bio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ember/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 text-xs text-muted-foreground border-t sm:border-t-0 pt-3 sm:pt-0">
          <div>
            Total: <span className="font-bold text-foreground">{teamMembers.length}</span>
          </div>
          <div>
            Active:{" "}
            <span className="font-bold text-emerald-400">
              {teamMembers.filter((m) => m.isActive).length}
            </span>
          </div>
        </div>
      </div>

      {/* Grid of Team Member Cards & Table */}
      {isLoading ? (
        <div className="p-12 text-center text-muted-foreground bg-card rounded-xl border border-border">
          <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-ember" />
          Loading team members...
        </div>
      ) : filteredMembers.length === 0 ? (
        <div className="p-12 text-center bg-card rounded-xl border border-border space-y-3">
          <Users className="h-10 w-10 text-muted-foreground/40 mx-auto" />
          <h3 className="font-bold text-foreground">No team members found</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            {searchTerm ? "No member matches your search criteria." : "No team members have been created yet."}
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-4 py-3.5">Member</th>
                  <th className="px-4 py-3.5">Designation / Role</th>
                  <th className="px-4 py-3.5">Bio / Description</th>
                  <th className="px-4 py-3.5">Contact Details</th>
                  <th className="px-4 py-3.5">Status</th>
                  <th className="px-4 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredMembers.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-11 w-11 rounded-full object-cover border border-border"
                          />
                        ) : (
                          <div className="h-11 w-11 rounded-full bg-ember/10 text-ember font-bold flex items-center justify-center border border-ember/20 text-base">
                            {item.name.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="font-bold text-foreground">{item.name}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-ember bg-ember/10 border border-ember/20 px-2.5 py-1 rounded-md">
                        {item.role}
                      </span>
                    </td>

                    <td className="px-4 py-4 max-w-xs">
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {item.bio || "No bio added."}
                      </p>
                    </td>

                    <td className="px-4 py-4">
                      <div className="space-y-1 text-xs text-muted-foreground">
                        {item.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3 text-ember" /> {item.email}
                          </div>
                        )}
                        {item.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-ember" /> {item.phone}
                          </div>
                        )}
                        {item.linkedin && (
                          <div className="flex items-center gap-1">
                            <Linkedin className="h-3 w-3 text-sky-400" /> LinkedIn Profile
                          </div>
                        )}
                        {!item.email && !item.phone && !item.linkedin && (
                          <span className="text-muted-foreground/60 italic">—</span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleToggleStatus(item)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          item.isActive
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20"
                            : "bg-muted text-muted-foreground border-border hover:bg-accent"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            item.isActive ? "bg-emerald-400" : "bg-muted-foreground"
                          }`}
                        />
                        {item.isActive ? "Active" : "Inactive"}
                      </button>
                    </td>

                    <td className="px-4 py-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleStartEdit(item)}
                          className="p-1.5 rounded-md border border-border bg-background hover:bg-accent hover:text-ember transition-colors cursor-pointer"
                          title="Edit Member"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item)}
                          className="p-1.5 rounded-md border border-border bg-background hover:bg-red-500/10 hover:text-red-400 transition-colors cursor-pointer"
                          title="Delete Member"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between p-5 border-b border-border bg-muted/30">
              <h3 className="font-bold text-lg text-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-ember" />
                {editingItem ? "Edit Team Member" : "Add New Team Member"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-5 space-y-4 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Member Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. V. Deshmukh"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ember/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Designation / Role *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Managing Director"
                    value={form.role}
                    onChange={(e) => setForm({ ...form, role: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ember/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Bio / Brief Description
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. 28 years experience in metallurgical engineering..."
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ember/50"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="email@example.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ember/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    Phone
                  </label>
                  <input
                    type="text"
                    placeholder="+91 9876543210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ember/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                    LinkedIn URL
                  </label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={form.linkedin}
                    onChange={(e) => setForm({ ...form, linkedin: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ember/50"
                  />
                </div>
              </div>

              {/* Photo Upload */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                  Member Profile Photo (Optional)
                </label>
                <div className="flex items-center gap-4">
                  {imagePreview ? (
                    <div className="relative h-16 w-16 rounded-full overflow-hidden border border-border shrink-0">
                      <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview("");
                          setForm((prev) => ({ ...prev, imageUrl: "" }));
                        }}
                        className="absolute inset-0 bg-background/70 text-red-400 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  ) : (
                    <div className="h-16 w-16 rounded-full border border-dashed border-border bg-muted/40 flex items-center justify-center text-muted-foreground shrink-0">
                      <ImageIcon className="h-6 w-6" />
                    </div>
                  )}

                  <div className="flex-1">
                    <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background text-xs font-semibold hover:bg-accent cursor-pointer transition-colors">
                      <Upload className="h-3.5 w-3.5" />
                      {uploadingImage ? "Uploading..." : "Upload Photo"}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        disabled={uploadingImage}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[11px] text-muted-foreground mt-1">
                      PNG or JPG. Will upload to Cloudinary.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveTeam"
                  checked={form.isActive}
                  onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
                  className="rounded border-border text-ember focus:ring-ember"
                />
                <label htmlFor="isActiveTeam" className="text-sm font-medium text-foreground cursor-pointer">
                  Display on Website (Active)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-border text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending || uploadingImage}
                  className="px-4 py-2 rounded-lg bg-ember text-ember-foreground font-semibold text-sm hover:brightness-110 transition-all disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending
                    ? "Saving..."
                    : editingItem
                    ? "Update Member"
                    : "Add Team Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
