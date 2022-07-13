import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setfilter] = useState("");

  useEffect(() => {
    personService.getAll().then((personList) => {
      setPersons(personList);
    });
  }, []);

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

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (!window.confirm(`Delete ${person.name}?`)) return;

    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const clearInputs = () => {
    setNewName("");
    setNewNumber("");
  };

  const buildConfirmMessage = (name) => {
    return `${name} is already added to phonebook. Replace the old number with a new one?`;
  };

  const editPerson = (editedPerson) => {
    if (!window.confirm(buildConfirmMessage(editedPerson.name))) {
      return;
    }

    personService
      .update(editedPerson.id, editedPerson)
      .then((updatedPerson) => {
        setPersons(
          persons.map((person) =>
            person.id !== editedPerson.id ? person : updatedPerson
          )
        );
      })
      .catch((error) => {
        console.log(error);
      });

    clearInputs();
  };

  const addPerson = (newPerson) => {
    personService
      .create(newPerson)
      .then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
      })
      .catch(() => {
        alert(`There was an error adding the person ${newPerson.name}`);
      });
  };

  const findPersonByName = () => persons.find(({ name }) => name === newName);

  const findPersonByNumber = () =>
    persons.find(({ number }) => number === newNumber);

  const handleSubmit = (event) => {
    event.preventDefault();
    let alreadyExists = false;

    if (!newName || !newNumber) {
      alert("Name and number are required");
      return;
    }

    const person = findPersonByName();
    if (person && person.number !== newNumber) {
      editPerson({ ...person, number: newNumber });
      alreadyExists = true;
    }

    if (findPersonByNumber()) {
      alert(`${newNumber} is already added to phonebook`);
      alreadyExists = true;
    }

    if (!alreadyExists) {
      addPerson({ name: newName, number: newNumber });
      clearInputs();
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />

      <h2>Phonebook</h2>
      <Form
        name={newName}
        number={newNumber}
        onSubmit={handleSubmit}
        onNameChange={handleNameChange}
        onNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} onDeletePerson={deletePerson} />
    </div>
  );
};

export default App;
