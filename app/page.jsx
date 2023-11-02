"use client"

import { useRouter } from "next/navigation";


const App = () => {

  const router = useRouter();
  

  return (
    <div className="text-center gap-x-8 justify-center flex container mt-40">
      <button className="p-4 bg-blue-600" onClick={()=> router.push('/register')}>Register</button>
      <button className="p-4 bg-green-600"  onClick={()=> router.push('/login')}>Login</button>

    </div>
  );
};

export default App;
