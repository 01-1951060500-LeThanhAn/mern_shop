import Product from "./Product";
import { useState } from "react";
import { useEffect } from "react";

import { baseApi } from "../api";

const Products = ({ cat, filters, sort }) => {
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await baseApi.get(
          cat ? `/product/category?category=${cat}` : `/product/category`
        );

        setProducts(res.data?.results);
      } catch (error) {
        console.log(error);
      }
    };

    getProducts();
  }, [cat]);

  useEffect(() => {
    cat &&
      setFilteredProduct(
        products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
            item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);
  useEffect(() => {
    if (sort === "newest") {
      setFilteredProduct((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProduct((prev) => [...prev].sort((a, b) => a.price - b.price));
    } else {
      setFilteredProduct((prev) => [...prev].sort((a, b) => b.price - a.price));
    }
  }, [sort]);

  return (
    <div className="grid grid-cols-2 mx-2 md:grid-cols-3 md:mx-4 lg:grid-cols-4 lg:mx-6 2xl:grid-cols-5 2xl:mx-16">
      {cat
        ? filteredProduct.map((item, index) => (
            <Product item={item} key={index} />
          ))
        : products.map((item, index) => <Product item={item} key={index} />)}
    </div>
  );
};

export default Products;
