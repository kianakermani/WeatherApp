//date
let time = new Date();
let hour = time.getHours();
if (hour < 10 && hour >= 0) {
  hour = `0${hour}`;
}
let minute = time.getMinutes();
if (minute < 10 && minute >= 0) {
  minute = `0${minute}`;
}
let day = time.getDay();
day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let date = time.getDate();
let month = time.getMonth();
month = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let dateAndTime = document.querySelector("#date");
dateAndTime.innerHTML = `${date} ${month[time.getMonth()]} , 
${day[time.getDay()]}  ${hour}:${minute}`;

let apiKey = "a7d04d98e6479d4721e721b7181dac56";
let apiAqi = "1f4cba53146181e48c2aeb1f4746903446e654a4";

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ];

  return days[day + 1];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <br>
          <span class="weather-forecast-temperature-min">  ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=a2dda52dce059eb8a14e95aaa0db6ab7&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(weather) {
  document.querySelector("#description").innerHTML =
    weather.data.weather[0].description;
  document.querySelector("#feelslike").innerHTML = Math.round(
    weather.data.main.feels_like
  );
  document.querySelector("#degree").innerHTML = Math.round(
    weather.data.main.temp
  );
  document.querySelector("#tempHigh").innerHTML = Math.round(
    weather.data.main.temp_max
  );
  document.querySelector("#tempLow").innerHTML = Math.round(
    weather.data.main.temp_min
  );
  document.querySelector("#humidity").innerHTML = weather.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    weather.data.wind.speed
  );
  document
    .querySelector("#todayIcon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`
    );

  getForecast(weather.data.coord);
}
function showAqi(Aqi) {
  document.querySelector("#aqi").innerHTML = Aqi.data.data.aqi;
}
function search(city) {
  let cityName = document.querySelector("#city");
  city = city.trim();
  city = city.charAt(0).toUpperCase() + city.slice(1);
  cityName.innerHTML = city;
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a7d04d98e6479d4721e721b7181dac56&units=metric`;
  let apiPollution = `https://api.waqi.info/feed/${city}/?token=1f4cba53146181e48c2aeb1f4746903446e654a4`;
  axios.get(apiUrlCity).then(showWeather);
  axios.get(apiPollution).then(showAqi);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityelement = document.querySelector("#city-input");
  search(cityelement.value);
}

let citySearch = document.getElementById("citySearch");
citySearch.addEventListener("submit", handleSubmit);

search("Tehran");
//longitude & latitude
function showCurrentLocation() {
  function showPosition(position) {
    let lon = position.coords.longitude;
    let lat = position.coords.latitude;

    let apiUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    let apiUrlCurrentAqi = `https://api.waqi.info/feed/geo:${lat};${lon}/?token=1f4cba53146181e48c2aeb1f4746903446e654a4`;

    function showCurrentPosition(currentPosition) {
      console.log(currentPosition);
      let cityName = document.querySelector("#city");
      cityName.innerHTML = currentPosition.data.name;

      document.querySelector("#description").innerHTML =
        currentPosition.data.weather[0].description;
      document.querySelector("#feelslike").innerHTML = Math.round(
        currentPosition.data.main.feels_like
      );
      document.querySelector("#degree").innerHTML = Math.round(
        currentPosition.data.main.temp
      );
      document.querySelector("#tempHigh").innerHTML = Math.round(
        currentPosition.data.main.temp_max
      );
      document.querySelector("#tempLow").innerHTML = Math.round(
        currentPosition.data.main.temp_min
      );
      document.querySelector("#humidity").innerHTML =
        currentPosition.data.main.humidity;
      document.querySelector("#wind").innerHTML = Math.round(
        currentPosition.data.wind.speed
      );
      document
        .querySelector("#todayIcon")
        .setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${currentPosition.data.weather[0].icon}@2x.png`
        );
    }
    function showCurrentAqi(currentAqi) {
      document.querySelector("#aqi").innerHTML = currentAqi.data.data.aqi;
    }

    axios.get(apiUrlCurrent).then(showCurrentPosition);
    axios.get(apiUrlCurrentAqi).then(showCurrentAqi);
  }
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#currentbtn");
currentLocation.addEventListener("click", showCurrentLocation);
