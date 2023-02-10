import React, {Component, useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {  signInWithEmailAndPassword  } from 'firebase/auth';
import { auth } from './firebase.js';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logInWithEmailAndPassword = async (email, password) => {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
          console.error(err);
          alert(err.message);
        }
      };

    return (
        <div>
            <form>
                <input type="text" placeholder='Enter your email' />
                <input type="password" placeholder='Enter your password' />
            </form>
        </div>
    )
}

export default Login;