import { replaceSymbols } from "./utils/utils";
document.addEventListener("DOMContentLoaded", async () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // Загружаем товары из localStorage
  console.log("cart", cart);

  const emptyCartDiv = document.querySelector(".empty-cart");
  const cartDiv = document.querySelector(".cart");

  function toggleCartDisplay(cartItems) {
    if (!cartItems || cartItems.length === 0) {
      emptyCartDiv.style.display = "flex";
      cartDiv.style.display = "none";
    } else {
      emptyCartDiv.style.display = "none";
      cartDiv.style.display = "flex";
    }
  }

  toggleCartDisplay(cart)

  if (cart.length === 0) return;

  function groupItemsById(cartItems) {
    const groupedItems = {};
    console.log("groupedItems", groupedItems);

    cartItems.forEach((item) => {
      const key = item._id;

      if (groupedItems[key]) {
        groupedItems[key].cartQuantity += 1; // Увеличиваем счётчик добавлений
      } else {
        groupedItems[key] = {
          ...item,
          cartQuantity: 1, // Начальное количество в корзине
          dbQuantity: item.quantity, // Максимум из БД
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

      // Добавляем quantity копий товара
      for (let i = 0; i < neededQty; i++) {
        newCart.push({
          _id: id,
          quantity: dbQty, // Сохраняем оригинальный лимит (3)
          price: parseFloat(cartItem.dataset.price),
          product_title: cartItem.dataset.productTitle,
          color: cartItem.dataset.color,
          image: cartItem.dataset.image,
        });
      }
    });

    // Обновляем корзину и сохраняем
    localStorage.setItem("cart", JSON.stringify(newCart));
    updateTotal(newCart);
  }

  function removeFromCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter((item) => item._id !== id);
    localStorage.setItem("cart", JSON.stringify(cart));
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
  renderCart(cart);
});
