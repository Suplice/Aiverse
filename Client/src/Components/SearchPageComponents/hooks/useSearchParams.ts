import { useLocation, useNavigate } from "react-router-dom";

const useSearchParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getParams = new URLSearchParams(location.search);

  /**
   * updateParams is a function that updates the search parameters in the URL
   * It creates a new URLSearchParams object
   * It sets the new parameters to the URLSearchParams object
   * It navigates to the new URL with the updated search parameters
   * @function updateParams
   * @param {Record<string, string>} newParams
   * @returns {void}
   */
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
