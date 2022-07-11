import React from "react";
import CountryListItem from "./CountryListItem";

const CountryList = ({ countries, onSelectCountry }) => {
  return (
    <>
      <table>
        <tbody>
          {countries.map((country) => (
            <CountryListItem
              key={country.name.common}
              country={country}
              onSelectCountry={onSelectCountry}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CountryList;
