document.addEventListener("DOMContentLoaded", function () {
  const email = localStorage.getItem("email");
  const password = localStorage.getItem("password");

  if (email) {
    document.getElementById("email").value = email;
  }
  if (password) {
    document.getElementById("password").value = password;
  }
});

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

    loadingSpinner.style.display = "inline-block";
    document.getElementById("signInBtn").style.color = "#ddd";
  
   

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


      if (response.ok) {
        const rememberMe = document.getElementById("rememberMe").checked;

        if (rememberMe) {
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          sessionStorage.setItem("isAuthenticated", "true");
          sessionStorage.setItem("user", JSON.stringify(data));
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
      // signInBtn.disabled = false;
      loginError.textContent = "An error occurred. Please try again later.";
      loginError.style.display = "block";
    }

    document
      .getElementById("closeError")
      .addEventListener("click", function () {
        loginError.style.display = "none";
      });
  });
