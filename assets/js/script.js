// Declare Variables
var APIkey = "d214e05ff0a5e0aef758d2675056c06c";
// var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?";
// var uviAPI = "https://api.openweathermap.org/data/2.5/uvi?lat=";
// var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=";
// var geoAPI = navigator.geolocation to give access to a location, ask elena if I am implementing this correctly or if this is even necessary;
var getWeatherIcon = "http://openweathermap.org/img/wn/";

var searchHistoryArray = [];
// var forecastHistoryArray = {};
//when they search a city, add to the
// console.log("hi);
// I just realized I made my HTML tags in JS format... I may fix this, I may just note to never do that in the future
// search for location
function searchLocation() {
  //.trim takes away white space... ask elena tonight
  var citySearch = $("#searchInput").val().trim();
  if (citySearch === "") {
    return;
  }
  getWeather(citySearch);
  getForecast(citySearch);
  console.log(citySearch);
  createHistory(citySearch);
}

createHistory();

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
    $("#search-history").text(response.name);
    $("#temperature").html(
      "<b>Temperature: </b>" + "" + (response.main.feels_like + "°F")
    );
    $("#humidity").html(
      "<b>Humidity: </b>" + "" + (response.main.humidity + "%")
    );
    var iconurl =
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";
    $("#weather-image").attr("src", iconurl);
    // console.log(response.weather[0]);
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

    console.log(response.list[3].main.humidity);
    // $("#date1").text(response.list[3].main);
    // var results = response;
    // var date = new Date(results.dt * 1000).toLocaleDateString("en-US");
    console.log(date);
    // var forecastSearch = $("#searchInput").val().trim();
    // var localSearchHistory = JSON.parse(localStorage.getItem("date1"));
    // var localSearchHistory = getLocalSearchHistory;
    // $(forecastSearch).text(response.name);
    // displayForecast();
  });
}

// function displayForecast(forecast) {
//   $("#date1").text(response.list[3].main);
//   var storedForecast = JSON.parse(localStorage.getItem("date1"));
//   console.log(storedForecast);
//   if (storedForecast) {
//     forecastHistoryArray = storedForecast;
//   }
//   forecastHistoryArray.push(forecast);
//   localStorage.setItem("date1", JSON.stringify(forecastHistoryArray));
// }
// function createHistory(city) {
//   var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
//   if (storedCities) {
//     searchHistoryArray = storedCities;
//   }
//   searchHistoryArray.push(city);
//   localStorage.setItem("searchHistory", JSON.stringify(searchHistoryArray));
// }

// search history appears in the searchHistory
//click handlers

$("#searchButton").on("click", searchLocation);

//use lon and lat to get uv data somehow...
//loop through and objects, i+=7,
for (var j = 0; j < 5; j++) {}
$("#weather-container").show();

// UV index
// use another .then with an api call
// set item in local storage then get item
function displayHistory(event) {
  event.preventDefault();
  console.log(event);
  var localSearchHistory = JSON.parse(localStorage.getItem("search-history"));
  // var localSearchHistory = getLocalSearchHistory;
  $(citySearch).text(response.name);
  console.log(localSearchHistory);
  // if (getLocalSearchHistory === null) {
  //   createHistory();
  //   getLocalSearchHistory = localStorage.getItem("searchHistory");
  //   localSearchHistory = JSON.parse(getLocalSearchHistory);
  // }
  for (var i = 0; i < localSearchHistory.length; i++) {
    // add a list element to display history, local storage
    var historyInfo = $("<li>");
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
function createHistory(city) {
  var storedCities = JSON.parse(localStorage.getItem("searchHistory"));
  if (storedCities) {
    searchHistoryArray = storedCities;
  }
  // whatever you search for, add to the empty array, declared in variables
  searchHistoryArray.push(city);
  // initialize array, store
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

// trim... again what is the whitespace all about, works without trim... even though there is white space
// what the heck am i targeting? is it right
// for loop for every 4th index (index 3), call 12:00 for each day and display this
// local storage issue... not displaying when the page reloads
