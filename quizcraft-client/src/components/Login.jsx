import React, {Component, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from './firebase.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // const logInWithEmailAndPassword = async (email, password) => {
    //     try {
    //       await signInWithEmailAndPassword(auth, email, password);
    //     } catch (err) {
    //       console.error(err);
    //       alert(err.message);
    //     }
    //   };

    const _handleSubmit = (e) => {
        e.preventDefault();
        // setEmail('');
        // setPassword('');

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
            });
    }

    return (
        <div>
            <form onSubmit={ _handleSubmit }>
                <input type="text" placeholder='Enter your email' name="email" value={ email } onInput={ (e) => setEmail( e.target.value ) }/>
                <input type="password" placeholder='Enter your password' value={ password } onInput={ (e) =>  setPassword( e.target.value ) }/>
                <input type="submit" value="Log In" />
            </form>
        </div>
    )
}

export default Login;