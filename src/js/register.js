import { login, register } from "../service/userService";
import "../style/signin_login.css";

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    const loginError = document.getElementById("loginError");
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const createAccountBtn = document.getElementById("createAccountBtn");
    const name = document.getElementById("name").value;
    const country = document.getElementById("country").value;
    const loadingSpinner = document.getElementById("loadingSpinner");
    const signInBtn = document.querySelector(".sign-in-btn");

    loadingSpinner.style.display = "inline-block";
    signInBtn.style.color = "#ddd";
    document.getElementById("createAccountBtn").style.color = "#ddd";
    createAccountBtn.disabled = true;
    loginError.style.display = "none";

    try {
      const data = await register({ name, email, password, country });

      loadingSpinner.style.display = "none";
      signInBtn.style.color = "#000";
      createAccountBtn.disabled = false;
      document.getElementById("createAccountBtn").style.color = "#000";

      if (data.message === "User registered successfully") {
        const loginData = await login({ email, password });
        if (loginData._id && loginData.token) {
          localStorage.setItem(
            "user",
            JSON.stringify({
              _id: loginData._id,
              name: loginData.name,
              email: loginData.email,
              token: loginData.token,
            })
          );

          const redirectAfterLogin =
            sessionStorage.getItem("redirectAfterLogin");
          if (redirectAfterLogin) {
            window.location.href = redirectAfterLogin;
          } else {
            window.location.replace("/index.html");
          }
          sessionStorage.removeItem("redirectAfterLogin");
        } else {
          loginError.innerHTML = `
            ${loginData.message}
            <button class="close-btn" id="closeError">&#215</button>
          `;
          loginError.style.display = "block";
        }
      }
    } catch (error) {
      const errorMessage =
        error.message || "An error occurred. Please try again.";
      loginError.innerHTML = `
    ${errorMessage}
    <button class="close-btn" id="closeError">&#215</button>
  `;
      loginError.style.display = "block";
    } finally {
      loadingSpinner.style.display = "none";
      createAccountBtn.disabled = false;
      document.getElementById("createAccountBtn").style.color = "#000";
    }

    const closeErrorButton = document.getElementById("closeError");
    if (closeErrorButton) {
      closeErrorButton.addEventListener("click", function () {
        const loginError = document.getElementById("loginError");
        if (loginError) {
          loginError.style.display = "none";
        }
      });
    }
  });
