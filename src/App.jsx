import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Button } from 'react-bootstrap';

function App() {

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
    <Container>
      <Button onClick={sendData}>Send Data</Button>
    </Container>
  );
}

export default App;
