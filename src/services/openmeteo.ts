import { fetchWeatherApi } from "openmeteo";

const params = {
    latitude: -34.9033,
    longitude: -56.1882,
    daily: ["temperature_2m_max", "temperature_2m_min", "apparent_temperature_max", "apparent_temperature_min", "sunrise", "sunset", "uv_index_max", "precipitation_sum", "precipitation_hours", "precipitation_probability_max"],
    hourly: ["temperature_2m", "precipitation"],
    timezone: "America/Sao_Paulo",
};

const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);

// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const latitude = response.latitude();
const longitude = response.longitude();
const elevation = response.elevation();
const timezone = response.timezone();
const timezoneAbbreviation = response.timezoneAbbreviation();
const utcOffsetSeconds = response.utcOffsetSeconds();

console.log(
    `\nCoordinates: ${latitude}°N ${longitude}°E`,
    `\nElevation: ${elevation}m asl`,
    `\nTimezone: ${timezone} ${timezoneAbbreviation}`,
    `\nTimezone difference to GMT+0: ${utcOffsetSeconds}s`,
);

const hourly = response.hourly()!;
const daily = response.daily()!;

// Define Int64 variables so they can be processed accordingly
const sunrise = daily.variables(4)!;
const sunset = daily.variables(5)!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
    hourly: {
        time: Array.from(
            { length: (Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval() }, 
            (_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
        ),
        temperature_2m: hourly.variables(0)!.valuesArray(),
        precipitation: hourly.variables(1)!.valuesArray(),
    },
    daily: {
        time: Array.from(
            { length: (Number(daily.timeEnd()) - Number(daily.time())) / daily.interval() }, 
            (_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
        ),
        temperature_2m_max: daily.variables(0)!.valuesArray(),
        temperature_2m_min: daily.variables(1)!.valuesArray(),
        apparent_temperature_max: daily.variables(2)!.valuesArray(),
        apparent_temperature_min: daily.variables(3)!.valuesArray(),
        // Map Int64 values to according structure
        sunrise: [...Array(sunrise.valuesInt64Length())].map(
            (_, i) => new Date((Number(sunrise.valuesInt64(i)) + utcOffsetSeconds) * 1000)
        ),
        // Map Int64 values to according structure
        sunset: [...Array(sunset.valuesInt64Length())].map(
            (_, i) => new Date((Number(sunset.valuesInt64(i)) + utcOffsetSeconds) * 1000)
        ),
        uv_index_max: daily.variables(6)!.valuesArray(),
        precipitation_sum: daily.variables(7)!.valuesArray(),
        precipitation_hours: daily.variables(8)!.valuesArray(),
        precipitation_probability_max: daily.variables(9)!.valuesArray(),
    },
};

export default weatherData;