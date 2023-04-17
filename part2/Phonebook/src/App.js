import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [addPhone, setAddPhone] = useState("");
  const [contacts, setContacts] = useState("");

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const submit = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      phone: addPhone,
      id: persons.length + 1,
    };

    const nameExists = persons.some(
      (person) => person.name.toLowerCase() === newName.toLowerCase()
    );  
    if (nameExists) {
      alert(`${newName} already exists in the phonebook!`);
    } else {
      setPersons(persons.concat(nameObject));
      setNewName("");
    }
  };
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };
  const handleContacts = (event) => {
    setContacts(event.target.value);
  };

  const handleAddPhone = (event) => {
    setAddPhone(event.target.value);
  };

  const searchContacts = () => {
    if (contacts.length === 0) {
      return [];
    }
    return persons.filter((value) =>
      value.name.toLowerCase().includes(contacts.toLowerCase())
    );
  };

  const Filter = () => {
    return (
      <div>
        {searchContacts().map((person) => (
          <p key={person.id}>
            {person.name} : {person.phone}
          </p>
        ))}
      </div>
    );
  };

  const ShowContacts = () => {
    return (
      <div>
        {persons.map((value) => (
          <p key={value.id}>
            {value.name}: {value.phone}
          </p>
        ))}
      </div>
    );
  };

 

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with: <input value={contacts} onChange={handleContacts} />
        <Filter />
      </div>

      <h2>Add a new</h2>
      <form onSubmit={submit}>
        <div>
          Name: <input value={newName} onChange={handleNewName} /> <br />
          <br />
          <br />
          Number: <input value={addPhone} onChange={handleAddPhone} />
        </div>
        <br />
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ShowContacts />
    </div>
  );
};

export default App;
