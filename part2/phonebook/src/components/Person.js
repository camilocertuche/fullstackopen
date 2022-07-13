const Person = ({ person, onDeletePerson }) => {
  const { name, number, id } = person;

  return (
    <p>
      {name} {number} <button onClick={() => onDeletePerson(id)}>delete</button>
    </p>
  );
};

export default Person;
