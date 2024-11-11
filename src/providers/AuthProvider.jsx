import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../firebase.init';



 export const AuthContext = createContext(null);
 const googleProvider = new GoogleAuthProvider()

const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

   

    const createUser = ( email, password) => {
        setLoading(true); // Show loading spinner while creating user
        return  createUserWithEmailAndPassword(auth, email, password)
    }

    const signInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider);
    }


    const signOutUser = () => {
        setLoading(true); 
        return signOut(auth);

    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('current user', currentUser);
            setUser(currentUser);
            setLoading(false); // Once user is authenticated, set loading to false and render the app.
            
        })
        return () =>{
             unSubscribe(); 
        }// Clean up function when component is unmounted

    }, [])

    // onAuthStateChanged(auth, currentUser => {
    //     if(currentUser) {
    //     console.log('currently logged user', currentUser);
    //     setUser(currentUser);
    //     }
    //     else{
    //         console.log('No user is logged in');
    //         setUser(null);
    //     }
    // })



const authInfo = {
   
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    signOutUser,
 };



    return (
        <AuthContext.Provider value={authInfo}>
            
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;