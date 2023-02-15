import React, { useState }from "react";
import {useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import { auth } from '../firebase.js';

export default function Join () {
    const navigate = useNavigate();
    const [joinId, setJoinId] = useState(null);
    const [user] = useAuthState(auth);

    const joinRoomURL = user ? `/play/${ joinId }/as/${ user.uid }` : '/';

    // form to fill room number => record player into room => redirect to room
    const _recordAndNavigatePlayer = () => {
        navigate(joinRoomURL)
    }
    
    return (
        <div>
            <input placeholder= 'Game ID' onChange={ (event) => setJoinId(event.currentTarget.value)}/>
            <button onClick= { _recordAndNavigatePlayer } >Join</button>
        </div>
    );
}