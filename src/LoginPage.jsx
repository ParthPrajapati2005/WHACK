import { useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput
} from 'mdb-react-ui-kit';

import './CSS/Register.css';
import { useAuth } from './authContext'; // Import useAuth

import { useNavigate } from 'react-router-dom'; // Import useNavigate

function LoginPage() {
    const [formData, setFormData] = useState({ name: '', pass: '' });
    const [error, setError] = useState({ isError: false, errorMessage: "" });
    const navigate = useNavigate(); // Initialize useNavigate
    const { setIsAuthenticated } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevents the form from reloading the page

        if (!formData.name || !formData.pass) {
            setError({ isError: true, errorMessage: "Please fill in all fields." });
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/login', { username: formData.name, password: formData.pass });
            console.log(response);
            if (response.data.hasOwnProperty('error')) {
                setError({ isError: true, errorMessage: response.data.error });
            } else {
                setError({ isError: false, errorMessage: "" });
                setIsAuthenticated(true);
                localStorage.setItem("name", formData.name);
                navigate('/menu');
            }
            // Clear form data on success
            setFormData({ name: '', pass: '' });

            //NOW GO TO MENU PAGE



        } catch (error) {
            console.log("Error in post request:", error.message);
        }


        //LOGIN HERE
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value,
        }));
    };

    return (
        <MDBContainer fluid style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="gradient-bg" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <MDBCard className='mx-5 p-4 shadow-5' style={{ background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)', minWidth: '600px', maxWidth: '800px' }}>
                    <MDBCardBody className='p-5 text-center'>
                        <h2 className="fw-bold mb-5">Login</h2>

                        {/* Display Error Message if Present */}
                        {error.isError && <p style={{ color: 'red' }}>{error.errorMessage}</p>}

                        {/* Wrap in form tag */}
                        <form onSubmit={handleSubmit}>
                            
                            <MDBInput
                                wrapperClass='mb-4'
                                placeholder='Username'
                                id='name'
                                type='text'
                                value={formData.name}
                                onChange={handleInputChange}
                            />
                            

                            <MDBInput
                                wrapperClass='mb-4'
                                placeholder='Password'
                                id='pass'
                                type='password'
                                value={formData.pass}
                                onChange={handleInputChange}
                            />

                            <Button className='w-100 mb-4' size='md' type="">Sign Up</Button>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </MDBContainer>
    );
}

export default LoginPage;
