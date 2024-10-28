import { Chapter } from "@/types/bible";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "..";
import { ResponseMapper } from "../mappers";
import { Meta, RequestParams } from "../types";

type ChaptersResponse = {
  data: Chapter[];
  meta: Meta;
};

type Params = RequestParams & {
  book?: string;
};

const getChapters = async (params: Params): Promise<ChaptersResponse> => {
  const { order_by, order, page, limit, search, book } = params;
  const response = await axiosInstance.get<ChaptersResponse>("/chapters", {
    params: {
      ...(limit && { limit }),
      ...(order && { order }),
      ...(order_by && { order_by }),
      ...(page && { page }),
      ...(search && { search }),
      ...(book && { book }),
    },
  });
  return ResponseMapper(response);
};

const useGetChapters = (params: Params) => {
  const { order_by, order, page, limit, search, book } = params;
  return useQuery({
    queryFn: () => getChapters(params),
    queryKey: ["chapters", page, limit, order_by, order, search, book],
  });
};

export default useGetChapters;
