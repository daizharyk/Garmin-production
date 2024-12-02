document
  .getElementById("loginForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const loginError = document.getElementById("loginError");
    const signInBtn = document.getElementById("signInBtn");
    const loadingSpinner = document.getElementById("loadingSpinner");

    // Очищаем ошибки перед новым запросом
    loginError.style.display = "none";

    loadingSpinner.style.display = "inline-block";
    document.getElementById("signInBtn").style.color = "#ddd";
    signInBtn.disabled = true;
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      
      loadingSpinner.style.display = "none";
      document.getElementById("signInBtn").style.color = "#000";
      signInBtn.disabled = false;

      if (response.ok) {
        const rememberMe = document.getElementById("rememberMe").checked;

        if (rememberMe) {
          localStorage.setItem("email", email);
          localStorage.setItem("password", password);
        }
        window.location.href = "../index.html";
      } else {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        loginError.innerHTML = `
        ${data.message || "User not found or incorrect password"}
        <button class="close-btn" id="closeError">&#215</button>
      `;
        loginError.style.display = "block";
      }
    } catch (error) {
      loadingSpinner.style.display = "none";
      signInBtn.disabled = false;
      loginError.textContent = "An error occurred. Please try again later.";
      loginError.style.display = "block";
    }

    document
      .getElementById("closeError")
      .addEventListener("click", function () {
        loginError.style.display = "none";
      });
  });
