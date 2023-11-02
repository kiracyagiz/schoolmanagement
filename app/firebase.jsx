"use client"

//useContext
import { createContext,useContext,useEffect,useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth,onAuthStateChanged, signInWithEmailAndPassword, signOut} from 'firebase/auth'
import { getFirestore, collection, addDoc, serverTimestamp, getDocs } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM32tvVhcjmYEc1RuScURilWBMoMDPWXE",
  authDomain: "schoolmanagement-320e9.firebaseapp.com",
  projectId: "schoolmanagement-320e9",
  storageBucket: "schoolmanagement-320e9.appspot.com",
  messagingSenderId: "208682002121",
  appId: "1:208682002121:web:3b55141f02cd2036ec0f18",
  measurementId: "G-XD1FPK5QP2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth(app)

const AuthContext = createContext();

export function useAuth(){
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }


  function logout() {
    return signOut(auth);
  }

  function register (auth,email,password){
    return createUserWithEmailAndPassword(auth,email,password)
  }
 
  
  const addUserData = async (displayName, uid) => {
    try {
      const userRef = collection(db, "users");
      const newUser = { displayName, uid };
      const docRef = await addDoc(userRef, newUser);
      console.log("Yeni kullanıcı eklendi, belge ID:", docRef.id);
      return true;
    } catch (error) {
      console.error("Kullanıcı ekleme sırasında bir hata oluştu: ", error);
      return false;
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);




 

  const value = {
    currentUser,
    signup,
    logout,
    register,
    addUserData
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;

}





export default function() {<>Nothing</>}