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
// search engine
let apiKey = "a7d04d98e6479d4721e721b7181dac56";
let apiAqi = "1f4cba53146181e48c2aeb1f4746903446e654a4";

function showWeather(weather) {
  celsiusTemperature = weather.data.main.temp;
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

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

function handleSubmit(event) {
  event.preventDefault();
  let cityelement = document.querySelector("#city-input");
  search(cityelement.value);
}

let citySearch = document.getElementById("citySearch");
citySearch.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
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
