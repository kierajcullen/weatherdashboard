// Declare Variables
var APIkey = "d214e05ff0a5e0aef758d2675056c06c";
var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?";
var uviAPI = "https://api.openweathermap.org/data/2.5/uvi?lat=";
var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=";
// var geoAPI = navigator.geolocation to give access to a location, ask elena if I am implementing this correctly or if this is even necessary;
var getWeatherIcon = "http://openweathermap.org/img/wn/";
// var queryURL = ``;

var searchHistoryArr = [];
// console.log("hi);
// I just realized I made my HTML tags in JS format... I may fix this, I may just note to never do that in the future
// search for location
function searchLocation() {
  //.trim takes away white space
  var citySearch = $("#searchInput").val().trim();
  if (citySearch === "") {
    return;
  }
  getWeather(citySearch);
  getForecast(citySearch);
  console.log(citySearch);
  createHistory(citySearch);
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
for (var j = 0; j < 5; j++) {}
$("#weather-container").show();

// UV index
// set item in local storage then get item
function displayHistory() {
  var getLocalSearchHistory = localStorage.getItem("searchHistory");
  var localSearchHistory = JSON.parse(getLocalSearchHistory);

  if (getLocalSearchHistory === null) {
    createHistory();
    getLocalSearchHistory = localStorage.getItem("searchHistory");
    localSearchHistory = JSON.parse(getLocalSearchHistory);
  }

  for (var i = 0; i < localSearchHistory.length; i++) {
    // add a list element to display history, local storage
    var historyInfo = $("<li>");
    historyInfo.addClass("list-group-item");
    historyInfo.text(localSearchHistory[i].city);
    //prepend or append?
    $("#search-history").prepend(historyInfo);
    console.log(historyInfo);
    $("#search-history-container").show();
  }
  return (searchHistoryArray = localSearchHistory);
}

// Created array in variable section
// Create History
function createHistory() {
  // initialize array, store
  searchHistoryArray.length = 0;
  localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArray));
}

function clearHistory() {
  $("#clear-button").on("click", function () {
    $("#search-history").empty();
    localStorage.removeItem("searchHistory");
    createHistory();
  });
}

function clickHistory() {
  $("#search-history").on("click", "li", function () {
    var cityNameHistory = $(this).text();
    getWeather(cityNameHistory);
  });
}
