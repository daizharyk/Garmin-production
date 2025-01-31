document.addEventListener("DOMContentLoaded", function () {
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
