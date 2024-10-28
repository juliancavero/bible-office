import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "..";

type Saint = {
  name: string;
  text: string;
  day: number;
  month: number;
  isMain: boolean;
  image?: FileList;
};

const postSaint = async (saint: Saint): Promise<Saint> => {
  const { name, text, day, month, image, isMain } = saint;
  const formData = new FormData();
  formData.append("name", name);
  formData.append("text", text);
  formData.append("day", day.toString());
  formData.append("isMain", isMain.toString());
  formData.append("month", month.toString());
  if (image) {
    formData.append("file", image[0]);
  }
  const response = await axiosInstance.post<Saint>("/saints", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

const usePostSaint = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postSaint,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["saints"],
      });
    },
  });
};

export default usePostSaint;
