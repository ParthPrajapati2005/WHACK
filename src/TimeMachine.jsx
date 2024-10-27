import { useState } from "react";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCardText,
} from 'mdb-react-ui-kit';

import './CSS/Register.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function TimeMachine() {
    const [formData, setFormData] = useState({
        start: '',
        end: '',
        degreeType: 'STEM', // Default value for degreeType
        counties: 'aberdeenshire', // Default value for counties
        maintenance: ''
    });
    const [error, setError] = useState({ isError: false, errorMessage: "" });
    const navigate = useNavigate(); // Initialize useNavigate

    const handleSubmit = async (e) => {
        e.preventDefault();  // Prevents the form from reloading the page


        try {
            const response = await axios.post('http://127.0.0.1:5000/future', { // Adjust URL as needed
                start: formData.start,
                end: formData.end,
                degreeType: formData.degreeType,
                counties: formData.counties,
                maintenance: formData.maintenance,
            });
            console.log(response);
            if (response.data.hasOwnProperty('error')) {
                setError({ isError: true, errorMessage: response.data.error });
            } else {
                setError({ isError: false, errorMessage: "" });
                localStorage.setItem("name", formData.start); // Adjust as needed
            }
            // Clear form data on success
            setFormData({ start: '', end: '', degreeType: 'STEM', counties: 'aberdeenshire', maintenance:'' });

        } catch (error) {
            console.log("Error in post request:", error.message);
        }
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
                        <h2 className="fw-bold mb-5">Time Machine....Predict your financial status in the future!</h2>

                        {/* Display Error Message if Present */}
                        {error.isError && <p style={{ color: 'red' }}>{error.errorMessage}</p>}

                        {/* Wrap in form tag */}
                        <form onSubmit={handleSubmit}>
                            <MDBInput
                                wrapperClass='mb-4'
                                placeholder='When did you start your degree?'
                                id='start'
                                type='number'
                                value={formData.start}
                                onChange={handleInputChange}
                                required // Make field required
                            />

                            <MDBInput
                                wrapperClass='mb-4'
                                placeholder='How many years is your degree?'
                                id='end'
                                type='number'
                                value={formData.end}
                                onChange={handleInputChange}
                                required // Make field required
                            />

                            <MDBInput
                                wrapperClass='mb-4'
                                placeholder='What is your maintenance loan?'
                                id='maintenance'
                                type='number'
                                value={formData.maintenance}
                                onChange={handleInputChange}
                                required // Make field required
                            />
                            
                            <MDBCardText>Enter your degree type below:</MDBCardText>
                            <select
                                id="degreeType"
                                value={formData.degreeType}
                                onChange={handleInputChange}
                                className='mb-4 form-select'
                            >
                                <option value="STEM">STEM</option>
                                <option value="Law">Law</option>
                                <option value="Humanities">Humanities</option>
                            </select>

                            <MDBCardText>Enter your county below:</MDBCardText>
                            <select
                                id="counties"
                                value={formData.counties}
                                onChange={handleInputChange}
                                className='mb-4 form-select'
                            >
                                
                                <option value="Aberdeenshire">Aberdeenshire</option>
                                <option value="Angus kincardineshire">Angus & Kincardineshire</option>
                                <option value="Antrim">Antrim</option>
                                <option value="Argyll">Argyll</option>
                                <option value="Armagh">Armagh</option>
                                <option value="Avon">Avon</option>
                                <option value="Ayrshire wigtownshire kirkcudbrightshire">Ayrshire, Wigtownshire & Kirkcudbrightshire</option>
                                <option value="Bedfordshire">Bedfordshire</option>
                                <option value="Berkshire">Berkshire</option>
                                <option value="Berwickshire roxburghshire east-lothian">Berwickshire, Roxburghshire & East Lothian</option>
                                <option value="Buckinghamshire">Buckinghamshire</option>
                                <option value="Cambridgeshire">Cambridgeshire</option>
                                <option value="Cheshire">Cheshire</option>
                                <option value="Cleveland">Cleveland</option>
                                <option value="Clwyd">Clwyd</option>
                                <option value="Cornwall">Cornwall</option>
                                <option value="County-durham">County Durham</option>
                                <option value="Cumbria isle of man">Cumbria & Isle of Man</option>
                                <option value="Derbyshire">Derbyshire</option>
                                <option value="Devon">Devon</option>
                                <option value="Dorset">Dorset</option>
                                <option value="Down">Down</option>
                                <option value="Dumfriesshire peeblesshire selkirkshire">Dumfriesshire, Peeblesshire & Selkirkshire</option>
                                <option value="Dunbartonshire">Dunbartonshire</option>
                                <option value="Durham">Durham</option>
                                <option value="Dyfed">Dyfed</option>
                                <option value="East sussex">East Sussex</option>
                                <option value="East yorkshire-humberside">East Yorkshire & Humberside</option>
                                <option value="Essex">Essex</option>
                                <option value="Fermanagh tyrone">Fermanagh & Tyrone</option>
                                <option value="Fife">Fife</option>
                                <option value="Gloucestershire">Gloucestershire</option>
                                <option value="Greater london">Greater London</option>
                                <option value="Greater manchester">Greater Manchester</option>
                                <option value="Gwent">Gwent</option>
                                <option value="Gwynedd">Gwynedd</option>
                                <option value="Hampshire isle of wight">Hampshire & Isle of Wight</option>
                                <option value="Herefordshire worcestershire">Herefordshire & Worcestershire</option>
                                <option value="Hertfordshire">Hertfordshire</option>
                                <option value="Inverness shire banffshire">Inverness-Shire & Banffshire</option>
                                <option value="Kent">Kent</option>
                                <option value="Lanarkshire">Lanarkshire</option>
                                <option value="Lancashire">Lancashire</option>
                                <option value="Leicestershire">Leicestershire</option>
                                <option value="Lincolnshire">Lincolnshire</option>
                                <option value="Londonderry">Londonderry</option>
                                <option value="Lothian">Lothian</option>
                                <option value="Merseyside">Merseyside</option>
                                <option value="Mid glamorgan">Mid Glamorgan</option>
                                <option value="Middlesex">Middlesex</option>
                                <option value="Midlothian">Midlothian</option>
                                <option value="Morayshire">Morayshire</option>
                                <option value="Norfolk">Norfolk</option>
                                <option value="North-yorkshire">North Yorkshire</option>
                                <option value="Northamptonshire">Northamptonshire</option>
                                <option value="Northumberland">Northumberland</option>
                                <option value="Nottinghamshire">Nottinghamshire</option>
                                <option value="Oxfordshire">Oxfordshire</option>
                                <option value="Perthshire clackmannanshire">Perthshire & Clackmannanshire</option>
                                <option value="Powys">Powys</option>
                                <option value="Renfrewshire">Renfrewshire</option>
                                <option value="Ross shire sutherland caithness lewis orkney shetland">Ross-Shire, Sutherland, Caithness, Lewis, Orkney & Shetland</option>
                                <option value="Rutland">Rutland</option>
                                <option value="Shropshire">Shropshire</option>
                                <option value="Somerset">Somerset</option>
                                <option value="South glamorgan">South Glamorgan</option>
                                <option value="South yorkshire">South Yorkshire</option>
                                <option value="Staffordshire">Staffordshire</option>
                                <option value="Stirlingshire">Stirlingshire</option>
                                <option value="Suffolk">Suffolk</option>
                                <option value="Surrey">Surrey</option>
                                <option value="Tyne and wear">Tyne and Wear</option>
                                <option value="Warwickshire">Warwickshire</option>
                                <option value="West glamorgan">West Glamorgan</option>
                                <option value="West lothian">West Lothian</option>
                                <option value="West midlands">West Midlands</option>
                                <option value="West sussex">West Sussex</option>
                                <option value="West yorkshire">West Yorkshire</option>
                                <option value="Wiltshire">Wiltshire</option>
                            </select>
  
                            <Button className='w-100 mb-4' size='md' type="submit">Submit</Button>
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </div>
        </MDBContainer>
    );
}

export default TimeMachine;
