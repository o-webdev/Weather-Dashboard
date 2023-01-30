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
      $("#today").css({ "border": "0.5px solid black", "border-radius": "5px", "padding-left": "10px" });

      $.ajax ({
        url:forcastURL + city + APIKey,
        method: "GET"
      }).then(function(data) {
        // Make sure the forecast is empty so it doesnt append
        forecast.empty();

        
        // Loop through the forecast data (every 3 hours)
        for (var i = 0; i < data.list.length; i++) {
            // get the forecast for each day
            if (data.list[i].dt_txt.includes("12:00:00")) {

                // Create a forecast card to display forecast information 
                var forecastCard = $("<div>").addClass("col-lg-2 forecast-card");
                var date = $("<p>");
                date.text(moment(data.list[i].dt_txt).format("DD/MM/YYYY"));
                var icon = $("<img>");
                icon.attr("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + "@2x.png");
                var temperature = $("<p>");
                temperature.text("Temp: " + Math.floor(data.list[i].main.temp -273.15) + " °C");
                var humidity = $("<p>");
                humidity.text("Humid: " + data.list[i].main.humidity);
                var wind = $("<p>");
                wind.text("Wind: " + data.list[i].wind.speed);

                forecastCard.append(date, icon, temperature, humidity, wind)
               forecast.append(forecastCard);
               $(".forecast-card").css({"background-color": "#28B8CE", "padding": "5px", "border-radius": "5px" });
               $(".row.mt-3").css({"justify-content": "space-between", "text-align": "center", "padding-top": "20px"})
            }
        }
      })
    });
  });
});
