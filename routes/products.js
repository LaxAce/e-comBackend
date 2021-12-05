import express from "express";
import {
  getAllProducts,
  createProduct,
  getProduct,
  getProductByName,
  getProductCategory,
  getProductInCategory,
  deleteProduct,
} from "../controller/products.js";

const router = express.Router();

router.route("/").get(getAllProducts).post(createProduct);
router.route("/categories").get(getProductCategory);
router.route("/:id").get(getProduct).delete(deleteProduct);
router.route("/title/:title").get(getProductByName);
router.route("/category/:category").get(getProductInCategory);

export default router;
