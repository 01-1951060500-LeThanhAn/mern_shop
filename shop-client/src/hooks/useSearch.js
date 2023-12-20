import { useLocation } from "react-router-dom";
const useSearch = () => {
  const location = useLocation();

  const search = new URLSearchParams(location.search);

  return search;
};

export default useSearch;
