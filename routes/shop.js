const express = require("express");
const router = express.Router();
const shop = require("../controllers/shop");


router.get("/nearby", shop.getNearbyShops);
router.get("/checkshop", shop.check);
router.post("/create", shop.create);
router.get("/getshop/:id", shop.getShopWithProducts);


module.exports = router;