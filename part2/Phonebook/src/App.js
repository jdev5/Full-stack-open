import { useState, useEffect } from "react";
import personService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [addPhone, setAddPhone] = useState("");
  const [contacts, setContacts] = useState("");

  // Get initial contacts when the application loads
  useEffect(() => {
    personService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

  // Function to handle form submission
  const submit = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
      phone: addPhone,
    };

    // Check if the new name is valid before calling toLowerCase()
    if (newName && newName.trim().length > 0) {
      // Check if the new contact already exists in the current contact list
      const contactIndex = persons.findIndex(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );

      if (contactIndex >= 0) {
        // If the contact already exists, show a confirmation to the user
        const shouldUpdate = window.confirm(
          `${newName} already exists in the contact list. Do you want to update the phone number?`
        );

        if (shouldUpdate) {
          // If the user confirms the update, call the update function of the service
          const contactToUpdate = persons[contactIndex];
          personService
            .updateContact(contactToUpdate.id, newObject)
            .then((updatedContact) => {
              // Update the state of persons with the updated contact
              setPersons(
                persons.map((person) =>
                  person.id === updatedContact.id ? updatedContact : person
                )
              );
              setNewName("");
              setAddPhone("");
            })
            .catch((error) => {
              // Handle errors in contact update
              console.error("Failed to update contact:", error);
            });
        }
      } else {
        // If the contact doesn't exist, add a new contact
        personService.addContact(newObject).then((addedContact) => {
          // Update the state of persons with the newly added contact
          setPersons(persons.concat(addedContact));
          setNewName("");
          setAddPhone("");
        });
      }
    } else {
      alert("Please enter a valid name!");
    }
  };

  // Function to handle changes in the contacts search input
  const handleContacts = (event) => {
    setContacts(event.target.value);
  };

  // Function to handle changes in the new name input
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  // Function to handle changes in the new phone number input
  const handleAddPhone = (event) => {
    setAddPhone(event.target.value);
  };

  // Function to filter contacts based on the search value
  const searchContacts = () => {
    if (contacts.length === 0) {
      return [];
    }
    return persons.filter(
      (value) =>
        value.name && value.name.toLowerCase().includes(contacts.toLowerCase())
    );
  };

  // Component to display filtered contacts
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

  // Component for displaying contacts
  const ShowContacts = () => {
    // Function to handle deletion of a contact
    const handleDelete = (id) => {
      // Show confirmation dialog
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this contact?"
      );
      if (confirmDelete) {
        // Call the service function to delete a contact
        personService.deleteContact(id).then(() => {
          // Update the state of persons by filtering out the deleted contact
          setPersons(persons.filter((person) => person.id !== id));
        });
      }
    };

    return (
      <div>
        {persons.map((value) => (
          <div key={value.id}>
            <p>
              {value.name}: {value.phone}{" "}
              <button onClick={() => handleDelete(value.id)}>Delete</button>
            </p>
          </div>
        ))}
      </div>
    );
  };

  // ...código posterior...

  return (
    <div>
      <h1>Phonebook</h1>
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
