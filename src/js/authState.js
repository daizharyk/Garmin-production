import { syncCartWithServer } from "./utils/syncCartWithServer";

document.addEventListener("DOMContentLoaded", function () {
  const authLink = document.getElementById("authLink");
  const user = sessionStorage.getItem("user") || localStorage.getItem("user");
  const accountLink = document.getElementById("accountLink");

  if (user) {
    authLink.textContent = "Sign Out";
    syncCartWithServer();
    authLink.setAttribute("href", "#");

    authLink.addEventListener("click", function (event) {
      event.preventDefault();
      const currentPage = window.location.href;

      localStorage.removeItem("user");
      sessionStorage.removeItem("user");

      if (window.location.pathname === "/pages/accountProfile.html") {
        window.location.href = "/index.html";
      } else {
        window.location.href = currentPage;
      }
    });
  } else {
    authLink.textContent = "Sign In";
  }

  accountLink.addEventListener("click", function () {
    if (!user || user === "null" || user === "undefined") {
      sessionStorage.setItem(
        "redirectAfterLogin",
        "/pages/accountProfile.html"
      );
      window.location.href = "/pages/signIn.html";
    } else {
      window.location.href = "/pages/accountProfile.html";
    }
  });
  if (!user) {
    authLink.addEventListener("click", function () {
      sessionStorage.setItem("redirectAfterLogin", window.location.href);
    });
  }
});
