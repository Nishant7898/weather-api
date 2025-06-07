import React, { useState } from "react";
import './Weather.css';
import cloud from '../assets/cloud.png';
import forecast from '../assets/forecast.png';
import drizzle from '../assets/drizzle.png';
import snow from '../assets/snowflake.png';
import clear from '../assets/sun.png';
import rain from '../assets/rain.png';
import temperature from '../assets/hot.png'
import humidity from '../assets/humidity.png'
import wind from '../assets/wind.png'

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const API_KEY = "e3f07c67366c4acb942811a1e27cfc39"; // Your API key

  const getWeather = async () => {
    if (!city) return;
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod === 200) {
        setWeather(data);
      } else {
        setWeather(null);
        alert("City not found!");
      }
    } catch (error) {
      console.error("Error fetching weather:", error);
      alert("Failed to fetch weather data.");
    }
  };

  const getWeatherIcon = (main) => {
    switch (main.toLowerCase()) {
      case "clear":
        return clear;
      case "clouds":
        return cloud;
      case "snow":
        return snow;
      case "drizzle":
        return drizzle;
      case "rain":
        return rain;
      default:
        return forecast; // fallback icon
    }
  };

  return (
    <div className="weather-container">
      <h1>Weather Forecast</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={getWeather}>Get Weather</button>

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <img
            src={getWeatherIcon(weather.weather[0].main)}
            alt="weather icon"
            className="weather-icon"
          />
          <p>{weather.weather[0].description}</p>
          <p><img src={temperature} alt="" />   Temp: {weather.main.temp}°C</p>
          <p> <img src={humidity} alt="" />Humidity: {weather.main.humidity}%</p>
          <p><img src={wind} alt="" /> Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
