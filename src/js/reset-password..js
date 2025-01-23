// Получаем токен из URL
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

document.getElementById("token").value = token;
console.log("token", token);

document
  .getElementById("resetPasswordForm")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    const newPassword = document.getElementById("newPassword").value;
    console.log("newPassword", newPassword);

    const retypePassword = document.getElementById("retypePassword").value;
    console.log("retypePassword", retypePasswordF);

    // Проверяем, совпадают ли пароли
    if (newPassword !== retypePassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3002/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Password reset successfully!");
        window.location.href = "/index.html"; // Перенаправление на главную страницу
      } else {
        alert(result.message || "Something went wrong!");
      }
    } catch (error) {
      alert("An error occurred while resetting the password.");
    }
  });
