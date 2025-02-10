import { getArticleById } from "../service/articleService";
import { fetchCart } from "../service/cartService";
import { replaceSymbols } from "./utils/replaceSymbols";

document.addEventListener("DOMContentLoaded", async () => {

  const user = JSON.parse(localStorage.getItem("user"));
  const redirectAfterLogin = sessionStorage.getItem("redirectAfterLogin");
  const fields = document.querySelectorAll("input[required], select[required]");
  if (user) {
    document.querySelector(".order-container h2").innerHTML = "Account";
    document.querySelector(".order-login").innerHTML =
      `You are logged in as ${user.email}. We will send you an order confirmation to this email address.`;
    document.querySelector(".email-wrapper").style.display = "none";
    if (redirectAfterLogin) {
      window.location.href = redirectAfterLogin;
      sessionStorage.removeItem("redirectAfterLogin");
    }
  } else {
    sessionStorage.setItem("redirectAfterLogin", window.location.href);
  }

  const createErrorMessage = (input) => {
    const errorElement = document.createElement("span");
    errorElement.classList.add("error-message");
    errorElement.innerText = "This field is required";
    errorElement.style.display = "none";

    input.parentElement.insertBefore(errorElement, input.nextSibling);

    return errorElement;
  };
  const toggleErrorMessage = (input, errorElement) => {
    if (!input.value.trim()) {
      errorElement.style.display = "block";
      input.classList.add("invalid");
    } else {
      errorElement.style.display = "none";
      input.classList.remove("invalid");
    }
  };

  fields.forEach((field) => {
    const errorElement = createErrorMessage(field);

    field.addEventListener("blur", () => {
      toggleErrorMessage(field, errorElement);
    });

    field.addEventListener("input", () => {
      toggleErrorMessage(field, errorElement);
    });
  });

  async function renderCart(userId) {
    const orderCartDiv = document.querySelector(".order-cart");
    const skeletons = document.querySelector(".cart-item.skeletons");

    if (skeletons) skeletons.style.display = "block";
    orderCartDiv.innerHTML = "";

    const cartItems = await fetchCart(user._id);
    console.log("cartItems", cartItems);

    const productDataPromises = cartItems.map((item) =>
      getArticleById(item.productId)
    );

    const productsData = await Promise.all(productDataPromises);

    let fullCartItems = [];

    fullCartItems = cartItems.map((item) => ({
      ...item,
      ...(productsData.find((product) => product._id === item.productId) || {}),
    }));

    console.log("fullCartItems", fullCartItems);

    for (let item of fullCartItems) {
      const cartItemDiv = document.createElement("div");
      cartItemDiv.classList.add("cart-item-order");

      const cartItemImageDiv = document.createElement("div");
      cartItemImageDiv.classList.add("cart-item-image");
      const cartItemImage = document.createElement("img");
      cartItemImage.src = item.image;
      cartItemImage.alt = item.name;
      cartItemImageDiv.appendChild(cartItemImage);

      const cartItemDetailsDiv = document.createElement("div");
      cartItemDetailsDiv.classList.add("cart-item-details");
      const cartItemName = document.createElement("h2");
      cartItemName.classList.add("cart-item-name");
      cartItemName.innerHTML = replaceSymbols(item.name);

      const cartItemQuantity = document.createElement("p");
      cartItemQuantity.classList.add("cart-item-quantity");
      cartItemQuantity.textContent = `Quantity: ${item.cartQuantity}`;

      cartItemDetailsDiv.appendChild(cartItemName);
      cartItemDetailsDiv.appendChild(cartItemQuantity);

      cartItemDiv.appendChild(cartItemImageDiv);
      cartItemDiv.appendChild(cartItemDetailsDiv);

      document.querySelector(".order-cart").appendChild(cartItemDiv);
      skeletons.style.display = "none";
    }
    updateTotalFromDB(fullCartItems);
  }
  renderCart(user._id);

  function updateTotalFromDB(cartItems) {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.cartQuantity,
      0
    );

    document.getElementById("subtotal-summary").textContent =
      `$${total.toFixed(2)} USD`;
    document.getElementById("order-total").textContent =
      `$${total.toFixed(2)} USD`; // Общая сумма
  }

  const form = document.querySelector(".order-form");
  const submitButton = document.querySelector(".submit-shipping");

  const checkFormValidity = () => {
    const requiredFields = form.querySelectorAll("input[required]");

    const isFormValid = Array.from(requiredFields).every(
      (input) => input.value.trim() !== ""
    );

    submitButton.disabled = !isFormValid;
  };

  form.addEventListener("input", checkFormValidity);

  checkFormValidity();
});
