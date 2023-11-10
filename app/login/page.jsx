"use client"

import { useRef } from "react";
import { useAuth } from "../firebase";
import { useRouter } from "next/navigation";


const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signup,currentUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      await signup(email, password);
      router.push('/dashboard');

      // if(currentUser.status == 'teacher'){
      //   router.push('/teacher');
      // }
      // else {
      //   router.push('/dashboard');
      // }
    

    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <div className="flex flex-col gap-y-8 p-8">
      <h2 className="text-4xl">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col w-fit gap-y-8 ">
        <input type="email" placeholder="Email" ref={emailRef} required className=" border border-black outline-none p-2" />
        <input type="password" placeholder="Password" ref={passwordRef} required  className="border border-black outline-none p-2"/>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login;
