// https://api.openweathermap.org/data/2.5/forecast?q=Longmont&appid=2bfd37d5d2aa41c253c3db29c2f30228

var apiKey = "2bfd37d5d2aa41c253c3db29c2f30228";
var searchBtn = document.querySelector(".search-btn");
var input = document.getElementById("search-input");
var currentWeather = document.getElementById("current-weather");
var fiveDay = document.getElementById("5day-forecast");
var currentDate = moment().format("[Today is] dddd, MMMM Do YYYY, h:mm:ss a");
var uviColor = document.getElementById("current-uvindex");
const cities = [];

searchBtn.addEventListener("click", function (event) {
  // console.log(input.value);

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&units=imperial&appid=2bfd37d5d2aa41c253c3db29c2f30228`
  )
    .then((response) => {
    //   console.log(response);
      return response.json();
    })
    .then((data) => {
        //   console.log(data);
        var searchCity = data.name;
        var searchState = data.state;
        var searchLat = data.lat;
        var searchLon = data.lon;
        var weather = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + searchLat + '&lon=' + searchLon + '&appid=' + apiKey +'&units=imperial';
    });
});
