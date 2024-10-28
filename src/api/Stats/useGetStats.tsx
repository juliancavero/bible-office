import { useQuery } from "@tanstack/react-query";
import axiosInstance from "..";

type StatsType = {
  saints: {
    total: number;
    withImage: number;
    completedDays: number;
  };
  chapters: {
    total: number;
    completed: number;
  };
};

const getStats = async (): Promise<StatsType> => {
  const response = await axiosInstance.get<StatsType>("/stats");
  return response.data;
};

const useGetStats = () => {
  return useQuery({
    queryFn: () => getStats(),
    queryKey: ["stats"],
  });
};

export default useGetStats;
