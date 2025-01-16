const express = require("express");
const { getProducts } = require("../controllers/productController");
const router = express.Router();

// Product routes
router.get("/products", getProducts);

module.exports = router;
