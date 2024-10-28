import { useMutation } from "@tanstack/react-query";
import axiosInstance from "..";

const deleteChapter = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/chapters/${id}`);
};

const useDeleteChapter = () => {
  return useMutation({
    mutationFn: deleteChapter,
  });
};

export default useDeleteChapter;
