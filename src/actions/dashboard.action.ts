import { prisma } from "@/config/prisma";

export async function getDashboardStats() {
  const [
    totalEnquiries,
    newEnquiries,
    inFollowUpEnquiries,
    totalClients,
    activeClients,
    totalLocations,
    activeLocations,
    totalBrands,
    activeBrands,
    totalAdmins,
    recentEnquiries,
    recentClients,
  ] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: "NEW" } }),
    prisma.enquiry.count({ where: { status: "IN_FOLLOWUP" } }),
    prisma.myClient.count(),
    prisma.myClient.count({ where: { isActive: true } }),
    prisma.servingLocation.count(),
    prisma.servingLocation.count({ where: { activeSupply: true } }),
    prisma.brand.count(),
    prisma.brand.count({ where: { isActive: true } }),
    prisma.admin.count({ where: { isActive: true } }),
    prisma.enquiry.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: {
        assignedAdmin: {
          select: { id: true, name: true, email: true },
        },
      },
    }),
    prisma.myClient.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return {
    enquiries: {
      total: totalEnquiries,
      newCount: newEnquiries,
      inFollowUpCount: inFollowUpEnquiries,
      recent: recentEnquiries,
    },
    clients: {
      total: totalClients,
      active: activeClients,
      recent: recentClients,
    },
    locations: {
      total: totalLocations,
      active: activeLocations,
    },
    brands: {
      total: totalBrands,
      active: activeBrands,
    },
    admins: {
      totalActive: totalAdmins,
    },
  };
}
