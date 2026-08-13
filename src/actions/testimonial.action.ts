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

const DEFAULT_TESTIMONIALS = [
  {
    name: "Vikrant Pandey",
    role: "Project Director",
    company: "Metro Infra Build",
    quote:
      "Working with Real Dreams Construction has been a fantastic experience. Their TMT bars offer exceptional strength and reliability, ensuring the safety and longevity of our structures. Professional service, consistent quality, and timely deliveries make them our go-to supplier.",
    rating: 5,
  },
  {
    name: "Aakriti",
    role: "Structural Consultant",
    company: "Apex Design Studio",
    quote:
      "Real Dreams Construction's TMT bars have been an absolute game-changer for our projects. The quality, strength, and reliability are unmatched. Their excellent customer service and timely delivery ensure every project is a success!",
    rating: 5,
  },
  {
    name: "Avinash Kumar",
    role: "Site Engineer",
    company: "Jharkhand Heights",
    quote:
      "Real Dreams Construction TMT bars have truly elevated the quality of our construction projects. The strength and durability of their products are top-notch, and their commitment to on-time delivery and customer satisfaction is unparalleled!",
    rating: 5,
  },
];

async function seedDefaultTestimonialsIfEmpty() {
  const count = await prisma.testimonial.count();
  if (count > 0) return;

  for (let i = 0; i < DEFAULT_TESTIMONIALS.length; i++) {
    const t = DEFAULT_TESTIMONIALS[i];
    await prisma.testimonial.create({
      data: {
        name: t.name,
        role: t.role,
        company: t.company,
        quote: t.quote,
        rating: t.rating,
        isActive: true,
        sortOrder: i + 1,
      },
    });
  }
}

export async function getActiveTestimonials() {
  await seedDefaultTestimonialsIfEmpty();

  const testimonials = await prisma.testimonial.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return testimonials;
}

export async function getAllTestimonials() {
  await seedDefaultTestimonialsIfEmpty();

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
