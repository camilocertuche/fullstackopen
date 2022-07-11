import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import SearchResult from "./components/SearchResult";

const URL = "https://restcountries.com/v3.1/all";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = selectedCountry
    ? countries.filter(({ name }) =>
        name.common
          .toLowerCase()
          .includes(selectedCountry.name.common.toLowerCase())
      )
    : countries.filter(({ name }) =>
        name.common.toLowerCase().includes(filter.toLowerCase())
      );

  useEffect(() => {
    axios.get(URL).then((reponse) => {
      setCountries(reponse.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setSelectedCountry(null);
    setFilter(event.target.value);
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setFilter("");
  };

  return (
    <>
      <Filter
        name="find countries"
        value={filter}
        onChange={handleFilterChange}
      />
      <SearchResult
        countries={filteredCountries}
        onSelectCountry={handleSelectCountry}
      />
    </>
  );
}

export default App;
