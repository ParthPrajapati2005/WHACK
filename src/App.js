import React from 'react';
import { Container, Button } from 'react-bootstrap';
import './App.css'; // Import custom CSS for styling

function App() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100 bg-blue">
      <Button variant="primary">Click Me!</Button>
    </Container>
  );
}

export default App;