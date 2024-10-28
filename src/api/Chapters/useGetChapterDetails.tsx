import { Chapter } from "@/types/bible";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "..";

const getChapter = async (id: string): Promise<Chapter> => {
  const response = await axiosInstance.get<Chapter>("/chapters/chapter/" + id);
  return response.data;
};

const useGetChapterDetails = (id: string) => {
  return useQuery({
    queryFn: () => getChapter(id),
    queryKey: ["chapter", id],
    enabled: !!id,
  });
};

export default useGetChapterDetails;
