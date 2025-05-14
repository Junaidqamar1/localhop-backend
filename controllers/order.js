const Order = require("../model/order.model");

exports.createOrder = async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json({ message: "Order placed", order: newOrder });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrdersByShop = async (req, res) => {
  try {
    const shopId = req.params.shopId;
    const orders = await Order.find({ shop: shopId }).populate("customer items.product");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOrdersByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const orders = await Order.find({ customer: userId }).populate("items.product shop");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await Order.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ message: "Order status updated", order: updated });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
