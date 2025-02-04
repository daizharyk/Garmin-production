export function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCountElement = document.querySelector(".cart-count");
  
    if (cartCountElement) {
      const totalItems = cart.length;
      cartCountElement.textContent = totalItems;
      cartCountElement.style.visibility = totalItems > 0 ? "visible" : "hidden";
    }
  }
  