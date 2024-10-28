import { Saint } from "@/types/saints";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "..";

const getSaints = async (id: string): Promise<Saint> => {
  const response = await axiosInstance.get<Saint>("/saints/id/" + id);
  return response.data;
};

const useGetSaintDetails = (id: string) => {
  return useQuery({
    queryFn: () => getSaints(id),
    queryKey: ["saint", id],
    enabled: !!id,
  });
};

export default useGetSaintDetails;
