"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";


const LoginPage = () => {
  const router = useRouter();


  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
 const [success,setSuccess] = useState<boolean>(false)

  const login = async () => {
    try {
      let{data:dataUser,error} = await supabase
       .auth
       .signInWithPassword({
        email:email,
        password:pwd
       })
       if(dataUser){
        setSuccess(true)
        console.log(dataUser)
       }
       if(error){
        throw new Error("Cannot sign you in!")
       }
       setEmail("")
       setPwd("")
       router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-200 via-black to-sky-950">
      <div className=" text-2xl text-sky-600 font-semibold italic">
         LOGIN
      </div>
      <div>

        <form
          className=" flex flex-col rounded-2xl bg-slate-200 gap-y-4 p-12"
        >
          <input
            type="text"
            name="email"
            placeholder=" enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" text-lg font-semibold text-black rounded-xl p-6 bg-gray-100"
          />
          <input
            type="password"
            name="pwd"
            placeholder=" enter your password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className=" text-lg font-semibold text-black rounded-xl p-6 bg-gray-100"
          />
         {success&&(
          <div className=" w-full p-3 rounded-md flex items-center justify-center font-semibold text-xl font-sans">
            Hey {email} you have successfully signed up check verification email
          </div>
         )}
        </form>
          <div className=" w-full flex justify-center my-5">
          <button onClick={login} className=" p-5 bg-emerald-200  text-white rounded-full">
             LOGIN
          </button>
          </div>
      </div>
    </div>
  );
};

export default LoginPage;
