import { prisma } from "@/config/prisma";
import type {
  EnquiryStatus,
  EnquiryPriority,
  EnquirySource,
} from "../../generated/prisma/client";

export interface SubmitEnquiryInput {
  name: string;
  companyName?: string;
  email: string;
  phone: string;
  projectLocation?: string;
  requirementType?: string;
  estimatedTonnage?: string;
  message: string;
}

export interface GetEnquiriesQuery {
  page?: number;
  limit?: number;
  status?: EnquiryStatus | "ALL";
  priority?: EnquiryPriority | "ALL";
  assignedToAdminId?: number | "ALL";
  search?: string;
  startDate?: string;
  endDate?: string;
}

export interface UpdateEnquiryInput {
  status?: EnquiryStatus;
  priority?: EnquiryPriority;
  assignedToAdminId?: number | null;
  nextFollowUpDate?: Date | string | null;
}

export interface AddFollowUpInput {
  adminId?: number;
  notes: string;
  status?: EnquiryStatus;
  scheduledFollowUpDate?: Date | string | null;
}

// Generate unique tracking reference number (e.g. REQ-1001, REQ-1002)
async function generateEnquiryNumber(): Promise<string> {
  const count = await prisma.enquiry.count();
  const nextNum = 1000 + count + 1;
  return `REQ-${nextNum}`;
}

// Public Submission Action
export async function submitEnquiry(input: SubmitEnquiryInput) {
  const enquiryNumber = await generateEnquiryNumber();

  const enquiry = await prisma.enquiry.create({
    data: {
      enquiryNumber,
      name: input.name,
      companyName: input.companyName || null,
      email: input.email,
      phone: input.phone,
      projectLocation: input.projectLocation || null,
      requirementType: input.requirementType || "Rashmi TMT Bars (8-32mm)",
      estimatedTonnage: input.estimatedTonnage || null,
      message: input.message,
      status: "NEW",
      priority: "MEDIUM",
      source: "WEBSITE",
    },
  });

  return enquiry;
}

// Admin Paginated Query Action
export async function getEnquiries(query: GetEnquiriesQuery = {}) {
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.max(1, Number(query.limit) || 10);
  const skip = (page - 1) * limit;

  const where: any = {};

  if (query.status && query.status !== "ALL") {
    where.status = query.status;
  }

  if (query.priority && query.priority !== "ALL") {
    where.priority = query.priority;
  }

  if (query.assignedToAdminId !== undefined && query.assignedToAdminId !== "ALL") {
    where.assignedToAdminId = query.assignedToAdminId === 0 ? null : Number(query.assignedToAdminId);
  }

  if (query.startDate || query.endDate) {
    where.createdAt = {};
    if (query.startDate) {
      where.createdAt.gte = new Date(query.startDate);
    }
    if (query.endDate) {
      const end = new Date(query.endDate);
      end.setHours(23, 59, 59, 999);
      where.createdAt.lte = end;
    }
  }

  if (query.search && query.search.trim() !== "") {
    const q = query.search.trim();
    where.OR = [
      { enquiryNumber: { contains: q } },
      { name: { contains: q } },
      { companyName: { contains: q } },
      { email: { contains: q } },
      { phone: { contains: q } },
      { projectLocation: { contains: q } },
      { requirementType: { contains: q } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.enquiry.findMany({
      where,
      include: {
        assignedAdmin: {
          select: { id: true, name: true, email: true, role: true },
        },
        followUps: {
          include: {
            admin: {
              select: { id: true, name: true, email: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    }),
    prisma.enquiry.count({ where }),
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return {
    items,
    total,
    totalPages,
    currentPage: page,
    limit,
  };
}

// Admin Update Enquiry Action
export async function updateEnquiry(id: number, input: UpdateEnquiryInput) {
  const data: any = {};

  if (input.status !== undefined) data.status = input.status;
  if (input.priority !== undefined) data.priority = input.priority;
  if (input.assignedToAdminId !== undefined) data.assignedToAdminId = input.assignedToAdminId;
  if (input.nextFollowUpDate !== undefined) {
    data.nextFollowUpDate = input.nextFollowUpDate ? new Date(input.nextFollowUpDate) : null;
  }

  const enquiry = await prisma.enquiry.update({
    where: { id },
    data,
    include: {
      assignedAdmin: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  return enquiry;
}

// Admin Log Follow-up Action
export async function addFollowUpLog(enquiryId: number, input: AddFollowUpInput) {
  const followUpDate = input.scheduledFollowUpDate ? new Date(input.scheduledFollowUpDate) : null;

  const followUp = await prisma.enquiryFollowUp.create({
    data: {
      enquiryId,
      adminId: input.adminId || null,
      notes: input.notes,
      status: input.status || null,
      scheduledFollowUpDate: followUpDate,
    },
    include: {
      admin: {
        select: { id: true, name: true, email: true },
      },
    },
  });

  // Update Enquiry's status and nextFollowUpDate
  await prisma.enquiry.update({
    where: { id: enquiryId },
    data: {
      ...(input.status && { status: input.status }),
      ...(followUpDate !== undefined && { nextFollowUpDate: followUpDate }),
    },
  });

  return followUp;
}

// Admin Delete Action
export async function deleteEnquiry(id: number) {
  await prisma.enquiry.delete({
    where: { id },
  });

  return { success: true, id };
}
