import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Sliders,
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  Megaphone,
  CheckCircle2,
  AlertCircle,
  FileText,
  BarChart3,
  Clock,
  Plus,
  Trash2,
  X,
  RefreshCw,
  Share2,
} from "lucide-react";
import {
  useGetWebConfig,
  useUpdateWebConfig,
  parseJsonConfig,
  getConfigValue,
} from "@/api/webconfig.api";

export const Route = createFileRoute("/admin/webconfig")({
  component: AdminWebConfigPage,
});

function AdminWebConfigPage() {
  const { data: config, isLoading, refetch, isRefetching } = useGetWebConfig();
  const updateMutation = useUpdateWebConfig();

  // Local form state
  const [companyName, setCompanyName] = useState("");
  const [fullName, setFullName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [phoneRaw, setPhoneRaw] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [salesEmail, setSalesEmail] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [hours, setHours] = useState("");

  // Social media
  const [linkedin, setLinkedin] = useState("");
  const [twitter, setTwitter] = useState("");
  const [youtube, setYoutube] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  // Banner
  const [bannerText, setBannerText] = useState("");
  const [bannerActive, setBannerActive] = useState(true);

  // SEO
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");

  // Stats (array of {value, label})
  const [stats, setStats] = useState<{ value: string; label: string }[]>([]);

  // Milestones - Hero (short)
  const [heroMilestones, setHeroMilestones] = useState<{ year: string; label: string }[]>([]);

  // Milestones - Timeline (full)
  const [timelineMilestones, setTimelineMilestones] = useState<{ year: string; label: string; body: string }[]>([]);

  const [successToast, setSuccessToast] = useState("");
  const [errorToast, setErrorToast] = useState("");

  // Hydrate form from fetched config
  useEffect(() => {
    if (!config) return;

    setCompanyName(getConfigValue(config, "contact.companyName", "Rashmi TMT Bars"));
    setFullName(getConfigValue(config, "contact.fullName", ""));
    setContactPhone(getConfigValue(config, "contact.phone", ""));
    setPhoneRaw(getConfigValue(config, "contact.phoneRaw", ""));
    setContactEmail(getConfigValue(config, "contact.email", ""));
    setSalesEmail(getConfigValue(config, "contact.salesEmail", ""));
    setOfficeAddress(getConfigValue(config, "contact.address", ""));
    setHours(getConfigValue(config, "contact.hours", ""));

    setLinkedin(getConfigValue(config, "social.linkedin", ""));
    setTwitter(getConfigValue(config, "social.twitter", ""));
    setYoutube(getConfigValue(config, "social.youtube", ""));
    setInstagram(getConfigValue(config, "social.instagram", ""));
    setFacebook(getConfigValue(config, "social.facebook", ""));
    setWhatsapp(getConfigValue(config, "social.whatsapp", ""));

    setBannerText(getConfigValue(config, "banner.text", ""));
    setBannerActive(getConfigValue(config, "banner.active", "true") === "true");

    setMetaTitle(getConfigValue(config, "seo.metaTitle", ""));
    setMetaDescription(getConfigValue(config, "seo.metaDescription", ""));

    setStats(parseJsonConfig(config, "stats", []));
    setHeroMilestones(parseJsonConfig(config, "milestones.hero", []));
    setTimelineMilestones(parseJsonConfig(config, "milestones.timeline", []));
  }, [config]);

  const handleSave = async () => {
    const entries = [
      { key: "contact.companyName", value: companyName },
      { key: "contact.fullName", value: fullName },
      { key: "contact.phone", value: contactPhone },
      { key: "contact.phoneRaw", value: phoneRaw },
      { key: "contact.email", value: contactEmail },
      { key: "contact.salesEmail", value: salesEmail },
      { key: "contact.address", value: officeAddress },
      { key: "contact.hours", value: hours },
      { key: "social.linkedin", value: linkedin },
      { key: "social.twitter", value: twitter },
      { key: "social.youtube", value: youtube },
      { key: "social.instagram", value: instagram },
      { key: "social.facebook", value: facebook },
      { key: "social.whatsapp", value: whatsapp },
      { key: "banner.text", value: bannerText },
      { key: "banner.active", value: bannerActive ? "true" : "false" },
      { key: "seo.metaTitle", value: metaTitle },
      { key: "seo.metaDescription", value: metaDescription },
      { key: "stats", value: JSON.stringify(stats) },
      { key: "milestones.hero", value: JSON.stringify(heroMilestones) },
      { key: "milestones.timeline", value: JSON.stringify(timelineMilestones) },
    ];

    try {
      await updateMutation.mutateAsync(entries);
      setSuccessToast("Web configuration saved successfully!");
      setTimeout(() => setSuccessToast(""), 3500);
    } catch (err: any) {
      setErrorToast(err.message || "Failed to save configuration.");
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-xs text-muted-foreground">
        <RefreshCw className="h-6 w-6 animate-spin mx-auto mb-2 text-ember" />
        Loading web configuration...
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
            <Sliders className="h-5 w-5 text-ember" /> Web Configuration & Settings
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            All changes are saved to the database and immediately reflected on the live website.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => refetch()}
            className="p-2.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            title="Refresh Config"
          >
            <RefreshCw className={`h-4 w-4 ${isRefetching ? "animate-spin" : ""}`} />
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={updateMutation.isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-ember px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-ember/20 hover:bg-ember/90 transition-all cursor-pointer disabled:opacity-50"
          >
            <Save className="h-4 w-4" />
            {updateMutation.isPending ? "Saving..." : "Save All Configuration"}
          </button>
        </div>
      </div>

      {/* Toasts */}
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
          <button type="button" onClick={() => setErrorToast("")} className="p-1 cursor-pointer">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* ─── SECTION: Announcement Banner ─── */}
      <div className="rounded-xl border border-border/80 bg-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Megaphone className="h-4 w-4 text-ember" /> Site Top Announcement Banner
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs text-muted-foreground font-semibold">Enable Announcement Banner</label>
            <input
              type="checkbox"
              checked={bannerActive}
              onChange={(e) => setBannerActive(e.target.checked)}
              className="h-4 w-4 rounded accent-ember cursor-pointer"
            />
          </div>
          <div>
            <label className="block text-xs text-muted-foreground font-medium mb-1">Banner Text</label>
            <textarea
              rows={2}
              value={bannerText}
              onChange={(e) => setBannerText(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
            />
          </div>
        </div>
      </div>

      {/* ─── SECTION: Business & Contact Details ─── */}
      <div className="rounded-xl border border-border/80 bg-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Globe className="h-4 w-4 text-ember" /> Business & Contact Details
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label="Company Name" value={companyName} onChange={setCompanyName} icon={<Globe className="h-3.5 w-3.5" />} />
          <InputField label="Contact Phone" value={contactPhone} onChange={setContactPhone} icon={<Phone className="h-3.5 w-3.5" />} />
          <InputField label="Phone Raw (digits only)" value={phoneRaw} onChange={setPhoneRaw} icon={<Phone className="h-3.5 w-3.5" />} />
          <InputField label="Primary Email" value={contactEmail} onChange={setContactEmail} icon={<Mail className="h-3.5 w-3.5" />} type="email" />
          <InputField label="Sales Inquiry Email" value={salesEmail} onChange={setSalesEmail} icon={<Mail className="h-3.5 w-3.5" />} type="email" />
          <InputField label="Office Hours" value={hours} onChange={setHours} icon={<Clock className="h-3.5 w-3.5" />} />
          <div className="sm:col-span-2">
            <InputField label="Full Company Name" value={fullName} onChange={setFullName} icon={<Globe className="h-3.5 w-3.5" />} />
          </div>
          <div className="sm:col-span-2">
            <InputField label="Office Address" value={officeAddress} onChange={setOfficeAddress} icon={<MapPin className="h-3.5 w-3.5" />} />
          </div>
        </div>
      </div>

      {/* ─── SECTION: Social Media ─── */}
      <div className="rounded-xl border border-border/80 bg-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <Share2 className="h-4 w-4 text-ember" /> Social Media Handles
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <InputField label="LinkedIn URL" value={linkedin} onChange={setLinkedin} placeholder="https://linkedin.com/company/..." />
          <InputField label="Twitter / X URL" value={twitter} onChange={setTwitter} placeholder="https://x.com/..." />
          <InputField label="YouTube URL" value={youtube} onChange={setYoutube} placeholder="https://youtube.com/@..." />
          <InputField label="Instagram URL" value={instagram} onChange={setInstagram} placeholder="https://instagram.com/..." />
          <InputField label="Facebook URL" value={facebook} onChange={setFacebook} placeholder="https://facebook.com/..." />
          <InputField label="WhatsApp (Phone / Link)" value={whatsapp} onChange={setWhatsapp} placeholder="https://wa.me/91..." />
        </div>
      </div>

      {/* ─── SECTION: Homepage Stats ─── */}
      <div className="rounded-xl border border-border/80 bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-ember" /> Homepage & About Stats
          </h3>
          <button
            type="button"
            onClick={() => setStats([...stats, { value: "", label: "" }])}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-ember/10 text-ember text-[11px] font-bold hover:bg-ember/20 transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Add Stat
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {stats.map((s, i) => (
            <div key={i} className="flex items-center gap-2 p-3 rounded-lg border border-border/60 bg-muted/20">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Value (e.g. 1.4M t)"
                  value={s.value}
                  onChange={(e) => {
                    const updated = [...stats];
                    updated[i] = { ...updated[i], value: e.target.value };
                    setStats(updated);
                  }}
                  className="p-2 rounded-lg border border-border bg-background text-foreground text-xs font-bold focus:outline-none focus:border-ember"
                />
                <input
                  type="text"
                  placeholder="Label (e.g. Annual capacity)"
                  value={s.label}
                  onChange={(e) => {
                    const updated = [...stats];
                    updated[i] = { ...updated[i], label: e.target.value };
                    setStats(updated);
                  }}
                  className="p-2 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>
              <button
                type="button"
                onClick={() => setStats(stats.filter((_, idx) => idx !== i))}
                className="p-1.5 rounded border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION: Homepage Milestones (short) ─── */}
      <div className="rounded-xl border border-border/80 bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Clock className="h-4 w-4 text-ember" /> Homepage Milestone Pills
          </h3>
          <button
            type="button"
            onClick={() => setHeroMilestones([...heroMilestones, { year: "", label: "" }])}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-ember/10 text-ember text-[11px] font-bold hover:bg-ember/20 transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Add Milestone
          </button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {heroMilestones.map((m, i) => (
            <div key={i} className="flex items-center gap-2 p-3 rounded-lg border border-border/60 bg-muted/20">
              <div className="flex-1 grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="Year"
                  value={m.year}
                  onChange={(e) => {
                    const updated = [...heroMilestones];
                    updated[i] = { ...updated[i], year: e.target.value };
                    setHeroMilestones(updated);
                  }}
                  className="p-2 rounded-lg border border-border bg-background text-foreground text-xs font-bold focus:outline-none focus:border-ember"
                />
                <input
                  type="text"
                  placeholder="Label"
                  value={m.label}
                  onChange={(e) => {
                    const updated = [...heroMilestones];
                    updated[i] = { ...updated[i], label: e.target.value };
                    setHeroMilestones(updated);
                  }}
                  className="p-2 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
                />
              </div>
              <button
                type="button"
                onClick={() => setHeroMilestones(heroMilestones.filter((_, idx) => idx !== i))}
                className="p-1.5 rounded border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION: About Page Timeline ─── */}
      <div className="rounded-xl border border-border/80 bg-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Clock className="h-4 w-4 text-ember" /> About Page Timeline
          </h3>
          <button
            type="button"
            onClick={() => setTimelineMilestones([...timelineMilestones, { year: "", label: "", body: "" }])}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-ember/10 text-ember text-[11px] font-bold hover:bg-ember/20 transition-colors cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" /> Add Entry
          </button>
        </div>
        <div className="space-y-3">
          {timelineMilestones.map((m, i) => (
            <div key={i} className="flex items-start gap-2 p-3 rounded-lg border border-border/60 bg-muted/20">
              <div className="flex-1 grid grid-cols-4 gap-2">
                <input
                  type="text"
                  placeholder="Year"
                  value={m.year}
                  onChange={(e) => {
                    const updated = [...timelineMilestones];
                    updated[i] = { ...updated[i], year: e.target.value };
                    setTimelineMilestones(updated);
                  }}
                  className="p-2 rounded-lg border border-border bg-background text-foreground text-xs font-bold focus:outline-none focus:border-ember"
                />
                <input
                  type="text"
                  placeholder="Label"
                  value={m.label}
                  onChange={(e) => {
                    const updated = [...timelineMilestones];
                    updated[i] = { ...updated[i], label: e.target.value };
                    setTimelineMilestones(updated);
                  }}
                  className="p-2 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember col-span-3"
                />
                <textarea
                  rows={2}
                  placeholder="Description / body text"
                  value={m.body}
                  onChange={(e) => {
                    const updated = [...timelineMilestones];
                    updated[i] = { ...updated[i], body: e.target.value };
                    setTimelineMilestones(updated);
                  }}
                  className="p-2 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember col-span-4"
                />
              </div>
              <button
                type="button"
                onClick={() => setTimelineMilestones(timelineMilestones.filter((_, idx) => idx !== i))}
                className="p-1.5 rounded border border-destructive/30 bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors cursor-pointer mt-1"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* ─── SECTION: SEO Meta Tags ─── */}
      <div className="rounded-xl border border-border/80 bg-card p-6 space-y-4">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <FileText className="h-4 w-4 text-ember" /> SEO Meta Tags Settings
        </h3>
        <div className="space-y-4">
          <InputField label="Global Meta Title" value={metaTitle} onChange={setMetaTitle} />
          <div>
            <label className="block text-xs text-muted-foreground font-medium mb-1">Global Meta Description</label>
            <textarea
              rows={3}
              value={metaDescription}
              onChange={(e) => setMetaDescription(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember"
            />
          </div>
        </div>
      </div>

      {/* Bottom Save Button */}
      <div className="flex justify-end pt-2 pb-8">
        <button
          type="button"
          onClick={handleSave}
          disabled={updateMutation.isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-ember px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-ember/20 hover:bg-ember/90 transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="h-4 w-4" />
          {updateMutation.isPending ? "Saving..." : "Save All Configuration"}
        </button>
      </div>
    </div>
  );
}

// ─── Reusable Input Field Component ───
function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  icon,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs text-muted-foreground font-medium mb-1">{label}</label>
      <div className="relative">
        {icon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>
        )}
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full p-2.5 rounded-lg border border-border bg-background text-foreground text-xs focus:outline-none focus:border-ember ${icon ? "pl-9" : ""}`}
        />
      </div>
    </div>
  );
}
