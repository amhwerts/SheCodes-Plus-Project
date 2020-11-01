        function searchCity(event) {
            event.preventDefault();
            let cityInput = document.querySelector("#search-text-input");
            let h2 = document.querySelector("h2");
            h2.innerHTML = `Current Weather in ${cityInput.value}`;
            let apiKey = "da530f5aaed37a0a9bea3a612727e5a6";
            let units = "imperial";
            let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=${units}`;

            axios.get(apiUrl).then(showTemperature);
        }

        function showTemperature(response) {
            console.log(response.data);
            console.log(response.data.main.temp);
            let temperature = Math.round(response.data.main.temp);
            let descriptionElement= document.querySelector("#descriptionWeather");
            let humidityElement=document.querySelector("#humidity");
            let windElement=document.querySelector("#windSpeed");
            let temperatureElement = document.querySelector("#temperature");
            temperatureElement.innerHTML = `${temperature}`;
            descriptionElement.innerHTML = response.data.weather[0].description;
            humidityElement.innerHTML = response.data.main.humidity;
            windElement.innerHTML=Math.round(response.data.wind.speed);

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

                axios.get(apiUrl).then(showTemperature) (updateTime);

            }
        function getCurrentPosition(){
            navigator.geolocation.getCurrentPosition(showPosition);
        }

        let form = document.querySelector("form");
        form.addEventListener("submit", searchCity);
        let currentLocationButton =document.querySelector("#current-location-button");
        currentLocationButton.addEventListener("click", getCurrentPosition);
        
        let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let currentDay = days[currentTime.getDay()];
let currentHour = currentTime.getHours();
let currentMinute = currentTime.getMinutes();
if (currentMinute < 10) {
  currentMinute = `0${currentMinute}`;
}
let date = document.querySelector("#time");
date.innerHTML = `as of ${currentDay} ${currentHour}:${currentMinute}`;
