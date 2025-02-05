

export function checkAuthorization() {
  let userData = sessionStorage.getItem("user") || localStorage.getItem("user");

  try {
    userData = JSON.parse(userData);
  } catch (error) {
    userData = null;
  }

  const isOnSignInPage = window.location.pathname.includes("signIn.html");

  if (!userData) {
    if (!isOnSignInPage) {
      window.location.href = "/pages/signIn.html";
    }
  } else {
    document.body.classList.remove("hide-content");


  }
}
