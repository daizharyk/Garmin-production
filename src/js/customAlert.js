export function showCustomAlert(message) {
  const alertBox = document.getElementById("custom-alert");
  const alertMessage = document.getElementById("custom-alert-message");

  alertMessage.textContent = message;

  alertBox.classList.remove("hidden");


  setTimeout(() => {
    alertBox.classList.add("hidden");
  }, 1000); 
}
