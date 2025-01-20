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
      .querySelectorAll(".dropdown-container .sub-menu")
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

  handleResize();

  window.addEventListener("resize", handleResize);

  function taggleSing() {
    document.querySelectorAll(".nav-item, .column-title").forEach((title) => {
      const toggleSign = title.querySelector(".toggle-sign");
      if (toggleSign) {
        toggleSign.textContent = "+";
        title.addEventListener("click", function () {
          this.classList.toggle("active");
          toggleSign.textContent = toggleSign.textContent === "+" ? "-" : "+";
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
