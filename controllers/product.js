const Product = require("../model/product.model");

// Create product
exports.create = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ message: "Product created", product });
  } catch (err) {
    res.status(500).json({ message: "Error creating product", error: err.message });
  }
};

// Get products for a specific shop
exports.getByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const products = await Product.find({ shop: shopId });
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};
