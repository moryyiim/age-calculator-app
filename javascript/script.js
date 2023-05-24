document.addEventListener("DOMContentLoaded", () => {
  const ageForm = document.getElementById("ageForm");
  const resultYear = document.getElementById("result-year");
  const resultMonth = document.getElementById("result-month");
  const resultDay = document.getElementById("result-day");

  ageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const day = parseInt(document.getElementById("day").value);
    const month = parseInt(document.getElementById("month").value);
    const year = parseInt(document.getElementById("year").value);

    const today = new Date();

    const inputDate = new Date(year, month - 1, day);

    //   validations

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
      showErrorMessage("Must be a valid date ");
    }

    if (day < 1 || day > 31) {
      showErrorMessage("Day must be between 1 and 31");
    }

    if (month < 1 || month > 12) {
      showErrorMessage("Month must be between 1 and 12");
    }

    if (year > today.getFullYear()) {
      showErrorMessage("Year cannot be in the future");
      return;
    }

    if (inputDate > today) {
      showErrorMessage("Invalid date");
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
