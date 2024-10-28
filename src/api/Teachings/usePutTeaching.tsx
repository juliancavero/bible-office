import { Teaching } from "@/types/bible";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "..";

type CreateTeachingDTO = {
  id: number;
  book: string;
  chapter: number;
  text: string;
  image?: FileList;
};

const putTeaching = async (body: CreateTeachingDTO): Promise<Teaching> => {
  const { book, chapter, text, image, id } = body;
  const formData = new FormData();
  formData.append("book", book);
  formData.append("chapter", chapter.toString());
  formData.append("text", text);
  if (image) {
    formData.append("file", image[0]);
  }
  const response = await axiosInstance.put("/teachings/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const usePutTeaching = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putTeaching,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["teachings"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["teaching"],
      });
    },
  });
};

export default usePutTeaching;
