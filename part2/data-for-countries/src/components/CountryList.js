import React from "react";

const CountryList = ({ countries }) => {
  return (
    <>
      <table>
        <tbody>
          {countries.map(({ name }) => (
            <tr key={name.common}>
              <td>{name.common} </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default CountryList;
