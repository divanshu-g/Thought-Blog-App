import { createContext, useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../db/Firebase"

export const AuthContext = createContext(); 

export const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false)
        })
        return unsub;
    }, [])
  return (
    <AuthContext.Provider value={{currentUser}}>
        {!loading && children}
    </AuthContext.Provider>
  )
}

export default AuthContext