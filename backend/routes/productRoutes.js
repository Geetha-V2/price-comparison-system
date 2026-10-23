const { faker } = require("@faker-js/faker");

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
module.exports = router;

// GET products (with search)
router.get("/", async (req, res) => {
  try {
    const search = req.query.search || "";

    const products = await Product.find({
      name: { $regex: search, $options: "i" }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
// Add sample products
router.get("/seed", async (req, res) => {
  try {
    await Product.deleteMany({});

    const stores = ["Amazon", "Flipkart", "Croma", "Reliance Digital"];

    const productNames = [
      "iPhone 13", "iPhone 14", "iPhone 15", "iPhone 15 Pro",
      "Samsung Galaxy S23", "Samsung Galaxy S24", "Samsung Galaxy S24 Ultra",
      "OnePlus 11", "OnePlus 12", "OnePlus Nord 3",
      "Google Pixel 7", "Google Pixel 8", "Nothing Phone 2",
      "Redmi Note 13 Pro", "Realme GT 6",

      "MacBook Air M1", "MacBook Air M2", "MacBook Pro M3",
      "Dell XPS 13", "HP Spectre x360",
      "Asus ROG Strix G15", "Lenovo Legion 5",
      "Acer Aspire 7", "MSI Katana 15",

      "iPad 10th Gen", "iPad Air M1",
      "Samsung Galaxy Tab S9", "Lenovo Tab P12",

      "Sony WH-1000XM5", "Sony WF-1000XM5",
      "Apple AirPods Pro", "Boat Rockerz 550",
      "JBL Tune 760NC", "Sennheiser Momentum 4",

      "PlayStation 5", "Xbox Series X",
      "Nintendo Switch OLED",

      "Canon EOS 1500D", "Sony Alpha A7 III",
      "GoPro Hero 12",

      "Apple Watch Series 9", "Samsung Galaxy Watch 6",
      "Noise ColorFit Pro 5",

      "LG OLED C3 TV", "Samsung QLED Q80C",
      "Mi 4K Smart TV",

      "Dyson V15 Vacuum", "Philips Air Fryer XXL",
      "Instant Pot Duo 7-in-1"
    ];

    const products = [];

    productNames.forEach((name) => {

      // Randomly decide how many stores (3 or 4)
      const numberOfStores = Math.random() > 0.5 ? 4 : 3;

      const shuffledStores = stores
        .sort(() => 0.5 - Math.random())
        .slice(0, numberOfStores);

      shuffledStores.forEach((store) => {
        products.push({
          name,
          price: Math.floor(Math.random() * 60000) + 10000,
          store
        });
      });
    });

    await Product.insertMany(products);

    res.json({
      message: `${productNames.length} unique products created with ${products.length} total store listings`
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});