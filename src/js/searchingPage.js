import { getAllArticles } from "../service/articleService";
import { createCards } from "./htmlBuilder";

document.addEventListener("DOMContentLoaded", async () => {
  if (window.location.pathname.includes("searchingPage")) {
    document.body.classList.add("searching-page");
  }
  const allArticles = await getAllArticles();
  createCards(allArticles);
  const searchInputt = document.getElementById("searchPageInput");
  const searchButton = document.getElementById("searchButton");
  const clearButton = document.getElementById("clearSearch");

  if (clearButton) {
    clearButton.addEventListener("click", () => {
      searchInputt.value = "";
    });
  }

  searchInputt.addEventListener("input", () => {
    const query = searchInputt.value.trim().toLowerCase();
    const filteredProducts = allArticles.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.text.toLowerCase().includes(query)
    );

    createCards(filteredProducts);
  });
});
