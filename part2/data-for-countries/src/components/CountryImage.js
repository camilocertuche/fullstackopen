import React from "react";

const CountryImage = ({ country }) => {
  return (
    <img
      src={country.flags.svg}
      alt={`Flag of ${country.name.common}`}
      width="120"
    />
  );
};

export default CountryImage;
