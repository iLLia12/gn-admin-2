import { useLocation } from "react-router-dom";

const useQueryParams = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const params: Record<string, string> = {};

  for (const param of searchParams) {
    params[param[0]] = param[1];
  }

  return {
    params,
    searchParams,
  };
};

export default useQueryParams;
