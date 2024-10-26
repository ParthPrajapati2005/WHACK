import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegistrationComponent from './Registration';

function App() {

  const [formData, setFormData] = useState({name: '', pass: ''});
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleData = (data) => {
    const username = data.name;
    const password = data.pass;
    setFormData({
      name: username,
      pass: password,
    })
  }

  useEffect(() => {
    console.log(formData);
    if(!formData.name || !formData.pass) return;

    const sendData = async () => {
      try{
        const response = await axios.post('http://127.0.0.1:5000/register', {username : formData.name, password : formData.pass});
        console.log(response);
        return response;
      } catch(error){
        console.log("Error in post request:", error.message);
      }
    }
    const response = sendData();
    setFormData({name: '', pass: ''})

  }, [formData])

  return (
    <>
      <RegistrationComponent onSubmit={handleData} />
      <p>{formData.username}</p>
      <p>{formData.password}</p>
    </>
  );
}

export default App;
