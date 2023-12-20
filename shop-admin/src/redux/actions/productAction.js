import {
  addProductError,
  addProductStart,
  addProductSuccess,
  deleteProductError,
  deleteProductStart,
  deleteProductSuccess,
  getProductStart,
  getProductSuccess,
  updateProductError,
  updateProductStart,
  updateProductSuccess,
} from "../slices/productSlice";
import {
  addProducts,
  deleteProducts,
  getAllProducts,
  updateProducts,
} from "../../api/products";
// import { adminApi } from "../../api/index";
export const getProducts = async (dispatch) => {
  dispatch(getProductStart());

  try {
    const res = await getAllProducts();

    dispatch(getProductSuccess(res));
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductItem = async (id, dispatch) => {
  dispatch(deleteProductStart());

  try {
    const res = await deleteProducts(id);
    dispatch(deleteProductSuccess(res.data));
  } catch (error) {
    dispatch(deleteProductError(error));
  }
};

export const updateProductItem = async (id, data, dispatch) => {
  dispatch(updateProductStart());

  try {
    const res = await updateProducts(id, data);
    dispatch(updateProductSuccess(res.data?.results));
  } catch (error) {
    dispatch(updateProductError(error));
  }
};

export const addProductsItem = async (product, dispatch) => {
  dispatch(addProductStart());
  try {
    const res = await addProducts(product);
    dispatch(addProductSuccess(res.data));
  } catch (error) {
    dispatch(addProductError(error));
  }
};
