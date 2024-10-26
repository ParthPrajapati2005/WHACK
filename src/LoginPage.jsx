import { useState } from "react";
import Button from 'react-bootstrap/Button';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput
} from 'mdb-react-ui-kit';

import './CSS/Register.css';

function RegisterPage() {
    const [formData, setFormData] = useState({ name: '', pass: '' });
    const [error, setError] = useState({ isError: false, errorMessage: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevents the form from reloading the page

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

export default RegisterPage;
