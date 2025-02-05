import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc,setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import {auth,db} from '../services/firebase'
import { toast } from "react-toastify";


interface AuthContextType {
  user: any; // You can replace 'any' with a more specific type if you have one
  signUp: (name: string, email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

//* Create the AuthContext with an initial value of undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

//* AuthProvider component to wrap around parts of the app that need access to auth context
export const AuthProvider = ({children}) => {

  const [user,setUser] = useState({})

   //* Effect to listen for authentication state changes
  useEffect(()=> {
    return onAuthStateChanged(auth, (currentUser) => setUser(currentUser))
  },[])

    //* Function to sign up a new user
  const signUp = async (name,email,password) => {
    try {
      const res =await createUserWithEmailAndPassword(auth, email,password)
      setDoc(doc(db, 'users',email), {
        favShows:[]
      })
      
      
    } catch (error) {
        toast.error('Email already in Use')
        throw error
    }
  }

  //* Function to log in an existing user
  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
      toast.error('Invalid credential')
      throw error; 
    }
  }

  const logout = () => {
    signOut(auth)
  }

  return(
    <AuthContext.Provider value={{user,signUp,login,logout}}>
      {children}
    </AuthContext.Provider>
  )
}

//* Custom hook to use the AuthContext
export const userAuth = () => {
  const context = useContext(AuthContext);   //~ Get the context value
  if (!context) {
    throw new Error("userAuth must be used within an AuthProvider");   //~ Error if used outside of provider
  }
  return context;
};