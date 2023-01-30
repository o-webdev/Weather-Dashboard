$(document).ready(function() {
    
    // Create URL variables for "Today" and "Forecast" API 
    var todayURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
    var forcastURL = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    
    // variable for API key
    var APIKey = '&appid=e851c17f69e665b5bbdb5e7f838e3849';

    // Variables to access from HTML
    var form = $("#search-form");
    var input = $("#search-input");
    var today = $("#today");
    var forecast = $("#forecast");
    var history = $("#history");
})