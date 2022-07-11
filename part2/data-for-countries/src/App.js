import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import SearchResult from "./components/SearchResult";

const URL = "https://restcountries.com/v3.1/all";

function App() {
  const [filter, setFilter] = useState("");
  const [countries, setCountries] = useState([]);

  const filteredCountries = countries.filter(({ name }) =>
    name.common.toLowerCase().includes(filter.toLowerCase())
  );

  useEffect(() => {
    axios.get(URL).then((reponse) => {
      setCountries(reponse.data);
    });
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <>
      <Filter name="find countries" onChange={handleFilterChange} />
      <SearchResult countries={filteredCountries} />
    </>
  );
}

export default App;
