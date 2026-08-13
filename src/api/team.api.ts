import axios from "axios";
import { useQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";

export interface TeamMemberData {
  id: number;
  name: string;
  role: string;
  bio: string | null;
  imageUrl: string | null;
  email: string | null;
  phone: string | null;
  linkedin: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const teamKeys = {
  all: ["team_members"] as const,
  active: () => [...teamKeys.all, "active"] as const,
  list: () => [...teamKeys.all, "list"] as const,
};

export const activeTeamQueryOptions = () =>
  queryOptions({
    queryKey: teamKeys.active(),
    queryFn: async (): Promise<TeamMemberData[]> => {
      const { data } = await axios.get("/api/team-members/active");
      return data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const allTeamQueryOptions = () =>
  queryOptions({
    queryKey: teamKeys.list(),
    queryFn: async (): Promise<TeamMemberData[]> => {
      const { data } = await axios.get("/api/team-members");
      return data.data;
    },
    staleTime: 1000 * 60 * 2,
  });

export function useGetActiveTeamMembers() {
  return useQuery(activeTeamQueryOptions());
}

export function useGetAllTeamMembers() {
  return useQuery(allTeamQueryOptions());
}

export function useCreateTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      name: string;
      role: string;
      bio?: string;
      imageUrl?: string;
      email?: string;
      phone?: string;
      linkedin?: string;
      isActive?: boolean;
      sortOrder?: number;
    }) => {
      const { data } = await axios.post("/api/team-members", input);
      if (!data.success) throw new Error(data.message || "Failed to create team member");
      return data.data as TeamMemberData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
    },
  });
}

export function useUpdateTeamMember() {
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
        bio?: string;
        imageUrl?: string;
        email?: string;
        phone?: string;
        linkedin?: string;
        isActive?: boolean;
        sortOrder?: number;
      };
    }) => {
      const { data } = await axios.put(`/api/team-members/${id}`, input);
      if (!data.success) throw new Error(data.message || "Failed to update team member");
      return data.data as TeamMemberData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
    },
  });
}

export function useDeleteTeamMember() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/team-members/${id}`);
      if (!data.success) throw new Error(data.message || "Failed to delete team member");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: teamKeys.all });
    },
  });
}
