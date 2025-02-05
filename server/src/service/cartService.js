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
  addToCart: async (userId, productId) => {
    try {
      console.log("Attempting to add to cart", { userId, productId });

      // Проверка на валидность данных
      if (!productId) {
        throw new InvalidDataError("Invalid data provided for adding to cart");
      }

      // Пробуем добавить товар в корзину
      const result = await cartRepository.addProductToCart(userId, productId);

      console.log("Successfully added to cart", result);

      return result;
    } catch (error) {
      console.error("Error during addToCart:", error);
      throw new InvalidDataError("Error while adding product to cart");
    }
  },
  updateCartItem: async (userId, productId, newQuantity) => {
    try {
      if (!productId || newQuantity < 1) {
        throw new InvalidDataError("Invalid data for updating cart");
      }
      return await cartRepository.updateProductQuantity(
        userId,
        productId,
        newQuantity
      );
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw new Error("Error while updating product quantity in cart");
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
