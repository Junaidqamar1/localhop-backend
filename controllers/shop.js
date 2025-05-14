const Shop = require("../model/shop.model");
const Product = require("../model/product.model");
const jwt = require('jsonwebtoken');

exports.check = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: 'Not authenticated' });
  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const shop = await Shop.find({ owner: decoded.id });
      ;
      // if (!user) return res.status(404).json({ message: 'User not found' });
      console.log(token)
      console.log(decoded)
      res.status(200).json({ shop });

    } catch (err) {
      res.status(401).json({ message: 'Invalid token' });
    }
};
exports.create = async (req, res) => {
  try {
    const newShop = await Shop.create(req.body);
    res.status(201).json({ message: "Shop created", shop: newShop });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};


exports.getShopWithProducts = async (req, res) => {
    try {
      const { id } = req.params;
  
      const shop = await Shop.findById(id);
      if (!shop) return res.status(404).json({ message: "Shop not found" });
  
      const products = await Product.find({ shop: id });
  
      res.json({ shop, products });
    } catch (err) {
      res.status(500).json({ message: "Error retrieving shop", error: err.message });
    }
  };
  
  exports.getNearbyShops = async (req, res) => {
    const { lat, lng, radius = 5000 } = req.query; // radius in meters
  
    if (!lat || !lng) {
      return res.status(400).json({ message: "Latitude and longitude are required." });
    }
  
    try {
      const shops = await Shop.find({
        "address.location": {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [parseFloat(lng), parseFloat(lat)],
            },
            $maxDistance: parseFloat(radius), // meters
          },
        },
      });
  
      res.status(200).json(shops);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch nearby shops", error: error.message });
    }
  };
  