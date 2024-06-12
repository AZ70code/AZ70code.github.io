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
const forms = document.getElementsByTagName("form");

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

  form.addEventListener("change", (e) => {
    const form = e.target.closest("form");
    const buttonSubmit = form.querySelector("[type='submit']");

    formObserver(form, e.target, buttonSubmit);
    form.addEventListener("submit", (e) => {
      const body = Object.fromEntries(new FormData(e.target).entries());
      e.preventDefault();
      buttonSubmit.setAttribute("disabled", "true");
      console.log(form.id);
      if (form.id == "form") {
        formSubmit(body, form);
      }
      if (form.id == "modal-form") {
        closePopup();
      }
    });
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
  return /^((0|\+)[\- ]?)?(\(?\d{3,5}\)?[\- ]?)?[\d\- ]{5,10}$/.test(
    input.value
  );
}
// ======Imitation of sending the form================

async function formSubmit(body, form) {
  const value = document.getElementById("name").value.trim();
  let response = await fetch("/index.html", {
    method: "POST",
    body: body,
  });
  form.reset();
  form.insertAdjacentHTML(
    "beforeend",
    `<div class="form-submit">
			<p>Hi ${value} </p>
			<p>Your message is submited</p>
		</div>`
  );
  setTimeout(() => {
    form.removeChild(form.querySelector(".form-submit"));
  }, 3000);
}

// ======================init swiper=================
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
const submitButton = document.getElementById("submitButton");
const resetButton = document.getElementById("resetButton");
const result = document.getElementById("result");

const switchToSubmit = () => {
  submitButton.style.display = "block";
  resetButton.style.display = "none";
  result.innerText = " ";
};

const switchToReset = () => {
  submitButton.style.display = "none";
  resetButton.style.display = "block";
};

calculatorForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.target).entries());
  let bmi = 0;
  let weight = 0;
  let height = 0;

  data.weightOption === "lbs"
    ? (weight = data.weight * 0.453592)
    : (weight = data.weight);
  data.heightOption === "in"
    ? (height = (data.height * 2.54) / 100)
    : (height = data.height / 100);

  if (height <= 0) {
    result.innerText = "Please, enter valid numbers!";
    return;
  } else if (weight <= 0) {
    result.innerText = "Please, enter valid numbers!";
    return;
  }
  bmi = Math.round((weight / Math.pow(height, 2)) * 10) / 10;

  if (bmi <= 18.4) {
    switchToReset();
    result.innerText = `Your Body Mass Index is ${bmi}. This is considered as underweight`;
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    switchToReset();
    result.innerText = `Your Body Mass Index is ${bmi}. This is considered as normal`;
  } else if (bmi >= 25 && bmi <= 30) {
    switchToReset();
    result.innerText = `Your Body Mass Index is ${bmi}. This is considered as overweight`;
  } else if (bmi >= 30.1) {
    switchToReset();
    result.innerText = `Your Body Mass Index is ${bmi}. This is considered as obese`;
  }
});
// =======popup======================================
const modal = document.querySelector(".modal");
function openPopup() {
  modal.classList.add("open");
  document.body.classList.add("modal-lock");
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
