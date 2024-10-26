import { useState } from "react";

function RegistrationComponent({ onSubmit }){

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.pass.value;
        onSubmit({name: username, pass: password });
    }

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

export default RegistrationComponent