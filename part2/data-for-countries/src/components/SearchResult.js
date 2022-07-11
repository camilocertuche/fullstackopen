import React from "react";
import CountryList from "./CountryList";
import Country from "./Country";

const SearchResult = ({ countries, onSelectCountry }) => {
  if (countries.length === 0) {
    return <p>No matches</p>;
  }

  if (countries.length === 1) {
    const [country] = countries;
    return <Country country={country} />;
  }

  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  return (
    <CountryList countries={countries} onSelectCountry={onSelectCountry} />
  );
};

export default SearchResult;
