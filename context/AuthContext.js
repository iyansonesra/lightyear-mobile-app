import {  onAuthStateChanged, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    sendEmailVerification } from "firebase/auth";
import { createContext, useState, useEffect, useContext } from "react";
import {auth, db} from "../FirebaseConfig";
import { collection,query, doc, where, getDoc, setDoc } from "firebase/firestore";


export const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined);
    const [emailVerified, setEmailVerified] = useState(false);

    const generatePIN = () => {
        return Math.floor(10000000 + Math.random() * 90000000).toString();
    };

    // Check if the PIN already exists in the database
    const isPINUnique = async (pin) => {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("PIN", "==", pin));
        const querySnapshot = await getDocs(q);
        return querySnapshot.empty;
    };

    // Generate a unique PIN
    const generateUniquePIN = async () => {
        let pin;
        do {
            pin = generatePIN();
        } while (!(await isPINUnique(pin)));
        return pin;
    };



    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (user) => {
          if (user) {
            setIsAuthenticated(true);
            setUser(user);
            setEmailVerified(user.emailVerified);
      
            // Check if email is verified on each auth state change
            if (user.emailVerified) {
              const userDoc = await getDoc(doc(db, "users", user.uid));
              if (userDoc.exists() && !userDoc.data().emailVerified) {
                await setDoc(doc(db, "users", user.uid), { emailVerified: true }, { merge: true });
              }
            }
          } else {
            setIsAuthenticated(false);
            setUser(null);
            setEmailVerified(false);
          }
        });
      
        return unsub;
      }, []);

    const login = async (email, password) => {
        try{
            const response = await signInWithEmailAndPassword(auth, email, password);
            setIsAuthenticated(true);
            setEmailVerified(user.emailVerified);
           console.log(user.emailVerified);
            setUser(user);

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
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log(response?.user);

            const uniquePIN = await generateUniquePIN();

        
            await setDoc(doc(db, "users", response?.user?.uid), {
                firstName,
                lastName,
                userId: response?.user?.uid,
                emailVerified: false,
                PIN: uniquePIN,
                profilePicture: null // Add this line
              });
        
            // Send email verification
            await sendEmailVerification(response.user);
        
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
        <AuthContext.Provider value = {{user, isAuthenticated, emailVerified, login, register, logout}}>
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
