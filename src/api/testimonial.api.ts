import axios from "axios";
import { useQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";

export interface TestimonialData {
  id: number;
  name: string;
  role: string;
  company: string | null;
  quote: string;
  rating: number;
  avatarUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const testimonialKeys = {
  all: ["testimonials"] as const,
  active: () => [...testimonialKeys.all, "active"] as const,
  list: () => [...testimonialKeys.all, "list"] as const,
};

export const activeTestimonialsQueryOptions = () =>
  queryOptions({
    queryKey: testimonialKeys.active(),
    queryFn: async (): Promise<TestimonialData[]> => {
      const { data } = await axios.get("/api/testimonials/active");
      return data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const allTestimonialsQueryOptions = () =>
  queryOptions({
    queryKey: testimonialKeys.list(),
    queryFn: async (): Promise<TestimonialData[]> => {
      const { data } = await axios.get("/api/testimonials");
      return data.data;
    },
    staleTime: 1000 * 60 * 2,
  });

export function useGetActiveTestimonials() {
  return useQuery(activeTestimonialsQueryOptions());
}

export function useGetAllTestimonials() {
  return useQuery(allTestimonialsQueryOptions());
}

export function useCreateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      name: string;
      role: string;
      company?: string;
      quote: string;
      rating?: number;
      avatarUrl?: string;
      isActive?: boolean;
      sortOrder?: number;
    }) => {
      const { data } = await axios.post("/api/testimonials", input);
      if (!data.success) throw new Error(data.message || "Failed to create testimonial");
      return data.data as TestimonialData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testimonialKeys.all });
    },
  });
}

export function useUpdateTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: number;
      input: {
        name?: string;
        role?: string;
        company?: string;
        quote?: string;
        rating?: number;
        avatarUrl?: string;
        isActive?: boolean;
        sortOrder?: number;
      };
    }) => {
      const { data } = await axios.put(`/api/testimonials/${id}`, input);
      if (!data.success) throw new Error(data.message || "Failed to update testimonial");
      return data.data as TestimonialData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testimonialKeys.all });
    },
  });
}

export function useDeleteTestimonial() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/testimonials/${id}`);
      if (!data.success) throw new Error(data.message || "Failed to delete testimonial");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: testimonialKeys.all });
    },
  });
}
