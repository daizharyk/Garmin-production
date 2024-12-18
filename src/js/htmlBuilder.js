import { fetchData } from "./itemService.js";
import "../style/style.css";
import "../style/shipping.css";
import "../style/itempage.css";


export function createCards(data) {
  const container = document.getElementById("cards-container");

  data.forEach((item) => {
    const link = document.createElement("a");
    link.href = `pages/itempage.html?id=${item._id}`;
    link.classList.add("card-link");

    const cardImg = document.createElement("div");
    cardImg.classList.add("item-card-img");
    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.name;
    cardImg.appendChild(img);

    const cardDesc = document.createElement("figcaption");
    cardDesc.classList.add("product-card-description");
    const title = document.createElement("h2");

    let titleText = item.name;
    titleText = titleText.replace(/®/g, '<sup class="registered">®</sup>');
    titleText = titleText.replace(/™/g, '<sup class="trademark2">™</sup>');
    title.innerHTML = titleText;

    const description = document.createElement("p");
    description.classList.add("product-description");
    description.textContent = item.text;
    const price = document.createElement("p");
    price.classList.add("price-text");
    price.textContent = `$${item.price?.toFixed(2) || "0.00"} USD`;

    cardDesc.appendChild(title);
    cardDesc.appendChild(description);
    cardDesc.appendChild(price);

    link.appendChild(cardImg);
    link.appendChild(cardDesc);

    container.appendChild(link);
  });
}

export async function createNewCards() {
  const items = await fetchData();

  const newCardsContainer = document.querySelector(".new-cards-container");

  newCardsContainer.innerHTML = "";

  function createCard(item) {
    const newCard = document.createElement("div");

    const cardLink = document.createElement("a");
    cardLink.href = `/pages/itempage.html?id=${item._id}`;
    cardLink.classList.add("card-link-dropdownmenu");

    newCard.classList.add("new-card");

    const img = document.createElement("img");
    img.src = item.carousel_images[2];
    img.alt = item.name;

    const newCardDescription = document.createElement("div");
    newCardDescription.classList.add("new-card-discription");

    const h2 = document.createElement("h2");
    h2.textContent = item.name;

    newCardDescription.appendChild(h2);
    newCard.appendChild(img);
    newCard.appendChild(newCardDescription);
    cardLink.appendChild(newCard);

    return cardLink;
  }

  const idsToCreate = ["6702db1c66b48142a2e0bdc9", "6702db1c66b48142a2e0bdc8"];
  idsToCreate.forEach((id) => {
    const item = items.find((i) => i._id === id);
    if (item) {
      const card = createCard(item);
      newCardsContainer.appendChild(card);
    }
  });
}

export function scrollToItems() {
  let shopall = document.getElementById("shopall");
  let cardsContent = document.querySelector(".cards-content");

  let scrollIntoElement = (el) => {
    el.scrollIntoView({ behavior: "smooth" });
  };
  shopall.addEventListener("click", (e) => {
    e.preventDefault();
    scrollIntoElement(cardsContent);
  });
}

export function setupFilterToggle() {
  document
    .getElementById("filterSortToggle")
    .addEventListener("click", function () {
      const sidebar = document.getElementById("sidebar");
      const filterDropdown = document.querySelector(".product-filter_dropdown");

      sidebar.style.display =
        sidebar.style.display === "none" || sidebar.style.display === ""
          ? "block"
          : "none";
      filterDropdown.classList.toggle("active");
    });
}


