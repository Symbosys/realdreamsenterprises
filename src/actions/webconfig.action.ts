import { prisma } from "@/config/prisma";

// Default config values - seeded on first access if table is empty
const DEFAULT_CONFIG: Record<string, string> = {
  // Contact
  "contact.companyName": "Rashmi TMT Bars",
  "contact.fullName": "Real Dreams Enterprises — Exclusive Supplier of Rashmi TMT Bars in Jharkhand",
  "contact.phone": "651-3511561",
  "contact.phoneRaw": "6513511561",
  "contact.email": "steelcrafttrading@gmail.com",
  "contact.salesEmail": "sales@realdreamsenterprises.in",
  "contact.address": "2nd Floor, Reena Tower, Behind Rajdhani Manya Tower, Piska More, Ranchi, Jharkhand",
  "contact.hours": "Mon–Sat, 09:00–19:00 IST. Project & tender inquiries answered 24/7.",

  // Social Media
  "social.linkedin": "",
  "social.twitter": "",
  "social.youtube": "",
  "social.instagram": "",
  "social.facebook": "",
  "social.whatsapp": "",

  // Banner
  "banner.text": "🔥 Live Rate Alert: Rashmi Fe-550D TMT Steel Bars available with instant SOR certification across all 24 Jharkhand districts.",
  "banner.active": "true",

  // SEO
  "seo.metaTitle": "Rashmi TMT & SME-TMT Bars — Exclusive Supplier in Jharkhand | Real Dreams",
  "seo.metaDescription": "Sole authorized supplier of SME-TMT and Rashmi TMT Bars across all 24 districts of Jharkhand. Government-authorized, SOR letter certified, and most affordable.",

  // Stats (JSON arrays)
  "stats": JSON.stringify([
    { value: "1.4M t", label: "Annual capacity" },
    { value: "2,800+", label: "Projects delivered" },
    { value: "ISO 9001", label: "Quality certified" },
    { value: "18", label: "States served" },
  ]),

  // Milestones - Homepage (short form)
  "milestones.hero": JSON.stringify([
    { year: "1994", label: "Founded" },
    { year: "2003", label: "First Rolling Mill" },
    { year: "2011", label: "ISO 9001" },
    { year: "2018", label: "1M Tonnes" },
    { year: "2026", label: "Green Steel" },
  ]),

  // Milestones - About Page Timeline (full form)
  "milestones.timeline": JSON.stringify([
    { year: "1994", label: "Founded", body: "A single trading yard and one weighbridge." },
    { year: "1999", label: "First warehouse", body: "8,000 sq ft of covered steel storage." },
    { year: "2003", label: "Rolling mill", body: "In-house rolling brings quality under our roof." },
    { year: "2008", label: "Distribution network", body: "Nine depots across four states." },
    { year: "2011", label: "ISO 9001", body: "Certified quality management across every line." },
    { year: "2016", label: "Landmark partnerships", body: "Framework supply with national contractors." },
    { year: "2018", label: "1M tonnes", body: "Annual dispatch crosses a million tonnes." },
    { year: "2022", label: "New headquarters", body: "A vertical campus built from our own steel." },
    { year: "2026", label: "Green steel", body: "Scrap-led route with published EPDs." },
  ]),
};

async function ensureSeeded() {
  const count = await prisma.webConfig.count();
  if (count === 0) {
    const entries = Object.entries(DEFAULT_CONFIG).map(([key, value]) => ({
      key,
      value,
    }));
    await prisma.webConfig.createMany({ data: entries });
  }
}

export async function getAllWebConfig(): Promise<Record<string, string>> {
  await ensureSeeded();

  const rows = await prisma.webConfig.findMany();
  const map: Record<string, string> = {};
  for (const row of rows) {
    map[row.key] = row.value;
  }
  return map;
}

export async function getWebConfigByKey(key: string): Promise<string | null> {
  await ensureSeeded();

  const row = await prisma.webConfig.findUnique({ where: { key } });
  return row?.value ?? DEFAULT_CONFIG[key] ?? null;
}

export async function bulkUpsertWebConfig(entries: { key: string; value: string }[]) {
  const results = await prisma.$transaction(
    entries.map((entry) =>
      prisma.webConfig.upsert({
        where: { key: entry.key },
        update: { value: entry.value },
        create: { key: entry.key, value: entry.value },
      })
    )
  );

  return { success: true, count: results.length };
}
