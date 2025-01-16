const express = require("express");
const { addToCart, getCart } = require("../controllers/cartController");
const router = express.Router();

router.post("/cart", addToCart);
router.get("/cart", getCart);

module.exports = router;
