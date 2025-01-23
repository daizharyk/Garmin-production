import { recoveryPassword } from "../service/userService";
import "../style/signin_login.css";
const signInBtn = document.getElementById("signInBtn");

function togglePassword() {
  const passwordInput = document.getElementById("password");
  const showPasswordButton = document.querySelector(".show-password");

  // Проверяем текущее состояние типа поля ввода
  if (passwordInput.type === "password") {
    passwordInput.type = "text";
    showPasswordButton.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    showPasswordButton.textContent = "Show";
  }
}
document
  .querySelector(".show-password")
  .addEventListener("click", togglePassword);

const fields = ["email", "resetEmail", "password"];

fields.forEach((field) => {
  const input = document.getElementById(field);
  const errorElement = document.getElementById(`${field}Error`);

  input.addEventListener("blur", function () {
    if (this.value.trim() === "") {
      this.classList.add("error");
      errorElement.style.display = "block";
    } else {
      this.classList.remove("error");
      errorElement.style.display = "none";
    }
  });
});

function checkFormValidity() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const resetEmail = document.getElementById("resetEmail")
    ? document.getElementById("resetEmail").value.trim()
    : "";
  const recoverPasswordBtn = document.getElementById("recoverPasswordBtn");
  if (signInBtn) {
    signInBtn.disabled = !(email && password);
  }

  if (recoverPasswordBtn) {
    recoverPasswordBtn.disabled = !resetEmail;
  }
}

document.getElementById("email").addEventListener("input", checkFormValidity);
if (document.getElementById("password")) {
  document
    .getElementById("password")
    .addEventListener("input", checkFormValidity);
}
if (document.getElementById("resetEmail")) {
  document
    .getElementById("resetEmail")
    .addEventListener("input", checkFormValidity);
}

checkFormValidity();

document
  .getElementById("forgotPasswordLink")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("signInTitle").style.display = "none";
    document.getElementById("forgotPasswordForm").style.display = "block";
  });

document
  .getElementById("backToLoginLink")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.getElementById("forgotPasswordForm").style.display = "none";
    document.getElementById("signInTitle").style.display = "block";
    document.getElementById("loginForm").style.display = "block";
  });

document
  .getElementById("forgotPasswordForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("resetEmail").value;
    const messageContainer = document.getElementById("recoverPasswordMessage");


    messageContainer.textContent = "";

    try {
      const recoveryResponse = await recoveryPassword(email);


      if (recoveryResponse.status === "success") {
        messageContainer.style.color = "green";
        messageContainer.textContent =
          "Password reset email sent. Please check your inbox.";
      } else {
        messageContainer.style.color = "red";
        messageContainer.textContent =
          recoveryResponse.message || "Something went wrong. Please try again.";
      }
    } catch (error) {
      messageContainer.style.color = "red";
      messageContainer.textContent = "An error occurred. Please try again.";
    }
  });
