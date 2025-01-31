document.addEventListener("DOMContentLoaded", function () {
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

  const searchInputMobile = document.getElementById("searchInputMobile");

  if (searchInputMobile) {
    searchInputMobile.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        const query = searchInputMobile.value.trim();
        if (query) {
          window.location.href = `/pages/searchingpage.html?query=${encodeURIComponent(query)}`;
        }
      }
    });
  }
});
