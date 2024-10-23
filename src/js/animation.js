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

  // Функция для обработки выпадающих меню
  function setupDropdownMenus() {
    const isLargeScreen = window.innerWidth >= 1100; // Изменено на 1120px
    document.querySelectorAll(".nav-menu").forEach((menu) => {
      const dropdownClass = `${menu.classList[1]}-dropdown`;
      const dropdown = document.querySelector(`.${dropdownClass}`);

      if (isLargeScreen) {
        // Показываем дропдаун при наведении на меню или на дропдаун
        menu.onmouseover = () => toggleDropdown(menu, true);
        menu.onmouseout = (event) => {
          if (!isMouseOverDropdown(event, dropdown)) {
            toggleDropdown(menu, false);
          }
        };

        if (dropdown) {
          // Не скрываем дропдаун, если мышка над ним
          dropdown.onmouseover = () => toggleDropdown(menu, true);
          dropdown.onmouseout = (event) => {
            if (!isMouseOverDropdown(event, dropdown)) {
              toggleDropdown(menu, false);
            }
          };
        }
      } else {
        // Очищаем обработчики для мобильной версии
        menu.onmouseover = null;
        menu.onmouseout = null;

        if (dropdown) {
          dropdown.onmouseover = null;
          dropdown.onmouseout = null;
          dropdown.style.display = ""; // Сбрасываем стиль display
        }
      }
    });
  }

  function toggleDropdown(menu, show) {
    const dropdownClass = `${menu.classList[1]}-dropdown`;
    const dropdown = document.querySelector(`.${dropdownClass}`);
    if (dropdown) {
      dropdown.style.display = show ? "flex" : "none";
    }
  }

  // Проверка, находится ли мышка над дропдауном
  function isMouseOverDropdown(event, dropdown) {
    const relatedTarget = event.relatedTarget;
    return dropdown.contains(relatedTarget);
  }

  // Инициализация
  setupDropdownMenus();
  window.addEventListener("resize", setupDropdownMenus);

  // Функция для обработки меню пользователя
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

  // Обработчик события для навигационного элемента
  const burgerButton = document.getElementById("burgerButton");
  const navMenu = document.getElementById("navMenu");

  if (burgerButton && navMenu) {
    burgerButton.addEventListener("click", function () {
      this.classList.toggle("active"); // Переключение класса для анимации
      navMenu.style.display =
        navMenu.style.display === "block" ? "none" : "block"; // Скрыть или показать меню
    });
    function handleResize4() {
      const windowWidth = window.innerWidth;

      // Если ширина экрана 1100px или больше, сбросить классы и стили
      if (windowWidth >= 1100) {
        if (burgerButton && navMenu) {
          burgerButton.classList.remove("active"); // Удалить класс активности у кнопки
          navMenu.style.display = ""; // Сбросить стиль display у меню
        }
      }
    }
    window.addEventListener("resize", handleResize4);
    handleResize4();
  }

  function setupDropdowns() {
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.addEventListener("click", function () {
        const dropdownClass = this.getAttribute("data-dropdown"); // Получаем класс дропдауна
        const dropdown = document.querySelector(`.${dropdownClass}`);

        if (dropdown) {
          // Переключаем видимость дропдауна
          dropdown.style.display =
            dropdown.style.display === "block" ? "none" : "block";

          // Скрытие всех подменю
          const subMenus = dropdown.querySelectorAll(".sub-menu");
          subMenus.forEach((subMenu) => {
            subMenu.style.display = "none"; // Скрыть все подменю при открытии dropdown
          });
        }
      });
    });
  }

  function resetDropdowns() {
    // Скрыть все dropdown'ы
    document.querySelectorAll(".dropdown").forEach((dropdown) => {
      dropdown.style.display = "none";
    });
  }

  // Инициализация dropdown'ов
  setupDropdowns();

 let activeDropdown = null;

// Обработчик изменения размера окна
window.addEventListener("resize", function () {
    resetDropdowns(); // Сбросить состояние dropdown'ов при изменении размера
});

// Начальный вызов
resetDropdowns();

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
      resetSubMenus(); // Сбросить стили всех подменю
      // Удаляем обработчики событий, если они есть
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

  // Проверяем размер экрана при загрузке страницы
  handleResize();

  // Следим за изменением размера экрана
  window.addEventListener("resize", handleResize);
  // Обработчик для column-title

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
