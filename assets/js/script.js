// Declare Variables
var APIkey = "d214e05ff0a5e0aef758d2675056c06c";
// var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?";
// var uviAPI = "https://api.openweathermap.org/data/2.5/uvi?lat=";
// var forecastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=";
// var geoAPI = navigator.geolocation to give access to a location, ask elena if I am implementing this correctly or if this is even necessary;
var getWeatherIcon = "http://openweathermap.org/img/wn/";

// var searchHistoryArray = [];
init();
function init() {
  $("#cityName-container").hide();
  // $("#fivedayForecast").hide();
  $("#currentForecast").hide();
  // $(".card").hide();
  $("#clearButton").hide();
}
// setTimeout(displayHistory(), 2000);
// setTimeout(function () {
//   displayHistory();
//   console.log("alert");
// }, 3000);
// var forecastHistoryArray = {};
//when they search a city, add to the
// console.log("hi);
// I just realized I made my HTML tags in JS format... I may fix this, I may just note to never do that in the future
// search for location
function searchLocation(event) {
  event.preventDefault();
  //.trim takes away white space... ask elena tonight
  var citySearch = $("#searchInput").val().trim();
  if (citySearch === "") {
    return;
  }
  var searchList = $("<p>").text(citySearch);
  $("#search-history").prepend(searchList);
  localStorage.setItem("search-history", citySearch);
  getWeather(citySearch);
  getForecast(citySearch);
  console.log(citySearch);
}

//call weather when the city is searched
function getWeather(search) {
  // only use .empty if you are creating elements
  // $("#current-weather-container").empty();
  // event.preventDefault();
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
    $("#currentForecast").show();
    $(".card").show();
    $("#current-city").text(response.name);
    // var searchList = $("<li>").text(response.name);
    // $("#search-history").prepend(searchList);
    $("#temperature").html(
      "<b>Temperature: </b>" + "" + (response.main.feels_like + "°F")
    );
    $("#humidity").html(
      "<b>Humidity: </b>" + "" + (response.main.humidity + "%")
    );
    $("#wind-speed").html(
      "<b>Wind Speed: </b>" + "" + (response.wind.speed + "MPH")
    );
    var iconurl =
      "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";

    $("#current-img").attr("src", iconurl);
    // clear this out everytime
    // $("#weather-image-container").attr("src", iconurl);
    // console.log(response.weather[0]);
    //five day forecast
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
    $("#five-day").empty();
    // var currentDate = $("#current-date");
    // var currentDay = new Date();
    // var month = months[new Date().getMonth()];
    // var date = currentDay.getDate();
    // currentDate.text(day + ", " + month + " " + date + "st");

    for (var i = 5; i < 40; i += 8) {
      // $("#fivedayForecast").show();
      // var forecastObj = {};
      var forecastResultsDate = response.list[i].dt_txt;
      console.log(forecastResultsDate);
      var forecastDate = new Date(forecastResultsDate).toLocaleDateString(
        "en-US"
      );
      var forecastTemp = response.list[i].main.temp;
      var forecastHumidity = response.list[i].main.humidity;

      console.log(forecastDate);
      console.log(forecastTemp);
      console.log(forecastHumidity);
      // var fivedayicon =
      //   "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";

      // $("#weatherImage1").attr("src", fivedayicon);
      // console.log(response.weather[0].icon);
      var dayDiv = $("<div>").addClass("col-lg mx-1");
      dayDiv.html(`
      <div class="card text-white bg-primary" id="day1">
          <div class="card-body">
            <h5 class="card-title" id="date1">${forecastDate}</h5>
            <div class="current-temp"><b>Temp: </b> ${forecastTemp}°F
            <div class="current-humidity"><b>Humidity: </b> ${forecastHumidity}%
              <img alt="day1-weatherImage" id="weatherImage1"/>
            </div>
            <p class="card-text" id="temp1"></p>
            <p class="card-text" id="humidity1"></p>
          </div>
        </div>
      `);

      $("#five-day").append(dayDiv);
    }
    // console.log(response.list[3].main.humidity);
  });
}

$("#searchButton").on("click", searchLocation);

//use lon and lat to get uv data somehow...
//loop through and objects, i+=7,
for (var j = 0; j < 5; j++) {}
$("#weather-container").show();

// UV index
// use another .then with an api call
// set item in local storage then get item
function displayHistory() {
  var localSearchHistory = localStorage.getItem("search-history");
  if (localSearchHistory) {
    getWeather(localSearchHistory);
    getForecast(localSearchHistory);
  }
}

displayHistory();

function clickHistory(event) {
  if (event.target.matches("p")) {
    var cityNameHistory = $(event.target).text();
    getWeather(cityNameHistory);
  } else {
    return;
  }
}
$("#search-history").on("click", clickHistory);

// trim... again what is the whitespace all about, works without trim... even though there is white space
// what the heck am i targeting? is it right
// for loop for every 4th index (index 3), call 12:00 for each day and display this
// local storage issue... not displaying when the page reloads
