import { getAllArticles } from "../service/articleService.js";

import "../style/style.css";
import "../style/shipping.css";
import "../style/itempage.css";
import "../style/accountProfile.css";

let originalItems = [];

async function loadModule() {
  try {
    originalItems = await getAllArticles();
    if (!originalItems || !Array.isArray(originalItems)) {
      throw new Error("Данные не загружены или не в правильном формате");
    }

    const currentPage = window.location.pathname;

    if (
      currentPage === "/pages/searchingpage.html" ||
      currentPage === "/pages/searchingpage"
    ) {
      return;
    }

    const module = await import(
      /* webpackChunkName: "html-module" */ "./htmlBuilder.js"
    );
    const {
      createCards,
      initializeSort,
      scrollToItems,
      setupFilterToggle,
      initializeFilters,
      updateCounts,
      initializeBoxClicks,
    } = module;
    createCards(originalItems);
    initializeFilters(originalItems);
    updateCounts(originalItems);
    setupFilterToggle(originalItems);
    initializeSort(originalItems);
    scrollToItems();
    initializeBoxClicks(originalItems);
  } catch (error) {
    console.error("Ошибка при загрузке модуля:", error);
  }
}

loadModule();

document.addEventListener("DOMContentLoaded", async function () {
  const currentPage = window.location.pathname.replace(
    /^.*\/pages\//,
    "/pages/"
  );

  const protectedPages = ["/pages/accountProfile.html"];

  if (protectedPages.includes(currentPage)) {
    try {
      const { checkAuthorization } = await import("./auth.js");
      checkAuthorization();
    } catch (err) {
      console.error("Ошибка при загрузке модуля авторизации:", err);
    }
  }
});
