"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const ResetPage = () => {
  const router = useRouter();


 
 
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [showPwd, setShowPwd] = useState<boolean>(false);



  const onConfirmPassword = async () => {
    if (newPwd !== confirmPwd) {
      return alert("The two passwords are not a match!");
    }
      const {data,error} = await supabase
      .auth
      .updateUser({
        password:newPwd
      }
      )
      if(data){
        router.push("/")
        console.log(data)
      }
      if(error)console.log(error)
      setNewPwd("")
    setConfirmPwd("")
    router.refresh()
  };
  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-200 via-black to-sky-950">
     
      
        <>
          {" "}
          <form className=" flex flex-col rounded-2xl bg-slate-200 gap-y-4 p-12">
            <label htmlFor="" className=" font-semibold text-2xl text-sky-700">
              Enter new password
            </label>
            <input
              type={showPwd ? "text" : "password"}
              name="email"
              placeholder=" enter your password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
              className=" text-lg font-semibold text-black rounded-xl p-6 bg-gray-100"
            />
            <label className=" font-semibold text-2xl text-sky-700">
              Confirm new password
            </label>
            <input
              type={showPwd ? "text" : "password"}
              name="pwd"
              placeholder=" confirm your password"
              value={confirmPwd}
              onChange={(e) => setConfirmPwd(e.target.value)}
              className=" text-lg font-semibold text-black rounded-xl p-6 bg-gray-100"
            />
          </form>
       
          <div
            onClick={() => setShowPwd((val) => !val)}
            className=" font-semibold text-center font-serif cursor-pointer hover:underline text-sky-800 my-2"
          >
            {showPwd ? "Hide passwords" : "Show passwords"}
          </div>
          <div className=" w-full flex justify-center my-5">
            <button
              onClick={onConfirmPassword}
              className=" p-5 bg-emerald-200  text-white rounded-full"
            >
              Confirm Password
            </button>
          </div>
        </>
       
    </div>
  );
};

export default ResetPage;
