import { prisma } from "@/config/prisma";
import { deleteImageFromCloudinary } from "./upload.action";

export interface CreateTestimonialInput {
  name: string;
  role: string;
  company?: string;
  quote: string;
  rating?: number;
  avatarUrl?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateTestimonialInput {
  name?: string;
  role?: string;
  company?: string;
  quote?: string;
  rating?: number;
  avatarUrl?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export async function getActiveTestimonials() {
  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return testimonials;
}

export async function getAllTestimonials() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return testimonials;
}

export async function createTestimonial(input: CreateTestimonialInput) {
  const count = await prisma.testimonial.count();

  const testimonial = await prisma.testimonial.create({
    data: {
      name: input.name,
      role: input.role,
      company: input.company || "",
      quote: input.quote,
      rating: input.rating ?? 5,
      avatarUrl: input.avatarUrl || null,
      isActive: input.isActive ?? true,
      sortOrder: input.sortOrder || count + 1,
    },
  });

  return testimonial;
}

export async function updateTestimonial(id: number, input: UpdateTestimonialInput) {
  if (input.avatarUrl !== undefined) {
    const existing = await prisma.testimonial.findUnique({ where: { id } });
    if (existing && existing.avatarUrl && existing.avatarUrl !== input.avatarUrl) {
      await deleteImageFromCloudinary(existing.avatarUrl);
    }
  }

  const testimonial = await prisma.testimonial.update({
    where: { id },
    data: {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.role !== undefined && { role: input.role }),
      ...(input.company !== undefined && { company: input.company }),
      ...(input.quote !== undefined && { quote: input.quote }),
      ...(input.rating !== undefined && { rating: input.rating }),
      ...(input.avatarUrl !== undefined && { avatarUrl: input.avatarUrl }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
      ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
    },
  });

  return testimonial;
}

export async function deleteTestimonial(id: number) {
  const existing = await prisma.testimonial.findUnique({ where: { id } });
  if (existing && existing.avatarUrl) {
    await deleteImageFromCloudinary(existing.avatarUrl);
  }

  await prisma.testimonial.delete({
    where: { id },
  });

  return { success: true, id };
}
