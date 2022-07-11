import React from "react";

const CountryDetails = ({ country }) => {
  return (
    <p>
      capital {country.capital} <br />
      area {country.area}
    </p>
  );
};

export default CountryDetails;
