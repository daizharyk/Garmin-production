import { getArticleById, getItemsByModel } from "../service/articleService";
import "../style/style.css";
import "../style/shipping.css";
import "../style/itempage.css";

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
  const caseSize = item.case_size;
  const yesButton = document.getElementById("filter-yes");
  const noButton = document.getElementById("filter-no");
  const musicYesButton = document.querySelector(
    '[data-filter="music"] .size-option[data-value="Yes"]'
  );
  const musicNoButton = document.querySelector(
    '[data-filter="music"] .size-option[data-value="No"]'
  );
  console.log("get item by id data", item);


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

  const similarItemsContainer = document.querySelector(
    ".similar-items-container"
  );

  const itemsList = similarItemsContainer.querySelector(".items-list");

  renderFilteredCards();

  function renderFilteredCards(filter, featureKey, caseSizeFilter) {
    itemsList.innerHTML = "";

    if (similarItems.length <= 1) {
      similarItemsContainer.style.display = "none";
      return;
    }
    const sortedItems = similarItems.sort((a, b) => {
      const aHasMusic = a.features.music_storage_on_watch || false;
      const aHasSolar = a.features.solar_charging || false;

      const bHasMusic = b.features.music_storage_on_watch || false;
      const bHasSolar = b.features.solar_charging || false;

      const aCaseSize = a.case_size || 0;
      const bCaseSize = b.case_size || 0;
      if (aCaseSize !== bCaseSize) {
        return aCaseSize - bCaseSize;
      }
      const aScore = (aHasMusic ? 1 : 0) + (aHasSolar ? 1 : 0);
      const bScore = (bHasMusic ? 1 : 0) + (bHasSolar ? 1 : 0);

      if (aScore !== bScore) {
        return bScore - aScore;
      }

      if (aHasMusic !== bHasMusic) {
        return bHasMusic - aHasMusic;
      }
      return 0;
    });

    sortedItems.forEach((similarItem) => {
      const link = document.createElement("a");
      link.href = `/pages/itempage.html?id=${similarItem._id}`;
      link.classList.add("similar-item-card-link");

      const card = document.createElement("div");
      card.classList.add("similar-item-card");

      const featureValue = similarItem.features[featureKey];
      const caseSizeValue = similarItem.case_size;
      const matchesSize = caseSizeFilter
        ? caseSizeValue === caseSizeFilter
        : true;

      if ((filter === "Yes" && !featureValue) || !matchesSize) {
        card.style.opacity = "0.4";
      } else if ((filter === "No" && featureValue) || !matchesSize) {
        card.style.opacity = "0.4";
      }

      const img = document.createElement("img");
      img.src = similarItem.image;
      img.alt = similarItem.name;
      card.appendChild(img);

      link.appendChild(card);
      itemsList.appendChild(link);
    });
  }

  function createCaseSizeFilter() {
    const caseSizeFilterContainer = document.querySelector(
      ".caseSizeFilterContainer"
    );

    caseSizeFilterContainer.innerHTML = "";
    const heading = document.createElement("h3");
    heading.textContent = "Case Size";
    caseSizeFilterContainer.appendChild(heading);

    const caseSizeWrapper = document.createElement("div");
    caseSizeWrapper.classList.add("caseSizeWrapper");
    caseSizeWrapper.classList.add("size-options");
    caseSizeFilterContainer.appendChild(caseSizeWrapper);
    const caseSizes = new Set();

    similarItems.forEach((similarItem) => {
      const caseSize = similarItem.case_size;
      if (caseSize) caseSizes.add(caseSize);
    });
    const buttons = [];

    caseSizes.forEach((size) => {
      const sizeButton = document.createElement("div");
      sizeButton.classList.add("size-option");
      sizeButton.textContent = `${size} mm`;

      sizeButton.addEventListener("click", () => {
        updateFilterButtonStyles(sizeButton, buttons);
        renderFilteredCards("None", "", size);
      });
      caseSizeWrapper.appendChild(sizeButton);
      buttons.push(sizeButton);
      if (size === caseSize) {
        updateFilterButtonStyles(sizeButton, buttons);
        renderFilteredCards("None", "", size);
      }
    });
  }

  function initializeFilter(filterButtons, initialValue, featureKey) {
    const [yesButton, noButton] = filterButtons;

    updateFilterButtonStyles(
      initialValue ? yesButton : noButton,
      filterButtons
    );

    renderFilteredCards(initialValue ? "Yes" : "No", featureKey);

    yesButton.addEventListener("click", () => {
      updateFilterButtonStyles(yesButton, filterButtons);
      renderFilteredCards("Yes", featureKey);
    });

    noButton.addEventListener("click", () => {
      updateFilterButtonStyles(noButton, filterButtons);
      renderFilteredCards("No", featureKey);
    });
  }
  createCaseSizeFilter();

  const hasSolarFeature = similarItems.some(
    (similarItem) => similarItem.features.solar_charging
  );
  const hasMusicFeature = similarItems.some(
    (similarItem) => similarItem.features.music_storage_on_watch
  );
  const hasCaseSize = similarItems.some((similarItem) => similarItem.case_size);

  if (hasSolarFeature && similarItems.length > 1) {
    initializeFilter([yesButton, noButton], solarCharging, "solar_charging");
  } else {
    const solarFilterContainer = document.querySelector(
      ".solarFilterContainer"
    );
    if (solarFilterContainer) {
      solarFilterContainer.style.display = "none";
    }
  }

  if (hasMusicFeature && similarItems.length > 1) {
    initializeFilter(
      [musicYesButton, musicNoButton],
      musicStorage,
      "music_storage_on_watch"
    );
  } else {
    const musicFilterContainer = document.querySelector(
      ".musicFilterContainer"
    );
    if (musicFilterContainer) {
      musicFilterContainer.style.display = "none";
    }
  }
  if (hasCaseSize && similarItems.length > 1) {
    createCaseSizeFilter();
  } else {
    const caseSizeFilterContainer = document.querySelector(
      ".caseSizeFilterContainer"
    );
    if (caseSizeFilterContainer) {
      caseSizeFilterContainer.style.display = "none";
    }
  }

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

  const videoThumbnail = document.querySelector(".video-thumbnail");
  videoThumbnail.querySelector("img").src = item.video_section.thumbnail;
  document.querySelector(".thumbnail-img").alt = item.video_section.thumbnail;
  document.getElementById("video-player").src = item.video_section.video_url;

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

  function replaceSymbols(text) {
    if (!text) return "";
    return text
      .replace(/®/g, '<sup class="registered">®</sup>')
      .replace(/™/g, '<sup class="trademark2">™</sup>');
  }
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
