document.addEventListener("DOMContentLoaded", () => {
  const ageForm = document.getElementById("ageForm");
  const resultYear = document.getElementById("result-year");
  const resultMonth = document.getElementById("result-month");
  const resultDay = document.getElementById("result-day");

  ageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const dayInput = document.getElementById("day");
    const monthInput = document.getElementById("month");
    const yearInput = document.getElementById("year");

    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    const today = new Date();

    const inputDate = new Date(year, month - 1, day);

    // Function to show error message
    const showErrorMessage = (message, inputElement) => {
      const formGroup = inputElement.closest(".form-group");

      const errorElement = document.createElement("div");
      errorElement.classList.add("error-message");
      errorElement.textContent = message;

      formGroup.appendChild(errorElement);

      // Label error
      const label = formGroup.querySelector("label");
      label.classList.add("error-label");

      // Input error
      const input = formGroup.querySelector("input");
      input.classList.add("error-input");
    };

    // Function to remove error message and error classes
    const removeErrorMessage = (inputElement) => {
      const formGroup = inputElement.closest(".form-group");

      // Remove error message
      const errorElement = formGroup.querySelector(".error-message");
      if (errorElement) {
        formGroup.removeChild(errorElement);
      }

      // Reset label error
      const label = formGroup.querySelector("label");
      label.classList.remove("error-label");

      // Reset input error
      inputElement.classList.remove("error-input");
    };

    // Remove existing error messages
    const errorMessages = ageForm.querySelectorAll(".error-message");
    errorMessages.forEach((errorMessage) => {
      const formGroup = errorMessage.closest(".form-group");
      const input = formGroup.querySelector("input");

      formGroup.removeChild(errorMessage);
      input.classList.remove("error-input");
    });

    // Day input event listeners
    dayInput.addEventListener("input", () => {
      if (dayInput.value === "") {
        removeErrorMessage(dayInput);
      } else if (!isNaN(day) && day >= 1 && day <= 31) {
        removeErrorMessage(dayInput);
      }
    });

    dayInput.addEventListener("change", () => {
      if (dayInput.value === "") {
        removeErrorMessage(dayInput);
      }
    });

    // Month input event listeners
    monthInput.addEventListener("input", () => {
      if (monthInput.value === "") {
        removeErrorMessage(monthInput);
      } else if (!isNaN(month) && month >= 1 && month <= 12) {
        removeErrorMessage(monthInput);
      }
    });

    monthInput.addEventListener("change", () => {
      if (monthInput.value === "") {
        removeErrorMessage(monthInput);
      }
    });

    // Year input event listeners
    yearInput.addEventListener("input", () => {
      if (yearInput.value === "") {
        removeErrorMessage(yearInput);
      } else if (!isNaN(year) && year <= today.getFullYear()) {
        removeErrorMessage(yearInput);
      }
    });

    yearInput.addEventListener("change", () => {
      if (yearInput.value === "") {
        removeErrorMessage(yearInput);
      }
    });

    if (dayInput.value === "") {
      showErrorMessage("This field is required", dayInput);
    } else {
      if (isNaN(day) || day < 1 || day > 31) {
        showErrorMessage("Must be a valid day", dayInput);
      } else {
        removeErrorMessage(dayInput);
      }
    }

    if (monthInput.value === "") {
      showErrorMessage("This field is required", monthInput);
    } else {
      if (isNaN(month) || month < 1 || month > 12) {
        showErrorMessage("Must be a valid month", monthInput);
      } else {
        removeErrorMessage(monthInput);
      }
    }

    if (yearInput.value === "") {
      showErrorMessage("This field is required", yearInput);
    } else {
      if (isNaN(year) || year > today.getFullYear()) {
        showErrorMessage("Must be a valid year", yearInput);
      } else {
        removeErrorMessage(yearInput);
      }
    }

    if (inputDate > today) {
      showErrorMessage("Must be a valid date", dayInput);
      return; // Stop further execution
    }

    const ageInMilliseconds = today - inputDate;
    const ageDate = new Date(ageInMilliseconds);
    const years = ageDate.getUTCFullYear() - 1970;
    const months = ageDate.getUTCMonth();
    const days = ageDate.getUTCDate() - 1;

    resultYear.textContent = years;
    resultMonth.textContent = months;
    resultDay.textContent = days;
  });
});
