document.addEventListener("DOMContentLoaded", function () {
  const authLink = document.getElementById("authLink");
  const user = sessionStorage.getItem("user");

  if (user) {
    authLink.textContent = "Sign Out";

    authLink.setAttribute("href", "#");

    authLink.addEventListener("click", function (event) {
      event.preventDefault();

      sessionStorage.removeItem("user");

      window.location.href = "./index.html";
    });
  } else {
    authLink.textContent = "Sign In";
    authLink.setAttribute("href", "./pages/signIn.html");
  }
});
