import express from "express";
import Comments from "../models/CommentModel.js";
import {
  deleteComment,
  getComment,
  postComments,
} from "../controller/CommentController.js";
const router = express.Router();

router.post("/", postComments);

router.get("/:id", getComment);

router.delete("/:id", deleteComment);

export default router;
