import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => {
    return response.data;
  });
};

const addContact = newObject => {
  const request = axios.post(baseUrl, newObject);
  return request.then(response => {
    return response.data;
  });
};

const deleteContact = id => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then(response => {
    return response.data;
  });
};

const updateContact = (id, updatedContact) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedContact);
  return request.then(response => {
    return response.data;
  })
  .catch(error => {
    throw new Error(`Failed to update contact with id ${id}: ${error.message}`);
  });
};

export default { getAll, addContact, deleteContact, updateContact };
