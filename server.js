// filepath: /f:/Cart Management Project/backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", productRoutes);
app.use("/api", cartRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// Root route handler
app.get("/", (req, res) => {
  res.send("Hello, World!");
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
