import { useEffect, useState } from "react";
import Product from "../components/Product";
import { baseApi } from "../api";

const RandomProduct = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await baseApi.get(`/product/listproduct`);

        setProducts(res.data?.results);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, []);

  const randomProduct = (items) => {
    return items[Math.floor(Math.random() * items.length)];
  };

  return (
    <>
      <div className="grid grid-cols-2 mx-2 md:grid-cols-3 md:mx-4 lg:grid-cols-4 lg:mx-8 2xl:grid-cols-5 2xl:mx-12 mt-40">
        {products &&
          products
            .slice(0, 5)
            .map((item) => (
              <Product item={randomProduct(products)} key={item._id} />
            ))}
      </div>
    </>
  );
};

export default RandomProduct;
