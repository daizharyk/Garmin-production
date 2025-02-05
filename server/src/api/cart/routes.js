const { Router } = require("express");
const {
  removeFromCart,
  addToCart,
  getCart,
  updateCartItem,
} = require("./controller");
const { protected } = require("../../middlewares/auth");

const router = Router();

router.get("/", protected, getCart);

router.post("/add", protected, addToCart);

router.post("/add", protected, addToCart);

router.put("/update", protected, updateCartItem);

router.delete("/remove/:itemId", removeFromCart);

module.exports = router;
