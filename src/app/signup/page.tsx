"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState<boolean>(false);

  const signUp = async () => {
    try {
      let { data: dataUser, error } = await supabase.auth.signUp({
        email: email,
        password: pwd,
      });
      if (dataUser) {
        setSuccess(true);
        console.log(dataUser);
      }
      if (error) {
        throw new Error("Cannot sign you up!");
      }
      setEmail("");
      setPwd("");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-200 via-black to-sky-950">
      <div className=" text-2xl text-sky-600 font-semibold italic">SIGN UP</div>
      <div>
        <form className=" flex flex-col rounded-2xl bg-slate-200 gap-y-4 p-12">
          <input
            type="text"
           
            placeholder=" enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" text-lg font-semibold text-black rounded-xl p-6 bg-gray-100"
            autoComplete="false"
          />
          <input
            type="password"
            placeholder=" enter your password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className=" text-lg font-semibold text-black rounded-xl p-6 bg-gray-100"
            autoComplete="false"
          />
          <button onClick={signUp} className=" p-5 bg-emerald-200  text-white">
            SIGN UP
          </button>
        </form>

        {success && (
          <div className=" w-full p-5 font-semibold  text-2xl text-black">
            You have successfully signed up
            <span className=" ml-2 font-bold text-sm text-gray-800 underline ">
              <a href="/login">Login to your account </a>
            </span>``
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUpPage
