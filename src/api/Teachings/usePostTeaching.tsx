import { Teaching } from "@/types/bible";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "..";

type CreateTeachingDTO = {
  book: string;
  chapter: number;
  text: string;
  image?: FileList;
};

const postTeaching = async (body: CreateTeachingDTO): Promise<Teaching> => {
  const { book, chapter, text, image } = body;
  const formData = new FormData();
  formData.append("book", book);
  formData.append("chapter", chapter.toString());
  formData.append("text", text);
  if (image) {
    formData.append("file", image[0]);
  }
  const response = await axiosInstance.post<Teaching>("/teachings", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const usePostTeaching = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postTeaching,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["teachings"],
      });
    },
  });
};

export default usePostTeaching;
