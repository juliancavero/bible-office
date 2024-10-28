import { useSearchParams } from "react-router-dom";

type RouteParamsRequestType = {
  [key: string]: string | undefined;
};

const useRouteParams = ({ ...keys }: RouteParamsRequestType) => {
  const params = useSearchParams();

  params[0].forEach((value, key) => {
    if (Object.keys(keys).includes(key)) {
      keys[key] = value;
    }
  });

  return keys;
};

export default useRouteParams;
