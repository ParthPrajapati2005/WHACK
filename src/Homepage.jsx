import React from 'react';
import './CSS/Homepage.css'
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function Homepage() {

    const navigate = useNavigate();

    function goRegister(){
        navigate("/register");
    }

    function goLogin(){
        navigate("/login");
    }

    return (
        <div className="gradient-bg">
            <Container fluid>
                <Row className="justify-content-center align-items-center" style={{ height: '100vh' }}>
                    <Col xs={12} md={8} lg={6} className="text-center text-white">
                        <h1>Future Self : Financial Time Machine</h1>
                        <p>Welcome to the responsive homepage!</p>
                        <Button variant="primary" className="w-100" onClick={goLogin}>Login</Button>
                        <Button variant="secondary" className="w-100" onClick={goRegister}>Register</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Homepage;