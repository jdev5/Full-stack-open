import { useState, useEffect } from "react";
import personService from "./services/persons";
import Notification from "./components/Notificacion";
import DeleteNotification from "./components/DeleteNotification";
import "./index.css"


const App = () => {
  const [persons, setPersons] = useState([]); // Estado para almacenar la lista de contactos
  const [newName, setNewName] = useState(""); // Estado para almacenar el nuevo nombre de contacto
  const [addPhone, setAddPhone] = useState(""); // Estado para almacenar el nuevo número de teléfono de contacto
  const [contacts, setContacts] = useState(""); // Estado para almacenar el valor de búsqueda de contactos
  const [addcontactMessage, setAddContactMessage] = useState(null)
  const [updateContactMessage, setUpdateContactMessage] = useState(null)
  const [deleteContactMessage, setDeleteContactMessage] = useState(null)
  const [removeContactMessage, setRemoveContactMessage] = useState(null)
  // Obtener los contactos iniciales cuando se carga la aplicación
  useEffect(() => {
    personService.getAll().then((initialContacts) => {
      setPersons(initialContacts);
    });
  }, []);

  // Función para manejar el envío del formulario
  const submit = (event) => {
    event.preventDefault();
    const newObject = {
      name: newName,
      phone: addPhone,
    };

    // Comprobar si el nuevo nombre es válido antes de llamar a toLowerCase()
    if (newName && newName.trim().length > 0) {
      // Comprobar si el nuevo contacto ya existe en la lista de contactos actual
      const contactIndex = persons.findIndex(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      );

      if (contactIndex >= 0) {
        // Si el contacto ya existe, mostrar una confirmación al usuario
        const shouldUpdate = window.confirm(
          `${newName} ya existe en la lista de contactos. ¿Deseas actualizar el número de teléfono?`
        );

        if (shouldUpdate) {
          // Si el usuario confirma la actualización, llamar a la función de actualización del servicio
          const contactToUpdate = persons[contactIndex];
          personService
            .updateContact(contactToUpdate.id, newObject)
            .then((updatedContact) => {
              // Actualizar el estado de persons con el contacto actualizado
              setPersons(
                persons.map((person) =>
                  person.id === updatedContact.id ? updatedContact : person
                )
              );
              setNewName("");
              setAddPhone("");
              setUpdateContactMessage(`Sure! The contact '${updatedContact.name}' has been update successfully.`)
              setTimeout(() => {
                setUpdateContactMessage(null)
              }, 3000)
              
            })
            .catch((error) => {
              // Manejar errores en la actualización del contacto
              setRemoveContactMessage(
                `The contact '${persons.name}' was already removed from server`
              )
              setTimeout(() => {
                setRemoveContactMessage(null)
              }, 5000)
            });
        }
      } else {
        // Si el contacto no existe, agregar un nuevo contacto
        personService.addContact(newObject).then((addedContact) => {
          // Actualizar el estado de persons con el nuevo contacto agregado
          setPersons(persons.concat(addedContact));
          setNewName("");
          setAddPhone("");
          setAddContactMessage(`The contact '${addedContact.name}' has been added successfully.`)
          setTimeout(() => {
            setAddContactMessage(null)
          }, 3000)
        });
      }
    } else {
      alert("Por favor, introduce un nombre válido");
    }
  };

  // Función para manejar los cambios en la entrada de búsqueda de contactos
  const handleContacts = (event) => {
    setContacts(event.target.value);
  };

  // Función para manejar los cambios en la entrada de nuevo nombre
  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  // Función para manejar los cambios en la entrada de nuevo número de teléfono
  const handleAddPhone = (event) => {
    setAddPhone(event.target.value);
  };

  // Función para filtrar los contactos según el valor de búsqueda
  const searchContacts = () => {
    if (contacts.length === 0) {

      return [];
    }
    return persons.filter(
      (value) =>
        value.name && value.name  .toLowerCase().includes(contacts.toLowerCase())
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
          setDeleteContactMessage(`the contact has been delete successfully.`)
          setTimeout(() => {
            setDeleteContactMessage(null)
          }, 3000)
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

  

  return (
    <div>
      <h1>Phonebook</h1>
      <div>
        Filter shown with: <input value={contacts} onChange={handleContacts} />
        <Filter />
      </div>

      <div className="addContact">
      <h2>Add a new</h2>
          <Notification message={addcontactMessage}/>
          <Notification message={updateContactMessage}/>
          <DeleteNotification message={deleteContactMessage}/>
          <DeleteNotification message={removeContactMessage}/>
          </div>
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
