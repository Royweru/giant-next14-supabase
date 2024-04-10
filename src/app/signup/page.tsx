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
       .signInWithOtp({
        email:email,
        options:{
          shouldCreateUser:true
        }
       })
       if(dataUser){
        const{user} = dataUser
        if(user){
          setSuccess(true)
        }
       }
       if(error){
        throw new Error("Cannot sign you up!")
       }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-200 via-black to-sky-950">
      <div className=" text-2xl text-sky-600 font-semibold italic">
         SIGN UP
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
          <input type="submit" onClick={login} className=" hover:cursor-pointer "/>
        </form>
        {/* <div className=" w-full underline font-bold italic hover:cursor-pointer" >
          <a href="/auth/sign-up">
            Have no account sign up
          </a>
        </div> */}
        {success &&
             <div className=" bg-emerald-300 w-full p-4 font-semibold italic text-sm text-black text-center">
                An email has been sent to {email}, to complete your login
             </div>
        }
      
      </div>
    </div>
  );
};

export default LoginPage;
