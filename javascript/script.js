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

    const today = new Date();

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

    // * VALIDATION

    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value);
    const year = parseInt(yearInput.value);

    const inputDate = new Date(year, month - 1, day);

    // Function to check if a year is a leap year
    function isLeapYear(year) {
      return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    // Validate day
    if (dayInput.value === "") {
      showErrorMessage("This field is required", dayInput);
    } else if (isNaN(day) || day < 1 || day > 31) {
      showErrorMessage("Must be a valid day", dayInput);
    } else if (
      (month === 4 || month === 6 || month === 9 || month === 11) &&
      day > 30
    ) {
      showErrorMessage("Must be a valid date", dayInput);
    } else if (month === 2) {
      const isLeap = isLeapYear(year);
      if ((isLeap && day > 29) || (!isLeap && day > 28)) {
        showErrorMessage("Must be a valid date", dayInput);
      }
    } else {
      removeErrorMessage(dayInput);
    }

    // Validate month
    if (monthInput.value === "") {
      showErrorMessage("This field is required", monthInput);
    } else if (isNaN(month) || month < 1 || month > 12) {
      showErrorMessage("Must be a valid month", monthInput);
    } else {
      removeErrorMessage(monthInput);
    }

    // Validate year
    if (yearInput.value === "") {
      showErrorMessage("This field is required", yearInput);
    } else if (isNaN(year) || year > today.getFullYear()) {
      showErrorMessage("Must be in the past", yearInput);
    } else {
      removeErrorMessage(yearInput);
    }

    if (inputDate > today) {
      showErrorMessage("The date is invalid", dayInput);
      removeErrorMessage();
      return; // Stop further execution
    }

    const ageInMilliseconds = today - inputDate;
    if (isNaN(ageInMilliseconds)) {
      // Handle invalid input, clear the result elements
      resultYear.textContent = "--";
      resultMonth.textContent = "--";
      resultDay.textContent = "--";
    } else {
      const ageDate = new Date(ageInMilliseconds);
      const years = ageDate.getUTCFullYear() - 1970;
      const months = ageDate.getUTCMonth();
      const days = ageDate.getUTCDate() - 1;

      resultYear.textContent = years;
      resultMonth.textContent = months;
      resultDay.textContent = days;
    }
  });
});
