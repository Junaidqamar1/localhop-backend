const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order");

router.post("/", orderController.createOrder);
router.get("/shop/:shopId", orderController.getOrdersByShop);
router.get("/user/:userId", orderController.getOrdersByUser);
router.patch("oder/:oderId", orderController.updateOrderStatus);
// router.patch("/addproduct", orderController.updateOrderStatus);

module.exports = router;
