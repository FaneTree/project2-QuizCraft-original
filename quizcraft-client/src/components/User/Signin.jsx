import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword, signInAnonymously  } from 'firebase/auth';
import { auth } from '../firebase.js';

const Signin = () => {
    const navigate = useNavigate();    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorMessages, setErrorMessages] = useState(null);
    const _handleErrors = (error) => {
        alert(error.code);
        setErrorMessages(error.message);
    }

    const _handleSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate("/")
                console.log(user);
            })
            .catch((error) => {
                _handleErrors(error)
                navigate("/signin")
            });
    }

    return (
        <div>
            { errorMessages && <div>{errorMessages.message}</div>}
            <form onSubmit={ _handleSubmit }>
                <input type="text" placeholder='Enter your email' name="email" value={ email } onInput={ (e) => setEmail( e.target.value ) }/>
                <input type="password" placeholder='Enter your password' value={ password } onInput={ (e) =>  setPassword( e.target.value ) }/>
                <input type="submit" value="Sign In" />
            </form>
            
            <AnonLogin />
        </div>
    )
}

// anonymous login function; it's called as Function Component in the Login Component
const AnonLogin = () => {
    const navigate = useNavigate();

    const _signin = ()=>{
        signInAnonymously(auth)
            .then((UserCredential) => {
                const user = UserCredential.user;
                navigate("/")
                console.log(user);
            })
            .catch((error) => {
                alert(error.code);
                navigate("/signin")
            });
    }

    return (
        <div>Anonymous login
            <button onClick={ _signin }>Sign in Anonymously</button>
        </div>
    )
}

export default Signin;