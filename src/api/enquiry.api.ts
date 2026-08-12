import axios from "axios";
import { useQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";

export type EnquiryStatusType = "NEW" | "CONTACTED" | "IN_FOLLOWUP" | "PROPOSAL_SENT" | "WON" | "LOST";
export type EnquiryPriorityType = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

export interface FollowUpLogData {
  id: number;
  enquiryId: number;
  adminId: number | null;
  admin?: { id: number; name: string; email: string } | null;
  notes: string;
  status: EnquiryStatusType | null;
  scheduledFollowUpDate: string | null;
  createdAt: string;
}

export interface EnquiryData {
  id: number;
  enquiryNumber: string;
  name: string;
  companyName: string | null;
  email: string;
  phone: string;
  projectLocation: string | null;
  requirementType: string | null;
  estimatedTonnage: string | null;
  message: string;
  status: EnquiryStatusType;
  priority: EnquiryPriorityType;
  source: string;
  assignedToAdminId: number | null;
  assignedAdmin?: { id: number; name: string; email: string; role: string } | null;
  nextFollowUpDate: string | null;
  followUps?: FollowUpLogData[];
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedEnquiriesResponse {
  success: boolean;
  items: EnquiryData[];
  total: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface EnquiryQueryParams {
  page?: number;
  limit?: number;
  status?: EnquiryStatusType | "ALL";
  priority?: EnquiryPriorityType | "ALL";
  assignedToAdminId?: number | "ALL";
  search?: string;
  startDate?: string;
  endDate?: string;
}

export const enquiryKeys = {
  all: ["enquiries"] as const,
  list: (params: EnquiryQueryParams) => [...enquiryKeys.all, "list", params] as const,
};

export const enquiriesQueryOptions = (params: EnquiryQueryParams = {}) =>
  queryOptions({
    queryKey: enquiryKeys.list(params),
    queryFn: async (): Promise<PaginatedEnquiriesResponse> => {
      const { data } = await axios.get("/api/enquiries", { params });
      return data;
    },
    staleTime: 1000 * 60 * 2,
  });

export function useGetEnquiries(params: EnquiryQueryParams = {}) {
  return useQuery(enquiriesQueryOptions(params));
}

// Public Submit Enquiry Mutation
export function useSubmitEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      name: string;
      companyName?: string;
      email: string;
      phone: string;
      projectLocation?: string;
      requirementType?: string;
      estimatedTonnage?: string;
      message: string;
    }) => {
      const { data } = await axios.post("/api/enquiries", input);
      if (!data.success) throw new Error(data.message || "Failed to submit enquiry");
      return data.data as EnquiryData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enquiryKeys.all });
    },
  });
}

// Admin Update Enquiry Mutation
export function useUpdateEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: number;
      input: {
        status?: EnquiryStatusType;
        priority?: EnquiryPriorityType;
        assignedToAdminId?: number | null;
        nextFollowUpDate?: string | Date | null;
      };
    }) => {
      const { data } = await axios.put(`/api/enquiries/${id}`, input);
      if (!data.success) throw new Error(data.message || "Failed to update enquiry");
      return data.data as EnquiryData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enquiryKeys.all });
    },
  });
}

// Admin Add Follow-Up Log Mutation
export function useAddFollowUp() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      enquiryId,
      input,
    }: {
      enquiryId: number;
      input: {
        adminId?: number;
        notes: string;
        status?: EnquiryStatusType;
        scheduledFollowUpDate?: string | Date | null;
      };
    }) => {
      const { data } = await axios.post(`/api/enquiries/${enquiryId}/follow-ups`, input);
      if (!data.success) throw new Error(data.message || "Failed to add follow-up log");
      return data.data as FollowUpLogData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enquiryKeys.all });
    },
  });
}

// Admin Delete Enquiry Mutation
export function useDeleteEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/enquiries/${id}`);
      if (!data.success) throw new Error(data.message || "Failed to delete enquiry");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: enquiryKeys.all });
    },
  });
}
