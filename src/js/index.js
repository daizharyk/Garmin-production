import data from "../data/item.json" with { type: "json" };
import "../style/style.css";
import "../style/shipping.css";
import "../style/itempage.css";

function loadModule() {
  import(/* webpackChunkName: "html-module" */ "./htmlBuilder.js")
    .then((module) => {
      const { createCards, scrollToItems, createNewCards } = module;

      createCards(data);
      scrollToItems();
      createNewCards();
    })
    .catch((error) => {
      console.error("Ошибка при загрузке модуля:", error);
    });
}
loadModule();
