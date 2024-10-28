import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "..";

type Chapter = {
  book: string;
  chapter: number;
  text: string;
  version: string;
};

const postChapter = async (chapter: Chapter) => {
  const response = await axiosInstance.post<Chapter>("/chapters", chapter);
  return response.data;
};

const usePostChapter = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postChapter,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["chapters"],
      });
    },
  });
};

export default usePostChapter;
