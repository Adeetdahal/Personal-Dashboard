import React, { useState, useEffect } from "react";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Sunrise from '../../assets/sunrise.svg';
import Sunset from '../../assets/sunset.svg';


const WeatherWidget = () => {
  const [weather, setWeather] = useState(null);
  const [cityName, setCity] = useState("");
  const [locationError, setLocationError] = useState(false);
 
  useEffect(() => {
    fetchWeather(); // Fetch weather data when component mounts
  }, []);

  const fetchWeather = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          cityName 
          ? `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=c1a371b36f3b7f8176dfb3460a5d769e`
          : `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c1a371b36f3b7f8176dfb3460a5d769e`
        )
          .then((response) => response.json())
          .then((data) => {
            // Extract necessary data from the response
            const weatherData = {
              city: data.name,
              country: data.sys.country,
              temperature: Math.round(data.main.temp - 273.15), // Convert Kelvin to Celsius
              description: data.weather[0].description,
              humidity: data.main.humidity,
              windSpeed: data.wind.speed,
              main: data.weather[0].main,
              iconUrl: `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`,
              sunrise: data.sys.sunrise,
              sunset: data.sys.sunset,
            };
            setWeather(weatherData);
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
            setWeather(null); // Reset weather state in case of error
          });
      },
      (error) => {
        console.error("Error getting location:", error);
        setLocationError(true);
        setCity("Sydney"); // Fallback to Sydney if user doesn't allow location access
      }
    );
  };

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(); // Call fetchWeather function when the form is submitted
  };

  function convertUnixTimestampToTime(unixTimestamp) {
    const sunriseTime = new Date(unixTimestamp * 1000); // Convert UNIX timestamp to milliseconds and create Date object
    return sunriseTime.toLocaleTimeString(); // Convert Date object to local time string
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Weather</h1>

      <form onSubmit={handleSubmit}>
        <div class="mb-4 flex flex-wrap gap-5 py-3">
          <input
            class="shadow appearance-none border rounded max-w-[40%] min-w-[20%] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="cityName"
            type="text"
            placeholder="Enter city name"
            value={cityName}
            onChange={handleInputChange}
          />
          <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Get Weather
          </button>
        </div>
      </form>
      {locationError ? (
        <p>Failed to get your location. Showing weather for Sydney.</p>
      ) : (
        <>
          {weather ? (
            <div className="w-full p-4 shadow-md">
              <h2 className="text-xl font-bold flex items-center">
              <LocationOnIcon/> {weather.city}, {weather.country}
              </h2>
              <div className="flex w-full px-10 justify-evenly items-center">
              <div className="flex flex-row w-full justify-between">
                <div className="flex flex-col">
              <span className="text-xl font-bold">{weather.temperature}°C</span>
              <span>{weather.main}</span>
                </div>
              <span><img src={weather.iconUrl} alt={weather.description || ""} title={weather.description || ""} /></span>
              </div>
              <div className="px-5">
              <div class="inline-block h-[80px] min-h-[1em] w-0.5 self-stretch bg-gray-400"></div>
              </div>
              <div className="flex w-full justify-between">
                <div className="flex gap-2">
                <span><img width={50} src={Sunrise} alt={weather.description || ""} title={weather.description || ""} /></span>
                <div className="flex flex-col justify-between">
                <span className="text-sm">Sunrise</span>
                <span className="">{convertUnixTimestampToTime(weather.sunrise)}</span>
                </div>
                </div>
                <div className="flex gap-2">
                <span><img width={50} src={Sunset} alt={weather.description || ""} title={weather.description || ""} /></span>
                <div className="flex flex-col justify-between">
                <span className="text-sm">Sunset</span>
                <span className="">{convertUnixTimestampToTime(weather.sunset)}</span>
                </div>
                </div>
              </div>
              </div>
              {/* <p>Description: {weather.description}</p>
              <p>Humidity: {weather.humidity}%</p>
              <p>Wind Speed: {weather.windSpeed} m/s</p> */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherWidget;
