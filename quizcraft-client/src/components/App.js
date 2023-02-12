// import Users from './User/Users';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import "../App.scss";

import NavBar from "./NavBar"
import Signup from './User/Signup';
import Login from './User/Login';
import Home from './Home';
import Quizs from "./Quiz/Quizs";

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
                    <Route exact path="/login" element={
                            <Login />
                    } />
                    <Route exact path="/quizs" element={
                            <Quizs />
                    } />
                </Routes>
            </div>
        </div>
    );
}

export default App;
