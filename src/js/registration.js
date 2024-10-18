import "../style/signin_login.css";

document.addEventListener("DOMContentLoaded", function () {
  // Показать/Скрыть пароль
  document.querySelectorAll(".show-password").forEach((button) => {
    button.addEventListener("click", function () {
      const inputField = button.previousElementSibling;
      inputField.type = inputField.type === "password" ? "text" : "password";
      button.textContent = inputField.type === "password" ? "Show" : "Hide";
    });
  });
  // Проверка имя
  document.getElementById("name").addEventListener("input", function () {
    const nameInput = this.value.trim();
    const requiredNameError = document.getElementById("requiredNameError");
    const nameError = document.getElementById("nameError");

    if (nameInput === "") {
      nameError.style.display = "block";
      requiredNameError.style.display = "none";
      this.classList.add("error");
    } else {
      nameError.style.display = "none";
      this.classList.remove("error");

      const invalidNameRegex = /[0-9!@#$%^&*(),.?":{}|<>]/;

      if (invalidNameRegex.test(nameInput)) {
        requiredNameError.style.display = "block";
      } else {
        requiredNameError.style.display = "none";
        this.classList.remove("error");
      }
    }
  });

  document.getElementById("name").addEventListener("blur", function () {
    const nameInput = this.value.trim();
    const requiredNameError = document.getElementById("requiredNameError");
    const nameError = document.getElementById("nameError");

    if (nameInput === "") {
      nameError.style.display = "block";
      requiredNameError.style.display = "none";
      this.classList.add("error");
    } else {
      nameError.style.display = "none";
      this.classList.remove("error");
    }
  });

  // Проверка безопасности пароля
  function isPasswordSecure(password) {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  }
  
  const passwordInput = document.getElementById("password");
  const retypePasswordInput = document.getElementById("retypePassword");
  
  // Функция для проверки совпадения паролей
  function checkPasswordsMatch() {
    const password = passwordInput.value.trim();
    const retypePassword = retypePasswordInput.value.trim();
    const passwordMatchError = document.getElementById("do-not-match-error");
  
    if (retypePassword !== "" && retypePassword !== password) {
      passwordMatchError.style.display = "block";
      retypePasswordInput.classList.add("error");
    } else {
      passwordMatchError.style.display = "none";
      retypePasswordInput.classList.remove("error");
    }
  }
  
  // Валидация пароля при вводе
  passwordInput.addEventListener("input", function () {
    const password = this.value.trim();
    const passwordRequirements = document.querySelector(".password-requirements");
    const passwordError = document.getElementById("passwordError");
  
    if (password === "") {
      passwordError.style.display = "block";
      this.classList.add("error");
    } else {
      passwordError.style.display = "none";
      this.classList.remove("error");
    }
  
    if (!isPasswordSecure(password)) {
      passwordRequirements.classList.add("error");
    } else {
      passwordRequirements.classList.remove("error");
    }
  
    // Проверяем совпадение паролей при изменении поля password
    checkPasswordsMatch();
  });
  
  // Валидация при потере фокуса на поле пароля
  passwordInput.addEventListener("blur", function () {
    const password = this.value.trim();
    const passwordError = document.getElementById("passwordError");
  
    if (password === "") {
      passwordError.style.display = "block";
      this.classList.add("error");
    } else {
      passwordError.style.display = "none";
      this.classList.remove("error");
    }
  });
  
  // Валидация повторного пароля при вводе
  retypePasswordInput.addEventListener("input", function () {
    const retypePassword = this.value.trim();
    const retypePasswordError = document.getElementById("retypePasswordError");
  
    if (retypePassword === "") {
      retypePasswordError.style.display = "block";
      this.classList.add("error");
    } else {
      retypePasswordError.style.display = "none";
      this.classList.remove("error");
    }
  
    // Проверяем совпадение паролей
    checkPasswordsMatch();
  });
  
  // Валидация повторного пароля при потере фокуса
  retypePasswordInput.addEventListener("blur", function () {
    const retypePassword = this.value.trim();
    const retypePasswordError = document.getElementById("retypePasswordError");
  
    if (retypePassword === "") {
      retypePasswordError.style.display = "block";
      this.classList.add("error");
    } else {
      retypePasswordError.style.display = "none";
      this.classList.remove("error");
    }
  
    // Проверяем совпадение паролей при потере фокуса
    checkPasswordsMatch();
  });
  


  // Функции проверки электронной почты
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  const emailInput = document.getElementById("email");
  const emailError = document.getElementById("emailError");

  const retypeEmailInput = document.getElementById("retypeEmail");
  const retypeEmailError = document.getElementById("retypeEmailError");

  function checkEmailsMatch() {
    const email = emailInput.value.trim();
    const retypeEmail = retypeEmailInput.value.trim();

    if (retypeEmail === "") {
      retypeEmailError.textContent = "This field is required";
      retypeEmailError.style.display = "block";
      retypeEmailInput.classList.add("error");
    } else if (email !== retypeEmail) {
      retypeEmailError.textContent = "Email addresses do not match";
      retypeEmailError.style.display = "block";
      retypeEmailInput.classList.add("error");
    } else {
      retypeEmailError.style.display = "none";
      retypeEmailInput.classList.remove("error");
    }
  }

  // Проверка для основного поля email
  emailInput.addEventListener("input", function () {
    const email = this.value.trim();

    if (email === "") {
      emailError.textContent = "This field is required";
      emailError.style.display = "block";
      this.classList.add("error");
    } else if (!isValidEmail(email)) {
      emailError.textContent = "Please enter a valid email address";
      emailError.style.display = "block";
      this.classList.add("error");
    } else {
      emailError.style.display = "none";
      this.classList.remove("error");
    }

    // Проверяем, совпадает ли email с повторным вводом
    checkEmailsMatch();
  });

  // Проверка для повторного email
  retypeEmailInput.addEventListener("input", function () {
    checkEmailsMatch();
  });

  emailInput.addEventListener("blur", function () {
    const email = this.value.trim();

    if (email === "") {
      emailError.textContent = "This field is required";
      emailError.style.display = "block";
      this.classList.add("error");
    } else if (!isValidEmail(email)) {
      emailError.textContent = "Please enter a valid email address";
      emailError.style.display = "block";
      this.classList.add("error");
    }
  });

  // Дополнительная проверка на blur для retypeEmail
  retypeEmailInput.addEventListener("blur", function () {
    checkEmailsMatch();
  });

  // Функция валидации формы
  function validateForm() {
    const email = document.getElementById("email").value.trim();
    const retypeEmail = document.getElementById("retypeEmail").value.trim();
    const password = document.getElementById("password").value.trim();
    const retypePassword = document
      .getElementById("retypePassword")
      .value.trim();
    const termsChecked = document.getElementById("terms").checked; // Проверка чекбокса

    // Проверка всех условий
    const isFormValid =
      email &&
      retypeEmail &&
      password &&
      retypePassword &&
      termsChecked &&
      isValidEmail(email) &&
      email === retypeEmail &&
      password === retypePassword;

    document.getElementById("createAccountBtn").disabled = !isFormValid;
  }

  // Добавление обработчиков событий
  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", validateForm);
  });

  document.getElementById("terms").addEventListener("change", validateForm);
});
