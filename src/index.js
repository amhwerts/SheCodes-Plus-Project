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
            let temperatureElement = document.querySelector("#temperature");
            temperatureElement.innerHTML = `${temperature}`;
        }
        function showPosition(position) {
                console.log(position);
                let lat = position.coords.latitude;
                let lon = position.coords.longitude;
                let h2 = document.querySelector("h2");
                h2.innerHTML = `Current Weather in Current Location`;
                let apiKey = "da530f5aaed37a0a9bea3a612727e5a6";
                let units = "imperial";
                let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

                axios.get(apiUrl).then(showTemperature);

            }
        function getCurrentPosition(){
            navigator.geolocation.getCurrentPosition(showPosition);
        }

        let form = document.querySelector("form");
        form.addEventListener("submit", searchCity);
        let currentLocationButton =document.querySelector("#current-location-button");
        currentLocationButton.addEventListener("click", getCurrentPosition);
        