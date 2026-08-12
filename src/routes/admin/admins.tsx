import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  UserCheck,
  UserPlus,
  Shield,
  Search,
  CheckCircle2,
  XCircle,
  X,
  Trash2,
  Edit2,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import {
  useGetAdmins,
  useCreateAdmin,
  useUpdateAdmin,
  useDeleteAdmin,
  AdminUser,
} from "@/api/admin.api";

export const Route = createFileRoute("/admin/admins")({
  component: AdminAdminsPage,
});

function AdminAdminsPage() {
  const { data: admins = [], isLoading, isRefetching, refetch, error: queryError } = useGetAdmins();
  const createAdminMutation = useCreateAdmin();
  const updateAdminMutation = useUpdateAdmin();
  const deleteAdminMutation = useDeleteAdmin();

  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<AdminUser | null>(null);
  const [successToast, setSuccessToast] = useState("");
  const [errorToast, setErrorToast] = useState("");

  // Form state for adding new admin
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN" as "ADMIN" | "SUBADMIN",
    isActive: true,
  });

  // Form state for editing admin
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN" as "ADMIN" | "SUBADMIN",
    isActive: true,
  });

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setErrorToast("Please fill in name, email, and password.");
      return;
    }

    try {
      const data = await createAdminMutation.mutateAsync(formData);
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "ADMIN",
        isActive: true,
      });
      setShowModal(false);
      setSuccessToast(`Admin account created for ${data.data.name}!`);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to create admin.");
    }
  };

  const handleStartEdit = (adm: AdminUser) => {
    setEditingAdmin(adm);
    setEditFormData({
      name: adm.name,
      email: adm.email,
      password: "",
      role: adm.role,
      isActive: adm.isActive,
    });
  };

  const handleUpdateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAdmin) return;

    try {
      const payload: any = {
        name: editFormData.name,
        email: editFormData.email,
        role: editFormData.role,
        isActive: editFormData.isActive,
      };
      if (editFormData.password) {
        payload.password = editFormData.password;
      }

      const data = await updateAdminMutation.mutateAsync({
        id: editingAdmin.id,
        input: payload,
      });

      setEditingAdmin(null);
      setSuccessToast(`Admin account updated for ${data.data.name}!`);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to update admin.");
    }
  };

  const toggleAdminStatus = async (adm: AdminUser) => {
    try {
      const data = await updateAdminMutation.mutateAsync({
        id: adm.id,
        input: { isActive: !adm.isActive },
      });

      setSuccessToast(
        `Admin ${data.data.name} is now ${data.data.isActive ? "Active" : "Inactive"}.`
      );
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to toggle status.");
    }
  };

  const handleDeleteAdmin = async (id: number, name: string) => {
    if (!confirm(`Are you sure you want to delete admin "${name}"?`)) return;

    try {
      await deleteAdminMutation.mutateAsync(id);
      setSuccessToast(`Admin "${name}" deleted successfully.`);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to delete admin.");
    }
  };

  const filteredAdmins = admins.filter(
    (adm) =>
      adm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adm.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adm.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <UserCheck className="h-5 w-5 text-ember" /> Admins & User Management
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage admin users, roles, and active statuses across the portal.
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
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-ember px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-ember/20 hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <UserPlus className="h-4 w-4" /> Add New Admin
          </button>
        </div>
      </div>

      {/* Notifications */}
      {successToast && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs font-bold text-emerald-400">
          <CheckCircle2 className="h-5 w-5 shrink-0" /> {successToast}
        </div>
      )}
      {(errorToast || queryError) && (
        <div className="flex items-center justify-between rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-xs font-bold text-destructive">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 shrink-0" /> {errorToast || (queryError as Error)?.message}
          </div>
          <button type="button" onClick={() => setErrorToast("")} className="p-1 text-destructive hover:opacity-80 cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Search & Stats Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-xl border border-border/80 bg-card">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, or role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-ember"
          />
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span className="text-muted-foreground">
            Total Admins: <strong className="text-foreground">{admins.length}</strong>
          </span>
          <span className="text-emerald-400 font-semibold">
            Active: {admins.filter((a) => a.isActive).length}
          </span>
          <span className="text-amber-400 font-semibold">
            Inactive: {admins.filter((a) => !a.isActive).length}
          </span>
        </div>
      </div>

      {/* Admins Table */}
      <div className="rounded-xl border border-border/80 bg-card overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-border/60 bg-muted/40 text-muted-foreground uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4">Admin ID & Name</th>
                <th className="py-3.5 px-4">Role & Privilege</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Created Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40 font-medium">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    <RefreshCw className="h-5 w-5 animate-spin mx-auto mb-2 text-ember" />
                    Loading admins...
                  </td>
                </tr>
              ) : filteredAdmins.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-muted-foreground">
                    No admins found.
                  </td>
                </tr>
              ) : (
                filteredAdmins.map((adm) => (
                  <tr key={adm.id} className="hover:bg-muted/30 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-ember/15 border border-ember/30 text-ember font-bold flex items-center justify-center text-xs">
                          {adm.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-extrabold text-foreground">{adm.name}</p>
                          <p className="text-[10px] text-muted-foreground">{adm.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded border ${
                          adm.role === "ADMIN"
                            ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                            : "bg-blue-500/10 text-blue-400 border-blue-500/30"
                        }`}
                      >
                        <Shield className="h-3 w-3 text-ember" /> {adm.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <button
                        type="button"
                        onClick={() => toggleAdminStatus(adm)}
                        disabled={updateAdminMutation.isPending}
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded cursor-pointer transition-colors ${
                          adm.isActive
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/20"
                            : "bg-muted text-muted-foreground border border-border hover:bg-muted/80"
                        }`}
                      >
                        {adm.isActive ? (
                          <>
                            <CheckCircle2 className="h-3 w-3" /> Active
                          </>
                        ) : (
                          <>
                            <XCircle className="h-3 w-3" /> Inactive
                          </>
                        )}
                      </button>
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground text-[11px]">
                      {new Date(adm.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleStartEdit(adm)}
                          className="p-1.5 rounded border border-border bg-card text-muted-foreground hover:text-foreground hover:border-ember transition-colors cursor-pointer"
                          title="Edit Admin"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteAdmin(adm.id, adm.name)}
                          disabled={deleteAdminMutation.isPending}
                          className="p-1.5 rounded border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors cursor-pointer"
                          title="Delete Admin"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Admin Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-ember/10 text-ember">
                  <UserPlus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-foreground">Add New Admin Account</h3>
                  <p className="text-xs text-muted-foreground">
                    Create new admin credentials and permissions.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="ramesh@realdreams.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Role / Access Level</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as "ADMIN" | "SUBADMIN" })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUBADMIN">SUBADMIN</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Account Status</label>
                  <select
                    value={formData.isActive ? "true" : "false"}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "true" })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-lg border border-border bg-muted/40 text-xs font-bold text-foreground hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createAdminMutation.isPending}
                  className="px-4 py-2 rounded-lg bg-ember text-xs font-bold text-white shadow-md shadow-ember/20 hover:scale-[1.02] transition-transform cursor-pointer disabled:opacity-50"
                >
                  {createAdminMutation.isPending ? "Creating..." : "Create Admin Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Admin Modal */}
      {editingAdmin && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-border/60 pb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-ember/10 text-ember">
                  <Edit2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-foreground">Edit Admin Account</h3>
                  <p className="text-xs text-muted-foreground">
                    Update profile, role, or change password for {editingAdmin.name}.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingAdmin(null)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-md cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateAdmin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Chandra"
                  value={editFormData.name}
                  onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="ramesh@realdreams.in"
                  value={editFormData.email}
                  onChange={(e) => setEditFormData({ ...editFormData, email: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  New Password <span className="text-[10px] font-normal text-muted-foreground">(Leave blank to keep unchanged)</span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••••••"
                  value={editFormData.password}
                  onChange={(e) => setEditFormData({ ...editFormData, password: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Role / Access Level</label>
                  <select
                    value={editFormData.role}
                    onChange={(e) => setEditFormData({ ...editFormData, role: e.target.value as "ADMIN" | "SUBADMIN" })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="SUBADMIN">SUBADMIN</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Account Status</label>
                  <select
                    value={editFormData.isActive ? "true" : "false"}
                    onChange={(e) => setEditFormData({ ...editFormData, isActive: e.target.value === "true" })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingAdmin(null)}
                  className="px-4 py-2 rounded-lg border border-border bg-muted/40 text-xs font-bold text-foreground hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updateAdminMutation.isPending}
                  className="px-4 py-2 rounded-lg bg-ember text-xs font-bold text-white shadow-md shadow-ember/20 hover:scale-[1.02] transition-transform cursor-pointer disabled:opacity-50"
                >
                  {updateAdminMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
