import { MissingDates } from "@/types/common";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "..";

const getMissingSaintDates = async (): Promise<MissingDates[]> => {
  const response = await axiosInstance.get<MissingDates[]>("/saints/missing");
  return response.data;
};

const useGetMissingSaintDates = () => {
  return useQuery({
    queryFn: () => getMissingSaintDates(),
    queryKey: ["saints-missing"],
  });
};

export default useGetMissingSaintDates;
