import express from "express";
import {
  checkToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} from "../middleware/auth.js";
import Cart from "../models/CartModels.js";
import {
  deleteCart,
  getAllCart,
  getUserCart,
  postCart,
  updateCart,
} from "../controller/CartController.js";
const router = express.Router();

router.post("/", checkToken, postCart);

router.put("/:id", verifyTokenAndAuthorization, updateCart);

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, deleteCart);

//GET USER CART
router.get("/find/:userId", verifyTokenAndAuthorization, getUserCart);

// //GET ALL

router.get("/", verifyTokenAndAdmin, getAllCart);

export default router;
