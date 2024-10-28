import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const useNav = () => {
  const navigator = useNavigate();

  const navigate = useCallback((path: string) => {
    navigator(path);
  }, []);

  const goBack = useCallback(() => {
    navigator(-1);
  }, []);

  const refresh = useCallback(() => {
    navigator(0);
  }, []);

  return { navigate, goBack, refresh };
};

export default useNav;
