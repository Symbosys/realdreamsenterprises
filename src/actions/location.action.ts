import { prisma } from "@/config/prisma";

export interface CreateLocationInput {
  code?: string;
  name: string;
  zone: string;
  state?: string;
  isHub?: boolean;
  activeSupply?: boolean;
  leadTime?: string;
  stockStatus?: string;
  sortOrder?: number;
}

export interface UpdateLocationInput {
  name?: string;
  zone?: string;
  state?: string;
  isHub?: boolean;
  activeSupply?: boolean;
  leadTime?: string;
  stockStatus?: string;
  sortOrder?: number;
}

// Get active serving locations for public site
export async function getActiveServingLocations() {
  const locations = await prisma.servingLocation.findMany({
    where: { activeSupply: true },
    orderBy: { sortOrder: "asc" },
  });

  return locations;
}

// Get all serving locations for admin dashboard
export async function getAllServingLocations() {
  const locations = await prisma.servingLocation.findMany({
    orderBy: { sortOrder: "asc" },
  });

  return locations;
}

// Create Location
export async function createServingLocation(input: CreateLocationInput) {
  const count = await prisma.servingLocation.count();
  const locationCode = input.code || `LOC-${String(count + 1).padStart(2, "0")}`;

  const location = await prisma.servingLocation.create({
    data: {
      code: locationCode,
      name: input.name,
      zone: input.zone,
      state: input.state || "Jharkhand",
      isHub: input.isHub ?? false,
      activeSupply: input.activeSupply ?? true,
      leadTime: input.leadTime || "24-48 Hours",
      stockStatus: input.stockStatus || "Ready Stock",
      sortOrder: input.sortOrder || count + 1,
    },
  });

  return location;
}

// Update Location
export async function updateServingLocation(id: number, input: UpdateLocationInput) {
  const location = await prisma.servingLocation.update({
    where: { id },
    data: {
      ...(input.name !== undefined && { name: input.name }),
      ...(input.zone !== undefined && { zone: input.zone }),
      ...(input.state !== undefined && { state: input.state }),
      ...(input.isHub !== undefined && { isHub: input.isHub }),
      ...(input.activeSupply !== undefined && { activeSupply: input.activeSupply }),
      ...(input.leadTime !== undefined && { leadTime: input.leadTime }),
      ...(input.stockStatus !== undefined && { stockStatus: input.stockStatus }),
      ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
    },
  });

  return location;
}

// Delete Location
export async function deleteServingLocation(id: number) {
  await prisma.servingLocation.delete({
    where: { id },
  });

  return { success: true, id };
}
