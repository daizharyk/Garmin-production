import "../style/style.css";
import "../style/shipping.css";
import "../style/itempage.css";

document.addEventListener("DOMContentLoaded", function () {
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

  const searchingSvg = document.getElementById("searchingSvg");
  const searchBox = document.getElementById("searchBox");
  const closeSearch = document.getElementById("closeSearch");
  const loginSection = document.querySelector(".login-section");
  const inputWrapper = document.querySelector(".input-wrapper");
  const searchInput = document.getElementById("searchInput");

  if (searchingSvg && searchBox && loginSection) {
    searchingSvg.addEventListener("click", () => {
      if (loginSection) loginSection.style.display = "none";
      if (searchBox) searchBox.style.display = "flex";
    });

    function toggleSearchingSvg() {
      if (window.innerWidth <= 1100) {
        if (searchingSvg) searchingSvg.style.display = "none";

        if (searchBox && searchBox.style.display === "flex") {
          searchBox.style.display = "none";
          if (searchInput) searchInput.value = ""; // Сброс значения
          if (loginSection) loginSection.style.display = "flex"; // Возвращаем loginSection
        }
      } else {
        if (searchingSvg) searchingSvg.style.display = "block";
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

  if (closeSearch && searchBox && loginSection && searchInput) {
    closeSearch.addEventListener("click", () => {
      if (searchBox) searchBox.style.display = "none";
      if (loginSection) loginSection.style.display = "flex";
      if (searchInput) searchInput.value = "";
    });
  }

  if (closeSearch) {
    closeSearch.addEventListener("click", () => {
      searchBox.style.display = "none";
      loginSection.style.display = "flex";
      searchInput.value = "";
    });
  }

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

  function setupUserMenu() {
    const userMenu = document.querySelector(".user-menu");
    const dropdown = document.querySelector(".dropdown-user");

    function handleMenuEvents() {
      if (window.innerWidth >= 500) {
        userMenu.addEventListener("mouseenter", function () {
          dropdown.classList.add("show");
        });

        userMenu.addEventListener("mouseleave", function () {
          dropdown.classList.remove("show");
        });
      }
    }
    window.addEventListener("resize", handleMenuEvents);

    handleMenuEvents();

    userMenu.addEventListener("click", function () {
      dropdown.classList.toggle("show");
    });
  }

  function init() {
    setupActiveClass();
    setupUserMenu();
  }

  init();

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

          // Скрытие всех подменю
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
});
