import { getAllArticles } from "../service/articleService";
import { createCards } from "./htmlBuilder";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("productsContainer");
  container.style.opacity = "0";
  if (window.location.pathname.includes("searchingPage")) {
    document.body.classList.add("searching-page");
  }

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

  const allArticles = await getAllArticles();
  container.style.opacity = "1";

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
        toggleNoResultsMessage("", true);
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
