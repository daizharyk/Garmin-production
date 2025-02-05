import { getArticleById } from "../service/articleService.js";
import {
  fetchCart,
  updateCartItem,
  removeCart,
} from "../service/cartService.js";
import { updateCartCount } from "./utils/cart-utils.js";
import { replaceSymbols } from "./utils/replaceSymbols";

document.addEventListener("DOMContentLoaded", async () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const emptyCartDiv = document.querySelector(".empty-cart");
  const cartDiv = document.querySelector(".cart");
  const loadingContainer = document.querySelector(".loading-container");

  // function toggleCartDisplay(cartItems) {
  //   if (!cartItems || cartItems.length === 0) {
  //     emptyCartDiv.style.display = "flex";
  //     cartDiv.style.display = "none";
  //   } else {
  //     emptyCartDiv.style.display = "none";
  //     cartDiv.style.display = "flex";
  //   }
  // }

  // toggleCartDisplay(cart);

  async function renderCartFromDB(userId) {
    const productsContainer = document.querySelector(".products-container");
    console.log("productsContainer", productsContainer);
    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    try {
      const cartItems = await fetchCart(userId);
      console.log("cartItems", cartItems);

      // if (cartItems.length === 0) {
      //   productsContainer.innerHTML = "<p>Ваша корзина пуста</p>";
      //   return;
      // }

      const productDataPromises = cartItems.map((item) =>
        getArticleById(item.productId)
      );

      const productsData = await Promise.all(productDataPromises);
      console.log("productsData", productsData);

      const fullCartItems = cartItems.map((item, index) => ({
        ...item,
        ...productsData[index], // Данные о товаре
      }));

      console.log("fullCartItems", fullCartItems);

      fullCartItems.forEach((item) => {
        if (!item._id) return;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.dataset.id = item._id;
        cartItem.dataset.productTitle = item.product_title;
        cartItem.dataset.color = item.color;
        cartItem.dataset.price = item.price;
        cartItem.dataset.image = item.image;
        cartItem.dataset.dbQuantity = item.dbQuantity;
        cartItem.dataset.cartQuantity = item.cartQuantity;

        const cartImage = document.createElement("div");
        cartImage.classList.add("cart-image");

        const link = document.createElement("a");
        link.href = `/pages/itempage.html?id=${item._id}`;

        const img = document.createElement("img");
        img.src = item.image;
        img.alt = item.product_title;

        link.appendChild(img);
        cartImage.appendChild(link);

        const cartInfo = document.createElement("div");
        cartInfo.classList.add("cart_info");

        const titleLink = document.createElement("a");
        titleLink.classList.add("title-link");
        titleLink.href = `/pages/itempage.html?id=${item._id}`;
        const title = document.createElement("h2");
        title.innerHTML = `${replaceSymbols(item.product_title)}, ${item.color}`;

        const price = document.createElement("div");
        price.classList.add("cart__price");
        price.textContent = `$${item.price.toFixed(2)} USD`;

        const divQuantityWrapper = document.createElement("div");
        divQuantityWrapper.classList.add("quantityWrapper");

        const quantityTitle = document.createElement("p");
        quantityTitle.textContent = "Quantity";

        const quantitySelector = document.createElement("select");
        quantitySelector.classList.add("cart__quantity");
        const maxQuantity = parseInt(item.quantity, 10);
        const cartQuantity = parseInt(item.cartQuantity, 10);

        const selectedQuantity =
          cartQuantity > maxQuantity ? maxQuantity : cartQuantity;

        for (let i = 1; i <= maxQuantity; i++) {
          const option = document.createElement("option");
          option.value = i;
          option.textContent = i;
          quantitySelector.appendChild(option);
        }
        quantitySelector.value = selectedQuantity;


        
        quantitySelector.value = item.cartQuantity;
        quantitySelector.addEventListener("change", async (e) => {
          const newQuantity = parseInt(e.target.value);
          cartItem.dataset.cartQuantity = newQuantity;

          loadingContainer.style.display = "flex";
          await updateCartItem(userId, item.productId, newQuantity);
          loadingContainer.style.display = "none";

          const updatedCartItems = fullCartItems.map((cartItem) => {
            if (cartItem) {
              return { ...cartItem, cartQuantity: newQuantity }; // Обновляем cartQuantity
            }
            return cartItem;
          });

          console.log("updatedCartItems", updatedCartItems);

          updateTotalFromDB(updatedCartItems, "db");
        });

        const deliveryText = document.createElement("p");
        deliveryText.classList.add("delivery-text");
        deliveryText.textContent = "Available to ship in 1-3 business days.";

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-item");
        removeButton.innerHTML = "&#10006;";
        removeButton.addEventListener("click", async () => {
          await removeCart(item._id);
          renderCartFromDB(userId);
        });

        divQuantityWrapper.appendChild(quantityTitle);
        divQuantityWrapper.appendChild(quantitySelector);
        titleLink.appendChild(title);
        cartInfo.appendChild(titleLink);
        cartInfo.appendChild(price);
        cartInfo.appendChild(divQuantityWrapper);
        cartInfo.appendChild(deliveryText);
        cartItem.appendChild(cartImage);
        cartItem.appendChild(cartInfo);
        cartItem.appendChild(removeButton);
        productsContainer.appendChild(cartItem);
      });

      updateTotalFromDB(fullCartItems, "db");
    } catch (error) {
      console.error("Ошибка при загрузке корзины из БД:", error);
    }
  }

  function updateTotalFromDB(cartItems) {
    const total = cartItems.reduce(
      (sum, item) => sum + item.price * item.cartQuantity,
      0
    );
console.log("total",total);

    document.getElementById("subtotal").textContent =
      `$${total.toFixed(2)} USD`; // Субтотал
    document.getElementById("total").textContent = `$${total.toFixed(2)} USD`; // Общая сумма
  }

  renderCartFromDB("67692aeb7d40e63f38dc29a9");

  if (cart.length === 0) return;

  function groupItemsById(cartItems) {
    const groupedItems = {};

    cartItems.forEach((item) => {
      const key = item._id;

      if (groupedItems[key]) {
        groupedItems[key].cartQuantity += 1;
      } else {
        groupedItems[key] = {
          ...item,
          cartQuantity: 1,
          dbQuantity: item.quantity,
        };
      }
    });

    return Object.values(groupedItems);
  }

  function renderCart(cartItems) {
    const productsContainer = document.querySelector(".products-container");
    if (!productsContainer) return;

    productsContainer.innerHTML = "";

    const groupedItems = groupItemsById(cartItems);

    groupedItems.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");

      cartItem.dataset.id = item._id;
      cartItem.dataset.productTitle = item.product_title;
      cartItem.dataset.color = item.color;
      cartItem.dataset.price = item.price;
      cartItem.dataset.image = item.image;
      cartItem.dataset.dbQuantity = item.dbQuantity;
      cartItem.dataset.cartQuantity = item.cartQuantity;

      const cartImage = document.createElement("div");

      cartImage.classList.add("cart-image");

      const link = document.createElement("a");
      link.href = `/pages/itempage.html?id=${item._id}`;

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;

      link.appendChild(img);
      cartImage.appendChild(link);

      const cartInfo = document.createElement("div");
      cartInfo.classList.add("cart_info");

      const titleLink = document.createElement("a");
      titleLink.classList.add("title-link");
      titleLink.href = `/pages/itempage.html?id=${item._id}`;
      const title = document.createElement("h2");
      title.innerHTML = `${replaceSymbols(item.product_title)}, ${item.color}`;

      const price = document.createElement("div");
      price.classList.add("cart__price");
      price.textContent = `$${item.price.toFixed(2)} USD`;

      const divQuantityWrapper = document.createElement("div");

      divQuantityWrapper.classList.add("quantityWrapper");

      const quantityTitle = document.createElement("p");
      quantityTitle.textContent = "Quantity";

      const quantitySelector = document.createElement("select");
      quantitySelector.classList.add("cart__quantity");

      for (let i = 1; i <= item.dbQuantity; i++) {
        const option = document.createElement("option");
        option.value = i;
        option.textContent = i;
        quantitySelector.appendChild(option);
      }

      quantitySelector.value = item.cartQuantity;
      quantitySelector.addEventListener("change", (e) => {
        cartItem.dataset.cartQuantity = parseInt(e.target.value);
        updateCartFromDOM();
      });

      const deliveryText = document.createElement("p");
      deliveryText.classList.add("delivery-text");
      deliveryText.textContent = "Available to ship in 1-3 business days.";

      const removeButton = document.createElement("button");
      removeButton.classList.add("remove-item");
      removeButton.innerHTML = "&#10006;";
      removeButton.addEventListener("click", () => {
        removeFromCart(item._id);
      });

      divQuantityWrapper.appendChild(quantityTitle);
      divQuantityWrapper.appendChild(quantitySelector);
      titleLink.appendChild(title);
      cartInfo.appendChild(titleLink);
      cartInfo.appendChild(price);
      cartInfo.appendChild(divQuantityWrapper);
      cartInfo.appendChild(deliveryText);
      cartItem.appendChild(cartImage);
      cartItem.appendChild(cartInfo);
      cartItem.appendChild(removeButton);
      productsContainer.appendChild(cartItem);
    });
    updateTotal(cartItems);
  }

  function updateCartFromDOM() {
    const newCart = [];
    document.querySelectorAll(".cart-item").forEach((cartItem) => {
      const id = cartItem.dataset.id;
      const neededQty = parseInt(cartItem.dataset.cartQuantity);
      const dbQty = parseInt(cartItem.dataset.dbQuantity);

      for (let i = 0; i < neededQty; i++) {
        newCart.push({
          _id: id,
          quantity: dbQty,
          price: parseFloat(cartItem.dataset.price),
          product_title: cartItem.dataset.productTitle,
          color: cartItem.dataset.color,
          image: cartItem.dataset.image,
        });
      }
    });

    localStorage.setItem("cart", JSON.stringify(newCart));
    updateCartCount();
    updateTotal(newCart);
  }

  function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    renderCart(cart);
    toggleCartDisplay(cart);
  }

  function updateTotal(cartItems) {
    const grouped = groupItemsById(cartItems);
    const total = grouped.reduce(
      (sum, item) => sum + item.price * item.cartQuantity,
      0
    );
    document.getElementById("subtotal").textContent =
      `$${total.toFixed(2)} USD`;
    document.getElementById("total").textContent = `$${total.toFixed(2)} USD`;
  }

  // renderCart(cart);
});
