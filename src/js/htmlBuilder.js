import "../style/style.css";
import "../style/shipping.css";
import "../style/itempage.css";
import { replaceSymbols } from "./utils/utils";

export function createCards(data) {
  const container = document.getElementById("cards-container");

  if (!container) {
    return;
  }
  container.innerHTML = "";
  const isSearchPage = window.location.pathname.includes("searchingpage");

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
    const price = document.createElement("p");
    price.classList.add("price-text");
    price.textContent = `$${item.price?.toFixed(2) || "0.00"} USD`;

    if (isSearchPage) {
      price.style.display = "none";
    }

    cardDesc.appendChild(title);
    cardDesc.appendChild(description);
    cardDesc.appendChild(price);

    link.appendChild(cardImg);
    link.appendChild(cardDesc);

    container.appendChild(link);
  });
}

export function scrollToItems() {
  let shopall = document.getElementById("shopall");
  let cardsContent = document.getElementById("cards-container");
  if (!shopall || !cardsContent) {
    return;
  }
  let scrollIntoElement = (el) => {
    el.scrollIntoView({ behavior: "smooth" });
  };
  shopall.addEventListener("click", (e) => {
    e.preventDefault();
    scrollIntoElement(cardsContent);
  });
}

export function setupFilterToggle() {
  const filterSortToggle = document.getElementById("filterSortToggle");
  const sidebar = document.getElementById("sidebar");
  const filterDropdown = document.querySelector(".product-filter_dropdown");

  if (!filterSortToggle) {
    return;
  }

  if (!sidebar) {
    return;
  }

  if (!filterDropdown) {
    return;
  }

  filterSortToggle.addEventListener("click", function () {
    sidebar.style.display =
      sidebar.style.display === "none" || sidebar.style.display === ""
        ? "block"
        : "none";
    filterDropdown.classList.toggle("active");
  });
}

export function updateCounts(items) {
  const featureCounts = {};
  items.forEach((item) => {
    for (const feature in item.features) {
      if (item.features[feature]) {
        featureCounts[feature] = (featureCounts[feature] || 0) + 1;
      }
    }
  });

  document
    .querySelectorAll('.feature-list input[type="checkbox"]')
    .forEach((checkbox) => {
      const featureId = checkbox.id;
      const countElement = document.getElementById(`${checkbox.id}_count`);
      countElement.textContent = `(${featureCounts[checkbox.id] || 0})`;
      const count = featureCounts[featureId] || 0;

      countElement.textContent = `(${count})`;

      if (count === 0) {
        checkbox.closest("li").style.display = "none";
      } else {
        checkbox.closest("li").style.display = "block";
      }
    });
}

function handleFilterChange(data) {
  const checkboxes = document.querySelectorAll(
    '.feature-list input[type="checkbox"]'
  );

  const selectedFilters = Array.from(checkboxes)
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => checkbox.id);

  const filteredItems =
    selectedFilters.length > 0
      ? data.filter((item) => {
          if (!item.features) return false;

          return selectedFilters.every(
            (filter) => item.features[filter] === true
          );
        })
      : data;

  createCards(filteredItems);
  updateCounts(filteredItems);
}

export function initializeFilters(
  data,
  checkboxSelector = '.feature-list input[type="checkbox"]'
) {
  const checkboxes = document.querySelectorAll(checkboxSelector);
  if (checkboxes.length === 0) {
    return;
  }
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => handleFilterChange(data));
  });
}
export function initializeBoxClicks(
  data,
  boxSelector = ".box",
  checkboxSelector = '.feature-list input[type="checkbox"]'
) {
  const boxes = document.querySelectorAll(boxSelector);
  const checkboxes = document.querySelectorAll(checkboxSelector);
  const cardsContent = document.getElementById("cards-container");
  if (boxes.length === 0 || checkboxes.length === 0 || !cardsContent) {
    return;
  }

  const scrollIntoElement = (el) => {
    el.scrollIntoView({ behavior: "smooth" });
  };

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
      if (event.target.tagName === "A") {
        event.preventDefault();
      }

      scrollIntoElement(cardsContent);
      const featureId = box.getAttribute("data-checkbox");
      const checkbox = document.getElementById(featureId);

      if (checkbox) {
        const filteredItems = data.filter(
          (item) => item.features && item.features[featureId]
        );

        if (filteredItems.length === 0) {
          return;
        }
        checkboxes.forEach((cb) => {
          if (cb.id !== featureId) {
            cb.checked = false;
          }
        });
        checkbox.checked = !checkbox.checked;

        handleFilterChange(data);
      }
    });
  });
}

function sortProducts(items, criteria) {
  const sortedItems = [...items];
  switch (criteria) {
    case "a_to_z":
      sortedItems.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "z_to_a":
      sortedItems.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price_low_high":
      sortedItems.sort((a, b) => a.price - b.price);
      break;
    case "price_high_low":
      sortedItems.sort((a, b) => b.price - a.price);
      break;
    default:
      return items;
  }

  return sortedItems;
}

function handleSortChange(event, items) {
  const sortCriteria = event.target.value;
  const sortedItems = sortProducts(items, sortCriteria);
  createCards(sortedItems);
}

export function initializeSort(data) {
  const sortSelect = document.getElementById("sort");
  if (!sortSelect) {
    return;
  }
  sortSelect.addEventListener("change", (event) =>
    handleSortChange(event, data)
  );
}
