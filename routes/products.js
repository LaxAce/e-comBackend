import express from "express";
import {
  getAllProducts,
  createProduct,
  getProduct,
  getProductCategory,
  getProductInCategory,
} from "../controller/products.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.route("/categories").get(getProductCategory);
router.route("/:id").get(getProduct);
router.route("/category/:category").get(getProductInCategory);

export default router;
