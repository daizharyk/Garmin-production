import "../style/signin_login.css";

document
  .getElementById("registerForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault(); // Предотвращаем стандартное поведение формы
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
      const response = await fetch("/api/users", {
        // Здесь вы отправляете запрос на ваш роут регистрации
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, country }),
      });

      const data = await response.json();

      loadingSpinner.style.display = "none";
      createAccountBtn.disabled = false;
      document.getElementById("createAccountBtn").style.color = "#000";
      if (response.ok) {
        // Успешная регистрация
        alert("User registered successfully");
        window.location.href = "../index.html"; // Перенаправление после успешной регистрации
      } else {
        loginError.innerHTML = `
        ${data.message}
        <button class="close-btn" id="closeError">&#215</button>
      `;
        loginError.style.display = "block";
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      createAccountBtn.disabled = false; // Включаем кнопку обратно
    }

    document
      .getElementById("closeError")
      .addEventListener("click", function () {
        loginError.style.display = "none";
      });
  });
