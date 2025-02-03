import { login } from "../service/userService";

document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  if (email) {
    document.getElementById("email").value = email;
  }
  if (password) {
    document.getElementById("password").value = password;
  }

  document
    .getElementById("loginForm")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const loginError = document.getElementById("loginError");
      const signInBtn = document.getElementById("signInBtn");
      const loadingSpinner = document.getElementById("loadingSpinner");

      loginError.style.display = "none";

      signInBtn.disabled = true;

      loadingSpinner.style.display = "inline-block";

      try {
        const data = await login({ email, password });

        loadingSpinner.style.display = "none";
        signInBtn.style.color = "#000";

        if (data.token) {
          const rememberMe = document.getElementById("rememberMe").checked;

          if (rememberMe) {
            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            sessionStorage.setItem("user", JSON.stringify(data));
          } else {
            sessionStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("user", JSON.stringify(data));
          }
          const redirectAfterLogin =
            sessionStorage.getItem("redirectAfterLogin");
          if (redirectAfterLogin) {
            window.location.href = redirectAfterLogin;
          } else {
            window.location.href = "/index.html";
          }
          sessionStorage.removeItem("redirectAfterLogin");
        } else {
          localStorage.removeItem("email");
          localStorage.removeItem("password");
          loginError.innerHTML = data.message;
          loginError.style.display = "block";
          setTimeout(() => {
            loginError.style.display = "none";
          }, 3000);
        }
      } catch (error) {
        loginError.textContent = "An error occurred. Please try again later.";
        loginError.style.display = "block";
        setTimeout(() => {
          loginError.style.display = "none";
        }, 3000);
      } finally {
        signInBtn.disabled = false;
        loadingSpinner.style.display = "none";
      }
    });
});
