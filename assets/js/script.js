$(document).ready(function() {
    
    // Create URL variables for "Today" and "Forecast" API 
    var todayURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var forcastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    
    // Prompt to API key,  Ln8 is for local testing  
    // var APIKey = '&appid=e851c17f69e665b5bbdb5e7f838e3849';
  var APIKey = prompt("Please enter your OpenWeatherMap API key: ");

    // Variables to access from HTML
    var form = $("#search-form");
    var input = $("#search-input");
    var today = $("#today");
    var forecast = $("#forecast");
    var history = $("#history");

// Initial form submit function, form sets the event to be triggered when clicked
// preventDefault prevents the default behaviour such as cauing the page to refresh
// input gets the value entered and stores it in the var "city"
    form.on("click", function(event) {
        event.preventDefault();
        var city = input.val();
    })
})