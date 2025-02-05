const cartService = require("../../service/cartService");

module.exports = {
  getCart: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const cart = await cartService.getCart(userId);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },

  addToCart: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { productId } = req.body;
      const cart = await cartService.addToCart(userId, productId);
      res.status(201).json(cart);
    } catch (error) {
      next(error);
    }
  },
  updateCartItem: async (req, res, next) => {
    try {
      const userId = req.user.id;
      const { productId, newQuantity } = req.body;

      const updatedCart = await cartService.updateCartItem(
        userId,
        productId,
        newQuantity
      );
      res.status(200).json(updatedCart);
    } catch (error) {
      next(error);
    }
  },

  removeFromCart: async (req, res, next) => {
    try {
      const userId = req.user.id;
      console.log("user", userId);

      const { itemId } = req.params;
      console.log("itemId", itemId);

      const cart = await cartService.removeFromCart(userId, itemId);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },
};
