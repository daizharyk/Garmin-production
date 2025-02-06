import { fetchCart } from "../../service/cartService";

export async function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartCountElement = document.querySelector(".cart-count");

  if (!cartCountElement) return;
  const user = localStorage.getItem("user");

  let totalItems = 0;

  if (user) {
    try {
      const cartItems = await fetchCart(user._id);
      totalItems = cartItems.reduce((sum, item) => sum + item.cartQuantity, 0);
    } catch (error) {
      console.error("Ошибка при получении корзины из БД:", error);
    }
  } else {
    totalItems = cart.length;
  }

  cartCountElement.textContent = totalItems;
  cartCountElement.style.visibility = totalItems > 0 ? "visible" : "hidden";
}
