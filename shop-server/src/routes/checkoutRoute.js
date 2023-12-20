import express from "express";
import { checkout } from "../controller/PaymentController.js";

const router = express.Router();

router.post("/payment", checkout);

export default router;
