        function searchCity(event) {
            event.preventDefault();
            let cityInput = document.querySelector("#search-text-input");
            let h2 = document.querySelector("h2");
            h2.innerHTML = `Current Weather in ${cityInput.value}`;
            let apiKey = "da530f5aaed37a0a9bea3a612727e5a6";
            let units = "imperial";
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;

            axios.get(apiUrl).then(showTemperature);

            apiUrl=`https://api.openweathermap.org/data/2.5/forecast?q=${cityInput.value}&appid=${apiKey}&units=${units}`;
            axios.get(apiUrl).then(displayForecast)
        }
function formatDate(timestamp){
let date=new Date(timestamp);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[date.getDay()];

return `as of ${currentDay}, ${formatHours(timestamp)}`;
}
        function showTemperature(response) {
            console.log(response.data);
            console.log(response.data.main.temp);
            let temperature = Math.round(response.data.main.temp);
            let descriptionElement= document.querySelector("#descriptionWeather");
            let humidityElement=document.querySelector("#humidity");
            let windElement=document.querySelector("#windSpeed");
            let temperatureElement = document.querySelector("#temperature");
            let timeElement=document.querySelector("#time");
            let iconElement=document.querySelector("#currentIcon");
            fahrenheitTemperature=response.data.main.temp;
            temperatureElement.innerHTML = `${temperature}`;
            descriptionElement.innerHTML = response.data.weather[0].description;
            humidityElement.innerHTML = response.data.main.humidity;
            windElement.innerHTML=Math.round(response.data.wind.speed);
            timeElement.innerHTML=formatDate(response.data.dt*1000);
            iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
iconElement.setAttribute("alt", response.data.weather[0].description);
        }

function formatHours(timestamp){
    let date=new Date(timestamp);
let hours=date.getHours();
let minutes=date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;}
    return `${hours}:${minutes}`;
}

function displayForecast(response){
let forecastElement=document.querySelector("#hourlyForecast");
forecastElement.innerHTML=null;
let forecast=null;
for(let index=0; index<5; index++){
    forecast=response.data.list[index];
forecastElement.innerHTML+=`
<div class="card" id="forecastRow">
<div class="row">
                <div class="col-3">${formatHours(forecast.dt*1000)}</div>
                <div><img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" class="col-5" id="icon"></div>
                <div class="col-3" id="highTempOne">H: ${Math.round(forecast.main.temp_max)}°F</div>
                <div class="col-3" id="lowTempOne">L: ${Math.round(forecast.main.temp_min)}°F</div>
            </div>
            </div>`
}
        }


        function showPosition(position) {
                console.log(position);
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                let h2 = document.querySelector("h2");
                h2.innerHTML = `Weather in Current Location`;
                let apiKey = "da530f5aaed37a0a9bea3a612727e5a6";
                let units = "imperial";
                let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

                axios.get(apiUrl).then(showTemperature);
               
                apiUrl=`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
            axios.get(apiUrl).then(displayForecast)

            }
        function getCurrentPosition(){
            navigator.geolocation.getCurrentPosition(showPosition);
        }

        let form = document.querySelector("form");
        form.addEventListener("submit", searchCity);
        let currentLocationButton =document.querySelector("#current-location-button");
        currentLocationButton.addEventListener("click", getCurrentPosition);
        
function showCelsiusTemperature(event){
    event.preventDefault();
    let temperatureElement=document.querySelector("#temperature");
    let celsiusTemperature=(fahrenheitTemperature - 32) * 5/9;
    temperatureElement.innerHTML=Math.round(celsiusTemperature);
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");

}
function showfahrenheitTemperature(event){
    event.preventDefault();
        let temperatureElement=document.querySelector("#temperature");
    temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
        fahrenheitLink.classList.add("active");
        celsiusLink.classList.remove("active");
}
let fahrenheitTemperature=null;
let celsiusLink=document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);
let fahrenheitLink=document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showfahrenheitTemperature);
