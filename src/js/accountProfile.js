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

  updatePasswordBtn.addEventListener("click", function () {
    updatePasswordForm.classList.toggle("visible");
    accountDetailWrapper.classList.add("hidden");
  });
  passwordEditCancel.addEventListener("click", function () {
    updatePasswordForm.classList.remove("visible");
    accountDetailWrapper.classList.remove("hidden");
  });

  accountEditBtn.addEventListener("click", function () {
    accountDetailForm.classList.toggle("visible");
    accountDetailWrapper.classList.add("hidden");
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
});
