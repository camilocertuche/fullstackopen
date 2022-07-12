import React, { useEffect, useState } from "react";
import axios from "axios";

const CountryWeather = ({ country }) => {
  const [weather, setWeather] = useState();

  const buildUrl = (country) => {
    return `https://api.openweathermap.org/data/3.0/onecall?lat=${country.latlng[0]}&lon=${country.latlng[1]}&exclude=hourly,daily&appid=${process.env.REACT_APP_API_KEY}`;
  };

  useEffect(() => {
    axios
      .get(buildUrl(country))
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [country]);

  return (
    <div>
      {weather && (
        <>
          <h2>Weather in {country.capital[0]}</h2>
          <p>
            <b>Temperature:</b> {weather.current.temp} Celsius
          </p>
          <img
            src={`http://openweathermap.org/img/wn/${weather.current.weather[0].icon}.png`}
            alt={weather.current.weather[0].description}
          />
          <p>
            <b>Wind:</b> {weather.current.wind_speed} m/s direction{" "}
            {weather.current.wind_deg}
          </p>
        </>
      )}
    </div>
  );
};

export default CountryWeather;
