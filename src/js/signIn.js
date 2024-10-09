
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


document.getElementById("email").addEventListener("blur", function () {
  if (this.value.trim() === "") {
    this.classList.add("error");
    document.getElementById("emailError").style.display = "block";
  } else {
    this.classList.remove("error");
    document.getElementById("emailError").style.display = "none";
  }
});

document.getElementById("password").addEventListener("blur", function () {
  if (this.value.trim() === "") {
    this.classList.add("error");
    document.getElementById("passwordError").style.display = "block";
  } else {
    this.classList.remove("error");
    document.getElementById("passwordError").style.display = "none";
  }
});

function validateEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

function validateForm() {
  let isValid = true;
  // Сбросьте предыдущие сообщения об ошибках и классы ошибок
  document.getElementById("emailError").textContent = "";
  document.getElementById("passwordError").textContent = "";
  document.getElementById("email").classList.remove("error");
  document.getElementById("password").classList.remove("error");

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  // Проверка email
  if (!email) {
    document.getElementById("emailError").textContent = "Email is required.";
    document.getElementById("email").classList.add("error");
    isValid = false;
  } else if (!validateEmail(email)) {
    document.getElementById("emailError").textContent =
      "Please enter a valid email address.";
    document.getElementById("email").classList.add("error");
    isValid = false;
  }

  // Проверка пароля
  if (!password) {
    document.getElementById("passwordError").textContent =
      "Password is required.";
    document.getElementById("password").classList.add("error");
    isValid = false;
  }

  return isValid;
}
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    if (!validateForm()) {
      event.preventDefault();
    }
  });



document.getElementById("email").addEventListener("input", checkFormValidity);
document.getElementById("password").addEventListener("input", checkFormValidity);

function checkFormValidity() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  
  signInBtn.disabled = !(email && password); // Устанавливаем доступность кнопки
}


document.getElementById("forgotPasswordLink").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("forgotPasswordForm").style.display = "block";
});

document.getElementById("backToLoginLink").addEventListener("click", function(event) {
  event.preventDefault();
  document.getElementById("forgotPasswordForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
});
