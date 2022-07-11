import React from "react";

const CountryListItem = ({ country, onSelectCountry }) => {
  const handleClick = () => {
    onSelectCountry(country);
  };

  return (
    <tr>
      <td>
        {country.name.common}
        <button onClick={handleClick}>Show</button>
      </td>
    </tr>
  );
};

export default CountryListItem;
