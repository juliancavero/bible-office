import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "..";

type Saint = {
  id: number;
  name: string;
  text: string;
  day: number;
  month: number;
  isMain: boolean;
  image?: FileList;
};

const putSaint = async (saint: Saint): Promise<Saint> => {
  const { id, name, text, day, month, isMain, image } = saint;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("text", text);
  formData.append("day", day.toString());
  formData.append("month", month.toString());
  formData.append("isMain", isMain.toString());
  if (image) {
    formData.append("file", image[0]);
  }

  const response = await axiosInstance.put<Saint>("/saints/" + id, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

const usePutSaint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: putSaint,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["saints"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["saint"],
      });
    },
  });
};

export default usePutSaint;
