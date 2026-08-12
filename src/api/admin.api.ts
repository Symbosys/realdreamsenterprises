import axios from "axios";
import { useQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";
import type { CreateAdminInput, UpdateAdminInput } from "@/actions/admin.action";

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "SUBADMIN";
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Admin Query Keys
export const adminKeys = {
  all: ["admins"] as const,
  lists: () => [...adminKeys.all, "list"] as const,
  detail: (id: number) => [...adminKeys.all, "detail", id] as const,
};

// Admin Query Options for SSR prefetching & client cache
export const adminsQueryOptions = () =>
  queryOptions({
    queryKey: adminKeys.lists(),
    queryFn: async (): Promise<AdminUser[]> => {
      try {
        const { data } = await axios.get("/api/admins");
        if (data && Array.isArray(data.data)) {
          return data.data;
        }
        return [];
      } catch (err: any) {
        console.error("adminsQueryOptions fetch error:", err?.response?.data || err?.message || err);
        return [];
      }
    },
    staleTime: 1000 * 60 * 5, // 5 minutes stale time
  });

// React Query Custom Hooks using Axios
export function useGetAdmins() {
  return useQuery(adminsQueryOptions());
}

export function useCreateAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: CreateAdminInput) => {
      try {
        const { data } = await axios.post("/api/admins/create", input);
        if (!data.success) {
          throw new Error(data.message || "Failed to create admin");
        }
        return data;
      } catch (err: any) {
        const msg = err?.response?.data?.message || err?.message || "Failed to create admin";
        throw new Error(msg);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all });
    },
  });
}

export function useUpdateAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, input }: { id: number; input: UpdateAdminInput }) => {
      try {
        const { data } = await axios.put(`/api/admins/${id}`, input);
        if (!data.success) {
          throw new Error(data.message || "Failed to update admin");
        }
        return data;
      } catch (err: any) {
        const msg = err?.response?.data?.message || err?.message || "Failed to update admin";
        throw new Error(msg);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all });
    },
  });
}

export function useDeleteAdmin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      try {
        const { data } = await axios.delete(`/api/admins/${id}`);
        if (!data.success) {
          throw new Error(data.message || "Failed to delete admin");
        }
        return data;
      } catch (err: any) {
        const msg = err?.response?.data?.message || err?.message || "Failed to delete admin";
        throw new Error(msg);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminKeys.all });
    },
  });
}

export function useAdminLogin() {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      try {
        const { data } = await axios.post("/api/admin/login", { email, password });
        if (!data.success) {
          throw new Error(data.message || "Invalid credentials");
        }
        return data;
      } catch (err: any) {
        const msg = err?.response?.data?.message || err?.message || "Invalid credentials";
        throw new Error(msg);
      }
    },
  });
}
