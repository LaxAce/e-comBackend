import Cart from "../models/cart.js";

const getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find({});
    res.status(200).json({ nbHits: carts.length, carts });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createCart = async (req, res) => {
  const { userId, products } = req.body;
  try {
    const cart = await Cart.create({ userId, products });
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getCart = async (req, res) => {
  try {
    const { id: cartId } = req.params;
    const cart = await Cart.findOne({ _id: cartId });

    if (!cart) {
      return res.status(404).json({ msg: `no cart with the id: ${cartId}` });
    }
    res.status(200).json({ cart });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getCartByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const cart = await Cart.find({ userId });

    if (!cart) {
      return res.status(404).json({ msg: `no cart with the id: ${userId}` });
    }
    res.status(200).json({ nbHits: cart.length, cart });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export { getAllCart, createCart, getCart, getCartByUserId };
