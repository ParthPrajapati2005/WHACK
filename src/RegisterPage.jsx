import { useState, useEffect } from "react";
import axios from 'axios';

function RegisterPage(){

    const [formData, setFormData] = useState({name: '', pass: ''});

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.pass.value;
        e.target.username.value = '';
        e.target.pass.value = '';
        setFormData({
            name: username,
            pass: password,
        })
    }

    useEffect(() => {
        if(!formData.name || !formData.pass) return;

        const sendData = async () => {
            try{
                const response = await axios.post('http://127.0.0.1:5000/register', {username: formData.name, password: formData.pass});
                console.log(response);
                return response;
            } catch(error){
                console.log("Error in post request:", error.message);
            }
        }
        const response = sendData();
        console.log(response);
        setFormData({name: '', pass: ''})
    }, [formData])

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <input id="username" name="username" type="text" placeholder="Enter the username"></input>
                <label>Password</label>
                <input id="pass" name="pass" type="password"></input>
                <button type="submit">Click me</button>
            </form>
        </div>
    )
}

export default RegisterPage