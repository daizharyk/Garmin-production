import "../style/securetyCenter.css";
document.addEventListener("DOMContentLoaded", () => {
  const categories = document.querySelectorAll(".category");
  const verificationMethod = document.querySelectorAll(".verification-method");
  const currentPath = window.location.pathname.replace(/^\//, ""); // Убираем ведущий слэш
  console.log("Current Path:", window.location.pathname);

  categories.forEach((category) => {
    const link = category.querySelector("a");
    if (link) {
      const linkPath = link.getAttribute("href").replace(/^\//, ""); 
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
  document
    .querySelector(".back-verification-btn")
    .addEventListener("click", function () {
      document.querySelector(".two-step-text").style.display = "none";
      document.querySelector(".two-step-text-first").style.display = "flex";

      verificationMethod.forEach((container) => {
        container.style.display = "flex";
      });
    });
  document.getElementById("smsToggle").addEventListener("click", function () {
    document.querySelector(".verification-container-basic").style.display =
      "none";
    document.querySelector(".phone-verification-container").style.display =
      "flex";
  });
  document.querySelector(".decline").addEventListener("click", function () {
    document.querySelector(".verification-container-basic").style.display =
      "flex";
    document.querySelector(".phone-verification-container").style.display =
      "none";
  });


  const toggleMenuButton = document.getElementById("toggleMenu");
  const sidebar = document.querySelector(".sidebar-account");
  const arrow = document.getElementById("arrow-sidebar-account");

  toggleMenuButton.addEventListener("click", function () {
    sidebar.style.transform =
      sidebar.style.transform === "translateX(0px)"
        ? "translateX(-100%)"
        : "translateX(0px)";
    toggleMenuButton.classList.toggle("open");
    console.log("arrow", arrow);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) {
      sidebar.style.transform = ""; 
    } else {
      sidebar.style.transform = "translateX(-100%)";
    }
  });
});
