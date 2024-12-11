export function initDropdown() {
  const accountLink = document.getElementById("accountLink");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const arrow = document.getElementById("arroww");

  accountLink.addEventListener("click", () => {
    dropdownMenu.style.display =
      dropdownMenu.style.display === "block" ? "none" : "block";
    arrow.classList.toggle("rotate");
  });

  window.addEventListener("click", function (event) {
    if (!event.target.matches(".account-container, .account-container *")) {
      dropdownMenu.style.display = "none";
      arrow.classList.remove("rotate");
    }
  });
}
