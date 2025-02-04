const Cart = require("../database/models/cart");

module.exports = {
  getCartByUserId: async (userId) => {
    return await Cart.findOne({ userId });
  },

  addProductToCart: async (userId, productId, quantity) => {
    console.log("userId", userId);

    const cart = await Cart.findOne({ userId });
    console.log("cart", cart);

    if (!cart) {
      const newCart = new Cart({ userId, items: [{ productId, quantity }] });
      return await newCart.save();
    }
    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (productIndex === -1) {
      cart.items.push({ productId, quantity });
    } else {
      cart.items[productIndex].quantity += quantity;
    }
    return await cart.save();
  },

  removeProductFromCart: async (userId, itemId) => {
    const cart = await Cart.findOne({ userId });
    console.log("Cart found:", cart);

    if (cart) {
      cart.items = cart.items.filter(
        (item) => item._id.toString() !== itemId.toString()
      );

      return await cart.save();
    }
    throw new Error("Cart not found");
  },
};
