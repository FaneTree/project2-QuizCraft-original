import React from "react";
import Games from "./Games"
import { auth } from './firebase.js';
import {useAuthState} from 'react-firebase-hooks/auth';

export default function Home (){
    const [user, loading, error] = useAuthState(auth);
    const _logout = () => {
        auth.signOut();
    }
    return (
        <div>
            { console.log('USER!!!', user, `CRED!!!!`, auth.UserCredential)}
            <h1>Home Page is Coming</h1>
            {user ? <button onClick={_logout}>Logout</button> : <h3>Sign up or log in</h3>}
            <Games />
        </div>
    )
}