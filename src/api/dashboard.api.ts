import axios from "axios";
import { useQuery, queryOptions } from "@tanstack/react-query";

export interface DashboardStatsData {
  enquiries: {
    total: number;
    newCount: number;
    inFollowUpCount: number;
    recent: any[];
  };
  clients: {
    total: number;
    active: number;
    recent: any[];
  };
  locations: {
    total: number;
    active: number;
  };
  brands: {
    total: number;
    active: number;
  };
  admins: {
    totalActive: number;
  };
}

export const dashboardKeys = {
  all: ["dashboard-stats"] as const,
};

export const dashboardStatsQueryOptions = () =>
  queryOptions({
    queryKey: dashboardKeys.all,
    queryFn: async (): Promise<DashboardStatsData> => {
      const { data } = await axios.get("/api/dashboard/stats");
      return data.data;
    },
    staleTime: 1000 * 30, // 30 seconds
  });

export function useGetDashboardStats() {
  return useQuery(dashboardStatsQueryOptions());
}
