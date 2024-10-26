import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegistrationComponent from './Registration';

function App() {

  const [formData, setFormData] = useState({name: '', pass: ''});

  const handleData = (data) => {
    console.log(data);
    const username = data.name;
    const password = data.pass;
    console.log(username);
    console.log(password);
    setFormData((prev) => ({
      ...formData,
      name: username,
      pass: password
    }))
  }

  const sendData = () => {
    const data = { name: 'React User' };
    axios.post('http://127.0.0.1:5000/hello', data)
      .then(response => {
        console.log('Response from POST:', response.data);
      })
      .catch(error => {
        console.error('There was an error sending the data!', error);
      });
  };


  return (
    <>
      <RegistrationComponent onSubmit={handleData} />
      <p>{formData.username}</p>
      <p>{formData.password}</p>
    </>
  );
}

export default App;
