import axios from "axios";
import { useQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";

export interface MyClientData {
  id: number;
  clientName: string;
  category: string;
  location: string | null;
  badge: string | null;
  clientImage: string;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const clientKeys = {
  all: ["my-clients"] as const,
  active: () => [...clientKeys.all, "active"] as const,
  admin: () => [...clientKeys.all, "admin"] as const,
};

export const activeClientsQueryOptions = () =>
  queryOptions({
    queryKey: clientKeys.active(),
    queryFn: async (): Promise<MyClientData[]> => {
      try {
        const { data } = await axios.get("/api/my-clients/active");
        if (data && Array.isArray(data.data)) {
          return data.data;
        }
        return [];
      } catch (err: any) {
        console.error("activeClientsQueryOptions error:", err);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });

export const adminClientsQueryOptions = () =>
  queryOptions({
    queryKey: clientKeys.admin(),
    queryFn: async (): Promise<MyClientData[]> => {
      try {
        const { data } = await axios.get("/api/my-clients");
        if (data && Array.isArray(data.data)) {
          return data.data;
        }
        return [];
      } catch (err: any) {
        console.error("adminClientsQueryOptions error:", err);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5,
  });

export function useGetActiveClients() {
  return useQuery(activeClientsQueryOptions());
}

export function useGetAdminClients() {
  return useQuery(adminClientsQueryOptions());
}

// Create Client Mutation
export function useCreateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      clientName: string;
      category?: string;
      location?: string;
      badge?: string;
      clientImage: string;
      isActive?: boolean;
    }) => {
      const { data } = await axios.post("/api/my-clients", input);
      if (!data.success) throw new Error(data.message || "Failed to create client");
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
    },
  });
}

// Update Client Mutation
export function useUpdateClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: number; input: Partial<MyClientData> }) => {
      const { data } = await axios.put(`/api/my-clients/${id}`, input);
      if (!data.success) throw new Error(data.message || "Failed to update client");
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
    },
  });
}

// Delete Client Mutation
export function useDeleteClient() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/my-clients/${id}`);
      if (!data.success) throw new Error(data.message || "Failed to delete client");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: clientKeys.all });
    },
  });
}
