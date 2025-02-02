import { replaceSymbols } from "./utils/utils";
document.addEventListener("DOMContentLoaded", async () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // Загружаем товары из localStorage
  console.log("cart", cart);

  if (cart.length === 0) {
    return;
  }
  renderCart(cart);
});

function groupItemsById(cartItems) {
  const groupedItems = {};
  console.log("groupedItems", groupedItems);

  cartItems.forEach((item) => {
    const key = item._id;

    if (groupedItems[key]) {
      groupedItems[key].quantity += 1;
    } else {
      groupedItems[key] = { ...item, quantity: 1 };
    }
  });
  console.log("groupedItems", groupedItems);
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

    for (let i = 1; i <= item.quantity; i++) {
      const option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      quantitySelector.appendChild(option);
    }

    quantitySelector.value = item.quantity;

    quantitySelector.addEventListener("change", () => {
      item.quantity = parseInt(quantitySelector.value);
      updateCart(cartItems); // обновляем корзину в localStorage
      updateTotal(cartItems);
    });

    const deliveryText = document.createElement("p");
    deliveryText.classList.add("delivery-text");
    deliveryText.textContent = "Available to ship in 1-3 business days.";

    divQuantityWrapper.appendChild(quantityTitle);
    divQuantityWrapper.appendChild(quantitySelector);
    titleLink.appendChild(title);
    cartInfo.appendChild(titleLink);
    cartInfo.appendChild(price);
    cartInfo.appendChild(divQuantityWrapper);

    cartInfo.appendChild(deliveryText);

    cartItem.appendChild(cartImage);
    cartItem.appendChild(cartInfo);

    productsContainer.appendChild(cartItem);
  });
  updateTotal(cartItems);
}
function updateTotal(cartItems) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  ); // Считаем сумму с учетом количества каждого товара
  document.getElementById("subtotal").textContent = `$${total.toFixed(2)} USD`;
  document.getElementById("total").textContent = `$${total.toFixed(2)} USD`;
}
function updateCart(cartItems) {
  localStorage.setItem("cart", JSON.stringify(cartItems));
}
