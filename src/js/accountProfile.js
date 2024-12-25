import { update, updatePassword, userinfo } from "../service/userService";

document.addEventListener("DOMContentLoaded", () => {
  const questionMark = document.querySelector(".question-mark");
  const questionMarkPhone = document.querySelector(".question-mark-phone");
  const text = document.querySelector(".question-mark-text");
  const phoneText = document.querySelector(".question-mark-text-phone");
  questionMark.addEventListener("click", function () {
    text.classList.toggle("visible");
  });

  questionMarkPhone.addEventListener("click", function () {
    phoneText.classList.toggle("visible");
  });

  const currentPassword = document.getElementById("currentPassword");
  const newPassword = document.getElementById("newPassword");
  const confirmNewPassword = document.getElementById("confirmNewPassword");
  const shippingForm = document.querySelector(".shipping-form-address");
  const editBtn = document.querySelector(".address-edit-btn");
  const infoCard = document.querySelector(".info-card");
  const addressFormCancel = document.querySelector(".address-form-cancel");
  const numberEditBtn = document.querySelector(".number-edt-btn");
  const phoneNumberForm = document.querySelector(".phone-number-form");
  const phoneNumberContainer = document.querySelector(
    ".phone-number-container"
  );
  const phoneEditCancel = document.querySelector(".phone-number-cancel");
  const accountEditBtn = document.querySelector(".account-edit-btn");
  const accountDetailForm = document.querySelector(".account-detail-form");
  const accountDetailWrapper = document.querySelector(
    ".account-detail-wrapper"
  );
  const accountEditCancel = document.querySelector(".account-edit-cancel");
  const updatePasswordForm = document.querySelector(".update-password-form");
  const updatePasswordBtn = document.querySelector(".update-password-btn");
  const passwordEditCancel = document.querySelector(".password-edit-cancel");
  const saveBtns = document.querySelectorAll(".save-btn");
  const loadingSpinner = document.querySelectorAll(".loadingSpinner");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");

  updatePasswordBtn.addEventListener("click", function () {
    updatePasswordForm.classList.toggle("visible");
    accountDetailWrapper.classList.add("hidden");
  });
  passwordEditCancel.addEventListener("click", function () {
    currentPassword.value = "";
    newPassword.value = "";
    confirmNewPassword.value = "";
    updatePasswordForm.classList.remove("visible");
    accountDetailWrapper.classList.remove("hidden");
  });

  accountEditBtn.addEventListener("click", async function () {
    accountDetailForm.classList.toggle("visible");
    accountDetailWrapper.classList.add("hidden");
    const userDetails = await userinfo();
    nameInput.value = userDetails.name;
    emailInput.value = userDetails.email;
  });

  accountEditCancel.addEventListener("click", function () {
    accountDetailForm.classList.remove("visible");
    accountDetailWrapper.classList.remove("hidden");
  });

  numberEditBtn.addEventListener("click", function () {
    phoneNumberForm.classList.toggle("visible");
    phoneNumberContainer.classList.add("hidden");
  });

  phoneEditCancel.addEventListener("click", function () {
    phoneNumberForm.classList.remove("visible");
    phoneNumberContainer.classList.remove("hidden");
  });

  editBtn.addEventListener("click", function () {
    shippingForm.classList.toggle("visible");
    infoCard.classList.add("hidden");
  });

  addressFormCancel.addEventListener("click", function () {
    console.log("Cancel button clicked!");
    shippingForm.classList.remove("visible");
    infoCard.classList.remove("hidden");
  });

  const categories = document.querySelectorAll(".category");

  const currentPath = window.location.pathname.replace(/^\//, ""); // Убираем ведущий слэш

  categories.forEach((category) => {
    const link = category.querySelector("a");
    if (link) {
      const linkPath = link.getAttribute("href").replace(/^\//, ""); // Убираем ведущий слэш у href
      if (linkPath === currentPath) {
        category.classList.add("active");
        link.style.color = "#fff";
      }
    }
  });

  async function displayUserDetails() {
    try {
      const userDetails = await userinfo();

      if (userDetails) {
        document.getElementById("userName").innerText =
          `Name: ${userDetails.name}`;
        document.getElementById("userEmail").innerText =
          `Email: ${userDetails.email}`;
        document.getElementById("userLocation").innerText =
          `Location: ${userDetails.location || ""}`;
        document.getElementById("userLanguage").innerText =
          `Language: ${userDetails.language || ""}`;
      } else {
        console.error("No user details received");
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Failed to load user details.");
    }
  }
  displayUserDetails();

  loadingSpinner.forEach((spinner) => {
    spinner.style.display = "none";
  });

  document
    .querySelector(".account-edit-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const location = document.getElementById("location").value;
      const language = document.getElementById("language").value;

      const formData = {};

      if (name) formData.name = name;
      if (email) formData.email = email;
      if (location) formData.location = location;
      if (language) formData.language = language;

      saveBtns.forEach((saveBtn) => {
        saveBtn.disabled = true;
        saveBtn.style.color = "#6dcff6";
      });
      loadingSpinner.forEach((spinner) => {
        spinner.style.display = "inline-block";
      });
      try {
        await update(formData);

        accountDetailForm.classList.remove("visible");
        accountDetailWrapper.classList.remove("hidden");
        displayUserDetails();
      } catch (error) {
        console.error("Error sending data:", error);
        alert(error.message || "Error sending data");
      } finally {
        saveBtns.forEach((saveBtn) => {
          saveBtn.style.color = "";
          saveBtn.disabled = false;
        });
        loadingSpinner.forEach((spinner) => {
          spinner.style.display = "none";
        });
      }
    });

  document
    .querySelector(".password-update-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const formData = {
        currentPassword: currentPassword.value,
        newPassword: newPassword.value,
      };
      saveBtns.forEach((saveBtn) => {
        saveBtn.disabled = true;
        saveBtn.style.color = "#6dcff6";
      });
      loadingSpinner.forEach((spinner) => {
        spinner.style.display = "inline-block";
      });

      try {
        await updatePassword(formData);
        updatePasswordForm.classList.remove("visible");
        accountDetailWrapper.classList.remove("hidden");

        currentPassword.value = "";
        newPassword.value = "";
        confirmNewPassword.value = "";
        displayUserDetails();
      } catch (error) {
        console.error("Error sending data:", error);
        alert(error.message || "Error sending data");
      } finally {
        saveBtns.forEach((saveBtn) => {
          saveBtn.style.color = "";
          saveBtn.disabled = false;
        });
        loadingSpinner.forEach((spinner) => {
          spinner.style.display = "none";
        });
      }
    });

  const toggleMenuButton = document.getElementById("toggleMenu");
  const sidebar = document.querySelector(".sidebar-account");
  const arrow = document.getElementById("arrow-sidebar-account");

  toggleMenuButton.addEventListener("click", function () {
    sidebar.style.transform =
      sidebar.style.transform === "translateX(0px)"
        ? "translateX(-100%)"
        : "translateX(0px)";
        toggleMenuButton.classList.toggle("open"); 
    console.log("arrow",arrow);
    
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) {
      sidebar.style.transform = ""; // Сбросить инлайновый стиль
    } else {
      sidebar.style.transform = "translateX(-100%)"; // Убедиться, что скрыто
    }
  });
});
