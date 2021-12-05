import express from "express";
import {
  getAllCart,
  createCart,
  getCart,
  getCartByUserId,
  deleteCart,
} from "../controller/carts.js";

const router = express.Router();

router.route("/").get(getAllCart).post(createCart);
router.route("/:id").get(getCart).delete(deleteCart);
router.route("/user/:userId").get(getCartByUserId);

export default router;
