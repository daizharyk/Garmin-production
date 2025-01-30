import { resetPassword } from "../service/userService";
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

const token = urlParams.get("token");

document.getElementById("token").value = token;

document
  .getElementById("resetPasswordForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const password = document.getElementById("password").value.trim();
    const newPasswordSaveBtn = document.querySelector(".new-password-save-btn");
    const messageDiv = document.getElementById("resetPasswordMessage");
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    if (!token) {
      messageDiv.textContent = "Token is missing!";
      messageDiv.style.color = "red";
      return;
    }

    const spinner = document.getElementById("spinnera");

    newPasswordSaveBtn.disabled = true;
    spinner.style.display = "inline-block";

    try {
      const resetPasswordResponse = await resetPassword(token, password);
      if (resetPasswordResponse) {
        localStorage.setItem(
          "resetMessage",
          "The password has been successfully changed. Login to your account"
        );
        window.location.href = "/pages/signIn.html";
      } else {
        messageDiv.textContent =
          "Failed to reset the password. Please try again.";
        messageDiv.style.color = "red";
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      messageDiv.textContent =
        "An error occurred while resetting the password. Please try again.";
      messageDiv.style.color = "red";
    }
  });
