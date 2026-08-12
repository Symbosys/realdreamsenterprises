import { prisma } from "@/config/prisma";
import { deleteImageFromCloudinary } from "./upload.action";
import { CLIENTS } from "@/data/clients";

export interface CreateClientInput {
  clientName: string;
  category?: string;
  location?: string;
  badge?: string;
  clientImage: string;
  isActive?: boolean;
  sortOrder?: number;
}

export interface UpdateClientInput {
  clientName?: string;
  category?: string;
  location?: string;
  badge?: string;
  clientImage?: string;
  isActive?: boolean;
  sortOrder?: number;
}

async function seedDefaultClientsIfEmpty() {
  const count = await prisma.myClient.count();
  if (count > 0) return;

  for (let i = 0; i < CLIENTS.length; i++) {
    const c = CLIENTS[i];
    await prisma.myClient.create({
      data: {
        clientName: c.name,
        category: c.category,
        location: c.location,
        badge: c.badge,
        clientImage: c.logo,
        isActive: true,
        sortOrder: i + 1,
      },
    });
  }
}

// Get active clients for public website
export async function getActiveClients() {
  await seedDefaultClientsIfEmpty();

  const clients = await prisma.myClient.findMany({
    where: { isActive: true },
    orderBy: { sortOrder: "asc" },
  });

  return clients;
}

// Get all clients for admin dashboard
export async function getAllClients() {
  await seedDefaultClientsIfEmpty();

  const clients = await prisma.myClient.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return clients;
}

// Create Client
export async function createClient(input: CreateClientInput) {
  const count = await prisma.myClient.count();

  const client = await prisma.myClient.create({
    data: {
      clientName: input.clientName,
      category: input.category || "Government & Infra",
      location: input.location || "",
      badge: input.badge || "Client Partner",
      clientImage: input.clientImage,
      isActive: input.isActive ?? true,
      sortOrder: input.sortOrder || count + 1,
    },
  });

  return client;
}

// Update Client (deletes old image from Cloudinary if clientImage is replaced)
export async function updateClient(id: number, input: UpdateClientInput) {
  if (input.clientImage !== undefined) {
    const existing = await prisma.myClient.findUnique({ where: { id } });
    if (existing && existing.clientImage && existing.clientImage !== input.clientImage) {
      await deleteImageFromCloudinary(existing.clientImage);
    }
  }

  const client = await prisma.myClient.update({
    where: { id },
    data: {
      ...(input.clientName !== undefined && { clientName: input.clientName }),
      ...(input.category !== undefined && { category: input.category }),
      ...(input.location !== undefined && { location: input.location }),
      ...(input.badge !== undefined && { badge: input.badge }),
      ...(input.clientImage !== undefined && { clientImage: input.clientImage }),
      ...(input.isActive !== undefined && { isActive: input.isActive }),
      ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
    },
  });

  return client;
}

// Delete Client (deletes associated Cloudinary image)
export async function deleteClient(id: number) {
  const existing = await prisma.myClient.findUnique({ where: { id } });
  if (existing && existing.clientImage) {
    await deleteImageFromCloudinary(existing.clientImage);
  }

  await prisma.myClient.delete({
    where: { id },
  });

  return { success: true, id };
}
