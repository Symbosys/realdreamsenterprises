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

// Get public live pricing data
export async function getLivePricingData() {
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
