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
  const cancelBtn = document.querySelector(".cancel-btn");
  const numberEditBtn = document.querySelector(".number-edt-btn");
  const phoneNumberForm = document.querySelector(".phone-number-form");
  const phoneNumberContainer = document.querySelector(
    ".phone-number-container"
  );
  const phoneEditCancel = document.querySelector(".phone-number-cancel");
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

  cancelBtn.addEventListener("click", function () {
    shippingForm.classList.remove("visible");
    infoCard.classList.remove("hidden");
  });
});
