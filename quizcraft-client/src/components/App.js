// import Users from './User/Users';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import "../App.scss";

import NavBar from "./NavBar"
import Signup from './Routes/Signup';
import Signin from './Routes/Signin';
import Home from './Routes/Home';
import Quizmaster from './Quiz/Quizmaster';

function App() {

    return (
        <div className="App">
            <NavBar />
            <div className = "Content">
                <Routes>
                    <Route exact path="/" element={
                            <Home />
                    } />
                    <Route exact path="/signup" element={
                            <Signup />
                    } />
                    <Route exact path="/signin" element={
                            <Signin />
                    } />
                    <Route exact path="/create" element={
                            <Quizmaster />
                    } />
                </Routes>
            </div>
        </div>
    );
}

export default App;
