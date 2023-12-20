import express from "express";
import { verifyTokenAndAdmin } from "../middleware/auth.js";
import Product from "../models/ProductModels.js";
import {
  deleteProduct,
  getCategoryProduct,
  getDetailProducts,
  getListProducts,
  postProducts,
  searchProducts,
  updatedProduct,
} from "../controller/ProductController.js";
const router = express.Router();

router.post("/", verifyTokenAndAdmin, postProducts);

router.put("/:id", verifyTokenAndAdmin, updatedProduct);

router.delete("/:id", verifyTokenAndAdmin, deleteProduct);

router.get("/listproduct", getListProducts);

// get a product

router.get(`/details/:id`, getDetailProducts);

router.get("/category", getCategoryProduct);

router.get(`/search`, searchProducts);
export default router;
