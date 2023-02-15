// import Users from './User/Users';
import React from "react";
import { Routes, Route } from "react-router-dom";
import "../App.scss";

import NavBar from "./NavBar";

import Signup from "./Routes/Signup";
import Signin from "./Routes/Signin";
import Home from "./Routes/Home";

import Quizmaster from "./Master";
import Lobby from "./Mutiplayer/Main";
import Quiz from "./Quiz/Quiz";

import Join from "./Routes/Join";
import Player from "./Routes/Player";
import Host from "./Routes/Host";
 
import FinalResult from "./Routes/FinalResult";
import Test from "./Routes/Test";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="Content">
        <Routes>
          {/* reguar path */}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/signin" element={<Signin />} />

          {/* waiting room and create path */}
          <Route exact path="/games/create" element={<Quizmaster />} />
          <Route exact path="/lobby" element={<Lobby />} />
          <Route exact path="/quiz" element={<Quiz />} />

          {/* during play game by player */}
          <Route exact path="/join/:gameId" element={<Join />} />
          <Route exact path="/play/:gameId/as/:playerId" element = {<Player />} / > 
          <Route exact path="/host/:gameId/as/:playerId" element={<Host />} />

          {/* after the game finished */}
          <Route exact path="/scoreboard/:gameId" element={<FinalResult />} />

          {/* test route */}
          <Route exact path="/test" element={<Test />} />

        </Routes>
      </div>
    </div>
  );
}

export default App;
