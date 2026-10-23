const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/priceDB")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Use product routes
app.use("/api/products", require("./routes/productRoutes"));

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
