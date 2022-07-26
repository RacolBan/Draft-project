const { getCartById, getCartByUserId, getCartByProductId, initCart } = require('../controllers/cart.controller')
const router = require("express").Router();

router.get("/cart/:id", getCartById)
router.get("/users/:userId/cart", getCartByUserId)
router.get("/products/:productId/cart", getCartByProductId)
router.post("/users/:userId/products/productId", initCart)

module.exports = router;
