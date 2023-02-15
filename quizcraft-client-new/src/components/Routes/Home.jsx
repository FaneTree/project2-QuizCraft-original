import React, { useState }from "react";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";

import Signin from "./Signin";

import "../style/Auth.css";

import { auth } from '../firebase.js';
import { signOut } from "firebase/auth";

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Home (){
    const navigate = useNavigate();
    const [joinId, setJoinId] = useState(null);

    const [user] = useAuthState(auth);
    const _signUserOut = async () => {
        await signOut(auth);
        cookies.remove("auth-token");
      };

    const createRoomURL = "/games/create"
    const joinRoomURL = user ? `/play/${ joinId }/as/${ user.uid }` : '/';

    // function to navigate after create
    const _navigateCreate = () => {
        navigate(createRoomURL)
    }

    // function to put data into firestore and navigate to player
    const _recordAndNavigatePlayer = () => {
        navigate(joinRoomURL)
    }
    
    return (
        <div>
            
            { user ? 
                <div className="auth">
                    <button onClick= { _navigateCreate } >Create</button>

                    <input placeholder= 'Game ID' onChange={ (event) => setJoinId(event.currentTarget.value)}/>
                    <button onClick= { _recordAndNavigatePlayer } >Join</button>
                    
                    <p>{ user.displayName }</p>
                    <button onClick={ _signUserOut}>Sign out</button>
                </div>
                : 
                <Signin /> 
            }
        </div>
    )
}