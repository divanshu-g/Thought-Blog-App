import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react"
import{auth} from "../db/Firebase"
import { Link, useNavigate } from "react-router-dom";
import {doc, setDoc} from "firebase/firestore"
import {db} from "../db/Firebase"
import { toast } from "react-toastify";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = async(e) => {
        e.preventDefault();

        try{
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name,
                email,
                createdAt: new Date()
            })
            navigate("/");
        }
        catch(err){
            toast.error(err.message);
        }
    }


  return (
    <div className="text-center max-w-md mx-auto py-10 px-6">
        <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
            <input 
            type="text"
            placeholder="name"
            value={name}
            className="w-full border p-2 rounded"
            onChange={(e) => setName(e.target.value)} /> 

            <input 
            type="email"
            placeholder="email"
            value={email}
            className="w-full border p-2 rounded"
            onChange={(e) => setEmail(e.target.value)} />

            <input 
            type="password"
            placeholder="password"
            value={password}
            className="w-full border p-2 rounded"
            onChange={(e) => setPassword(e.target.value)} />

            <button className="border rounded w-full bg-blue-600 text-white px-2 py-2">Sign Up</button>

            <p className="px-6">
                Already Have an account?{" "} 
                <Link to="/login" className="text-blue-700">Login</Link>
            </p>
        </form>
        </div>
        <h2 className="mt-46 text-4xl text-center font-serif">Thoughts</h2>
    </div>
  )
}

export default Signup