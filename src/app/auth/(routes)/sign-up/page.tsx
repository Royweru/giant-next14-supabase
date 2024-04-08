"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");

  const signUp = async () => {
    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: pwd,
      });

      if (data) {
        console.log(data);
        router.push("/auth/login");
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
        <div className=" text-2xl text-sky-600 font-semibold italic my-3">
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
            className=" text-lg font-semibold text-white bg-gray-900"
          />
          <input
            type="text"
            placeholder=" enter your password"
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
            className=" text-lg font-semibold text-white bg-gray-900"
          />
          <button onClick={signUp}>SUBMIT</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
