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

export async function getActiveGalleryImages() {
  const images = await prisma.galleryImage.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return images;
}

export async function getAllGalleryImages() {
  const images = await prisma.galleryImage.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

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
