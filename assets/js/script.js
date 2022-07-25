// https://api.openweathermap.org/data/2.5/forecast?q=Longmont&appid=2bfd37d5d2aa41c253c3db29c2f30228

var apiKey = "2bfd37d5d2aa41c253c3db29c2f30228";
var searchBtn = document.querySelector(".search-btn");
var clearBtn = document.getElementById("clear-btn");
var cityInput = document.getElementById("search-input");
var currentWeather = document.getElementById("current-weather");
var fiveDay = document.getElementById("5day-forecast");
var currentDate = moment().format("l");
var uviColor = document.getElementById("current-uvindex");
var currentSearch = document.getElementById("current-search");
var iconOne = document.getElementById("icon1");
var currentUvindex = document.getElementById("current-uvindex");
var cities = [];

searchBtn.addEventListener("click", function (event) {
  // console.log(input.value);
  event.preventDefault();

  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${apiKey}&units=imperial&appid=2bfd37d5d2aa41c253c3db29c2f30228`
  )
    .then((response) => {
      //   console.log(response);
      return response.json();
    })
    .then((data) => {
      console.log(data);
      // var searchIcon = data.list[0].weather[0].icon;
      // var searchCity = data.city.name;
      var searchLat = data.city.coord.lat;
      var searchLon = data.city.coord.lon;
      // 5day forecast vars for textContent add later
      var day1 = moment().add(1, "days").format("l");
      var day2 = moment().add(2, "days").format("l");
      var day3 = moment().add(3, "days").format("l");
      var day4 = moment().add(4, "days").format("l");
      var day5 = moment().add(5, "days").format("l");

      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${searchLat}&lon=${searchLon}&appid=${apiKey}&units=imperial`
      )
        .then((response) => {
          //   console.log(response);
          return response.json();
        })
        .then((data) => {
          document.getElementById("current-uvindex").textContent =
            "UV Index: " + data.current.uvi + " ";
          // Setting color for uv index
          var uviColor = data.current.uvi;
          if (uviColor <= 2) {
            currentUvindex.setAttribute("class", "uviMinimal");
          } else if (uviColor > 2 && uviColor <= 5) {
            currentUvindex.setAttribute("class", "uviLow");
          } else if (uviColor > 5 && uviColor <= 7) {
            currentUvindex.setAttribute("class", "uviModerate");
          } else if (uviColor > 7 && uviColor <= 10) {
            currentUvindex.setAttribute("class", "uviHigh");
          } else {
            currentUvindex.setAttribute("class", "uviExtreme");
          }
        });

      // Weather Forecast for current day
      document.getElementById(
        "current-pic"
      ).src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
      document.getElementById(
        "current-temp"
      ).textContent = `Temp: ${data.list[0].main.temp} °F`;
      document.getElementById(
        "current-wind"
      ).textContent = `Wind: ${data.list[0].wind.speed} MPH`;
      document.getElementById(
        "current-humdity"
      ).textContent = `Humidity: ${data.list[0].main.humidity} %`;

      //Add dates of 5 day forecast using the vars above
      document.getElementById("day1").textContent = day1;
      document.getElementById("day2").textContent = day2;
      document.getElementById("day3").textContent = day3;
      document.getElementById("day4").textContent = day4;
      document.getElementById("day5").textContent = day5;

      for (var i = 1; i < 6; i++) {
        //Automatically, using a for loop,  update the 5day forecast without having to call each day separately
        var icons = document.getElementById("pic" + [i]);
        var temp = document.getElementById("temp" + [i]);
        var wind = document.getElementById("wind" + [i]);
        var humdity = document.getElementById("humdity" + [i]);
        // console.log(icons)
        // console.log(i)

        dailycurrentIcon = data.list[i].weather[0].icon;
        dailyIcons = `https://openweathermap.org/img/wn/${dailycurrentIcon}.png`;
        icons.src = dailyIcons;

        temp.textContent = data.list[i].main.temp + " °F";

        wind.textContent = data.list[i].wind.speed + " MPH";

        humdity.textContent = data.list[i].main.humidity + " %";
      }
    });

  cities.push(cityInput.value);
  localStorage.setItem("cities", JSON.stringify(cities));
  var cityArr = JSON.parse(localStorage.getItem("cities"));

  var history = document.getElementById("history");
  var li = document.createElement("button");
  var city = cityArr.length - 1;

  li.setAttribute("class", "btn-secondary m-2");
  li.textContent = cityArr[city];
  history.appendChild(li);

  li.addEventListener("click", function () {
    var searchHistoryInput = this.textContent;
    // console.log(searchHistoryInput);
    // Copyied and pasted entire fetch from above to print weather info to page again
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${searchHistoryInput}&appid=${apiKey}&units=imperial&appid=2bfd37d5d2aa41c253c3db29c2f30228`
    )
      .then((response) => {
        //   console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // var searchIcon = data.list[0].weather[0].icon;
        // var searchCity = data.city.name;
        var searchLat = data.city.coord.lat;
        var searchLon = data.city.coord.lon;
        // 5day forecast vars for textContent add later
        var day1 = moment().add(1, "days").format("l");
        var day2 = moment().add(2, "days").format("l");
        var day3 = moment().add(3, "days").format("l");
        var day4 = moment().add(4, "days").format("l");
        var day5 = moment().add(5, "days").format("l");

        fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${searchLat}&lon=${searchLon}&appid=${apiKey}&units=imperial`
        )
          .then((response) => {
            //   console.log(response);
            return response.json();
          })
          .then((data) => {
            document.getElementById("current-uvindex").textContent =
              "UV Index: " + data.current.uvi + " ";
            // Setting color for uv index
            var uviColor = data.current.uvi;
            if (uviColor <= 2) {
              currentUvindex.setAttribute("class", "uviMinimal");
            } else if (uviColor > 2 && uviColor <= 5) {
              currentUvindex.setAttribute("class", "uviLow");
            } else if (uviColor > 5 && uviColor <= 7) {
              currentUvindex.setAttribute("class", "uviModerate");
            } else if (uviColor > 7 && uviColor <= 10) {
              currentUvindex.setAttribute("class", "uviHigh");
            } else {
              currentUvindex.setAttribute("class", "uviExtreme");
            }
          });

        // Weather Forecast for current day
        document.getElementById(
          "current-pic"
        ).src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
        document.getElementById(
          "current-temp"
        ).textContent = `Temp: ${data.list[0].main.temp} °F`;
        document.getElementById(
          "current-wind"
        ).textContent = `Wind: ${data.list[0].wind.speed} MPH`;
        document.getElementById(
          "current-humdity"
        ).textContent = `Humidity: ${data.list[0].main.humidity} %`;

        //Add dates of 5 day forecast using the vars above
        document.getElementById("day1").textContent = day1;
        document.getElementById("day2").textContent = day2;
        document.getElementById("day3").textContent = day3;
        document.getElementById("day4").textContent = day4;
        document.getElementById("day5").textContent = day5;

        for (var i = 1; i < 6; i++) {
          //Automatically, using a for loop,  update the 5day forecast without having to call each day separately
          var icons = document.getElementById("pic" + [i]);
          var temp = document.getElementById("temp" + [i]);
          var wind = document.getElementById("wind" + [i]);
          var humdity = document.getElementById("humdity" + [i]);
          // console.log(icons)
          // console.log(i)

          dailycurrentIcon = data.list[i].weather[0].icon;
          dailyIcons = `https://openweathermap.org/img/wn/${dailycurrentIcon}.png`;
          icons.src = dailyIcons;

          temp.textContent = data.list[i].main.temp + " °F";

          wind.textContent = data.list[i].wind.speed + " MPH";

          humdity.textContent = data.list[i].main.humidity + " %";
        }
      });
  });
  // Clear search history function and reload page automatically
  function clearHistory() {
    window.localStorage.clear();
    window.location.reload();
  }

  // Call functions
  clearBtn.addEventListener("click", clearHistory);
});
