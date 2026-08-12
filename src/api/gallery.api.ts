import axios from "axios";
import { useQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";

export interface GalleryImageData {
  id: number;
  title: string;
  category: string;
  imageUrl: string;
  caption: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export const galleryKeys = {
  all: ["gallery"] as const,
  active: () => [...galleryKeys.all, "active"] as const,
  list: () => [...galleryKeys.all, "list"] as const,
};

export const activeGalleryQueryOptions = () =>
  queryOptions({
    queryKey: galleryKeys.active(),
    queryFn: async (): Promise<GalleryImageData[]> => {
      const { data } = await axios.get("/api/gallery/active");
      return data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export const allGalleryQueryOptions = () =>
  queryOptions({
    queryKey: galleryKeys.list(),
    queryFn: async (): Promise<GalleryImageData[]> => {
      const { data } = await axios.get("/api/gallery");
      return data.data;
    },
    staleTime: 1000 * 60 * 2,
  });

export function useGetActiveGallery() {
  return useQuery(activeGalleryQueryOptions());
}

export function useGetAllGallery() {
  return useQuery(allGalleryQueryOptions());
}

export function useCreateGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      title: string;
      category?: string;
      imageUrl: string;
      caption?: string;
      isActive?: boolean;
      sortOrder?: number;
    }) => {
      const { data } = await axios.post("/api/gallery", input);
      if (!data.success) throw new Error(data.message || "Failed to create gallery image");
      return data.data as GalleryImageData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: galleryKeys.all });
    },
  });
}

export function useUpdateGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      input,
    }: {
      id: number;
      input: {
        title?: string;
        category?: string;
        imageUrl?: string;
        caption?: string;
        isActive?: boolean;
        sortOrder?: number;
      };
    }) => {
      const { data } = await axios.put(`/api/gallery/${id}`, input);
      if (!data.success) throw new Error(data.message || "Failed to update gallery image");
      return data.data as GalleryImageData;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: galleryKeys.all });
    },
  });
}

export function useDeleteGalleryImage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const { data } = await axios.delete(`/api/gallery/${id}`);
      if (!data.success) throw new Error(data.message || "Failed to delete gallery image");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: galleryKeys.all });
    },
  });
}
