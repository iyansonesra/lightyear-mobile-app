import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import {auth, db} from "../FirebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);


    useEffect(() =>{    
        const unsub = onAuthStateChanged(auth, (user)=> {
            if(user) {
                setIsAuthenticated(true);
                setUser(user);
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        })

        return unsub;
        
    },[])

    const login = async (email, password) => {
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            return {success: true};
        } catch(e){
           let msg = e.message;
           if(msg.includes('(auth/invalid-email)')) {
               console.log('Invalid Email')
           }
           if(msg.includes('(auth/invalid-credential)')) {
            console.log('Wrong Credentials')
        }
           return {success: false, msg: e.message};
        }
    }
    const logout = async () => {
        try{
            await signOut(auth);
            return {success: true};
        } catch(e){
            return {success: false, msg: e.message, error: e};
        }
    }

    const register = async (email, password,firstName,lastName) => {
        try{
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response?.user);

            // setUser(responser?.user);
            // setIsAuthenticated(true);

            await setDoc(doc(db, "users", response?.user?.uid), {
                firstName,
                lastName,
                userId: response?.user?.uid
            });
            return {success: true, data: response?.user};
        } catch(e){
          let msg = e.message;
           if(msg.includes('(auth/invalid-email)')) {
               console.log('Invalid Email')
           }

           if(msg.includes('(auth/email-already-in-use)')) {
               console.log('Email already in use');
           }
           return {success: false, msg: e.message};

        }
    }

    return (
        <AuthContext.Provider value = {{user, isAuthenticated, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const value = useContext(AuthContext);

    if(!value){
        throw new Error('useAuth must be wrapped inside contextProvider')
    }

    return value;
}
