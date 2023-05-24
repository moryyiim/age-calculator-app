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
      const errorElement = document.createElement("div");
      errorElement.classList.add("error-message");
      errorElement.textContent = message;

      const formGroup = inputElement.closest(".form-group");
      formGroup.appendChild(errorElement);

      //   Label error
      const label = formGroup.querySelector("label");
      label.classList.add("error-label");

      //   input error
      const input = formGroup.querySelector("input");
      input.classList.add("error-input");
    };

    // Remove existing error messages and reset label and input errors
    const errorMessages = ageForm.querySelectorAll(".error-message");
    errorMessages.forEach((errorMessage) => {
      const inputElement = errorMessage.parentNode.querySelector("input");
      const formGroup = inputElement.closest(".form-group");
      const label = formGroup.querySelector("label");
      const input = formGroup.querySelector("input");

      errorMessage.remove();

      label.classList.remove("error-label");
      input.classList.remove("error-input");
    });

    if (dayInput.value === "") {
      showErrorMessage("This field is required", dayInput);
    } else {
      if (isNaN(day) || day < 1 || day > 31) {
        showErrorMessage("Must be a valid day", dayInput);
      }
    }

    if (monthInput.value === "") {
      showErrorMessage("This field is required", monthInput);
    } else {
      if (isNaN(month) || month < 1 || month > 12) {
        showErrorMessage("Must be a valid month", monthInput);
      }
    }

    if (yearInput.value === "") {
      showErrorMessage("This field is required", yearInput);
    } else {
      if (isNaN(year) || year > today.getFullYear()) {
        showErrorMessage("Must be a valid year", yearInput);
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
