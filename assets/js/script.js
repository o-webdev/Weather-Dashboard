$(document).ready(function () {
  // Create URL variables for "Today" and "Forecast" API
  var todayURL = "https://api.openweathermap.org/data/2.5/weather?q=";
  var forcastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";

  // Prompt to API key,  Ln8 is for local testing
  var APIKey = '&appid=e851c17f69e665b5bbdb5e7f838e3849';
//   var APIKey = prompt("Please enter your OpenWeatherMap API key: ");

  // Variables to access from HTML
  var form = $("#search-form");
  var input = $("#search-input");
  var today = $("#today");
  var forecast = $("#forecast");
  var history = $("#history");

  // Initial form submit function, form sets the event to be triggered when clicked
  // preventDefault prevents the default behaviour such as cauing the page to refresh
  // input gets the value entered and stores it in the var "city"
  form.on("click", function (event) {
    event.preventDefault();
    var city = input.val();

    // Use AJAX to make API call to get current weather of searched city
    $.ajax({
      url: todayURL + city + APIKey,
      method: "GET",
    }).then(function (data) {
      // Check to see if today object is empty so it doesnt append and create duplicates
      today.empty();

      // variables and dynamic elements to display on page
      var name = $("<p>");
      name.text(data.name);
      name.css({
        display: "inline-block",
        "margin-right": "10px",
        "font-weight": "bold",
        "font-size": "30px",
      });
      var date = $("<p>");
      date.text(moment().format("DD/MM/YYYY"));
      date.css({ display: "inline-block", "margin-right": "10px" });
      var icon = $("<img>");
      icon.attr(
        "src",
        "https://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png"
      );
      var hr = $("<hr>");
      var temperature = $("<p>");
      temperature.text(
        "Temperature: " + Math.floor(data.main.temp - 273.15) + " °C"
      );
      var humidity = $("<p>");
      humidity.text("Humidity: " + data.main.humidity);
      var wind = $("<p>");
      wind.text("Wind: " + data.wind.speed);

      $("#today").append(name, date, icon, hr, temperature, humidity, wind);
      $("#today").css({ border: "0.5px solid black", "padding-left": "10px" });
    });
  });
});
