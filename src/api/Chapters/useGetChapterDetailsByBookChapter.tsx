import { Chapter } from "@/types/bible";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "..";
import { BibleVersions } from "../types";

const getChapter = async (
  book: string,
  chapter: string,
  version: BibleVersions
): Promise<Chapter> => {
  const response = await axiosInstance.get<Chapter>(
    "chapters/book-chapter/" + book + "/" + chapter,
    {
      params: {
        v: version,
      },
    }
  );
  return response.data;
};

const useGetChapterDetailsByBookChapter = (
  book: string,
  chapter: string,
  version: BibleVersions
) => {
  return useQuery({
    queryFn: () => getChapter(book, chapter, version),
    queryKey: ["chapter", book, chapter, version],
    enabled: !!book && !!chapter && !!version,
  });
};

export default useGetChapterDetailsByBookChapter;
