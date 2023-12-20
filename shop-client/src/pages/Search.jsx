import { useEffect, useState } from "react";
import useSearch from "../hooks/useSearch";
import CircularProgress from "@mui/material/CircularProgress";

import Navbar from "../components/Navbar";
import Product from "../components/Product";
import { baseApi } from "../api";
const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearch();

  const searchTerm = searchParams.get("keyword");

  const fetchSearchResults = async () => {
    setLoading(true);

    try {
      const res = await baseApi.get(`/product/search?keyword=${searchTerm}`);

      if (res.data.success) {
        setResults(res.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setLoading(true);

    const timing = setTimeout(() => {
      fetchSearchResults();
      setLoading(false);
    }, 1500);

    return () => {
      clearTimeout(timing);
    };
  }, [searchTerm]);

  return (
    <>
      <Navbar />
      {!loading ? (
        <div className="mt-12 ">
          {results.length > 0 ? (
            <div className="grid grid-cols-2 mx-2 md:grid-cols-3 md:mx-4 lg:grid-cols-4 lg:mx-8 2xl:grid-cols-5 2xl:mx-12 mt-12">
              {results &&
                results.map((item) => <Product key={item._id} item={item} />)}
            </div>
          ) : (
            <p className="text-center text-3xl">Không có sản phẩm nào</p>
          )}
        </div>
      ) : (
        <div className="text-center mt-12">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default Search;
