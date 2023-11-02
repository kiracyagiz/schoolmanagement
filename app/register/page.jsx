"use client";

import { useRef, useState } from "react";
import { useAuth } from "../firebase";
import { useRouter } from "next/navigation";
import { auth } from "../firebase";
const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { register,currentUser,addUserData } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      setLoading(true);
      await register(auth, email, password);
      await addUserData(email,currentUser.uid)
      router.push("/login");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col gap-y-8 p-8">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h2 className="text-4xl">Register</h2>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col w-fit gap-y-8 "
          >
            <input
              type="email"
              placeholder="Email"
              ref={emailRef}
              required
              className=" border border-black outline-none p-2"
            />
            <input
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
              className="border border-black outline-none p-2"
            />
            <button type="submit">Register</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Register;
