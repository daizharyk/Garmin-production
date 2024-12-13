document.addEventListener("DOMContentLoaded", function () {
  const authLink = document.getElementById("authLink");
  const user = sessionStorage.getItem("user");
  const accountLink = document.getElementById("accountLink");

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
  }
  accountLink.addEventListener("click", function () {
    
    if (!user || user === "null" || user === "undefined") {
      sessionStorage.setItem("redirectAfterLogin", "account");
      window.location.href = "/pages/signIn.html";
    } else {
      window.location.href = "/pages/accountProfile.html";
    }
  });
});
