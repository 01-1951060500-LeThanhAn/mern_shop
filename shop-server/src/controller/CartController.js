import Cart from "../models/CartModels.js";

const postCart = async (req, res) => {
  const cart = new Cart(req.body);
  try {
    const savedCart = await cart.save();

    res.status(200).json({
      results: savedCart,
    });
  } catch (error) {
    res.status(500).json({ msg: "Failed" });
  }
};

const updateCart = async (req, res) => {
  try {
    const updatedProduct = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Üpdate product successfully",
      results: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({ msg: "Failed" });
  }
};

const deleteCart = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAllCart = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
};

export { postCart, updateCart, deleteCart, getUserCart, getAllCart };
