import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';

import { signInWithEmailAndPassword, signInAnonymously  } from 'firebase/auth';
import { auth } from '../firebase.js';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState(null);

    const _handleErrors = (error) => {
        alert(error.code)
        setErrorMessages(error.message);
    }
    const _handleSubmit = (e) => {
        e.preventDefault();

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                // TODO: redirect the user to another page after sign-in
                navigate("/")
                // ...
            })
            .catch((error) => {
                _handleErrors(error)
                navigate("/login")
            });
    }

    return (
        <div>
            <form onSubmit={ _handleSubmit }>
                <input type="text" placeholder='Enter your email' name="email" value={ email } onInput={ (e) => setEmail( e.target.value ) }/>
                <input type="password" placeholder='Enter your password' value={ password } onInput={ (e) =>  setPassword( e.target.value ) }/>
                <input type="submit" value="Log In" />
            </form>
            { errorMessages && <div>{errorMessages.message}</div>}
            
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
                // Signed in..
                const user = UserCredential.user;
                // TODO: redirect the user to another page after sign-in
                navigate("/")
                //...

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ...
            });
    }
    return (
        <div>Anonymous login
            <button onClick={ _signin }>Log In Anonymously</button>
        </div>
    )
}
export default Login;