import Product from "../models/product.js";

const getAllProducts = async (req, res) => {
  try {
    const limit = Number(req.query.limit) || 0;
    const sorting = req.query.sort == "descend" ? -1 : 1;

    const products = await Product.find({}).limit(limit).sort({ _id: sorting });
    res.status(200).json({ nbHits: products.length, products });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createProduct = async (req, res) => {
  const { title, price, description, category, image, rating } = req.body;
  try {
    const product = Product.create({
      title,
      price,
      description,
      category,
      image,
      rating,
    });
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findOne({ _id: productId });

    if (!product || product.length == 0) {
      return res
        .status(404)
        .json({ msg: `no product with the id: ${productId}` });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getProductByName = async (req, res) => {
  try {
    const title = req.params.title;
    const newTitle = new RegExp(
      title[0].toUpperCase() + title.slice(1).toLocaleLowerCase(),
      "i"
    );
    const product = await Product.find({ title: newTitle });
    if (!product || product.length == 0) {
      return res
        .status(404)
        .json({ msg: `no product with the name: ${title}` });
    }
    res.status(200).json({ nbHits: product.length, product });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getProductCategory = async (req, res) => {
  try {
    const category = await Product.distinct("category");
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getProductInCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const products = await Product.find({ category });

    if (!products || products.length == 0) {
      return res.status(404).json({ msg: `Product not found` });
    }
    res.status(200).json({ nbHits: products.length, products });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const product = await Product.findOneAndDelete({ _id: productId });
    if (!product) {
      res.status(404).json({ msg: `no such product` });
    }
    res.status(200).json({ product: null, status: "success" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export {
  getAllProducts,
  createProduct,
  getProduct,
  getProductByName,
  getProductCategory,
  getProductInCategory,
  deleteProduct,
};
