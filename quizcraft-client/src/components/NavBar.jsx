import React from 'react';
import { MenuData, MenuDataLogin } from './MenuData';
import { Link } from "react-router-dom";

import { auth } from './firebase.js';
import {useAuthState} from 'react-firebase-hooks/auth';

const NavBar = () => {
    const [user] = useAuthState(auth);
    const _logout = () => {
        auth.signOut();
    }

    return(
        <nav className = 'nav'>
            <div>
                <img 
                    src="https://i.ibb.co/GnbLR4N/Graphic-Design-800-300-px-copy.png" alt="cauldron-800-300-px" 
                    width="70" 
                />
                <h1>QuizCraft</h1>
            </div>
            <ul>
                {MenuData.map((item,index) => {
                    return (
                        <li key = {index}>
                            <Link to = {item.url}>
                                {item.title}
                            </Link>
                        </li>
                    );
                })}
                { user ? <li onClick={_logout}><a>{ user.displayName } Logout</a></li> : MenuDataLogin.map((item,index) => {
                        return (
                            <li key = {index}>
                                <Link to = {item.url}>
                                    {item.title}
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    );
}

export default NavBar;