// https://api.openweathermap.org/data/2.5/forecast?q=Longmont&appid=2bfd37d5d2aa41c253c3db29c2f30228

var apiKey = "2bfd37d5d2aa41c253c3db29c2f30228";
var searchBtn = document.querySelector(".search-btn");
var input = document.getElementById("search-input");
var currentWeather = document.getElementById("current-weather");
var fiveDay = document.getElementById("5day-forecast");
var currentDate = moment().format("l");
var uviColor = document.getElementById("current-uvindex");
var currentSearch = document.getElementById("current-search");
var iconOne = document.getElementById("icon1");
var cities = [];

function start() {
    currentWeather.setAttribute("class", "hide");
    fiveDay.setAttribute("class", "hide");
}

searchBtn.addEventListener("click", function (event) {
    // console.log(input.value);
    event.preventDefault();

    fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${input.value}&appid=${apiKey}&units=imperial&appid=2bfd37d5d2aa41c253c3db29c2f30228`
    )
        .then((response) => {
            //   console.log(response);
            return response.json();
        })
        .then((data) => {
              console.log(data);
            var searchIcon = data.list[0].weather[0].icon;
            var searchCity = data.city.name;
            var searchLat = data.city.coord.lat;
            var searchLon = data.city.coord.lon;
            // variables for today's forecast
            var wiconEl = document.createElement('img');
            var iconToday = document.createElement('td');
            var tempToday = document.createElement('td');
            var humdityToday = document.createElement('td');
            var uviToday = document.createElement('td');
            var windToday = document.createElement('td');
            //variables for daily loop
            var dailyIcon = document.createElement('img');
            var dailyIcons = document.createElement('td');
            var dailyTemp = document.createElement('td');
            var dailyHumdity = document.createElement('td');
            var dailyWind = document.createElement('td');
            // variables for 5-day forecast loop
            var fiveIcons;
            var fiveTemp;
            var fiveWind;
            var fiveHumdity;
            // variables for dates of 5-day forecast
            var day1 = moment().add(1, 'days').format('l');
            var day2 = moment().add(2, 'days').format('l'); 
            var day3 = moment().add(3, 'days').format('l');
            var day4 = moment().add(4, 'days').format('l');
            var day5 = moment().add(5, 'days').format('l');
            
            
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${searchLat}&lon=${searchLon}&appid=${apiKey}&units=imperial`)
            .then((response) => {
                //   console.log(response);
                return response.json();
            })
            .then((data) => {
                document.getElementById("current-uvindex").textContent="UV Index: " +  data.current.uvi + " ";
            });
            // Weather Forecast for Today 
            document.getElementById("current-pic").src= `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}.png`;
            document.getElementById("current-temp").textContent=`Temp: ${data.list[0].main.temp} °F`;
            document.getElementById("current-wind").textContent=`Wind: ${data.list[0].wind.speed} MPH`;
            document.getElementById("current-humdity").textContent=`Humidity: ${data.list[0].main.humidity} %`;
        
            
            // Populate row of tables with Dates
            document.getElementById("day1").textContent = day1;
            document.getElementById("day2").textContent = day2;
            document.getElementById("day3").textContent = day3;
            document.getElementById("day4").textContent = day4;
            document.getElementById("day5").textContent = day5;

            for (var i = 1; i < 6; i++) { 
                //dynamic variables for 5-day forecast
                var icons = document.getElementById("icon"+ [i]);
                trTemp = '#temp'+ [i];
                trWind = '#wind'+ [i];
                trHumdity = '#humdity'+ [i];
                
               
            }
           
        })});

// start();
