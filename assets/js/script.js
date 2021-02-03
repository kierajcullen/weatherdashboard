// Declare Variables
var APIkey = "d214e05ff0a5e0aef758d2675056c06c";
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
  var queryUrl = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${APIkey}&units=imperial`;
  // get the variables back and do an api call to get lat/long... store in variables
  //  api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}
  $.ajax({
    url: queryUrl,
    method: "GET",
    //let's do this
  }).then(function (response) {
    console.log(response);
    var date = new Date(response.dt * 1000).toLocaleDateString("en-US");
    console.log(response.dt_txt);
    $("#current-date").text(date);
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
    var lat = response.coord.lat;
    console.log(lat);
    var lon = response.coord.lon;
    console.log(lon);
    getUVI(lat, lon);
  });
}

function getUVI(lat, lon) {
  var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${APIkey}`;
  $.ajax({
    url: queryURL,
    method: "GET",
    //let's do this
  }).then(function (response) {
    console.log(response);
    //uv index
    // color coordinate UV index
    // var uvi = ....value;
    $("#uv-index").html(
      "<b>UV Index: </b>" +
        '<span id="uv-color">' +
        response.current.uvi +
        "</span>"
    );
    var uvi = response.current.uvi;
    console.log(uvi);
    if (uvi < 3) {
      $("#uv-color").css("background-color", "green");
    } else if (uvi < 6) {
      $("#uv-color").css("background-color", "yellow");
    } else if (uvi < 8) {
      $("#uv-color").css("background-color", "orange");
    } else if (uvi < 11) {
      $("#uv-color").css("background-color", "red");
    } else {
      $("#uv-color").css("background-color", "white");
    }
  });
}

function getForecast(search) {
  // var queryURL = weatherAPI + "q=" + search + units + APIkey;
  var queryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=${APIkey}&units=imperial`;
  //  api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    console.log(response);
    $("#five-day").empty();

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

      var fivedayicon =
        "https://openweathermap.org/img/w/" +
        response.list[i].weather[0].icon +
        ".png";
      console.log(fivedayicon);
      console.log(response.list[i].weather[0].icon);

      var dayDiv = $("<div>").addClass("col-lg mx-1");
      dayDiv.html(`
      <div class="card text-white bg-primary" id="day1">
          <div class="card-body">
            <h5 class="card-title" id="date1">${forecastDate}</h5>
            <div class="current-temp"><b>Temp: </b> ${forecastTemp}°F
            <div class="current-humidity"><b>Humidity: </b> ${forecastHumidity}%
              <img alt="day1-weatherImage" id="weatherImage${i}" src="${fivedayicon}"/>
            </div>
            <p class="card-text" id="temp1"></p>
            <p class="card-text" id="humidity1"></p>
          </div>
        </div>
      `);
      // $(`#weatherImage${i}`).attr("src", fivedayicon);
      $("#five-day").append(dayDiv);
    }
    // console.log(response.list[3].main.humidity);
  });
}

$("#searchButton").on("click", searchLocation);

//loop through and objects, i+=7,
for (var j = 0; j < 5; j++) {}
$("#weather-container").show();

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
    getForecast(cityNameHistory);
  } else {
    return;
  }
}
$("#search-history").on("click", clickHistory);
