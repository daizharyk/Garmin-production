import { fetchData } from "./itemService.js";
import "../style/style.css";
import "../style/shipping.css";
import "../style/itempage.css";
import "../style/accountProfile.css";

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
