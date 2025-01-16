const Cart = require("../models/Cart");
const Product = require("../models/Product");

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId == productId
      );
      if (itemIndex > -1) {
        let productItem = cart.items[itemIndex];
        productItem.quantity += quantity;
        cart.items[itemIndex] = productItem;
      } else {
        cart.items.push({ productId, quantity });
      }
      cart = await cart.save();
      console.log("Updated cart:", cart); // Log the updated cart
      return res.status(201).send(cart);
    } else {
      const newCart = await Cart.create({
        userId,
        items: [{ productId, quantity }],
      });
      console.log("Created new cart:", newCart); // Log the new cart
      return res.status(201).send(newCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Something went wrong");
  }
};

const getCart = async (req, res) => {
  const { userId } = req.query;
  try {
    const cart = await Cart.findOne({ userId }).populate(
      "items.productId",
      "name price"
    );
    if (cart) {
      console.log("Cart items:", cart.items); // Log the cart items to debug
      res.status(200).send(cart.items);
    } else {
      console.log("Cart not found for user:", userId);
      res.status(404).send("Cart not found");
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  addToCart,
  getCart,
};
