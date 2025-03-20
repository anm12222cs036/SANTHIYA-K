const apiKey = "1e3e8f230b6064d27976e41163a82b77"; 
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search-box input");
const searchBtn = document.querySelector(".search-box button");
const weatherIcon = document.querySelector(".weather-details img");

async function checkWeather(city) {
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (response.status === 404) {
            alert("City not found!");
            return;
        }

        document.querySelector(".location h2").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp);
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".description").innerHTML = data.weather[0].description;

      
        weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        const date = new Date();
        document.querySelector(".location p").innerHTML = date.toLocaleDateString("en-US", {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("An error occurred while fetching weather data.");
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

// Initial weather check for a default city
window.addEventListener("load", () => {
    checkWeather("London");
});