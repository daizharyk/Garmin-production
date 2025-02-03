import { getArticleById, getItemsByModel } from "../service/articleService";
import "../style/style.css";
import "../style/shipping.css";
import "../style/itempage.css";
import {
  getEditionsByModelId,
  getVersionsByModelId,
} from "../service/smartWatchService";
import { replaceSymbols } from "./utils/utils";
const navBar = document.querySelector(".nav-bar");
const navBarOffsetTop = navBar.offsetTop;
window.addEventListener("scroll", () => {
  const currentScroll =
    window.pageYOffset || document.documentElement.scrollTop;
  if (currentScroll >= navBarOffsetTop) {
    navBar.classList.add("sticky");
  } else {
    navBar.classList.remove("sticky");
  }
});

document.addEventListener("DOMContentLoaded", async () => {
  const itemId = new URLSearchParams(location.search).get("id");
  const item = await getArticleById(itemId);
  const solarCharging = item.features.solar_charging;
  const musicStorage = item.features.music_storage_on_watch;
  const musicFilterContainer = document.querySelector(".musicFilterContainer");
  const solarFilterContainer = document.querySelector(".solarFilterContainer");
  const editionContainer = document.querySelector(".editionContainer");
  const versionContainer = document.querySelector(".versionContainer");
  const addedCartContainer = document.querySelector(".added-cart-container");
  const mainItemContainer = document.querySelector(".main-item-container");
  const addedItemName = document.getElementById("added-iten-name");
  const loadingContainer = document.getElementById("loading-container");

  loadingContainer.style.display = "flex";
  mainItemContainer.style.display = "none";

  document.querySelector(".add-cart").addEventListener("click", () => {
    if (!itemId) return;
    try {
      if (!item) {
        console.error("Товар не найден!");
        return;
      }
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(item);

      localStorage.setItem("cart", JSON.stringify(cart));

      addedCartContainer.style.display = "flex";
      mainItemContainer.style.display = "none";
      addedItemName.innerHTML = replaceSymbols(
        `${item.product_title}, ${item.color}`
      );
      document.querySelector(".added-cart-img").src = item.image;
    } catch (error) {
      console.error("Ошибка при добавлении товара в корзину:", error);
    }
  });

  document
    .querySelector(".added-cart-buttons button:last-child")
    .addEventListener("click", () => {
      window.location.href = "/pages/cart.html";
    });
  document
    .querySelector(".added-cart-buttons button:first-child")
    .addEventListener("click", () => {
      addedCartContainer.style.display = "none";
      mainItemContainer.style.display = "block";
    });

  const caseSizeFilterContainer = document.querySelector(
    ".caseSizeFilterContainer"
  );
  const musicYesButton = document.querySelector(
    '[data-filter="music"] .size-option[data-value="Yes"]'
  );
  const solarYesButton = document.querySelector(
    '[data-filter="solar"] .size-option[data-value="Yes"]'
  );
  const musicNoButton = document.querySelector(
    '[data-filter="music"] .size-option[data-value="No"]'
  );
  const solarNoButton = document.querySelector(
    '[data-filter="solar"] .size-option[data-value="No"]'
  );

  function updateFilterButtonStyles(selectedButton, buttons) {
    buttons.forEach((button) => {
      button.style.backgroundColor = "#fff";
      button.style.color = "#000";
    });

    selectedButton.style.backgroundColor = "#000";
    selectedButton.style.color = "#fff";
    selectedButton.style.border = "1px solid #ccc";
  }

  const similarItems = await getItemsByModel(item.model);
  console.log("similarItems", similarItems);

  const hasMusicStorage = similarItems.some(
    (item) => item.features.music_storage_on_watch
  );
  const hasSolar = similarItems.some((item) => item.features.solar_charging);
  const hasMoreThanOneItem = similarItems.length > 1;

  if (!(hasMusicStorage && hasMoreThanOneItem)) {
    musicFilterContainer.style.display = "none";
  }
  if (!(hasSolar && hasMoreThanOneItem)) {
    solarFilterContainer.style.display = "none";
  }
  if (!hasMoreThanOneItem) {
    editionContainer.style.display = "none";
  }
  if (!hasMoreThanOneItem) {
    caseSizeFilterContainer.style.display = "none";
  }
  if (!hasMoreThanOneItem) {
    versionContainer.style.display = "none";
  }

  const similarItemsContainer = document.querySelector(
    ".similar-items-container"
  );

  const itemsList = similarItemsContainer.querySelector(".items-list");

  const activeFilters = {
    solar: null,
    music: null,
    caseSize: null,
    edition: null,
    version: null,
  };

  renderFilteredCards();

  function renderFilteredCards() {
    itemsList.innerHTML = "";

    if (similarItems.length <= 1) {
      similarItemsContainer.style.display = "none";
      return;
    }

    similarItems.forEach((item) => {
      const link = document.createElement("a");
      link.href = `/pages/itempage.html?id=${item._id}`;
      link.classList.add("similar-item-card-link");

      const card = document.createElement("div");
      card.classList.add("similar-item-card");

      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      card.appendChild(img);

      link.appendChild(card);
      itemsList.appendChild(link);

      const matchesSolar =
        activeFilters.solar === null ||
        (activeFilters.solar === "Yes" && item.features.solar_charging) ||
        (activeFilters.solar === "No" && !item.features.solar_charging);

      const matchesMusic =
        activeFilters.music === null ||
        (activeFilters.music === "Yes" &&
          item.features.music_storage_on_watch) ||
        (activeFilters.music === "No" && !item.features.music_storage_on_watch);

      const matchesCaseSize =
        activeFilters.caseSize === null ||
        item.case_size === activeFilters.caseSize;

      const matchesEdition =
        activeFilters.edition === null ||
        item.model_edition === activeFilters.edition;
      const matchesVersion =
        activeFilters.version === null ||
        item.model_version === activeFilters.version;

      if (
        !(
          matchesSolar &&
          matchesMusic &&
          matchesCaseSize &&
          matchesEdition &&
          matchesVersion
        )
      ) {
        card.style.opacity = "0.4";
        card.style.pointerEvents = "none";
      } else {
        card.style.opacity = "1";
        card.style.pointerEvents = "auto";
      }
    });
  }


  loadingContainer.style.display = "none";
  mainItemContainer.style.display = "block";
  
  function initializeFilter(filterButtons, initialValue, filterKey) {
    const [yesButton, noButton] = filterButtons;

    updateFilterButtonStyles(
      initialValue ? yesButton : noButton,
      filterButtons
    );

    activeFilters[filterKey] = initialValue ? "Yes" : "No";
    renderFilteredCards();

    yesButton.addEventListener("click", () => {
      updateFilterButtonStyles(yesButton, filterButtons);
      activeFilters[filterKey] = "Yes";
      renderFilteredCards();
    });

    noButton.addEventListener("click", () => {
      updateFilterButtonStyles(noButton, filterButtons);
      activeFilters[filterKey] = "No";
      renderFilteredCards();
    });
  }

  function initializeCaseSizeFilter() {
    if (
      !item.case_size ||
      item.case_size === "undefined" ||
      item.case_size === "" ||
      item.case_size === "null"
    ) {
      return;
    }
    const caseSizeButtons = [];

    const caseSizeTitle = document.createElement("h3");
    caseSizeTitle.innerText = "Case Size";

    const divCaseSizeWrapper = document.createElement("div");
    divCaseSizeWrapper.classList.add("caseSizeWrapper");
    divCaseSizeWrapper.classList.add("size-options");

    const uniqueCaseSizes = new Set();

    activeFilters.caseSize = item.case_size;

    similarItems.forEach((item) => {
      if (item.case_size) {
        uniqueCaseSizes.add(item.case_size);
      }
    });

    uniqueCaseSizes.forEach((item) => {
      const button = document.createElement("div");
      button.classList.add("size-option");
      button.textContent = `${item} mm`;

      button.addEventListener("click", () => {
        updateFilterButtonStyles(button, caseSizeButtons);
        activeFilters.caseSize = item;
        renderFilteredCards();
      });

      if (activeFilters.caseSize === item) {
        updateFilterButtonStyles(button, caseSizeButtons);
      }

      divCaseSizeWrapper.appendChild(button);

      caseSizeButtons.push(button);
    });

    if (caseSizeButtons.length > 0) {
      caseSizeFilterContainer.appendChild(caseSizeTitle);
      caseSizeFilterContainer.appendChild(divCaseSizeWrapper);
    }
  }

  async function initializeEditionFilter() {
    if (!item.model_edition || item.model_edition === "undefined") {
      return;
    }
    const editionButtons = [];

    const editionTitle = document.createElement("h3");
    editionTitle.textContent = "Edition";

    const editionWrapper = document.createElement("div");
    editionWrapper.classList.add("size-options");

    const modelId = item?.model;

    const editionRes = await getEditionsByModelId(modelId);

    const editions = editionRes.editions;

    const uniqueEditions = new Set(editions.map((edition) => edition._id));
    if (uniqueEditions.size <= 1) {
      return;
    }

    editionContainer.appendChild(editionTitle);
    editionContainer.appendChild(editionWrapper);

    if (!Array.isArray(activeFilters.edition)) {
      activeFilters.edition = [];
    }
    activeFilters.edition = item.model_edition;

    editions.forEach((item) => {
      const button = document.createElement("div");
      button.classList.add("size-option");
      button.textContent = item.name || "Unknown Edition";
      button.setAttribute("data-id", item._id);
      editionWrapper.appendChild(button);

      if (activeFilters.edition === item._id) {
        updateFilterButtonStyles(button, editionButtons);
      }

      button.addEventListener("click", () => {
        updateFilterButtonStyles(button, editionButtons);
        activeFilters.edition = item._id;
        renderFilteredCards();
      });
      editionButtons.push(button);
    });
  }

  async function initializeVersionFilter() {
    if (!item.model_version || item.model_version === "undefined") {
      return;
    }
    const versionButtons = [];

    const versionTitle = document.createElement("h3");
    versionTitle.textContent = "Edition";

    const versionWrapper = document.createElement("div");
    versionWrapper.classList.add("size-options");

    const modelId = item?.model;

    const versionRes = await getVersionsByModelId(modelId);

    const versions = versionRes.versions;

    const uniqueEditions = new Set(versions.map((version) => version._id));
    if (uniqueEditions.size <= 1) {
      return;
    }

    versionContainer.appendChild(versionTitle);
    versionContainer.appendChild(versionWrapper);

    if (!Array.isArray(activeFilters.version)) {
      activeFilters.version = [];
    }
    activeFilters.version = item.model_version;

    versions.forEach((item) => {
      const button = document.createElement("div");
      button.classList.add("size-option");
      button.textContent = item.name || "Unknown Edition";
      button.setAttribute("data-id", item._id);
      versionWrapper.appendChild(button);

      if (activeFilters.version === item._id) {
        updateFilterButtonStyles(button, versionButtons);
      }

      button.addEventListener("click", () => {
        updateFilterButtonStyles(button, versionButtons);
        activeFilters.version = item._id;
        renderFilteredCards();
      });
      versionButtons.push(button);
    });
  }

  initializeFilter([solarYesButton, solarNoButton], solarCharging, "solar");
  initializeFilter([musicYesButton, musicNoButton], musicStorage, "music");
  initializeCaseSizeFilter();
  initializeEditionFilter();
  initializeVersionFilter();
  const filtersContainer = document.querySelector(".filters");
  filtersContainer.style.display = "block";

  document.querySelector(".product-title").textContent = item.name;
  document.querySelector(".product-color").textContent = item.color;
  const saleBox = document.getElementById("sale-box");
  document.title = item.product_title;
  saleBox.style.display = saleBox.textContent.trim() ? "inline-flex" : "none";

  document.getElementById("product-price").textContent = item.price.toFixed(2);
  const carousel = document.querySelector(".carousel");
  item.carousel_images.forEach((imgFileName) => {
    const div = document.createElement("div");
    div.classList.add("carousel-box");
    const imgSrc = imgFileName;
    const img = document.createElement("img");
    img.src = imgSrc;
    img.alt = item.name;
    img.classList.add("carousel-img");
    div.appendChild(img);
    carousel.appendChild(div);

    const carousel1 = document.querySelector(".carousel1");
    carousel1.innerHTML = "";
    item.carousel_images.forEach((imgFileName) => {
      const div = document.createElement("div");
      div.classList.add("carousel-box1");
      const imgSrc = imgFileName;
      const img = document.createElement("img");
      img.src = imgSrc;
      img.alt = item.name;
      img.classList.add("carousel-img1");
      div.appendChild(img);
      carousel1.appendChild(div);
    });
  });

  document.querySelector(".banner-title").textContent = item.banner_text.title;
  document.querySelector(".disc-right").textContent = item.banner_text.text;
  document.getElementById("bannerwithtext").src =
    item.banner_text.banner_images.main_banner;
  document.getElementById("bannerwithtext").alt =
    item.banner_text.banner_images.alt;
  document.getElementById("bannerwithtext-adaptive").src =
    item.banner_text.banner_images.adaptive_banner;
  document.getElementById("bannerwithtext-adaptive").alt =
    item.banner_text.banner_images.alt;

  const videoWrapper = document.querySelector(".video-wrapper");

  if (
    !item.video_section ||
    !item.video_section.thumbnail ||
    !item.video_section.video_url
  ) {
    videoWrapper.style.display = "none";
  } else {
    const videoThumbnail = document.querySelector(".video-thumbnail");
    videoThumbnail.querySelector("img").src = item.video_section.thumbnail;
    document.querySelector(".thumbnail-img").alt = item.video_section.thumbnail;
    document.getElementById("video-player").src = item.video_section.video_url;
    videoWrapper.style.display = "flex";
  }
  document.querySelector(".walpapperinfo").src =
    item.additional_images.main_image;
  document.querySelector(".walpapperinfo-adaptive").src =
    item.additional_images.adaptive_image;

  const functionInfoContainer = document.querySelector(".cards-container");
  item.watch_features.forEach((feature) => {
    const card = document.createElement("div");
    card.classList.add("function-info-card");
    const img = document.createElement("img");
    img.src = feature.image;
    img.alt = feature.title;
    const title = document.createElement("h2");
    title.textContent = feature.title;
    const description = document.createElement("p");
    description.textContent = feature.description;
    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(description);
    functionInfoContainer.appendChild(card);
  });

  document.querySelector(".banner-title").innerHTML = replaceSymbols(
    item.banner_text.title
  );
  document.querySelector(".product-title").innerHTML = replaceSymbols(
    item.product_title
  );
  document.querySelectorAll(".function-info-card h2").forEach((h2, index) => {
    const feature = item.watch_features[index];

    if (feature && feature.title) {
      h2.innerHTML = replaceSymbols(feature.title);
    }
  });

  initCarousel();
});

function initCarousel() {
  const carouselHorizontal = document.querySelector(".carousel1");
  const carouselItemsHorizontal = Array.from(carouselHorizontal.children);
  const carouselLeft = document.getElementById("carouselLeft1");
  const carouselRight = document.getElementById("carouselRight1");

  const carouselVertical = document.querySelector(".carousel");
  const carouselItemsVertical = Array.from(carouselVertical.children);

  let currentIndex = 0;

  const updateCarousel = () => {
    const offset = -currentIndex * 100;
    carouselHorizontal.style.transform = `translateX(${offset}%)`;

    carouselLeft.style.display = currentIndex === 0 ? "none" : "flex";
    carouselRight.style.display =
      currentIndex === carouselItemsHorizontal.length - 1 ? "none" : "flex";

    const verticalOffset = currentIndex * 80;
    carouselVertical.scrollTo({
      top: verticalOffset,
      behavior: "smooth",
    });

    carouselItemsVertical.forEach((img, index) => {
      if (index === currentIndex) {
        img.classList.add("selected");
      } else {
        img.classList.remove("selected");
      }
    });
  };

  const moveToNext = () => {
    if (currentIndex < carouselItemsHorizontal.length - 1) {
      currentIndex += 1;
      updateCarousel();
    }
  };

  const moveToPrevious = () => {
    if (currentIndex > 0) {
      currentIndex -= 1;
      updateCarousel();
    }
  };

  carouselLeft.addEventListener("click", moveToPrevious);
  carouselRight.addEventListener("click", moveToNext);

  updateCarousel();

  document.querySelectorAll(".carousel-img").forEach((img, index) => {
    img.addEventListener("click", function () {
      currentIndex = index;
      updateCarousel();
    });
  });

  let touchStartX = 0;
  let touchEndX = 0;

  const handleSwipe = () => {
    const swipeDistance = touchStartX - touchEndX;

    if (swipeDistance > 50) {
      moveToNext();
    } else if (swipeDistance < -50) {
      moveToPrevious();
    }
  };

  carouselHorizontal.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
  });

  carouselHorizontal.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;
    handleSwipe();
  });

  const playButton = document.querySelector(".play-button");
  const videoThumbnail = document.querySelector(".video-thumbnail");
  const videoPlayer = document.getElementById("video-player");

  playButton.addEventListener("click", function () {
    videoThumbnail.style.display = "none";

    videoPlayer.style.display = "block";
    videoPlayer.src += "&autoplay=1";
  });

  const upButton = document.getElementById("carouselUp");
  const downButton = document.getElementById("carouselDown");

  function updateButtonState() {
    if (carouselVertical.scrollTop <= 0) {
      upButton.disabled = true;
    } else {
      upButton.disabled = false;
    }

    if (
      carouselVertical.scrollTop + carouselVertical.clientHeight >=
      carouselVertical.scrollHeight
    ) {
      downButton.disabled = true;
    } else {
      downButton.disabled = false;
    }
  }
  carouselVertical.addEventListener("scroll", updateButtonState);
  upButton.addEventListener("click", () => {
    carouselVertical.scrollBy({
      top: -80,
      behavior: "smooth",
    });
    updateButtonState();
  });

  downButton.addEventListener("click", () => {
    carouselVertical.scrollBy({
      top: 80,
      behavior: "smooth",
    });
    updateButtonState();
  });
}
