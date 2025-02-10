import { getAllArticles } from "../service/articleService";
import { replaceSymbols } from "./utils/replaceSymbols";

document.addEventListener("DOMContentLoaded", async () => {
  const searchInputt = document.getElementById("searchPageInput");
  const clearButton = document.getElementById("clearSearch");
  const noResultsMessage = document.getElementById("noResultsMessage");
  const queryText = document.getElementById("queryText");

  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get("query");

  if (searchInputt && query) {
    searchInputt.value = query;
  }

  function toggleNoResultsMessage(query, hasResults) {
    if (!hasResults) {
      noResultsMessage.style.display = "block";
      queryText.textContent = `"${query}"`;
    } else {
      noResultsMessage.style.display = "none";
    }
  }

  function createCards(data) {
    const container = document.getElementById("cards-container");

    if (!container) return;

    container.innerHTML = "";
 
 

    data.forEach((item) => {
      const link = document.createElement("a");
      link.href = `/pages/itempage.html?id=${item._id}`;
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
      titleText = replaceSymbols(`${titleText}`);
      title.innerHTML = titleText;

      const description = document.createElement("p");
      description.classList.add("product-description");
      description.textContent = item.text;
     
   

      cardDesc.appendChild(title);
      cardDesc.appendChild(description);
  

      link.appendChild(cardImg);
      link.appendChild(cardDesc);

      container.appendChild(link);
    });

  }

  const allArticles = await getAllArticles();

  if (query) {
    const filteredProducts = allArticles.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.text.toLowerCase().includes(query.toLowerCase())
    );
    createCards(filteredProducts);
    toggleNoResultsMessage(query, filteredProducts.length > 0);
  }

  if (searchInputt) {
    searchInputt.addEventListener("input", () => {
      const searchQuery = searchInputt.value.trim().toLowerCase();

      if (searchQuery === "") {
        setTimeout(() => {
          createCards([]);
          toggleNoResultsMessage("", true);
        }, 10);
        return;
      }

      const filteredProducts = allArticles.filter(
        (product) =>
          product.name.toLowerCase().includes(searchQuery) ||
          product.text.toLowerCase().includes(searchQuery)
      );
      createCards(filteredProducts);
      toggleNoResultsMessage(searchQuery, filteredProducts.length > 0);
    });
  }

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      searchInputt.value = "";
      createCards([]);
      toggleNoResultsMessage("", true);
    });
  }
});
