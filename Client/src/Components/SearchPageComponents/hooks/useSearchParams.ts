import { useLocation, useNavigate } from "react-router-dom";

const useSearchParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getParams = new URLSearchParams(location.search);

  const updateParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(location.search);

    for (const key in newParams) {
      params.set(key, newParams[key]);
    }

    navigate(`?${params.toString()}`);
  };

  return { getParams, updateParams };
};

export default useSearchParams;
