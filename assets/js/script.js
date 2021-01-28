// Declare Variables
var citySearch;
var APIkey = "d214e05ff0a5e0aef758d2675056c06c";
var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?";
var uviAPI = "https://api.openweathermap.org/data/2.5/uvi?lat=";
var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=";
// var geoAPI = navigator.geolocation to give access to a location, ask elena if I am implementing this correctly or if this is even necessary;
var getWeatherIcon = "http://openweathermap.org/img/wn/";
// var queryURL = ``;

var searchHistoryArr = [];

// search for location
function searchLocation() {
  console.log("hi");
  //.trim takes away white space
  var citySearch = $("#searchInput").val().trim();
  if (citySearch === "") {
    return;
  }
  $("#searchInput").val("");
  getWeather(citySearch);
  getForecast(citySearch);
  console.log(citySearch);
}

//call weather when the city is searched
function getWeather(search) {
  // var queryURL = weatherAPI + "q=" + search + units + APIkey;
  var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${APIkey}&units=imperial`;
  // get the variables back and do an api call to get lat/long... store in variables
  //  api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

  $.ajax({
    url: queryUrl,
    method: "GET",
    //let's do this
  }).then(function (response) {
    console.log(response);
    $("#current-city").text(response.name);
  });
}

function getForecast(search) {
  // var queryURL = weatherAPI + "q=" + search + units + APIkey;
  var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${APIkey}&units=imperial`;
  //  api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

  $.ajax({
    url: queryUrl,
    method: "GET",
    //let's do this
  }).then(function (response) {
    console.log(response);
  });
}

// search history appears in the searchHistory
//click handlers

$("#searchButton").on("click", searchLocation);

//use lon and lat to get uv data somehow...
//loop through and objects, i+=7,
