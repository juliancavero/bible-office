import { useMutation } from "@tanstack/react-query";
import axiosInstance from "..";

const deleteSaint = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/saints/${id}`);
};

const useDeleteSaint = () => {
  return useMutation({
    mutationFn: deleteSaint,
  });
};

export default useDeleteSaint;
