import axios from "axios";
import { useQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";

export interface PricingItemData {
  id: number;
  brandId: number;
  size: string;
  pricePerTon: number;
  pricePerPiece?: number;
  pricePerBundle?: number;
  priceChange: string;
  isUp: boolean;
  lastUpdatedText?: string;
}

export interface BrandData {
  id: number;
  name: string;
  subtitle?: string;
  logoUrl?: string;
  themeColor?: string;
  isActive: boolean;
  sortOrder: number;
  pricingItems: PricingItemData[];
}

export interface PricingNoteData {
  id: number;
  noteText: string;
  sortOrder: number;
}

export interface LivePricingPayload {
  brands: BrandData[];
  notes: PricingNoteData[];
}

export const pricingKeys = {
  all: ["pricing"] as const,
  live: () => [...pricingKeys.all, "live"] as const,
  admin: () => [...pricingKeys.all, "admin"] as const,
};

export const livePricingQueryOptions = () =>
  queryOptions({
    queryKey: pricingKeys.live(),
    queryFn: async (): Promise<LivePricingPayload> => {
      try {
        const { data } = await axios.get("/api/pricing/live");
        if (data && data.data) {
          return data.data;
        }
        return { brands: [], notes: [] };
      } catch (err: any) {
        console.error("livePricingQueryOptions error:", err);
        return { brands: [], notes: [] };
      }
    },
    staleTime: 1000 * 60 * 5,
  });

export const adminPricingQueryOptions = () =>
  queryOptions({
    queryKey: pricingKeys.admin(),
    queryFn: async (): Promise<LivePricingPayload> => {
      try {
        const { data } = await axios.get("/api/pricing/brands");
        if (data && data.data) {
          return data.data;
        }
        return { brands: [], notes: [] };
      } catch (err: any) {
        console.error("adminPricingQueryOptions error:", err);
        return { brands: [], notes: [] };
      }
    },
    staleTime: 1000 * 60 * 5,
  });

export function useGetLivePricing() {
  return useQuery(livePricingQueryOptions());
}

export function useGetAdminPricing() {
  return useQuery(adminPricingQueryOptions());
}

// Upload Image to Cloudinary Mutation
export function useUploadImage() {
  return useMutation({
    mutationFn: async ({ image, folder }: { image: string; folder?: string }) => {
      const { data } = await axios.post("/api/upload", { image, folder });
      if (!data.success) {
        throw new Error(data.message || "Failed to upload image");
      }
      return data.url as string;
    },
  });
}

// Create Brand Mutation
export function useCreateBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { name: string; subtitle?: string; logoUrl?: string; themeColor?: string; isActive?: boolean }) => {
      const { data } = await axios.post("/api/pricing/brands", input);
      if (!data.success) throw new Error(data.message || "Failed to create brand");
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pricingKeys.all });
    },
  });
}

// Update Brand Mutation
export function useUpdateBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: number; input: Partial<BrandData> }) => {
      const { data } = await axios.put(`/api/pricing/brands/${id}`, input);
      if (!data.success) throw new Error(data.message || "Failed to update brand");
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pricingKeys.all });
    },
  });
}

// Delete Brand Mutation
export function useDeleteBrand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/pricing/brands/${id}`);
      if (!data.success) throw new Error(data.message || "Failed to delete brand");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pricingKeys.all });
    },
  });
}

// Create Pricing Item Mutation
export function useCreatePricingItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { brandId: number; size: string; pricePerTon: number; pricePerPiece?: number; pricePerBundle?: number; priceChange?: string; isUp?: boolean }) => {
      const { data } = await axios.post("/api/pricing/items", input);
      if (!data.success) throw new Error(data.message || "Failed to create pricing item");
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pricingKeys.all });
    },
  });
}

// Update Pricing Item Mutation
export function useUpdatePricingItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: number; input: Partial<PricingItemData> }) => {
      const { data } = await axios.put(`/api/pricing/items/${id}`, input);
      if (!data.success) throw new Error(data.message || "Failed to update pricing item");
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pricingKeys.all });
    },
  });
}

// Delete Pricing Item Mutation
export function useDeletePricingItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/pricing/items/${id}`);
      if (!data.success) throw new Error(data.message || "Failed to delete pricing item");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pricingKeys.all });
    },
  });
}

// Update Pricing Notes Mutation
export function useUpdatePricingNotes() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (notes: string[]) => {
      const { data } = await axios.put("/api/pricing/notes", { notes });
      if (!data.success) throw new Error(data.message || "Failed to update pricing notes");
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: pricingKeys.all });
    },
  });
}
