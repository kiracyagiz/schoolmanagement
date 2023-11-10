"use client"

import { useRouter } from "next/navigation";
import { useAuth } from "./firebase";
import { useEffect } from "react";

const App = () => {

  
  const {currentUser} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (currentUser) {
      router.push('/dashboard')
    }

   
  }, [currentUser])
  

  return (
    <div className="text-center gap-x-8 justify-center flex container mt-40">
      
      <button className="p-4 bg-blue-600" onClick={()=> router.push('/register')}>Register</button>
      <button className="p-4 bg-green-600"  onClick={()=> router.push('/login')}>Login</button>
      <button className="p-4 bg-green-600"  onClick={()=> router.push('/teacher/login')}>Teacher Login</button>


    </div>
  );
};

export default App;
