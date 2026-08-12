import { prisma } from "@/config/prisma";
import { deleteImageFromCloudinary } from "./upload.action";

export interface CreateBrandInput {
  name: string;
  subtitle?: string;
  logoUrl?: string;
  themeColor?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateBrandInput {
  name?: string;
  subtitle?: string;
  logoUrl?: string;
  themeColor?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface CreatePricingItemInput {
  brandId: number;
  size: string;
  pricePerTon: number;
  pricePerPiece?: number;
  pricePerBundle?: number;
  priceChange?: string;
  isUp?: boolean;
  lastUpdatedText?: string;
}

export interface UpdatePricingItemInput {
  size?: string;
  pricePerTon?: number;
  pricePerPiece?: number;
  pricePerBundle?: number;
  priceChange?: string;
  isUp?: boolean;
  lastUpdatedText?: string;
}

// Seed initial default brands & rates if DB is empty
async function seedDefaultPricingIfEmpty() {
  const brandCount = await prisma.brand.count();
  if (brandCount > 0) return;

  const rashmi = await prisma.brand.create({
    data: {
      name: "RASHMI",
      subtitle: "SME-TMT & FE 550D",
      logoUrl: "/images/tmt_bars.png",
      themeColor: "amber",
      sortOrder: 1,
      pricingItems: {
        create: [
          { size: "8 MM", pricePerTon: 54500, pricePerPiece: 450, pricePerBundle: 2700, priceChange: "+ ₹ 500", isUp: true, lastUpdatedText: "16 May 2024, 10:30 AM" },
          { size: "10 MM", pricePerTon: 54000, pricePerPiece: 680, pricePerBundle: 4080, priceChange: "+ ₹ 400", isUp: true, lastUpdatedText: "16 May 2024, 10:30 AM" },
          { size: "12 MM", pricePerTon: 53800, pricePerPiece: 980, pricePerBundle: 5880, priceChange: "+ ₹ 300", isUp: true, lastUpdatedText: "16 May 2024, 10:30 AM" },
          { size: "16 MM", pricePerTon: 53500, pricePerPiece: 1720, pricePerBundle: 6880, priceChange: "- ₹ 200", isUp: false, lastUpdatedText: "16 May 2024, 10:30 AM" },
          { size: "20 MM", pricePerTon: 53200, pricePerPiece: 2680, pricePerBundle: 8040, priceChange: "+ ₹ 200", isUp: true, lastUpdatedText: "16 May 2024, 10:30 AM" },
          { size: "25 MM", pricePerTon: 53000, pricePerPiece: 4180, pricePerBundle: 8360, priceChange: "+ ₹ 100", isUp: true, lastUpdatedText: "16 May 2024, 10:30 AM" },
          { size: "32 MM", pricePerTon: 52600, pricePerPiece: 6860, pricePerBundle: 13720, priceChange: "+ ₹ 300", isUp: true, lastUpdatedText: "16 May 2024, 10:30 AM" },
        ],
      },
    },
  });

  const jsw = await prisma.brand.create({
    data: {
      name: "JSW TMT",
      subtitle: "NEOSTEEL · BETTER EVERYDAY",
      logoUrl: "/images/tmt_bars.png",
      themeColor: "blue",
      sortOrder: 2,
      pricingItems: {
        create: [
          { size: "8 MM", pricePerTon: 57800, pricePerPiece: 480, pricePerBundle: 2880, priceChange: "+ ₹ 400", isUp: true, lastUpdatedText: "16 May 2024, 10:30 AM" },
          { size: "10 MM", pricePerTon: 57200, pricePerPiece: 720, pricePerBundle: 4320, priceChange: "+ ₹ 350", isUp: true, lastUpdatedText: "16 May 2024, 10:30 AM" },
          { size: "12 MM", pricePerTon: 56900, pricePerPiece: 1040, pricePerBundle: 6240, priceChange: "+ ₹ 250", isUp: true, lastUpdatedText: "16 May 2024, 10:30 AM" },
          { size: "16 MM", pricePerTon: 56500, pricePerPiece: 1820, pricePerBundle: 7280, priceChange: "- ₹ 150", isUp: false, lastUpdatedText: "16 May 2024, 10:30 AM" },
          { size: "20 MM", pricePerTon: 56100, pricePerPiece: 2820, pricePerBundle: 8460, priceChange: "+ ₹ 200", isUp: true, lastUpdatedText: "16 May 2024, 10:30 AM" },
          { size: "25 MM", pricePerTon: 55800, pricePerPiece: 4400, pricePerBundle: 8800, priceChange: "+ ₹ 100", isUp: true, lastUpdatedText: "16 May 2024, 10:30 AM" },
          { size: "32 MM", pricePerTon: 55400, pricePerPiece: 7220, pricePerBundle: 14440, priceChange: "+ ₹ 300", isUp: true, lastUpdatedText: "16 May 2024, 10:30 AM" },
        ],
      },
    },
  });

  const notes = [
    "Prices are inclusive of GST.",
    "Transportation charges extra based on location.",
    "Prices may vary by location across Jharkhand.",
    "Contact us directly for special bulk order pricing.",
  ];

  for (let i = 0; i < notes.length; i++) {
    await prisma.pricingNote.create({
      data: {
        noteText: notes[i],
        sortOrder: i + 1,
      },
    });
  }
}

// Get public live pricing data
export async function getLivePricingData() {
  await seedDefaultPricingIfEmpty();

  const brands = await prisma.brand.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
    include: {
      pricingItems: {
        orderBy: { id: "asc" },
      },
    },
  });

  const notes = await prisma.pricingNote.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return { brands, notes };
}

// Get all brands & items for admin
export async function getAllBrandsWithPricing() {
  await seedDefaultPricingIfEmpty();

  const brands = await prisma.brand.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      pricingItems: {
        orderBy: { id: "asc" },
      },
    },
  });

  const notes = await prisma.pricingNote.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return { brands, notes };
}

// Create Brand
export async function createBrand(input: CreateBrandInput) {
  const brand = await prisma.brand.create({
    data: {
      name: input.name,
      subtitle: input.subtitle || "",
      logoUrl: input.logoUrl || "",
      themeColor: input.themeColor || "amber",
      isActive: input.isActive ?? true,
      sortOrder: input.sortOrder || 0,
    },
    include: {
      pricingItems: true,
    },
  });
  return brand;
}

// Update Brand (deletes old image from Cloudinary if logoUrl changed)
export async function updateBrand(id: number, input: UpdateBrandInput) {
  if (input.logoUrl !== undefined) {
    const existing = await prisma.brand.findUnique({ where: { id } });
    if (existing && existing.logoUrl && existing.logoUrl !== input.logoUrl) {
      await deleteImageFromCloudinary(existing.logoUrl);
    }
  }

  const brand = await prisma.brand.update({
    where: { id },
    data: {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.subtitle !== undefined && { subtitle: input.subtitle }),
      ...(input.logoUrl !== undefined && { logoUrl: input.logoUrl }),
      ...(input.themeColor !== undefined && { themeColor: input.themeColor }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
      ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
    },
    include: {
      pricingItems: true,
    },
  });
  return brand;
}

// Delete Brand (deletes Cloudinary image)
export async function deleteBrand(id: number) {
  const existing = await prisma.brand.findUnique({ where: { id } });
  if (existing && existing.logoUrl) {
    await deleteImageFromCloudinary(existing.logoUrl);
  }

  await prisma.brand.delete({
    where: { id },
  });
  return { success: true, id };
}

// Create Pricing Item for a Brand
export async function createPricingItem(input: CreatePricingItemInput) {
  const item = await prisma.pricingItem.create({
    data: {
      brandId: input.brandId,
      size: input.size,
      pricePerTon: input.pricePerTon,
      pricePerPiece: input.pricePerPiece || 0,
      pricePerBundle: input.pricePerBundle || 0,
      priceChange: input.priceChange || "+ ₹ 0",
      isUp: input.isUp ?? true,
      lastUpdatedText: input.lastUpdatedText || new Date().toLocaleString(),
    },
  });
  return item;
}

// Update Pricing Item
export async function updatePricingItem(id: number, input: UpdatePricingItemInput) {
  const item = await prisma.pricingItem.update({
    where: { id },
    data: {
      ...(input.size !== undefined && { size: input.size }),
      ...(input.pricePerTon !== undefined && { pricePerTon: input.pricePerTon }),
      ...(input.pricePerPiece !== undefined && { pricePerPiece: input.pricePerPiece }),
      ...(input.pricePerBundle !== undefined && { pricePerBundle: input.pricePerBundle }),
      ...(input.priceChange !== undefined && { priceChange: input.priceChange }),
      ...(input.isUp !== undefined && { isUp: input.isUp }),
      ...(input.lastUpdatedText !== undefined && { lastUpdatedText: input.lastUpdatedText }),
    },
  });
  return item;
}

// Delete Pricing Item
export async function deletePricingItem(id: number) {
  await prisma.pricingItem.delete({
    where: { id },
  });
  return { success: true, id };
}

// Update Pricing Notes
export async function updatePricingNotes(noteTexts: string[]) {
  // Clear existing notes and re-insert
  await prisma.pricingNote.deleteMany({});
  for (let i = 0; i < noteTexts.length; i++) {
    await prisma.pricingNote.create({
      data: {
        noteText: noteTexts[i],
        sortOrder: i + 1,
      },
    });
  }
  return await prisma.pricingNote.findMany({ orderBy: { sortOrder: "asc" } });
}
