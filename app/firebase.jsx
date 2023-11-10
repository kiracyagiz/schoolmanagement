"use client"

//useContext
import { createContext,useContext,useEffect,useState } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth,onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from 'firebase/auth'
import { getFirestore, collection, addDoc, serverTimestamp, getDocs , query, where} from 'firebase/firestore';


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

  const register =  async (auth,email,password,role)=> {
   try {
    const userCredential = await createUserWithEmailAndPassword(auth,email,password,role) 
    const user = userCredential.user;
    await updateProfile(user,{role})
    console.log(userCredential , 'User credential')
    return user.uid
   } catch (error) {
    console.error("Kullanıcı oluşturma hatası: ", error);
    throw error;
   }
  }
 
  
  const addUserData = async (displayName, uid,role) => {
    try {
      const userRef = collection(db, "users");
      const newUser = { displayName, uid ,role};
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


   const getFirebaseUserData = async (userUID,setUserData) => {
    const colRef = collection(db, 'users');
    const q = query(colRef, where("uid", "==", userUID));
    
    try {
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          setUserData(doc.data());
       
        });
      } else {
        console.log("Kullanıcı verisi bulunamadı.");
        return null;
      }
    } catch (err) {
      console.error(err.message);
      return null;
    }
  };



const getCoursesData = async (courseID) => {
  const colRef = collection(db, "courses");
  const q = query(colRef, where("uid", "==", courseID));


  try {
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const coursesData = snapshot.docs.map((doc) => doc.data());
      return coursesData;
    } else {
      console.log("Kurs verileri bulunamadı.");
      return null;
    }
  } catch (err) {
    console.error(err.message);
    return null;
  }
};
  



 

  const value = {
    currentUser,
    signup,
    logout,
    register,
    addUserData,
    getFirebaseUserData,
    getCoursesData
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;

}





export default function() {<>Nothing</>}