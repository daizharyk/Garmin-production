import "../style/style.css";
import "../style/shipping.css";
import "../style/itempage.css";

document.addEventListener("DOMContentLoaded", function () {
  const searchingSvg = document.getElementById("searchingSvg");
  const searchBox = document.getElementById("searchBox");
  const closeSearch = document.getElementById("closeSearch");
  const loginSection = document.querySelector(".login-section");
  const searchInputs = document.querySelectorAll(
    "#searchInput, #searchInputMobile"
  );

  if (searchInputs.length > 0) {
    searchInputs.forEach((searchInput) => {
      searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.code === "Enter") {
          event.preventDefault();
          const query = searchInput.value.trim();
          if (query) {
            window.location.href = `/pages/searchingpage.html?query=${encodeURIComponent(query)}`;
          }
        }
      });
    });
  }

  if (closeSearch && searchBox && loginSection) {
    closeSearch.addEventListener("click", () => {
      searchBox.style.display = "none";
      loginSection.style.display = "flex";
      if (searchInputs.length > 0) searchInputs[0].value = "";
    });
  }

  if (searchingSvg && searchBox && loginSection) {
    searchingSvg.addEventListener("click", () => {
      loginSection.style.display = "none";
      searchBox.style.display = "flex";
    });

    function toggleSearchingSvg() {
      if (window.innerWidth <= 1100) {
        searchingSvg.style.display = "none";

        if (searchBox.style.display === "flex") {
          searchBox.style.display = "none";
          if (searchInputs.length > 0) searchInputs[0].value = "";
          loginSection.style.display = "flex";
        }
      } else {
        searchingSvg.style.display = "block";
      }
    }

    function isDesktopDevice() {
      return !("ontouchstart" in window || navigator.maxTouchPoints > 0);
    }

    if (isDesktopDevice()) {
      let resizeTimeout;

      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          toggleSearchingSvg();
        }, 50);
      });
    }

    toggleSearchingSvg();
  }

  function initBannerSlider() {
    const banners = document.querySelectorAll(".bannersContainer .banner");
    const playPauseBtn = document.getElementById("playPauseBtn");

    if (banners.length === 0 || !playPauseBtn) {
      return;
    }

    const circleProgress = playPauseBtn.querySelector(".circle-progress");
    const playIcon = playPauseBtn.querySelector(".play-icon");
    const pauseIcon = playPauseBtn.querySelector(".pause-icon");

    if (!circleProgress || !playIcon || !pauseIcon) {
      return;
    }

    let currentIndex = 0;
    let isPlaying = true;
    let sliderInterval;
    const totalDuration = 7000;

    function resetCircleAnimation() {
      circleProgress.style.transition = "none";
      circleProgress.style.strokeDashoffset = "138";

      setTimeout(() => {
        circleProgress.style.transition = `stroke-dashoffset ${totalDuration / 1000}s linear`;
        circleProgress.style.strokeDashoffset = "0";
      }, 50);
    }

    function startCircleAnimation() {
      resetCircleAnimation();
    }

    function stopCircleAnimation() {
      circleProgress.style.transition = "none";
    }

    function showBanner(index) {
      banners.forEach((banner, i) => {
        banner.classList.toggle("active", i === index);
      });
      resetCircleAnimation();
      startCircleAnimation();
    }

    function startSlider() {
      showBanner(currentIndex);
      sliderInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % banners.length;
        showBanner(currentIndex);
      }, totalDuration);
      playIcon.classList.remove("active");
      pauseIcon.classList.add("active");
      isPlaying = true;
    }

    function stopSlider() {
      clearInterval(sliderInterval);
      stopCircleAnimation();
      playIcon.classList.add("active");
      pauseIcon.classList.remove("active");
      isPlaying = false;
    }

    playPauseBtn.addEventListener("click", () => {
      if (isPlaying) {
        stopSlider();
      } else {
        startSlider();
      }
    });

    showBanner(currentIndex);
    startSlider();
  }

  initBannerSlider();

  function setupActiveClass() {
    document.querySelectorAll(".nav-list-item").forEach((item) => {
      item.addEventListener("click", () => {
        document
          .querySelectorAll(".nav-list-item.active")
          .forEach((activeItem) => {
            if (activeItem !== item) {
              activeItem.classList.remove("active");
            }
          });
        item.classList.toggle("active");
      });
    });
  }
  setupActiveClass();

  function setupDropdownMenus() {
    const isLargeScreen = window.innerWidth >= 1100;
    document.querySelectorAll(".nav-menu").forEach((menu) => {
      const dropdownClass = `${menu.classList[1]}-dropdown`;
      const dropdown = document.querySelector(`.${dropdownClass}`);

      if (isLargeScreen) {
        menu.onmouseover = () => toggleDropdown(menu, true);
        menu.onmouseout = (event) => {
          if (!isMouseOverDropdown(event, dropdown)) {
            toggleDropdown(menu, false);
          }
        };

        if (dropdown) {
          dropdown.onmouseover = () => toggleDropdown(menu, true);
          dropdown.onmouseout = (event) => {
            if (!isMouseOverDropdown(event, dropdown)) {
              toggleDropdown(menu, false);
            }
          };
        }
      } else {
        menu.onmouseover = null;
        menu.onmouseout = null;

        if (dropdown) {
          dropdown.onmouseover = null;
          dropdown.onmouseout = null;
          dropdown.style.display = "";
        }
      }
    });

    function toggleDropdown(menu, show) {
      const dropdownClass = `${menu.classList[1]}-dropdown`;
      const dropdown = document.querySelector(`.${dropdownClass}`);
      if (dropdown) {
        dropdown.style.display = show ? "flex" : "none";
      }
    }

    function isMouseOverDropdown(event, dropdown) {
      const relatedTarget = event.relatedTarget;
      return dropdown.contains(relatedTarget);
    }
  }

  setupDropdownMenus();
  window.addEventListener("resize", setupDropdownMenus);

  const userMenu = document.querySelector(".user-menu");
  const dropdown = document.querySelector(".dropdown-user");

  if (userMenu && dropdown) {
    let isMobile = window.innerWidth < 768;
    let hoverEnabled = false;

    // Функция для управления видимостью
    const toggleDropdown = (show) => {
      dropdown.classList.toggle("show", show);
    };

    // Обработчики ховера
    const handleMouseEnter = () => hoverEnabled && toggleDropdown(true);
    const handleMouseLeave = () => hoverEnabled && toggleDropdown(false);

    // Обновление режима при изменении размера
    const updateInteractionMode = () => {
      isMobile = window.innerWidth < 768;
      hoverEnabled = !isMobile;

      // Удаляем все предыдущие обработчики
      userMenu.removeEventListener("mouseenter", handleMouseEnter);
      userMenu.removeEventListener("mouseleave", handleMouseLeave);

      if (hoverEnabled) {
        // Десктоп: добавляем ховер
        userMenu.addEventListener("mouseenter", handleMouseEnter);
        userMenu.addEventListener("mouseleave", handleMouseLeave);
      } else {
        // Мобилка: добавляем клик
        userMenu.addEventListener("click", handleClick);
      }
    };

    // Обработчик клика
    const handleClick = (e) => {
      e.stopPropagation();
      toggleDropdown(!dropdown.classList.contains("show"));
    };

    document.addEventListener("click", (e) => {
      if (!userMenu.contains(e.target) && !dropdown.contains(e.target)) {
        toggleDropdown(false);
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") toggleDropdown(false);
    });

    updateInteractionMode();
    window.addEventListener("resize", updateInteractionMode);
  }

  const burgerButton = document.getElementById("burgerButton");
  const navMenu = document.getElementById("navMenu");

  if (burgerButton && navMenu) {
    burgerButton.addEventListener("click", function () {
      this.classList.toggle("active");
      navMenu.style.display =
        navMenu.style.display === "block" ? "none" : "block";
    });
    function handleResize4() {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 1100) {
        if (burgerButton && navMenu) {
          burgerButton.classList.remove("active");
          navMenu.style.display = "";
        }
      }
    }
    window.addEventListener("resize", handleResize4);
    handleResize4();
  }

  function setupDropdowns() {
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", function () {
        const dropdownClass = this.getAttribute("data-dropdown");
        const dropdown = document.querySelector(`.${dropdownClass}`);

        if (dropdown) {
          dropdown.style.display =
            dropdown.style.display === "block" ? "none" : "block";

          const subMenus = dropdown.querySelectorAll(".sub-menu");
          subMenus.forEach((subMenu) => {
            subMenu.style.display = "none";
          });
        }
      });
    });
  }

  function resetDropdowns() {
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.style.display = "none";
    });
  }

  setupDropdowns();

  let activeDropdown = null;

  window.addEventListener("resize", function () {
    if (activeDropdown) {
      resetDropdowns();

      activeDropdown.style.display = "none";
      activeDropdown = null;
    }
  });

  let burgerMenuOpen = false;

  burgerButton.addEventListener("click", function () {
    burgerMenuOpen = !burgerMenuOpen;
  });

  window.addEventListener("resize", function () {
    if (!burgerMenuOpen) {
      handleResize();
    }
  });

  function resetSubMenus() {
    document
      .querySelectorAll(".dropdown-container .sub-menu ")
      .forEach((subMenu) => {
        subMenu.style.display = "";
      });
  }

  function setupDropdown() {
    document.querySelectorAll(".dropdown-container").forEach((container) => {
      container.addEventListener("click", function (event) {
        if (event.target.classList.contains("column-title")) {
          const subMenu = event.target.nextElementSibling;
          if (subMenu) {
            subMenu.style.display =
              subMenu.style.display === "block" ? "none" : "block"; // Переключаем видимость подменю
          }
        }
      });
    });
  }
  setupDropdown();
  function handleResize() {
    const windowWidth = window.innerWidth;

    if (windowWidth >= 1100) {
      resetSubMenus();

      document.querySelectorAll(".dropdown-container").forEach((container) => {
        const title = container.querySelector(".column-title");
        if (title) {
          const newContainer = container.cloneNode(true);
          container.parentNode.replaceChild(newContainer, container);
        }
      });
    } else {
      setupDropdown();
    }
  }

  window.addEventListener("resize", handleResize);

  function taggleSing() {
    const titles = document.querySelectorAll(".nav-item, .column-title");

    titles.forEach((title) => {
      const toggleSign = title.querySelector(".toggle-sign");
      if (toggleSign) {
        toggleSign.textContent = "+";

        title.addEventListener("click", function () {
          if (title.classList.contains("column-title")) {
            document
              .querySelectorAll(".column-title.active")
              .forEach((activeTitle) => {
                if (activeTitle !== this) {
                  activeTitle.classList.remove("active");
                  const activeToggleSign =
                    activeTitle.querySelector(".toggle-sign");
                  if (activeToggleSign) activeToggleSign.textContent = "+";
                }
              });

            this.classList.toggle("active");
            toggleSign.textContent = toggleSign.textContent === "+" ? "-" : "+";
          }

          if (title.classList.contains("nav-item")) {
            document
              .querySelectorAll(".column-title")
              .forEach((columnTitle) => {
                columnTitle.classList.remove("active");
                const columnToggleSign =
                  columnTitle.querySelector(".toggle-sign");
                if (columnToggleSign) columnToggleSign.textContent = "+";
              });
          }
        });
      }
    });
  }

  function resetActiveClasses() {
    document.querySelectorAll(".toggle-sign").forEach((toggleSign) => {
      toggleSign.textContent = "+";
    });
  }
  taggleSing();

  window.addEventListener("resize", function () {
    resetActiveClasses();
  });

  document.getElementById("cartIcon").addEventListener("click", function () {
    window.location.href = "/pages/cart.html";
  });
});
