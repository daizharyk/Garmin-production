document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".category");
  const verificationMethod = document.querySelectorAll(".verification-method");
  const currentPath = window.location.pathname.replace(/^\//, ""); // Убираем ведущий слэш
  console.log("Current Path:", window.location.pathname);

  categories.forEach((category) => {
    const link = category.querySelector("a");
    if (link) {
      const linkPath = link.getAttribute("href").replace(/^\//, ""); // Убираем ведущий слэш у href
      if (linkPath === currentPath) {
        category.classList.add("active");
        link.style.color = "#fff";
      }
    }
  });

  document.getElementById("emailToggle").addEventListener("click", function () {
    document.querySelector(".two-step-text").style.display = "flex";
    document.querySelector(".two-step-text-first").style.display = "none";

    verificationMethod.forEach((container) => {
      container.style.display = "none";
    });
  });
});
