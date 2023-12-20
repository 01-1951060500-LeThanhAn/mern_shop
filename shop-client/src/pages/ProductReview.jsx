import { useEffect } from "react";
import { useState } from "react";
import { baseApi } from "../api/index.js";
import Product from "../components/Product";
import CircularProgress from "@mui/material/CircularProgress";
const ProductReview = ({ cat, title }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await baseApi.get(`/product/category?category=${cat}`);

        setProducts(res.data?.results);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    getProducts();
  }, [cat]);
  return (
    <>
      <div className="">
        <div className="ml-8 2xl:ml-20 mt-8 mb-8 text-3xl font-bold">
          {title}
        </div>
        {!loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 md:mx-4 2xl:mx-16 mx-1 gap-y-3">
            {products.map((item) => (
              <>
                <Product key={item._id} item={item} />
              </>
            ))}
          </div>
        ) : (
          <div className="text-center mt-12">
            <CircularProgress />
          </div>
        )}
      </div>
    </>
  );
};

export default ProductReview;
