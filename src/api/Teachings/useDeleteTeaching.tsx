import { useMutation } from "@tanstack/react-query";
import axiosInstance from "..";

const deleteTeaching = async (id: number): Promise<void> => {
  await axiosInstance.delete(`/teachings/${id}`);
};

const useDeleteTeaching = () => {
  return useMutation({
    mutationFn: deleteTeaching,
  });
};

export default useDeleteTeaching;
