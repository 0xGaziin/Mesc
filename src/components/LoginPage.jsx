/*
        This file controls user registration into the frontend.

        I'm still working on it. It's completely incomplete, 
        but I need to post it to GitHub before I make any changes.

    - Created by: https://github.com/0xGaziin.
*/

import { useState } from 'react';

import MainPage from './MainPage.jsx';
import './LoginPage.css';

const LoginPage = (props) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [sucessRegister, setRegister] = useState(false);

    const [messageError, setMessageError] = useState('');

    const [typePassword, setTypePasswordInput] = useState('password');

    const handleSubmit = async () => {
        const dataToSend = {
            username: username,
            password: password,
        };

        const response = await fetch('http://localhost:8080/api/users/register', {
            // - Yes, I know the API is exposed. 
            // - It's still localhost, so I'll be using security methods soon.
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
            },

            body: JSON.stringify(dataToSend)
        });

        const result = await response.json(); // - Backend Response.

        if (response.ok) {
            if (result.message === 'The user has been registered.') {
                return setRegister(true);
            }

        } else {
            setMessageError(result.message);
            console.error(`Request error: ${result.message}`);
        };
    };

    if (sucessRegister) return <MainPage />

    return (
        <>
            <div className='container'>
                <h2>Oops! Looks like you're not logged in.</h2>
                <p>How about we solve it?</p>

                <div className='error-message'>{messageError}</div>

                <input type="text" className='input-value' value={username} onChange={(e) => {
                    setUsername(e.target.value);
                }} placeholder='Username' maxLength={15}/>

                <input type={typePassword} className='input-value' value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }} placeholder='Password' maxLength={12}/>
                
                <button className='button' onClick={() => {
                    if (typePassword === 'password') {
                        setTypePasswordInput('text');
                    } else {
                        setTypePasswordInput('password');
                    }
                }}>Exibe Password</button>
                
                <button className='button' onClick={() => {
                    handleSubmit();
                }}>Submit</button>
            </div>
        </>
    )
};

export default LoginPage;