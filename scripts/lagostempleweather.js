
// ..............WEATHER FORCASTING OBJECT.............................................................

import { getWeather } from "./weather.mjs";

const currentTemperature = document.querySelector("#current-temp");
const weatherIcon = document.querySelector("#weather-icon");
const captionDesc = document.querySelector("figcaption");
const forecastContainer = document.querySelector("#forecast");


async function displayWeather() {

    try {

        const { current, forecast } = await getWeather();

        //......................... CURRENT WEATHER............................
        currentTemperature.innerHTML =
            `${current.main.temp}&deg;C`;

        const currentIcon =
            `https://openweathermap.org/img/w/${current.weather[0].icon}.png`;

        const currentDescription =
            current.weather[0].description;

        weatherIcon.src = currentIcon;

        weatherIcon.alt =
            `Weather condition: ${currentDescription}`;

        captionDesc.textContent =
            currentDescription;



        // ..........4-DAY FORECAST.........................................
        forecastContainer.innerHTML = "";

        // Select the forecast entries at 12:00
        const dailyForecast = forecast.list.filter(item => {
            return item.dt_txt.includes("12:00:00");
        });

        console.log("Noon forecasts:", dailyForecast);

        // Display the first three forecasts
        dailyForecast.slice(0, 4).forEach(forecastItem => {

            const forecastDate =
                new Date(forecastItem.dt * 1000);

            const forecastIcon =
                `https://openweathermap.org/img/w/${forecastItem.weather[0].icon}.png`;

            const forecastDescription =
                forecastItem.weather[0].description;

            // Probability of precipitation........................
            const rainProbability =
                Math.round(forecastItem.pop * 100);

            // Wind speed..........................................
            const windSpeed =
                forecastItem.wind.speed;


            const forecastHtml = `
        <div class="forecast-card">

            <h3>
                ${forecastDate.toDateString()}
            </h3>

            <img
                src="${forecastIcon}"
                alt="${forecastDescription}"
            >

            <p>
                <strong>
                    ${forecastItem.main.temp}&deg;C
                </strong>
            </p>

            <p>
                ${forecastDescription}
            </p>

            <p>
                🌧️ Rain probability:
                <strong>${rainProbability}%</strong>
            </p>

            <p>
                💨 Wind speed:
                <strong>${windSpeed} m/s</strong>
            </p>

        </div>
    `;

            forecastContainer.innerHTML += forecastHtml;
        });

    } catch (error) {

        console.error(
            "Unable to display weather:",
            error
        );
    }
}

displayWeather();



//.........................SITE VISIT LOCAL STORAGE......................
let current = Date.now();
let previousVisit = window.localStorage.getItem("lastVisit");
localStorage.setItem("lastVisit", current);

let message;
if (!previousVisit) {
    message = "You are Welcome!";
} else {
    let daysDifference = (current - previousVisit) / 86400000;
    if (daysDifference < 1) {
        message = "Welcome! Back so soon. Awesome!";
    } else if (daysDifference === 1) {
        message = "Welcome! You visited 1-day ago.";
    } else {
        message = `Welcome! You visited ${daysDifference.toFixed(0)} days ago.`;
    }
}

document.getElementById("visit-message").textContent = message;
document.getElementById("visitor-info").style.display = "flex";

document.getElementById("close-btn").addEventListener("click", () => {
    document.getElementById("visitor-info").style.display = "none";
});

