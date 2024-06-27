"use strict";

// ===================init menu burger================
(function menuInit() {
  if (document.querySelector(".icon-menu")) {
    document.addEventListener("click", function (e) {
      if (e.target.closest(".icon-menu")) {
        document.documentElement.classList.toggle("menu-open");
        document.body.classList.toggle("lock");
      } else {
        document.documentElement.classList.remove("menu-open");
        document.body.classList.remove("lock");
      }
    });
  }
})();
//============= form ========================
const forms = document.querySelectorAll("[name='form']");

// add and remove placeholders
for (let form of forms) {
  form.addEventListener("focusin", (e) => {
    if (e.target.tagName === "INPUT") {
      e.target.placeholder = "";
    }
  });
  form.addEventListener("focusout", (e) => {
    if (e.target.tagName === "INPUT") {
      e.target.dataset.placeholder
        ? (e.target.placeholder = e.target.dataset.placeholder)
        : "";
    }
  });
  //===========tracking changes in the form fields=========
  const buttonSubmit = form.querySelector("[type='submit']");

  form.addEventListener("input", (e) => {
    const form = e.target.closest("form");
    formObserver(form, e.target, buttonSubmit);
  });

  form.addEventListener("submit", (e) => {
    const body = Object.fromEntries(new FormData(e.target).entries());
    e.preventDefault();
    fetch("https://api.exemple.com", {
      method: "POST",
      body: body,
    })
      .then((response) => {
        // successful request
        console.log(response);
      })
      .catch((error) => {
        // failed request
        console.log(error);
      });
    form.reset();

    buttonSubmit.setAttribute("disabled", "true");

    if (form.id == "form") {
      alert(`Hi ${body.name}. Thank you for the message`);
    }
    if (form.id == "modal-form") {
      closePopup();
      alert("Your data has been sent successfully");
    }
  });
}
//============= validation form ========================

function formObserver(form, target, button) {
  if (target.tagName === "INPUT" && target.name !== "agree") {
    removeErrorMessage(target);
    if (target.name == "name" && target.value.trim() == "") {
      addErrorMessage(target);
    }
    if (target.name == "password" && target.value.trim() == "") {
      addErrorMessage(target);
    }
    if (target.name == "email") {
      inputValidation(emailValidation, target, "Input valid email");
    }
    if (target.name == "phone") {
      inputValidation(
        phoneValidation,
        target,
        "Input phone number like +353XX XXX XXXX"
      );
    }
  }
  // ====check if form fields contain errors=======
  const requireFields = form.querySelectorAll(".required");
  let error = 0;
  let errorMessage = null;
  for (let i = 0; i < requireFields.length; i++) {
    let input = requireFields[i];
    if (input.value == "") {
      error++;
    }
    errorMessage = input.parentElement.querySelector(".form-error");
    if (errorMessage) error++;
  }
  if (!error) {
    button.removeAttribute("disabled");
  } else {
    button.setAttribute("disabled", "true");
  }
}
// check input field values and show error messages
function inputValidation(validator, input, message) {
  const formError = input.parentElement.querySelector(".form-error");
  if (!validator(input) && !input.parentElement.contains(formError)) {
    removeErrorMessage(input);
    addErrorMessage(input, message);
  } else if (validator(input) || !input.value) {
    removeErrorMessage(input);
  }
  return false;
}

function addErrorMessage(input, message = "Fill out required fields") {
  input.classList.add("error");
  input.parentElement.insertAdjacentHTML(
    "beforeend",
    `<p class="form-error">${message}</p>`
  );
}
function removeErrorMessage(input) {
  input.classList.remove("error");
  if (input.parentElement.querySelector("p")) {
    input.parentElement.removeChild(input.parentElement.querySelector("p"));
  }
}
function emailValidation(input) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
function phoneValidation(input) {
  return /(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){12,14}(\s*)?/.test(input.value);
}
function checkAge(e) {
  if (e.value != "") {
    if (parseInt(e.value) < parseInt(e.min)) {
      e.value = e.min;
    }
  }
} // ======================init swiper=================
const swiperThumb = new Swiper(".classes__slider-thumbs", {
  // Optional parameters
  direction: "vertical",
  slidesPerView: 7,
  spaceBetween: 10,

  watchSlidesProgress: true,
});
const swiperMain = new Swiper(".classes__slider", {
  // Optional parameters
  centeredSlides: true,
  effect: "coverflow",
  loop: true,
  centeredSlides: true,
  slidesPerView: 1,
  lazyLoading: true,
  lazyLoadingInPrevNext: true,
  speed: 800,
  additionalSlide: 1,
  spaceBetween: 10,
  coverflow: {
    rotate: 0,
    stretch: 100,
    depth: 50,
    modifier: 1,
    slideShadows: false,
  },
  breakpoints: {
    // when window width is >= 480px
    480: {
      slidesPerView: 1.5,
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 2.2,
      spaceBetween: 30,
      coverflow: {
        rotate: 40,
        stretch: 100,
        depth: 100,
        modifier: 1,
        slideShadows: false,
      },
    },
  },
  pagination: {
    el: ".classes__pagination",
    clickable: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  thumbs: {
    swiper: swiperThumb,
  },
});
// ======================calculator=====================

const calculatorForm = document.getElementById("calculator");
const inputWeight = document.querySelector(".weight__value");
const inputHeight = document.querySelector(".height__value");
const weightParamElement = document.querySelector(".weight");
const heightParamElement = document.querySelector(".height");
const submitButton = document.getElementById("submitButton");
const resetButton = document.getElementById("resetButton");
const result = document.getElementById("result");

const onSubmitButton = () => {
  result.innerText = `Your Body Mass Index is ${bmi}. This is considered as ${weightResult}`;
  submitButton.style.display = "none";
  resetButton.style.display = "block";
  weightParamElement.value = weightParam;
  heightParamElement.value = heightParam;
};

const onResetButton = () => {
  submitButton.style.display = "block";
  resetButton.style.display = "none";
  weight = 0;
  height = 0;
  inputWeight.value = null;
  inputHeight.value = null;
  weightParamElement.value = weightParam;
  heightParamElement.value = heightParam;
  result.innerText = "";
};

let bmi = 0;
let weight = 0;
let height = 0;
let weightParam = "kg";
let heightParam = "cm";
let weightResult = "";

inputWeight.addEventListener("input", onInputWeightChange);

inputHeight.addEventListener("input", onInputHeightChange);

weightParamElement.addEventListener("change", weightParamChange);

heightParamElement.addEventListener("change", heightParamChange);

function onInputWeightChange(event) {
  weight = event.currentTarget.value;
}

function onInputHeightChange(event) {
  height = event.currentTarget.value;
}

function weightParamChange(event) {
  weightParam = event.currentTarget.value;
}

function heightParamChange(event) {
  heightParam = event.currentTarget.value;
}

calculatorForm.addEventListener("submit", (event) => {
  event.preventDefault();

  weightParam === "lbs" ? (weight = weight * 0.453592) : (weight = weight);
  heightParam === "in"
    ? (height = (height * 2.54) / 100)
    : (height = height / 100);

  if (height <= 0) {
    result.innerText = "";
    return;
  } else if (weight <= 0) {
    result.innerText = "";
    return;
  }

  bmi = Math.round((weight / Math.pow(height, 2)) * 10) / 10;

  if (bmi <= 18.4) {
    weightResult = "underweight";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    weightResult = "normal";
  } else if (bmi >= 25 && bmi <= 30) {
    weightResult = "overweight";
  } else if (bmi >= 30.1) {
    weightResult = "obese";
  }

  onSubmitButton();
});
// =======popup======================================
const modal = document.querySelector(".modal");
function openPopup() {
  modal.classList.add("open");
  document.body.classList.add("modal-lock");
  if (modal.classList.contains("open")) {
    document.addEventListener("keyup", keyHandler);
  } else {
    document.removeEventListener("keyup", keyHandler);
  }
}
function closePopup() {
  const form = document.getElementById("modal-form");
  form.reset();
  const errors = form.querySelectorAll(".error");
  for (let input of errors) {
    removeErrorMessage(input);
  }

  modal.classList.remove("open");
  document.body.classList.remove("modal-lock");
}
//======= toggle password icon =========================================
const iconIn = document.getElementById("pass-in-show");
const iconUp = document.getElementById("pass-up-show");
if (iconIn) {
  iconIn.addEventListener("click", showPassword);
}
if (iconUp) {
  iconUp.addEventListener("click", showPassword);
}
function showPassword(e) {
  e.preventDefault();
  let target = e.target;
  let input = target.parentNode.querySelector("input");
  if (input.getAttribute("type") == "password") {
    target.classList.add("view-pass");
    input.setAttribute("type", "text");
  } else {
    target.classList.remove("view-pass");
    input.setAttribute("type", "password");
  }
}

function keyHandler(e) {
  if (e.key == "Escape") {
    closePopup();
    document.removeEventListener("keyup", keyHandler);
  }
}
