import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import {auth} from "../db/Firebase";
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        }
        catch(err){
            toast.error(err.message)
        }
    }

  return (
    <div className=' text-center max-w-md mx-auto p-6'>
        <div className='mt-6'>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <form onSubmit={handleLogin} className='space-y-4'>

            <input 
            type="email"
            placeholder='email'
            value={email}
            className='w-full border rounded p-2'
            onChange={e => setEmail(e.target.value)} />

            <input 
            type="password"
            placeholder='password'
            value={password}
            className='w-full border rounded p-2'
            onChange={e => setPassword(e.target.value)} />

            <button className="border rounded w-full bg-blue-600 text-white px-2 py-2">Login</button>

            <p className='px-6'>
                Don't have an account? {" "} 
                <Link to="/signup" className='text-blue-700'>Sign Up</Link>
            </p>

        </form>
        </div>
        <h2 className="mt-46 text-4xl text-center font-serif">Thoughts</h2>
        
    </div>
  )
}

export default Login