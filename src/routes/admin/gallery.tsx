import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Image as ImageIcon,
  Plus,
  Search,
  RefreshCw,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Upload,
  Eye,
  EyeOff,
  Tag,
  FileText,
} from "lucide-react";
import {
  useGetAllGallery,
  useCreateGalleryImage,
  useUpdateGalleryImage,
  useDeleteGalleryImage,
  GalleryImageData,
} from "@/api/gallery.api";
import { useUploadImage } from "@/api/pricing.api";

export const Route = createFileRoute("/admin/gallery")({
  component: AdminGalleryPage,
});

const CATEGORIES = [
  "Stock & Warehouse",
  "Site Projects",
  "Delivery & Logistics",
  "Factory & Machinery",
  "Certificates & Testing",
];

function AdminGalleryPage() {
  const { data: galleryImages = [], isLoading, isRefetching, refetch } = useGetAllGallery();
  const createMutation = useCreateGalleryImage();
  const updateMutation = useUpdateGalleryImage();
  const deleteMutation = useDeleteGalleryImage();
  const uploadImageMutation = useUploadImage();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const [successToast, setSuccessToast] = useState("");
  const [errorToast, setErrorToast] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingImage, setEditingImage] = useState<GalleryImageData | null>(null);

  // Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Stock & Warehouse");
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [isActive, setIsActive] = useState(true);

  // File Uploading State
  const [isUploading, setIsUploading] = useState(false);

  const handleOpenCreateModal = () => {
    setEditingImage(null);
    setTitle("");
    setCategory("Stock & Warehouse");
    setImageUrl("");
    setCaption("");
    setIsActive(true);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item: GalleryImageData) => {
    setEditingImage(item);
    setTitle(item.title);
    setCategory(item.category);
    setImageUrl(item.imageUrl);
    setCaption(item.caption || "");
    setIsActive(item.isActive);
    setIsModalOpen(true);
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrorToast("Selected image must be smaller than 10MB.");
      return;
    }

    setIsUploading(true);
    setErrorToast("");

    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result as string;
        try {
          const uploadedUrl = await uploadImageMutation.mutateAsync({
            image: base64Data,
            folder: "realdreams/gallery",
          });
          setImageUrl(uploadedUrl);
          setSuccessToast("Image uploaded to Cloudinary!");
          setTimeout(() => setSuccessToast(""), 3000);
        } catch (err: any) {
          setErrorToast(err.message || "Failed to upload image to Cloudinary.");
        } finally {
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    } catch {
      setIsUploading(false);
      setErrorToast("Failed to read image file.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !imageUrl.trim()) {
      setErrorToast("Title and Image URL are required.");
      return;
    }

    try {
      if (editingImage) {
        await updateMutation.mutateAsync({
          id: editingImage.id,
          input: {
            title,
            category,
            imageUrl,
            caption,
            isActive,
          },
        });
        setSuccessToast(`Gallery image "${title}" updated successfully!`);
      } else {
        await createMutation.mutateAsync({
          title,
          category,
          imageUrl,
          caption,
          isActive,
        });
        setSuccessToast(`Gallery image "${title}" added successfully!`);
      }

      setIsModalOpen(false);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to save gallery image.");
    }
  };

  const handleDelete = async (item: GalleryImageData) => {
    if (!confirm(`Delete image "${item.title}"? This will also remove the asset from Cloudinary.`)) return;
    try {
      await deleteMutation.mutateAsync(item.id);
      setSuccessToast(`Gallery image "${item.title}" deleted.`);
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to delete image.");
    }
  };

  const handleToggleActive = async (item: GalleryImageData) => {
    try {
      await updateMutation.mutateAsync({
        id: item.id,
        input: { isActive: !item.isActive },
      });
      setSuccessToast(`Updated status for "${item.title}".`);
      setTimeout(() => setSuccessToast(""), 2500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to toggle status.");
    }
  };

  const filteredImages = galleryImages.filter((item) => {
    const matchesCategory = selectedCategory === "ALL" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.caption && item.caption.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <ImageIcon className="h-5 w-5 text-ember" /> Media Gallery Manager
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Upload stockyard photos, project site deliveries, and infrastructure photos saved directly to Cloudinary.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="p-2.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Refresh Gallery"
          >
            <RefreshCw className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`} />
          </button>

          <button
            type="button"
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-2 rounded-lg bg-ember px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-ember/20 hover:bg-ember/90 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" /> Add Gallery Image
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

      {/* Search & Filter Row */}
      <div className="p-4 rounded-xl border border-border/80 bg-card flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search gallery title or caption..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-border bg-background text-foreground focus:outline-none focus:border-ember"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSelectedCategory("ALL")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
              selectedCategory === "ALL"
                ? "bg-ember text-white shadow-sm"
                : "bg-muted/40 text-muted-foreground hover:bg-muted"
            }`}
          >
            All Photos ({galleryImages.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = galleryImages.filter((i) => i.category === cat).length;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-ember text-white shadow-sm"
                    : "bg-muted/40 text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Gallery Cards Grid */}
      {isLoading ? (
        <div className="py-16 text-center text-xs text-muted-foreground">
          <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-ember" />
          Loading media gallery images...
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="py-16 text-center text-xs text-muted-foreground border border-dashed border-border/60 rounded-xl">
          No gallery images found in this category. Click "Add Gallery Image" to upload photos.
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredImages.map((item) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:border-ember/60 hover:shadow-lg ${
                !item.isActive ? "opacity-60" : ""
              }`}
            >
              {/* Image Preview Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <p className="text-[11px] text-white/90 line-clamp-2">{item.caption || "No caption added"}</p>
                </div>

                {/* Status Badges */}
                <div className="absolute top-2 left-2 flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-background/90 text-foreground backdrop-blur-md border border-border/60">
                    {item.category}
                  </span>
                  {!item.isActive && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-rose-500 text-white shadow-sm">
                      Hidden
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer Info & Controls */}
              <div className="p-4 space-y-3">
                <h3 className="font-extrabold text-sm text-foreground line-clamp-1">{item.title}</h3>

                <div className="pt-2 border-t border-border/60 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => handleToggleActive(item)}
                    className={`inline-flex items-center gap-1 text-[11px] font-bold cursor-pointer transition-colors ${
                      item.isActive ? "text-emerald-400 hover:text-emerald-300" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.isActive ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                    <span>{item.isActive ? "Visible" : "Hidden"}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(item)}
                      className="p-1.5 rounded border border-border bg-muted/30 text-muted-foreground hover:text-foreground hover:border-ember transition-colors cursor-pointer"
                      title="Edit Image"
                    >
                      <Edit2 className="h-3.5 w-3.5 text-ember" />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      className="p-1.5 rounded border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors cursor-pointer"
                      title="Delete Image"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl border border-border bg-card p-6 shadow-2xl space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-border/60 pb-3">
              <h3 className="font-extrabold text-base text-foreground flex items-center gap-2">
                <ImageIcon className="h-5 w-5 text-ember" />
                {editingImage ? "Edit Gallery Image" : "Add New Gallery Image"}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Image Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rashmi TMT Steel Yard - Ranchi"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember font-semibold"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Display Status</label>
                  <button
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`w-full p-2.5 rounded-lg border text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors ${
                      isActive
                        ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                        : "border-border bg-muted text-muted-foreground"
                    }`}
                  >
                    {isActive ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    <span>{isActive ? "Visible on Website" : "Hidden"}</span>
                  </button>
                </div>
              </div>

              {/* Cloudinary Gallery Image Uploader */}
              <div className="space-y-2">
                <label className="block text-xs font-semibold text-muted-foreground">Upload Image (Cloudinary) *</label>

                {imageUrl && (
                  <div className="relative aspect-16/9 w-full overflow-hidden rounded-xl border border-border bg-muted">
                    <img src={imageUrl} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-border hover:border-ember bg-muted/20 text-xs font-bold text-foreground cursor-pointer transition-colors">
                    <Upload className="h-4 w-4 text-ember" />
                    <span>{isUploading ? "Uploading to Cloudinary..." : "Choose Local Image File"}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      disabled={isUploading}
                      className="hidden"
                    />
                  </label>
                </div>

                <div>
                  <label className="block text-[10px] font-semibold text-muted-foreground mt-2 mb-1">Or direct Cloudinary Image URL:</label>
                  <input
                    type="url"
                    placeholder="https://res.cloudinary.com/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full p-2 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-muted-foreground mb-1">Caption / Description</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Heavy structural TMT steel stock ready for delivery..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-3 border-t border-border/60">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-border text-xs font-bold hover:bg-muted cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createMutation.isPending || updateMutation.isPending || isUploading}
                  className="px-5 py-2 rounded-lg bg-ember text-xs font-bold text-white hover:bg-ember/90 cursor-pointer disabled:opacity-50"
                >
                  {createMutation.isPending || updateMutation.isPending ? "Saving..." : "Save Gallery Image"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
