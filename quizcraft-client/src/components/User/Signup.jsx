import React, {useState} from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.js';
 
const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');

    const [error, setError] = useState(null);
    const _handleError = (error)=>{
        setError(error.message);
    }

    const onSubmit = async (e) => {
      e.preventDefault()
     
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            navigate("/")
        })
        .catch((error) => {
            _handleError(error)
            navigate("/signup")
        });
    }
 
    return (
        <main >        
            <section>
                <div>
                    <div>                  
                        <h1> Sign Up </h1>                                                                            
                        <form>
                            { error && <div>{error.message}</div>}
                            <div>
                                <label htmlFor="email-address">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    label="Email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}  
                                    required                                    
                                    placeholder="Email address"                                
                                />
                            </div>

                            <div>
                                <label htmlFor="password">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    label="Create password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} 
                                    required                                 
                                    placeholder="Password"              
                                />
                            </div>                                             
                            
                            <button
                                type="submit" 
                                onClick={onSubmit}                        
                            >  
                                Sign up                                
                            </button>
                                                                        
                        </form>
                    
                        <p>
                            Already have an account?{' '}
                            <NavLink to="/signin" >
                                Sign in
                            </NavLink>
                        </p>                   
                    </div>
                </div>
            </section>
        </main>
    )
}
 
export default Signup