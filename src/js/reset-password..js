import { recoveryPassword } from "../service/userService";
import "../style/signin_login.css";

document.querySelectorAll(".show-password").forEach((button) => {
  button.addEventListener("click", () => {
    const targetInputId = button.getAttribute("data-target");
    const targetInput = document.getElementById(targetInputId);

    if (targetInput.type === "password") {
      targetInput.type = "text";
      button.textContent = "Hide";
    } else {
      targetInput.type = "password";
      button.textContent = "Show";
    }
  });
});

const passwordInput = document.getElementById("password");
const retypePasswordInput = document.getElementById("retypePassword");
const passwordError = document.getElementById("passwordError");
const retypePasswordError = document.getElementById("retypePasswordError");
const doNotMatchError = document.getElementById("do-not-match-error");
const passwordRequirements = document.querySelector(".password-requirements");
const saveButton = document.querySelector(".new-password-save-btn");

function checkPasswordsMatch() {
  const password = passwordInput.value.trim();
  const retypePassword = retypePasswordInput.value.trim();

  if (password && retypePassword && password !== retypePassword) {
    doNotMatchError.style.display = "block";
  } else {
    doNotMatchError.style.display = "none";
  }
}
enableSaveButton();
function enableSaveButton() {
  const password = passwordInput.value.trim();
  const retypePassword = retypePasswordInput.value.trim();

  if (
    password &&
    retypePassword &&
    password === retypePassword &&
    validatePassword(password)
  ) {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
}

passwordInput.addEventListener("input", () => {
  const password = passwordInput.value.trim();

  if (!password) {
    passwordError.style.display = "block";
    passwordRequirements.style.display = "none";
  } else {
    passwordError.style.display = "none";
    passwordRequirements.style.display = "block";
  }

  if (!validatePassword(password)) {
    passwordRequirements.classList.add("error");
  } else {
    passwordRequirements.classList.remove("error");
  }

  checkPasswordsMatch();
  enableSaveButton();
});

retypePasswordInput.addEventListener("input", () => {
  const retypePassword = retypePasswordInput.value.trim();

  if (!retypePassword) {
    retypePasswordError.style.display = "block";
  } else {
    retypePasswordError.style.display = "none";
  }

  checkPasswordsMatch();
  enableSaveButton();
});

function validatePassword(password) {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return passwordPattern.test(password);
}

const urlParams = new URLSearchParams(window.location.search);
console.log("urlparams", urlParams);

const token = urlParams.get("token");
console.log("token", token);
document.getElementById("token").value = token;

document
  .getElementById("resetPasswordForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const password = document.getElementById("password").value.trim();

    // Получение токена из URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      alert("Token is missing!");
      return;
    }

    const spinner = document.getElementById("spinner");
    spinner.style.display = "inline-block";

    try {
      const recoveryPass = await recoveryPassword(password); 
      if (recoveryPass && recoveryPass.message) {
        window.location.href = "/index.html"; 
      } else {
        alert("Что-то пошло не так при восстановлении пароля.");
      }
    } catch (error) {
      alert("Произошла ошибка при сбросе пароля.");
    } finally {
      spinner.style.display = "none";
    }
  });
