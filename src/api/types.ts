export type RequestParams = {
  order_by?: string;
  order?: "asc" | "desc";
  page: number;
  limit: number;
  search?: string;
};

export type Meta = {
  total: number;
  page: number;
  limit: number;
};

export enum BibleVersions {
  nvi = "nvi",
  rv1909 = "rv1909",
  torresAmat = "torresAmat",
  freeWorld = "freeWorld",
}
