const InvalidDataError = require("../infrastructure/errors/InvalidDataError");
const cartRepository = require("../repository/cartRepository");

module.exports = {
  getCart: async (userId) => {
    try {
      return await cartRepository.getCartByUserId(userId);
    } catch (error) {
      throw new Error("Error while fetching cart");
    }
  },
  addToCart: async (userId, productId, quantity) => {
    try {
      console.log("Attempting to add to cart", { userId, productId, quantity });

      // Проверка на валидность данных
      if (!productId || quantity <= 0) {
        throw new InvalidDataError("Invalid data provided for adding to cart");
      }

      // Пробуем добавить товар в корзину
      const result = await cartRepository.addProductToCart(
        userId,
        productId,
        quantity
      );

      console.log("Successfully added to cart", result);

      return result;
    } catch (error) {
      console.error("Error during addToCart:", error);
      throw new InvalidDataError("Error while adding product to cart");
    }
  },

  removeFromCart: async (userId, itemId) => {
    try {
      return await cartRepository.removeProductFromCart(userId, itemId);
    } catch (error) {
      throw new Error("Error while removing product from cart");
    }
  },
};
