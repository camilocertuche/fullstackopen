import { useState } from "react";

const App = () => {
  const INITIAL_PERSONS = [
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ];

  const [persons, setPersons] = useState(INITIAL_PERSONS);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setfilter] = useState("");

  const filteredPersons =
    filter === ""
      ? persons
      : persons.filter(({ name }) =>
          name.toLowerCase().includes(filter.toLowerCase())
        );

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setfilter(event.target.value);
  };

  const nameExists = () => persons.find(({ name }) => name === newName);

  const numberExists = () => persons.find(({ number }) => number === newNumber);

  const handleSubmit = (event) => {
    event.preventDefault();
    let alreadyExists = false;

    if (nameExists()) {
      alert(`${newName} is already added to phonebook`);
      alreadyExists = true;
    }

    if (numberExists()) {
      alert(`${newNumber} is already added to phonebook`);
      alreadyExists = true;
    }

    if (!alreadyExists) {
      setPersons(persons.concat({ name: newName, number: newNumber }));
      setNewName("");
      setNewNumber("");
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with
        <input value={filter} onChange={handleFilterChange} />
      </div>

      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      {filteredPersons.map(({ name, number }) => (
        <p key={name}>
          {name} {number}
        </p>
      ))}
    </div>
  );
};

export default App;
