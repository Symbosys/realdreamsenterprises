import axios from "axios";
import { useQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";

export interface ServingLocationData {
  id: number;
  code: string;
  name: string;
  zone: string;
  state: string;
  isHub: boolean;
  activeSupply: boolean;
  leadTime: string;
  stockStatus: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const locationKeys = {
  all: ["locations"] as const,
  active: () => [...locationKeys.all, "active"] as const,
  admin: () => [...locationKeys.all, "admin"] as const,
};

export const activeLocationsQueryOptions = () =>
  queryOptions({
    queryKey: locationKeys.active(),
    queryFn: async (): Promise<ServingLocationData[]> => {
      try {
        const { data } = await axios.get("/api/serving-locations/active");
        if (data && Array.isArray(data.data)) {
          return data.data;
        }
        return [];
      } catch (err: any) {
        console.error("activeLocationsQueryOptions error:", err);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });

export const adminLocationsQueryOptions = () =>
  queryOptions({
    queryKey: locationKeys.admin(),
    queryFn: async (): Promise<ServingLocationData[]> => {
      try {
        const { data } = await axios.get("/api/serving-locations");
        if (data && Array.isArray(data.data)) {
          return data.data;
        }
        return [];
      } catch (err: any) {
        console.error("adminLocationsQueryOptions error:", err);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });

export function useGetActiveLocations() {
  return useQuery(activeLocationsQueryOptions());
}

export function useGetAdminLocations() {
  return useQuery(adminLocationsQueryOptions());
}

// Create Location Mutation
export function useCreateLocation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: { code?: string; name: string; zone: string; state?: string; isHub?: boolean; activeSupply?: boolean; leadTime?: string; stockStatus?: string }) => {
      const { data } = await axios.post("/api/serving-locations", input);
      if (!data.success) throw new Error(data.message || "Failed to create location");
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationKeys.all });
    },
  });
}

// Update Location Mutation
export function useUpdateLocation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: number; input: Partial<ServingLocationData> }) => {
      const { data } = await axios.put(`/api/serving-locations/${id}`, input);
      if (!data.success) throw new Error(data.message || "Failed to update location");
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationKeys.all });
    },
  });
}

// Delete Location Mutation
export function useDeleteLocation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/serving-locations/${id}`);
      if (!data.success) throw new Error(data.message || "Failed to delete location");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: locationKeys.all });
    },
  });
}
