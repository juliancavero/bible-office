import { MissingChapters } from "@/types/bible";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "..";

const getMissingTeachings = async (): Promise<MissingChapters[]> => {
  const response = await axiosInstance.get<MissingChapters[]>(
    "/teachings/missing"
  );
  return response.data;
};

const useGetMissingTeachingDates = () => {
  return useQuery({
    queryFn: () => getMissingTeachings(),
    queryKey: ["teachings-missing"],
  });
};

export default useGetMissingTeachingDates;
