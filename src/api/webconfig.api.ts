import axios from "axios";
import { useQuery, useMutation, useQueryClient, queryOptions } from "@tanstack/react-query";

export type WebConfigMap = Record<string, string>;

export const webconfigKeys = {
  all: ["webconfig"] as const,
};

export const webconfigQueryOptions = () =>
  queryOptions({
    queryKey: webconfigKeys.all,
    queryFn: async (): Promise<WebConfigMap> => {
      const { data } = await axios.get("/api/webconfig");
      return data.data;
    },
    staleTime: 1000 * 60 * 5,
  });

export function useGetWebConfig() {
  return useQuery(webconfigQueryOptions());
}

export function useUpdateWebConfig() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (entries: { key: string; value: string }[]) => {
      const { data } = await axios.put("/api/webconfig", { entries });
      if (!data.success) throw new Error(data.message || "Failed to update web config");
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: webconfigKeys.all });
    },
  });
}

// Helper to parse JSON config values with fallback
export function parseJsonConfig<T>(config: WebConfigMap | undefined, key: string, fallback: T): T {
  if (!config || !config[key]) return fallback;
  try {
    return JSON.parse(config[key]) as T;
  } catch {
    return fallback;
  }
}

// Helper to get string config with fallback
export function getConfigValue(config: WebConfigMap | undefined, key: string, fallback: string = ""): string {
  if (!config || config[key] === undefined) return fallback;
  return config[key];
}
