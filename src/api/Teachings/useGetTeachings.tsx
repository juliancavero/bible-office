import { Teaching } from "@/types/bible";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "..";
import { ResponseMapper } from "../mappers";
import { Meta, RequestParams } from "../types";

type TeachingsResponse = {
  data: Teaching[];
  meta: Meta;
};

type Params = RequestParams & {
  book?: string;
  chapter?: string;
};

const getTeachings = async (params: Params): Promise<TeachingsResponse> => {
  const { limit, order, order_by, page, search, book, chapter } = params;
  const response = await axiosInstance.get<TeachingsResponse>(
    "/teachings/uncensored",
    {
      params: {
        ...(limit && { limit }),
        ...(order && { order }),
        ...(order_by && { order_by }),
        ...(page && { page }),
        ...(search && { search }),
        ...(book && { book }),
        ...(chapter && { chapter }),
      },
    }
  );
  return ResponseMapper(response);
};

const useGetTeachings = (params: Params) => {
  const { order_by, order, page, limit, search, book, chapter } = params;
  return useQuery({
    queryFn: () => getTeachings(params),
    queryKey: [
      "teachings",
      page,
      limit,
      order_by,
      order,
      search,
      book,
      chapter,
    ],
  });
};

export default useGetTeachings;
