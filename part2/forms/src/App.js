import React, { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([
  { name: "Arto Hellas", phone: "040-215-977" ,id: 1 },
  { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', phone: '12-43-234345', id:3 },
  { name: 'Mary Poppendieck', phone: '39-23-6423122', id:4 }]);
  const [newName, setNewName] = useState("");
  const [addPhone, setAddPhone] = useState("");
  const [contacts, setContacts] = useState("");
  
  const submit = (event) => {
    event.preventDefault();
    const nameObject = {
      name: newName,
      phone: addPhone,
      id: persons.length + 1,
    };
   
    const nameExists = persons.some((person) => person.name === newName);
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

  
    
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          Filter shown with: <input value={contacts} onChange={handleContacts}  /> 
          {searchContacts().map((person) => (
          <p key={person.id}>
            {person.name} : {person.phone}
          </p>
        ))}
      {console.log(contacts)}
    
        </div>

      <h2>Add a new</h2>
      <form onSubmit={submit}>
        <div>
          Name: <input value={newName} onChange={handleNewName} /> <br/><br/><br/>
          Number: <input value={addPhone} onChange={handleAddPhone} />
        </div>
        <br/>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map((value) => (
          <p key={value.id}>{value.name}: {value.phone}</p>
        ))}
      </div>
    </div>
  );
};

export default App;
