const API_KEY = "2b076b89deb5d8cef26a23a24963acce";
const LAT = 6.44;
const LON = 3.43;

const currentWeatherUrl =
    `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;

const forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${API_KEY}`;


async function getCurrentWeather() {
    const response = await fetch(currentWeatherUrl);

    if (!response.ok) {
        throw new Error(`Current weather error: ${response.status}`);
    }

    return await response.json();
}


async function getForecast() {
    const response = await fetch(forecastUrl);

    if (!response.ok) {
        throw new Error(`Forecast error: ${response.status}`);
    }

    return await response.json();
}


async function getWeather() {
    try {
        const [current, forecast] = await Promise.all([
            getCurrentWeather(),
            getForecast()
        ]);

        return {
            current,
            forecast
        };

    } catch (error) {
        console.error("Weather API error:", error);
        throw error;
    }
}


export {
    getCurrentWeather,
    getForecast,
    getWeather
};


