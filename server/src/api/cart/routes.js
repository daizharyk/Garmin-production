const { Router } = require("express");
const {
  removeFromCart,
  clearCart,
  addToCart,
  getCart,
} = require("./controller");
const { protected } = require("../../middlewares/auth");

const router = Router();

router.get("/", getCart);

router.post("/add", addToCart);

router.delete("/remove/:itemId", removeFromCart);

module.exports = router;
