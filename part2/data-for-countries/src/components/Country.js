import React from "react";
import LanguageList from "./LanguageList";
import CountryImage from "./CountryImage";
import CountryDetails from "./CountryDetails";
import CountryWeather from "./CountryWeather";

const Country = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <CountryDetails country={country} />
      <LanguageList languages={country.languages} />
      <CountryImage country={country} />
      <CountryWeather country={country} />
    </div>
  );
};

export default Country;
