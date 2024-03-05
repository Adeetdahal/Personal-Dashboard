import React, { useState, useEffect } from 'react';

const WeatherWidget = ({cityName, countryCode}) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName},${countryCode}&appid=c1a371b36f3b7f8176dfb3460a5d769e`)
      .then(response => response.json())
      .then(data => {
        // Extract necessary data from the response
        const weatherData = {
          city: data.name,
          country: data.sys.country,
          temperature: Math.round(data.main.temp - 273.15), // Convert Kelvin to Celsius
          description: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
        };
        setWeather(weatherData);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
        setWeather(null); // Reset weather state in case of error
      });
  }, []);

  return (
    <div>
      {weather ? (
        <div>
          <h2>Weather in {weather.city}, {weather.country}</h2>
          <p>Temperature: {weather.temperature}°C</p>
          <p>Description: {weather.description}</p>
          <p>Humidity: {weather.humidity}%</p>
          <p>Wind Speed: {weather.windSpeed} m/s</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
