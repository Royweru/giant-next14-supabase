"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const login = async () => {
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pwd,
      });

      if (data) {
        console.log(data);
        router.refresh();
      }
      if (error) console.log(error);
      setPwd("");
      setEmail("");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-200 via-black to-sky-950">
      <div className=" text-2xl text-sky-600 font-semibold italic">
          LOGIN USER
      </div>
      <div>

        <form
          action=""
          className=" flex flex-col rounded-2xl bg-slate-200 gap-y-4 p-12"
        >
          <input
            type="text"
            placeholder=" enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" text-lg font-semibold text-white p-6 bg-gray-100"
          />
          <input
            type="text"
            placeholder=" enter your password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className=" text-lg font-semibold text-white p-6 bg-gray-100"
          />
          <button onClick={login}>LOGIN</button>
        </form>
        <div className=" w-full underline font-bold italic hover:cursor-pointer" >
          <a href="/auth/sign-up">
            Have no account sign up
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
