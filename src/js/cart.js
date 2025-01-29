import { getArticleById } from "../service/articleService";

document.addEventListener("DOMContentLoaded", async () => {
  const itemId = new URLSearchParams(location.search).get("id");
  //   if (!itemId) return;

  try {
    const item = await getArticleById("6749ad8f82a3b2227ced6b66");
    console.log("item", item);

    if (!item) {
      console.error("Товар не найден!");
      return;
    }

    renderCart(item);
  } catch (error) {
    console.error("Ошибка загрузки товара:", error);
  }
});

function renderCart(item) {
  const productsContainer = document.querySelector(".products-container");
  if (!productsContainer) return;

  productsContainer.innerHTML = "";

  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Создаём контейнер для изображения
  const cartImage = document.createElement("div");
  cartImage.classList.add("cart-image");

  const link = document.createElement("a");
  link.href = "#";

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.name;

  link.appendChild(img);
  cartImage.appendChild(link);

  // Создаём контейнер с информацией о товаре
  const cartInfo = document.createElement("div");
  cartInfo.classList.add("cart_info");

  const title = document.createElement("h2");
  title.textContent = item.product_title;

  const price = document.createElement("div");
  price.classList.add("cart__price");
  price.textContent = `$${item.price.toFixed(2)}`;

  const divQuantityWrapper = document.createElement("div");
  divQuantityWrapper.classList.add("quantityWrapper");
  const quantityTitle = document.createElement("p");
  quantityTitle.textContent = "Quantity";

  const quantitySelector = document.createElement("select");
  quantitySelector.classList.add("cart__quantity");

  for (let i = 1; i <= 3; i++) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    quantitySelector.appendChild(option);
  }

  quantitySelector.addEventListener("change", () => {
    const newPrice = item.price * parseInt(quantitySelector.value);
    updateTotal(newPrice);
  });

  const deliveryText = document.createElement("p");
  deliveryText.classList.add("delivery-text");
  deliveryText.textContent = "Available to ship in 1-3 business days.";

  divQuantityWrapper.appendChild(quantityTitle);
  divQuantityWrapper.appendChild(quantitySelector);
  cartInfo.appendChild(title);
  cartInfo.appendChild(price);
  cartInfo.appendChild(divQuantityWrapper);

  cartInfo.appendChild(deliveryText);


  cartItem.appendChild(cartImage);
  cartItem.appendChild(cartInfo);


  productsContainer.appendChild(cartItem);

  updateTotal(item.price);
}

function updateTotal(price) {
  document.getElementById("subtotal").textContent = `$${price.toFixed(2)}`;
  document.getElementById("total").textContent = `$${price.toFixed(2)}`;
}
