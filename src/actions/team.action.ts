import { prisma } from "@/config/prisma";
import { deleteImageFromCloudinary } from "./upload.action";

export interface CreateTeamMemberInput {
  name: string;
  role: string;
  bio?: string;
  imageUrl?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateTeamMemberInput {
  name?: string;
  role?: string;
  bio?: string;
  imageUrl?: string;
  email?: string;
  phone?: string;
  linkedin?: string;
  isActive?: boolean;
  sortOrder?: number;
}

export async function getActiveTeamMembers() {
  const members = await prisma.teamMember.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return members;
}

export async function getAllTeamMembers() {
  const members = await prisma.teamMember.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return members;
}

export async function createTeamMember(input: CreateTeamMemberInput) {
  const count = await prisma.teamMember.count();

  const member = await prisma.teamMember.create({
    data: {
      name: input.name,
      role: input.role,
      bio: input.bio || "",
      imageUrl: input.imageUrl || null,
      email: input.email || null,
      phone: input.phone || null,
      linkedin: input.linkedin || null,
      isActive: input.isActive ?? true,
      sortOrder: input.sortOrder || count + 1,
    },
  });

  return member;
}

export async function updateTeamMember(id: number, input: UpdateTeamMemberInput) {
  if (input.imageUrl !== undefined) {
    const existing = await prisma.teamMember.findUnique({ where: { id } });
    if (existing && existing.imageUrl && existing.imageUrl !== input.imageUrl) {
      await deleteImageFromCloudinary(existing.imageUrl);
    }
  }

  const member = await prisma.teamMember.update({
    where: { id },
    data: {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.role !== undefined && { role: input.role }),
      ...(input.bio !== undefined && { bio: input.bio }),
      ...(input.imageUrl !== undefined && { imageUrl: input.imageUrl }),
      ...(input.email !== undefined && { email: input.email }),
      ...(input.phone !== undefined && { phone: input.phone }),
      ...(input.linkedin !== undefined && { linkedin: input.linkedin }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
      ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
    },
  });

  return member;
}

export async function deleteTeamMember(id: number) {
  const existing = await prisma.teamMember.findUnique({ where: { id } });
  if (existing && existing.imageUrl) {
    await deleteImageFromCloudinary(existing.imageUrl);
  }

  await prisma.teamMember.delete({
    where: { id },
  });

  return { success: true, id };
}
