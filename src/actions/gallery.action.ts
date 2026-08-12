import { prisma } from "@/config/prisma";
import { deleteImageFromCloudinary } from "./upload.action";

export interface CreateGalleryInput {
  title: string;
  category?: string;
  imageUrl: string;
  caption?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateGalleryInput {
  title?: string;
  category?: string;
  imageUrl?: string;
  caption?: string;
  isActive?: boolean;
  sortOrder?: number;
}

const INITIAL_GALLERY_IMAGES = [
  {
    title: "Rashmi TMT Steel Yard - Ranchi",
    category: "Stock & Warehouse",
    imageUrl: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop",
    caption: "Primary stockyard holding over 5,000 MT of Fe 550D Rashmi TMT bars ready for site dispatch.",
  },
  {
    title: "Structural Beams & Channels",
    category: "Stock & Warehouse",
    imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1200&auto=format&fit=crop",
    caption: "High-grade ISMB structural steel beams and heavy channels for bridge projects.",
  },
  {
    title: "Heavy Logistic Fleet",
    category: "Delivery & Logistics",
    imageUrl: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=1200&auto=format&fit=crop",
    caption: "Trailer logistics fleet dispatched to Jamshedpur industrial sites within 24 hours.",
  },
  {
    title: "PWD Road Infrastructure Supply",
    category: "Site Projects",
    imageUrl: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?q=80&w=1200&auto=format&fit=crop",
    caption: "Direct steel supply for Ranchi Ring Road expansion project under PWD tender.",
  },
];

export async function getActiveGalleryImages() {
  let images = await prisma.galleryImage.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  if (images.length === 0) {
    await prisma.galleryImage.createMany({
      data: INITIAL_GALLERY_IMAGES,
    });
    images = await prisma.galleryImage.findMany({
      where: { isActive: true },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  }

  return images;
}

export async function getAllGalleryImages() {
  let images = await prisma.galleryImage.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  if (images.length === 0) {
    await prisma.galleryImage.createMany({
      data: INITIAL_GALLERY_IMAGES,
    });
    images = await prisma.galleryImage.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
  }

  return images;
}

export async function createGalleryImage(input: CreateGalleryInput) {
  const image = await prisma.galleryImage.create({
    data: {
      title: input.title,
      category: input.category || "Stock & Warehouse",
      imageUrl: input.imageUrl,
      caption: input.caption || null,
      isActive: input.isActive ?? true,
      sortOrder: input.sortOrder ?? 0,
    },
  });

  return image;
}

export async function updateGalleryImage(id: number, input: UpdateGalleryInput) {
  const existing = await prisma.galleryImage.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new Error("Gallery item not found");
  }

  // If replacing image URL, delete old Cloudinary image
  if (input.imageUrl && input.imageUrl !== existing.imageUrl) {
    await deleteImageFromCloudinary(existing.imageUrl);
  }

  const updated = await prisma.galleryImage.update({
    where: { id },
    data: {
      ...(input.title !== undefined && { title: input.title }),
      ...(input.category !== undefined && { category: input.category }),
      ...(input.imageUrl !== undefined && { imageUrl: input.imageUrl }),
      ...(input.caption !== undefined && { caption: input.caption }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
      ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
    },
  });

  return updated;
}

export async function deleteGalleryImage(id: number) {
  const existing = await prisma.galleryImage.findUnique({
    where: { id },
  });

  if (existing) {
    await deleteImageFromCloudinary(existing.imageUrl);
    await prisma.galleryImage.delete({
      where: { id },
    });
  }

  return { success: true, id };
}
