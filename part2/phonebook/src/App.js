import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Persons from "./components/Persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setfilter] = useState("");
  const [message, setMessage] = useState(null);
  const [notificationType, setNotificationType] = useState("success");

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

  const showNotification = (message, newNotificationType) => {
    setMessage(message);
    setNotificationType(newNotificationType);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const deletePerson = (id) => {
    const person = persons.find((person) => person.id === id);
    if (!window.confirm(`Delete ${person.name}?`)) return;

    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        showNotification(`Deleted ${person.name}`, "success");
      })
      .catch((error) => {
        showNotification(`Error deleting ${person.name}`, "error");
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
        showNotification(`Updated ${updatedPerson.name}`, "success");
      })
      .catch(() => {
        showNotification(
          `Information of ${editedPerson.name} has already been removed from server`,
          "error"
        );
      });

    clearInputs();
  };

  const addPerson = (newPerson) => {
    personService
      .create(newPerson)
      .then((addedPerson) => {
        setPersons(persons.concat(addedPerson));
        showNotification(`Added ${newPerson.name}`, "success");
      })
      .catch(() => {
        showNotification(
          `There was an error adding the person ${newPerson.name}`,
          "error"
        );
      });
  };

  const findPersonByName = () => persons.find(({ name }) => name === newName);

  const findPersonByNumber = () =>
    persons.find(({ number }) => number === newNumber);

  const handleSubmit = (event) => {
    event.preventDefault();
    let alreadyExists = false;

    if (!newName || !newNumber) {
      showNotification("Name and number are required", "error");
      return;
    }

    const person = findPersonByName();
    if (person && person.number !== newNumber) {
      editPerson({ ...person, number: newNumber });
      alreadyExists = true;
    }

    if (findPersonByNumber()) {
      showNotification(`${newNumber} is already added to phonebook`, "error");
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
      <Notification message={message} notificationType={notificationType} />
      <Filter value={filter} onChange={handleFilterChange} />

      <h2>Add a new</h2>
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
