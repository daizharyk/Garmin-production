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
      const { productId, quantity } = req.body;
      const cart = await cartService.addToCart(userId, productId, quantity);
      res.status(201).json(cart);
    } catch (error) {
      next(error);
    }
  },

  removeFromCart: async (req, res, next) => {
    try {
      const userId = req.user.id;

      const { itemId } = req.params;
      const cart = await cartService.removeFromCart(userId, itemId);
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  },
};
