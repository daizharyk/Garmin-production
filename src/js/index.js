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
    console.log("currentPage", currentPage);

    if (currentPage !== "/pages/searchingPage.html") {
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
    }
  } catch (error) {
    console.error("Ошибка при загрузке модуля:", error);
  }
}

loadModule();

document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname;

  const protectedPages = ["/pages/accountProfile.html"];

  if (protectedPages.includes(currentPage)) {
    import("./auth.js")
      .then((module) => {
        module.checkAuthorization();
      })
      .catch((err) => {
        console.error("Ошибка при подгрузке модуля авторизации", err);
      });
  }
});
