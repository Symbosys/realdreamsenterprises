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

const DEFAULT_JHARKHAND_DISTRICTS = [
  { code: "DIS-01", name: "Ranchi", zone: "South Chotanagpur", isHub: true, activeSupply: true, leadTime: "24 Hours", stockStatus: "High Stock", sortOrder: 1 },
  { code: "DIS-02", name: "Dhanbad", zone: "North Chotanagpur", isHub: true, activeSupply: true, leadTime: "24 Hours", stockStatus: "High Stock", sortOrder: 2 },
  { code: "DIS-03", name: "East Singhbhum (Jamshedpur)", zone: "South Chotanagpur", isHub: true, activeSupply: true, leadTime: "24 Hours", stockStatus: "High Stock", sortOrder: 3 },
  { code: "DIS-04", name: "Bokaro", zone: "North Chotanagpur", isHub: false, activeSupply: true, leadTime: "24-48 Hours", stockStatus: "Ready Stock", sortOrder: 4 },
  { code: "DIS-05", name: "Hazaribagh", zone: "North Chotanagpur", isHub: false, activeSupply: true, leadTime: "24-48 Hours", stockStatus: "Ready Stock", sortOrder: 5 },
  { code: "DIS-06", name: "Deoghar", zone: "Santhal Pargana", isHub: false, activeSupply: true, leadTime: "24-48 Hours", stockStatus: "Ready Stock", sortOrder: 6 },
  { code: "DIS-07", name: "Ramgarh", zone: "Central Jharkhand", isHub: false, activeSupply: true, leadTime: "24 Hours", stockStatus: "Ready Stock", sortOrder: 7 },
  { code: "DIS-08", name: "Giridih", zone: "North Chotanagpur", isHub: false, activeSupply: true, leadTime: "48 Hours", stockStatus: "Ready Stock", sortOrder: 8 },
  { code: "DIS-09", name: "Dumka", zone: "Santhal Pargana", isHub: false, activeSupply: true, leadTime: "48 Hours", stockStatus: "On Demand", sortOrder: 9 },
  { code: "DIS-10", name: "Palamu (Daltonganj)", zone: "Palamu Division", isHub: false, activeSupply: true, leadTime: "48 Hours", stockStatus: "Ready Stock", sortOrder: 10 },
  { code: "DIS-11", name: "West Singhbhum (Chaibasa)", zone: "South Chotanagpur", isHub: false, activeSupply: true, leadTime: "48 Hours", stockStatus: "Ready Stock", sortOrder: 11 },
  { code: "DIS-12", name: "Koderma", zone: "North Chotanagpur", isHub: false, activeSupply: true, leadTime: "48 Hours", stockStatus: "On Demand", sortOrder: 12 },
  { code: "DIS-13", name: "Chatra", zone: "North Chotanagpur", isHub: false, activeSupply: true, leadTime: "48 Hours", stockStatus: "On Demand", sortOrder: 13 },
  { code: "DIS-14", name: "Jamtara", zone: "Santhal Pargana", isHub: false, activeSupply: true, leadTime: "48 Hours", stockStatus: "On Demand", sortOrder: 14 },
  { code: "DIS-15", name: "Latehar", zone: "Palamu Division", isHub: false, activeSupply: true, leadTime: "48 Hours", stockStatus: "On Demand", sortOrder: 15 },
  { code: "DIS-16", name: "Lohardaga", zone: "South Chotanagpur", isHub: false, activeSupply: true, leadTime: "24-48 Hours", stockStatus: "Ready Stock", sortOrder: 16 },
  { code: "DIS-17", name: "Pakur", zone: "Santhal Pargana", isHub: false, activeSupply: true, leadTime: "48 Hours", stockStatus: "On Demand", sortOrder: 17 },
  { code: "DIS-18", name: "Sahibganj", zone: "Santhal Pargana", isHub: false, activeSupply: true, leadTime: "48 Hours", stockStatus: "On Demand", sortOrder: 18 },
  { code: "DIS-19", name: "Saraikela Kharsawan", zone: "South Chotanagpur", isHub: false, activeSupply: true, leadTime: "24 Hours", stockStatus: "Ready Stock", sortOrder: 19 },
  { code: "DIS-20", name: "Simdega", zone: "South Chotanagpur", isHub: false, activeSupply: true, leadTime: "48 Hours", stockStatus: "On Demand", sortOrder: 20 },
  { code: "DIS-21", name: "Khunti", zone: "South Chotanagpur", isHub: false, activeSupply: true, leadTime: "24 Hours", stockStatus: "Ready Stock", sortOrder: 21 },
  { code: "DIS-22", name: "Garhwa", zone: "Palamu Division", isHub: false, activeSupply: true, leadTime: "48 Hours", stockStatus: "On Demand", sortOrder: 22 },
  { code: "DIS-23", name: "Gumla", zone: "South Chotanagpur", isHub: false, activeSupply: true, leadTime: "48 Hours", stockStatus: "On Demand", sortOrder: 23 },
  { code: "DIS-24", name: "Godda", zone: "Santhal Pargana", isHub: false, activeSupply: true, leadTime: "48 Hours", stockStatus: "On Demand", sortOrder: 24 },
];

async function seedDefaultLocationsIfEmpty() {
  const count = await prisma.servingLocation.count();
  if (count > 0) return;

  for (const item of DEFAULT_JHARKHAND_DISTRICTS) {
    await prisma.servingLocation.create({
      data: {
        code: item.code,
        name: item.name,
        zone: item.zone,
        state: "Jharkhand",
        isHub: item.isHub,
        activeSupply: item.activeSupply,
        leadTime: item.leadTime,
        stockStatus: item.stockStatus,
        sortOrder: item.sortOrder,
      },
    });
  }
}

// Get active serving locations for public site
export async function getActiveServingLocations() {
  await seedDefaultLocationsIfEmpty();

  const locations = await prisma.servingLocation.findMany({
    where: { activeSupply: true },
    orderBy: { sortOrder: "asc" },
  });

  return locations;
}

// Get all serving locations for admin dashboard
export async function getAllServingLocations() {
  await seedDefaultLocationsIfEmpty();

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
