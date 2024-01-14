import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./Nav.jsx";
import WEATHER_API_KEY from "./apikey.js";

// Function to convert temperature from Fahrenheit to Celsius
const convertToFahrenheit = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=${WEATHER_API_KEY}`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });

      setLocation("");
    }
  };

  return (
    <div className="app">
      <Navbar />
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? (
              <h1>{convertToFahrenheit(data.main.temp).toFixed()}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
          <div className="icon">
            {data.weather && data.weather[0].icon && (
              <img
                className="weather-icon"
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                alt={data.weather[0].description}
              />
            )}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <p>Feels Like</p>

            <div className="feels">
              {data.main ? (
                <p className="bold">
                  {convertToFahrenheit(data.main.feels_like).toFixed()}°C
                </p>
              ) : null}
            </div>
            <div className="humidity">
              <p>Humidity</p>

              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
            </div>
            <div className="wind">
              <p>Wind Speed</p>

              {data.wind ? (
                <p className="bold">{data.wind.speed.toFixed()} MPH</p>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
