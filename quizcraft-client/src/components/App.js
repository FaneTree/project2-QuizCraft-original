// import Users from './User/Users';
import React from 'react';
import { Routes, Route } from "react-router-dom";
import "../App.scss";

import NavBar from "./NavBar"
import Signup from './User/Signup';
import Signin from './User/Signin';
import Home from './Home';
import Quizmaster from './Quiz/Quizmaster';
import Quiz from './Quiz/Quiz';

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
                    < Route exact path="/quiz" element={
                        <Quiz />
                    } />
                </Routes>
            </div>
        </div>
    );
}

export default App;
