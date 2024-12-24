// Creating the variables for the elements
const timeDaily = document.getElementById("timeDaily");
const timeWeekly = document.getElementById("timeWeekly");
const timeMonthly = document.getElementById("timeMonthly");

let actualHrs = document.querySelectorAll(".actualHours");
let previousHrs = document.querySelectorAll(".previousHours");

// Starting the function
const updateHours = (timeFrame, activeTimeElement) => {
  // Changing the class of the time options
  timeDaily.classList.remove("active");
  timeWeekly.classList.remove("active");
  timeMonthly.classList.remove("active");
  activeTimeElement.classList.add("active");

  // Adding the info of the hours with Ajax
  $.ajax({
    url: "./data.json",
    type: "GET",
    success: function (data) {
      // Working with every card of the DOM
      actualHrs.forEach((actual, index) => {
        const previous = previousHrs[index]; // Getting the element
        const activityData = data[index]; // Getting the corresponent data from the JSON

        // Actualizing the hours
        actual.textContent = `${activityData.timeframes[timeFrame].current}hrs`;
        previous.textContent = `Last ${timeFrame} - ${activityData.timeframes[timeFrame].previous}hrs`;
      });
    },
    error: function (xhr, status) {
      console.log(`Error on load ${xhr} in the ${status}`);
    },
  });
};

// Adding the event listeners
timeDaily.addEventListener("click", () => updateHours("day", timeDaily));
timeWeekly.addEventListener("click", () => updateHours("week", timeWeekly));
timeMonthly.addEventListener("click", () => updateHours("month", timeMonthly));
