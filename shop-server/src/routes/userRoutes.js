import express from "express";
import { validationResult } from "express-validator";
import UserModels from "../models/UserModels.js";
import bcrypt from "bcrypt";
import { verifyTokenAndAdmin } from "../middleware/auth.js";
import dotenv from "dotenv";
import {
  deleteUser,
  getListUser,
  getUsers,
  login,
  register,
  updateUser,
} from "../controller/UserController.js";

dotenv.config();
const router = express.Router();

router.post("/login", login);

router.post(`/register`, register);

router.get("/", getUsers);

router.get("/listuser", verifyTokenAndAdmin, getListUser);

router.put("/:id", verifyTokenAndAdmin, updateUser);

router.delete("/:id", verifyTokenAndAdmin, deleteUser);

export default router;
