import Users from './Users';
import { Routes, Route, Link } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import Quizs from "./Quiz/Quizs";

function App() {
    return (
        <div className="App">
            <Link to="/">
                <button>Home</button>
            </Link>
            <Link to="/signup">
                <button>Sign Up</button>
            </Link>
            <Link to="/login">
                <button>Login</button>
            </Link>
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
    );
}

export default App;
