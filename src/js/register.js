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

    loadingSpinner.style.display = "inline-block";
    document.getElementById("createAccountBtn").style.color = "#ddd";
    createAccountBtn.disabled = true;
    loginError.style.display = "none";

    try {
      const data = await register({ name, email, password, country });

      loadingSpinner.style.display = "none";
      createAccountBtn.disabled = false;
      document.getElementById("createAccountBtn").style.color = "#000";

      if (data.success) {
        const loginData = await login({ email, password });

        if (loginData.success) {
          localStorage.setItem("user", JSON.stringify(loginData));

          alert("User registered and logged in successfully");
          window.location.href = "../index.html";
        } else {
          loginError.innerHTML = `
            ${loginData.message}
            <button class="close-btn" id="closeError">&#215</button>
          `;
          loginError.style.display = "block";
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
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
