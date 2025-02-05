const Cart = require("../database/models/cart");

module.exports = {
  getCartByUserId: async (userId) => {
    const cart = await Cart.findOne({ userId });
    return cart;
  },

  addProductToCart: async (userId, productId) => {
    const cart = await Cart.findOne({ userId });
    console.log("cart", cart);

    if (!cart) {
      const newCart = new Cart({
        userId,
        items: [{ productId, cartQuantity: 1 }],
      });
      return await newCart.save();
    }
    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (productIndex === -1) {
      cart.items.push({ productId, cartQuantity: 1 });
    } else {
      cart.items[productIndex].cartQuantity += 1;
    }
    return await cart.save();
  },
  updateProductQuantity: async (userId, productId, newQuantity) => {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      throw new Error("Cart not found");
    }

    const productIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (productIndex === -1) {
      throw new Error("Product not found in cart");
    }

    cart.items[productIndex].cartQuantity = newQuantity;
    return await cart.save();
  },

  removeProductFromCart: async (userId, itemId) => {
    const cart = await Cart.findOne({ userId });
    console.log("Cart found:", cart);

    if (cart) {
      cart.items = cart.items.filter(
        (item) => item.productId.toString() !== itemId.toString()
      );

      return await cart.save();
    }
    throw new Error("Cart not found");
  },
};
