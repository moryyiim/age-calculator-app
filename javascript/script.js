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
    };

    // Remove existing error messages
    const errorMessages = ageForm.querySelectorAll(".error-message");
    errorMessages.forEach((errorMessage) => {
      errorMessage.remove();
    });

    // Validations
    if (day === "" && month === "" && year === "") {
      showErrorMessage("Must be a valid date", dayInput);
    } else {
      if (day !== "") {
        if (isNaN(day) || day < 1 || day > 31) {
          showErrorMessage("Must be a valid day", dayInput);
        }
      }

      if (month !== "") {
        if (isNaN(month) || month < 1 || month > 12) {
          showErrorMessage("Must be a valid month", monthInput);
        }
      }

      if (year !== "") {
        if (isNaN(year) || year > today.getFullYear()) {
          showErrorMessage("Must be a valid year", yearInput);
          return;
        }
      }
    }

    if (inputDate > today) {
      showErrorMessage("Invalid date", dayInput);
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
