import { useState, useEffect } from "react";
import axios from 'axios';
import {
    MDBBtn,
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBInput
} from 'mdb-react-ui-kit';

import './CSS/Register.css'

function RegisterPage(){

    const [formData, setFormData] = useState({name: '', pass: ''});
    const [error,setError] = useState({"isError":false,"errorMessage":""});
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target);
        const username = e.target.username.value;
        const password = e.target.pass.value;
        e.target.username.value = '';
        e.target.pass.value = '';
        setFormData({
            name: username,
            pass: password,
        });
    };

    useEffect(() => {
        if (!formData.name || !formData.pass) return;

        const sendData = async () => {
            try {
                const response = await axios.post('http://127.0.0.1:5000/register', { username: formData.name, password: formData.pass });
                console.log(response);
                console.log(response.data)
                if(response.data.hasOwnProperty('error')){
                    //do something to make the p tag visible
                    setError({"isError":true,"errorMessage":response.data.error});
                    console.log(error)
                }
                return response;
            } catch (error) {
                console.log("Error in post request:", error.message);
            }
        }
        const response =  sendData();
        setFormData({name: '', pass: ''})
    }, [formData])

    return (
        <MDBContainer fluid style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <div className="gradient-bg" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>

                <MDBCard className='mx-5 p-4 shadow-5' style={{ background: 'hsla(0, 0%, 100%, 0.8)', backdropFilter: 'blur(30px)', minWidth: '600px', maxWidth: '800px' }}>
                    <MDBCardBody className='p-5 text-center'>
                        <h2 className="fw-bold mb-5">Register</h2>
                        <MDBRow>
                            <MDBInput wrapperClass='mb-4' placeholder='First name' id='first-name' type='text' />
                        </MDBRow>

                        <MDBInput wrapperClass='mb-4' placeholder='Password' id='password' type='password' />

                        <MDBBtn className='w-100 mb-4' size='md' onClick={handleSubmit}>Sign Up</MDBBtn>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </MDBContainer>
    );
}

export default RegisterPage;
