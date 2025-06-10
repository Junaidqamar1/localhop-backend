const express = require("express");
const router = express.Router();
const productController = require("../controllers/product");

router.post("/add",productController.create);
router.get("/shop/:shopId", productController.getByShop);


module.exports = router;