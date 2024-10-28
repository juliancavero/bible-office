import { MissingChapters } from "@/types/bible";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "..";

const getMissingChapters = async (
  version?: string
): Promise<MissingChapters[]> => {
  const response = await axiosInstance.get<MissingChapters[]>(
    "/chapters/missing",
    {
      params: {
        ...(version && { version }),
      },
    }
  );
  return response.data;
};

const useGetMissingChapterDates = (version?: string) => {
  return useQuery({
    queryFn: () => getMissingChapters(version),
    queryKey: ["chapters-missing", version],
  });
};

export default useGetMissingChapterDates;
