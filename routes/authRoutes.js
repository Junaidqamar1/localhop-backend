const express=require("express")
const router = express.Router();
const authController = require("../controllers/authController");
const shop = require("../controllers/shop");
const product = require("../controllers/product");


router.post("/register", authController.register);
router.post("/login", authController.login);
router.get('/me', authController.checkAuth);
router.post("/add",product.create);
router.get("/shop/:shopId", product.getByShop);
router.get("/nearby", shop.getNearbyShops);
router.get("/checkshop", shop.check);
router.post("/shop", shop.create);
// GET /api/shops/nearby?lat=26.8467&lng=80.9462&radius=3000



module.exports = router;