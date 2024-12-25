export function checkAuthorization() {
  const user = sessionStorage.getItem("user") || localStorage.getItem("user");
  if (!user) {
    window.location.href = "/pages/signIn.html";
  } else {
    document.body.classList.remove("hide-content");
  }
}

