import { useState } from "react";

const App = () => {
  const INITIAL_PERSONS = [{ name: "Arto Hellas", number: "040-123456" }];

  const [persons, setPersons] = useState(INITIAL_PERSONS);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
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
      {persons.map(({ name, number }) => (
        <p key={name}>
          {name} {number}
        </p>
      ))}
    </div>
  );
};

export default App;
