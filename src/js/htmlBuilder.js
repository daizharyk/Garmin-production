import "../style/style.css";
import "../style/shipping.css";
import "../style/itempage.css";

export function createCards(data) {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";
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

export function scrollToItems() {
  let shopall = document.getElementById("shopall");
  let cardsContent = document.getElementById("cards-container");

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

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", () => handleFilterChange(data));
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
  sortSelect.addEventListener("change", (event) =>
    handleSortChange(event, data)
  );
}
