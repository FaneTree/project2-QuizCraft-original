import Users from './Users'; 
import { Routes, Route, Link } from "react-router-dom";
import Signup from './Signup';
import Login from './Login';


function App() {
  return (
    <div className="App">
     <Routes>
        <Route exact path="/" element={<Users />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
