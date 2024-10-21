document.addEventListener("DOMContentLoaded", function() {
  // Обработчик события для навигационного элемента

  document.getElementById("burgerButton").addEventListener("click", function() {
    const navMenu = document.getElementById("navMenu");
    this.classList.toggle("active"); // Переключение класса для анимации
    navMenu.style.display = navMenu.style.display === "block" ? "none" : "block"; // Скрыть или показать меню
  });


  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener("click", function() {
      const dropdownClass = this.getAttribute('data-dropdown'); // Получаем класс дропдауна
      const dropdown = document.querySelector(`.${dropdownClass}`);

      if (dropdown) { // Проверяем, существует ли дропдаун
        // Переключаем видимость дропдауна
        dropdown.style.display = dropdown.style.display === "block" ? "none" : "block";

        // Скрытие всех подменю
        const subMenus = dropdown.querySelectorAll(".sub-menu");
        subMenus.forEach(subMenu => {
          subMenu.style.display = "none"; // Скрыть все подменю при открытии dropdown
        });
      } else {
        console.error(`Dropdown with class "${dropdownClass}" not found.`);
      }
    });
  });

  // Делегирование события для всех dropdown-container
  document.querySelectorAll('.dropdown-container').forEach(container => {
    container.addEventListener('click', function(event) {
      if (event.target.classList.contains('column-title')) {
        const subMenu = event.target.nextElementSibling; // Получаем подменю, которое идет сразу после заголовка
        if (subMenu) { // Проверяем, существует ли подменю
          subMenu.style.display = subMenu.style.display === "block" ? "none" : "block"; // Переключаем видимость подменю
        } else {
          console.error('Sub-menu not found for the clicked column title.');
        }
      }
    });
  });

  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function() {
      // Удаляем класс "active" у всех элементов
      document.querySelectorAll('.nav-item').forEach(navItem => {
        navItem.classList.remove('active');
      });
      
      // Добавляем класс "active" на кликнутый элемент
      this.classList.add('active');
    });
  });


  document.querySelectorAll('.column-title').forEach(title => {
    const toggleSign = title.querySelector('.toggle-sign');
    
    // Если span с классом toggle-sign существует
    if (toggleSign) {
      // Устанавливаем начальное значение знака "+" (можно оставить как в HTML)
      toggleSign.textContent = "+";
  
      title.addEventListener('click', function() {
        // Переключаем активный класс
        this.classList.toggle('active');
  
        // Изменяем знак с "+" на "-" и наоборот
        toggleSign.textContent = toggleSign.textContent === "+" ? "-" : "+";
      });
    }
  });
  
  
});







