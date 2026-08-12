import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ShieldCheck,
  Plus,
  Trash2,
  Edit2,
  Upload,
  Image as ImageIcon,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import {
  useGetAdminPricing,
  useUploadImage,
  useCreateBrand,
  useUpdateBrand,
  useDeleteBrand,
  useCreatePricingItem,
  useUpdatePricingItem,
  useDeletePricingItem,
  useUpdatePricingNotes,
  BrandData,
  PricingItemData,
} from "@/api/pricing.api";

export const Route = createFileRoute("/admin/pricing")({
  component: AdminPricingPage,
});

function AdminPricingPage() {
  const { data: pricingData, isLoading, isRefetching, refetch } = useGetAdminPricing();
  const brands = pricingData?.brands || [];
  const notes = pricingData?.notes || [];

  const uploadMutation = useUploadImage();
  const createBrandMutation = useCreateBrand();
  const updateBrandMutation = useUpdateBrand();
  const deleteBrandMutation = useDeleteBrand();

  const createPricingItemMutation = useCreatePricingItem();
  const updatePricingItemMutation = useUpdatePricingItem();
  const deletePricingItemMutation = useDeletePricingItem();
  const updatePricingNotesMutation = useUpdatePricingNotes();

  const [selectedBrandId, setSelectedBrandId] = useState<number | null>(null);
  const [successToast, setSuccessToast] = useState("");
  const [errorToast, setErrorToast] = useState("");

  // Brand Modal State
  const [showBrandModal, setShowBrandModal] = useState(false);
  const [editingBrand, setEditingBrand] = useState<BrandData | null>(null);
  const [brandForm, setBrandForm] = useState({
    name: "",
    subtitle: "",
    logoUrl: "",
    themeColor: "amber",
    isActive: true,
  });

  // Image Upload state
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState("");

  // Add Pricing Item Modal State
  const [showItemModal, setShowItemModal] = useState(false);
  const [itemForm, setItemForm] = useState({
    size: "",
    pricePerTon: 54000,
    pricePerPiece: 450,
    pricePerBundle: 2700,
    priceChange: "+ ₹ 200",
    isUp: true,
  });

  // Edit Pricing Item Modal State
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PricingItemData | null>(null);
  const [editItemForm, setEditItemForm] = useState({
    size: "",
    pricePerTon: 54000,
    pricePerPiece: 450,
    pricePerBundle: 2700,
    priceChange: "+ ₹ 200",
    isUp: true,
  });

  // Pricing Notes Form State
  const [notesList, setNotesList] = useState<string[]>([]);
  const [editingNotes, setEditingNotes] = useState(false);

  const activeBrand: BrandData | undefined =
    brands.find((b) => b.id === selectedBrandId) || brands[0];

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Create local preview
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = reader.result as string;
      setImagePreview(base64);

      // Upload to Cloudinary
      setUploadingImage(true);
      try {
        const url = await uploadMutation.mutateAsync({ image: base64, folder: "realdreams" });
        setBrandForm((prev) => ({ ...prev, logoUrl: url }));
        setSuccessToast("Brand image uploaded to Cloudinary!");
        setTimeout(() => setSuccessToast(""), 3500);
      } catch (err: any) {
        setErrorToast(err.message || "Failed to upload image.");
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateOrUpdateBrand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandForm.name) {
      setErrorToast("Please enter a brand name.");
      return;
    }

    try {
      if (editingBrand) {
        await updateBrandMutation.mutateAsync({
          id: editingBrand.id,
          input: brandForm,
        });
        setSuccessToast(`Brand "${brandForm.name}" updated successfully! Old Cloudinary image replaced.`);
      } else {
        const newBrand = await createBrandMutation.mutateAsync(brandForm);
        setSelectedBrandId(newBrand.id);
        setSuccessToast(`Brand "${newBrand.name}" created successfully!`);
      }
      setShowBrandModal(false);
      setEditingBrand(null);
      setBrandForm({ name: "", subtitle: "", logoUrl: "", themeColor: "amber", isActive: true });
      setImagePreview("");
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to save brand.");
    }
  };

  const handleStartEditBrand = (b: BrandData) => {
    setEditingBrand(b);
    setBrandForm({
      name: b.name,
      subtitle: b.subtitle || "",
      logoUrl: b.logoUrl || "",
      themeColor: b.themeColor || "amber",
      isActive: b.isActive,
    });
    setImagePreview(b.logoUrl || "");
    setShowBrandModal(true);
  };

  const handleDeleteBrand = async (b: BrandData) => {
    if (!confirm(`Are you sure you want to delete brand "${b.name}"? This will also delete its Cloudinary logo.`)) return;
    try {
      await deleteBrandMutation.mutateAsync(b.id);
      setSuccessToast(`Brand "${b.name}" and its Cloudinary logo deleted.`);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to delete brand.");
    }
  };

  // Add Pricing Item Operations
  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeBrand) {
      setErrorToast("Please select a brand first.");
      return;
    }
    if (!itemForm.size) {
      setErrorToast("Please enter a size specification (e.g. 8 MM).");
      return;
    }

    try {
      await createPricingItemMutation.mutateAsync({
        brandId: activeBrand.id,
        size: itemForm.size,
        pricePerTon: Number(itemForm.pricePerTon),
        pricePerPiece: Number(itemForm.pricePerPiece),
        pricePerBundle: Number(itemForm.pricePerBundle),
        priceChange: itemForm.priceChange,
        isUp: itemForm.isUp,
      });

      setShowItemModal(false);
      setItemForm({ size: "", pricePerTon: 54000, pricePerPiece: 450, pricePerBundle: 2700, priceChange: "+ ₹ 200", isUp: true });
      setSuccessToast(`Added size ${itemForm.size} for ${activeBrand.name}!`);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to add size rate.");
    }
  };

  // Edit Pricing Item Modal Operations
  const handleStartEditItem = (item: PricingItemData) => {
    setEditingItem(item);
    setEditItemForm({
      size: item.size,
      pricePerTon: item.pricePerTon,
      pricePerPiece: item.pricePerPiece || 0,
      pricePerBundle: item.pricePerBundle || 0,
      priceChange: item.priceChange || "+ ₹ 0",
      isUp: item.isUp,
    });
    setShowEditItemModal(true);
  };

  const handleUpdateItemModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    try {
      await updatePricingItemMutation.mutateAsync({
        id: editingItem.id,
        input: {
          size: editItemForm.size,
          pricePerTon: Number(editItemForm.pricePerTon),
          pricePerPiece: Number(editItemForm.pricePerPiece),
          pricePerBundle: Number(editItemForm.pricePerBundle),
          priceChange: editItemForm.priceChange,
          isUp: editItemForm.isUp,
          lastUpdatedText: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        },
      });

      setShowEditItemModal(false);
      setEditingItem(null);
      setSuccessToast(`Size entry "${editItemForm.size}" updated successfully!`);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to update size entry.");
    }
  };

  const handleDeleteItem = async (item: PricingItemData) => {
    if (!confirm(`Delete rate row for "${item.size}"?`)) return;
    try {
      await deletePricingItemMutation.mutateAsync(item.id);
      setSuccessToast(`Deleted size ${item.size}.`);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to delete item.");
    }
  };

  // Pricing Notes Operations
  const handleStartEditNotes = () => {
    setNotesList(notes.map((n) => n.noteText));
    setEditingNotes(true);
  };

  const handleSaveNotes = async () => {
    try {
      await updatePricingNotesMutation.mutateAsync(notesList);
      setEditingNotes(false);
      setSuccessToast("Pricing notes updated successfully!");
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to update notes.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-ember" /> Brand & Live Rate Card Manager
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Manage product brands (Rashmi, JSW TMT), upload brand images to Cloudinary, and update live rates per Ton/Piece.
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
              setEditingBrand(null);
              setBrandForm({ name: "", subtitle: "", logoUrl: "", themeColor: "amber", isActive: true });
              setImagePreview("");
              setShowBrandModal(true);
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-ember px-4 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-md shadow-ember/20 hover:scale-[1.02] transition-transform cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add New Brand
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

      {/* Brands Tab Strip */}
      <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl border border-border/80 bg-card">
        <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground mr-2">
          Select Brand:
        </span>
        {isLoading ? (
          <span className="text-xs text-muted-foreground">Loading brands...</span>
        ) : brands.length === 0 ? (
          <span className="text-xs text-muted-foreground">No brands found.</span>
        ) : (
          brands.map((b) => {
            const isSelected = activeBrand?.id === b.id;
            return (
              <div key={b.id} className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setSelectedBrandId(b.id)}
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-lg text-xs font-extrabold transition-all cursor-pointer ${
                    isSelected
                      ? "bg-ember text-white shadow-md shadow-ember/20"
                      : "bg-muted/40 text-muted-foreground hover:text-foreground border border-border/60"
                  }`}
                >
                  {b.logoUrl && (
                    <img src={b.logoUrl} alt={b.name} className="h-4 w-4 object-cover rounded" />
                  )}
                  <span>{b.name}</span>
                  {!b.isActive && <span className="text-[10px] text-amber-400">(Inactive)</span>}
                </button>
                <button
                  type="button"
                  onClick={() => handleStartEditBrand(b)}
                  className="p-1.5 rounded hover:bg-muted text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title="Edit Brand"
                >
                  <Edit2 className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteBrand(b)}
                  className="p-1.5 rounded hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                  title="Delete Brand"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Active Brand Pricing Table Section */}
      {activeBrand && (
        <div className="rounded-xl border border-border/80 bg-card p-6 space-y-6 shadow-sm">
          {/* Active Brand Header & Add Size Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border/60">
            <div className="flex items-center gap-3">
              {activeBrand.logoUrl ? (
                <img
                  src={activeBrand.logoUrl}
                  alt={activeBrand.name}
                  className="h-12 w-12 object-cover rounded-xl border border-ember/30"
                />
              ) : (
                <div className="h-12 w-12 rounded-xl bg-ember/10 border border-ember/30 text-ember font-bold flex items-center justify-center text-lg">
                  {activeBrand.name.charAt(0)}
                </div>
              )}
              <div>
                <h3 className="text-lg font-black text-foreground tracking-tight">
                  {activeBrand.name} Rate Card Editor
                </h3>
                <p className="text-xs text-muted-foreground">{activeBrand.subtitle || "TMT Steel Specifications"}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowItemModal(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-ember bg-ember/10 px-3.5 py-1.5 text-xs font-bold text-ember hover:bg-ember hover:text-white transition-colors cursor-pointer"
            >
              <Plus className="h-4 w-4" /> Add Size Entry
            </button>
          </div>

          {/* Pricing Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="border-b border-border/60 bg-muted/40 text-muted-foreground uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">Size (MM)</th>
                  <th className="py-3.5 px-4">Rate per MT (₹)</th>
                  <th className="py-3.5 px-4">Rate per Piece (₹)</th>
                  <th className="py-3.5 px-4">Rate per Bundle (₹)</th>
                  <th className="py-3.5 px-4">Price Change</th>
                  <th className="py-3.5 px-4 text-center">Trend</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 font-semibold">
                {activeBrand.pricingItems.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-muted-foreground">
                      No price entries configured for {activeBrand.name}. Click "Add Size Entry" above.
                    </td>
                  </tr>
                ) : (
                  activeBrand.pricingItems.map((item) => (
                    <tr key={item.id} className="hover:bg-muted/30 transition-colors">
                      <td className="py-3.5 px-4 font-black text-foreground text-sm">
                        {item.size}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-foreground">
                        ₹ {item.pricePerTon.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground font-semibold">
                        ₹ {(item.pricePerPiece || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground font-semibold">
                        ₹ {(item.pricePerBundle || 0).toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4 font-bold">
                        {item.priceChange}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded transition-colors ${
                            item.isUp
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : "bg-rose-500/10 text-rose-400 border border-rose-500/30"
                          }`}
                        >
                          {item.isUp ? (
                            <>
                              <TrendingUp className="h-3 w-3" /> Up
                            </>
                          ) : (
                            <>
                              <TrendingDown className="h-3 w-3" /> Down
                            </>
                          )}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => handleStartEditItem(item)}
                            className="p-1.5 rounded border border-border bg-card text-muted-foreground hover:text-foreground hover:border-ember transition-colors cursor-pointer"
                            title="Update / Edit Size Entry"
                          >
                            <Edit2 className="h-3.5 w-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(item)}
                            className="p-1.5 rounded border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors cursor-pointer"
                            title="Delete Size Entry"
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
      )}

      {/* Pricing Notes Section */}
      <div className="rounded-xl border border-border/80 bg-card p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-border/60 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-ember" />
            <h3 className="font-extrabold text-base text-foreground">Global Pricing Notes & Disclaimers</h3>
          </div>
          {!editingNotes ? (
            <button
              type="button"
              onClick={handleStartEditNotes}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-ember hover:underline cursor-pointer"
            >
              <Edit2 className="h-3.5 w-3.5" /> Edit Notes
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setEditingNotes(false)}
                className="px-3 py-1 rounded text-xs font-bold border border-border hover:bg-muted cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveNotes}
                className="px-3 py-1 rounded text-xs font-bold bg-ember text-white hover:bg-ember/90 cursor-pointer"
              >
                Save Notes
              </button>
            </div>
          )}
        </div>

        {!editingNotes ? (
          <ul className="space-y-2 text-xs text-muted-foreground font-medium">
            {notes.map((n) => (
              <li key={n.id} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-ember shrink-0" />
                <span>{n.noteText}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="space-y-3">
            {notesList.map((noteText, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <input
                  type="text"
                  value={noteText}
                  onChange={(e) => {
                    const copy = [...notesList];
                    copy[idx] = e.target.value;
                    setNotesList(copy);
                  }}
                  className="flex-1 p-2 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-ember"
                />
                <button
                  type="button"
                  onClick={() => setNotesList(notesList.filter((_, i) => i !== idx))}
                  className="p-2 text-destructive hover:bg-destructive/10 rounded cursor-pointer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => setNotesList([...notesList, "New pricing note line..."])}
              className="inline-flex items-center gap-1 text-xs font-bold text-ember hover:underline cursor-pointer mt-2"
            >
              <Plus className="h-4 w-4" /> Add Note Line
            </button>
          </div>
        )}
      </div>

      {/* Add / Edit Brand Modal */}
      {showBrandModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-extrabold text-base text-foreground">
                {editingBrand ? "Edit Product Brand" : "Add New Product Brand"}
              </h3>
              <button
                type="button"
                onClick={() => setShowBrandModal(false)}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOrUpdateBrand} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Brand Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. RASHMI or JSW TMT"
                  value={brandForm.name}
                  onChange={(e) => setBrandForm({ ...brandForm, name: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Subtitle / Specification</label>
                <input
                  type="text"
                  placeholder="e.g. SME-TMT & FE 550D"
                  value={brandForm.subtitle}
                  onChange={(e) => setBrandForm({ ...brandForm, subtitle: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              {/* Cloudinary Gallery Image Upload Picker */}
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">
                  Brand Logo / Image <span className="text-[10px] text-amber-400 font-normal">(Cloudinary Gallery Upload)</span>
                </label>
                <div className="flex items-center gap-4 p-3 rounded-xl border border-dashed border-border/80 bg-muted/20">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-14 w-14 object-cover rounded-lg border border-border" />
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
                    {brandForm.logoUrl && (
                      <p className="text-[10px] text-emerald-400 truncate max-w-xs font-semibold">
                        Cloudinary URL: {brandForm.logoUrl}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowBrandModal(false)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-bold hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createBrandMutation.isPending || updateBrandMutation.isPending || uploadingImage}
                  className="px-4 py-2 rounded-lg bg-ember text-xs font-bold text-white hover:bg-ember/90 cursor-pointer disabled:opacity-50"
                >
                  {editingBrand ? "Save Brand Changes" : "Create Brand"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Pricing Item Modal */}
      {showItemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-extrabold text-base text-foreground">
                Add Size Rate Entry for {activeBrand?.name}
              </h3>
              <button
                type="button"
                onClick={() => setShowItemModal(false)}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Size Specification</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 8 MM, 10 MM, 12 MM, 16 MM"
                  value={itemForm.size}
                  onChange={(e) => setItemForm({ ...itemForm, size: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Rate / Ton (₹)</label>
                  <input
                    type="number"
                    required
                    value={itemForm.pricePerTon}
                    onChange={(e) => setItemForm({ ...itemForm, pricePerTon: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Rate / Piece (₹)</label>
                  <input
                    type="number"
                    value={itemForm.pricePerPiece}
                    onChange={(e) => setItemForm({ ...itemForm, pricePerPiece: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Rate / Bundle (₹)</label>
                  <input
                    type="number"
                    value={itemForm.pricePerBundle}
                    onChange={(e) => setItemForm({ ...itemForm, pricePerBundle: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Price Change Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. + ₹ 500 or - ₹ 200"
                    value={itemForm.priceChange}
                    onChange={(e) => setItemForm({ ...itemForm, priceChange: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Trend Indicator</label>
                  <select
                    value={itemForm.isUp ? "true" : "false"}
                    onChange={(e) => setItemForm({ ...itemForm, isUp: e.target.value === "true" })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  >
                    <option value="true">Up (Green)</option>
                    <option value="false">Down (Red)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowItemModal(false)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-bold hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createPricingItemMutation.isPending}
                  className="px-4 py-2 rounded-lg bg-ember text-xs font-bold text-white hover:bg-ember/90 cursor-pointer disabled:opacity-50"
                >
                  Save Size Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Size Entry Modal */}
      {showEditItemModal && editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-ember/10 text-ember">
                  <Edit2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-foreground">Update Size Entry</h3>
                  <p className="text-xs text-muted-foreground">
                    Update rates, specifications, and price trend for {editingItem.size}.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowEditItemModal(false);
                  setEditingItem(null);
                }}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateItemModalSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Size Specification</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 8 MM, 10 MM"
                  value={editItemForm.size}
                  onChange={(e) => setEditItemForm({ ...editItemForm, size: e.target.value })}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Rate / Ton (₹)</label>
                  <input
                    type="number"
                    required
                    value={editItemForm.pricePerTon}
                    onChange={(e) => setEditItemForm({ ...editItemForm, pricePerTon: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Rate / Piece (₹)</label>
                  <input
                    type="number"
                    value={editItemForm.pricePerPiece}
                    onChange={(e) => setEditItemForm({ ...editItemForm, pricePerPiece: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Rate / Bundle (₹)</label>
                  <input
                    type="number"
                    value={editItemForm.pricePerBundle}
                    onChange={(e) => setEditItemForm({ ...editItemForm, pricePerBundle: Number(e.target.value) })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Price Change Tag</label>
                  <input
                    type="text"
                    placeholder="e.g. + ₹ 500 or - ₹ 200"
                    value={editItemForm.priceChange}
                    onChange={(e) => setEditItemForm({ ...editItemForm, priceChange: e.target.value })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Trend Indicator</label>
                  <select
                    value={editItemForm.isUp ? "true" : "false"}
                    onChange={(e) => setEditItemForm({ ...editItemForm, isUp: e.target.value === "true" })}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  >
                    <option value="true">Up (Green)</option>
                    <option value="false">Down (Red)</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-border/60 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setShowEditItemModal(false);
                    setEditingItem(null);
                  }}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-bold hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updatePricingItemMutation.isPending}
                  className="px-4 py-2 rounded-lg bg-ember text-xs font-bold text-white hover:bg-ember/90 cursor-pointer disabled:opacity-50"
                >
                  {updatePricingItemMutation.isPending ? "Updating..." : "Update Size Entry"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
