import { fetchData } from "./itemService.js";

import { initDropdown } from "./accountProfile.js";
import "../style/style.css";
import "../style/shipping.css";
import "../style/itempage.css";
import "../style/accountProfile.css";

document.addEventListener("DOMContentLoaded", () => {
  initDropdown();
});

async function loadModule() {
  try {
    const data = await fetchData();
    if (!data || !Array.isArray(data)) {
      throw new Error("Данные не загружены или не в правильном формате");
    }
    const module = await import(
      /* webpackChunkName: "html-module" */ "./htmlBuilder.js"
    );
    const { createCards, scrollToItems, createNewCards, setupFilterToggle } =
      module;
    createNewCards();
    createCards(data);
    scrollToItems();
    setupFilterToggle();
  } catch (error) {
    console.error("Ошибка при загрузке модуля:", error);
  }
}

loadModule();

