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
        const response = await fetch('http://127.0.0.1:5000/register', {
          method: 'POST',
          headers:{
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.name,
            password: formData.pass,
          }),
        });
        if(!response.ok){
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log(result.message);

      } catch(error){
        console.log("Error in post request:", error.message);
      }
    }
    sendData();
  }, [formData])

  // const sendData = () => {
  //   const data = { name: 'React User' };
  //   axios.post('http://127.0.0.1:5000/hello', data)
  //     .then(response => {
  //       console.log('Response from POST:', response.data);
  //     })
  //     .catch(error => {
  //       console.error('There was an error sending the data!', error);
  //     });
  // };


  return (
    <>
      <RegistrationComponent onSubmit={handleData} />
      <p>{formData.username}</p>
      <p>{formData.password}</p>
    </>
  );
}

export default App;
