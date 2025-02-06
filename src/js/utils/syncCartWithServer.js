import { addToCart } from "../../service/cartService";
import { updateCartCount } from "./cart-utils";

export async function syncCartWithServer() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length > 0) {
    try {
      for (let item of cart) {
        await addToCart(item._id);
        await updateCartCount();
      }

      localStorage.removeItem("cart");

      console.log("Корзина синхронизирована с сервером.");
    } catch (error) {
      console.error("Ошибка при синхронизации корзины с сервером:", error);
    }
  }
}
