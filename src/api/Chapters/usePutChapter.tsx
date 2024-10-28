import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "..";

type Chapter = {
  id: number;
  book: string;
  chapter: number;
  text: string;
};

const putChapter = async (chapter: Chapter) => {
  const response = await axiosInstance.put("/chapters/" + chapter.id, chapter);
  return response.data;
};

const usePutChapter = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putChapter,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["chapters"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["chapter"],
      });
    },
  });
};

export default usePutChapter;
