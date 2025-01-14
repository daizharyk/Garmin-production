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
  const yesButton = document.getElementById("filter-yes");
  const noButton = document.getElementById("filter-no");
  const musicYesButton = document.querySelector(
    '[data-filter="music"] .size-option[data-value="Yes"]'
  );
  const musicNoButton = document.querySelector(
    '[data-filter="music"] .size-option[data-value="No"]'
  );
  console.log("get item by id data", item);

  document.querySelector(".product-title").textContent = item.name;
  document.querySelector(".product-color").textContent = item.color;
  const saleBox = document.getElementById("sale-box");
  document.title = item.product_title;
  saleBox.style.display = saleBox.textContent.trim() ? "inline-flex" : "none";

  function updateButtonStyles(selectedButton, buttons) {
    [yesButton, noButton].forEach((button) => {
      button.style.backgroundColor = "#fff";
      button.style.color = "#000";
    });

    selectedButton.style.backgroundColor = "#000";
    selectedButton.style.color = "#fff";
    selectedButton.style.border = "1px solid #ccc";
  }
  if (solarCharging) {
    updateButtonStyles(yesButton);
  } else {
    updateButtonStyles(noButton);
  }

  const similarItems = await getItemsByModel(item.model);
  console.log("similarItems", similarItems);

  const similarItemsContainer = document.querySelector(
    ".similar-items-container"
  );

  const itemsList = similarItemsContainer.querySelector(".items-list");

  itemsList.innerHTML = "";

  function renderCards(filter) {
    itemsList.innerHTML = "";

    similarItems.forEach((similarItem) => {
      const link = document.createElement("a");
      link.href = `/pages/itempage.html?id=${similarItem._id}`;
      link.classList.add("similar-item-card-link");

      const card = document.createElement("div");
      card.classList.add("similar-item-card");

      // Применяем фильтр
      if (filter === "Yes" && !similarItem.features.solar_charging) {
        card.style.opacity = "0.4";
      } else if (filter === "No" && similarItem.features.solar_charging) {
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

  renderCards(solarCharging ? "Yes" : "No");

  yesButton.addEventListener("click", () => {
    updateButtonStyles(yesButton);
    renderCards("Yes");
  });

  noButton.addEventListener("click", () => {
    updateButtonStyles(noButton);
    renderCards("No");
  });

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
