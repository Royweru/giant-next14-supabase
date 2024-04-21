"use client";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [success, setSuccess] = useState<boolean>(false);
  const [resetPwd, setResetPwd] = useState<boolean>(false);
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");

  const [showPwd, setShowPwd] = useState<boolean>(false);

  const login = async () => {
    try {
      let { data: dataUser, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: pwd,
      });
      if (dataUser) {
        setSuccess(true);
        console.log(dataUser);
      }
      if (error) {
        throw new Error("Cannot sign you in!");
      }
      setEmail("");
      setPwd("");
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const sendPwdReset = async () => {
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.href}reset`,
      });
      setSuccess(true);
      setEmail("");
      if (data) console.log(data);
      if (error) console.log(error);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className=" w-full h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-blue-200 via-black to-sky-950">
      {!resetPwd && (
        <>
          <div className=" text-2xl text-sky-600 font-semibold italic">
            LOGIN
          </div>
          <div>
            <form className=" flex flex-col rounded-2xl bg-slate-200 gap-y-4 p-12">
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
              {success && (
                <div className=" w-full p-3 rounded-md flex items-center justify-center font-semibold text-xl font-sans">
                  Hey {email} you have successfully signed up check verification
                  email
                </div>
              )}
            </form>
            <div
              className=" my-2 w-full p-6 hover:underline cursor-pointer txt-black text-center"
              onClick={() => router.push("/signup")}
            >
              Have no account,{" "}
              <span className=" font-semibold text-sm text-sky-300 hover:text-white">
                {" "}
                sign up
              </span>
            </div>
            <div className=" w-full flex justify-center my-5">
              <button
                onClick={login}
                className=" p-5 bg-emerald-200  text-white rounded-full"
              >
                LOGIN
              </button>
            </div>
          </div>
        </>
      )}

      {resetPwd && (
        <>
          {" "}
          <form className=" flex flex-col rounded-2xl bg-slate-200 gap-y-4 p-12">
            <label htmlFor="" className=" font-semibold text-2xl text-sky-700">
              Enter your email
            </label>
            <input
              type={"email"}
              name="email"
              placeholder=" enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" text-lg font-semibold text-black rounded-xl p-6 bg-gray-100"
            />
            {success && (
              <div className=" w-full p-3 rounded-md flex items-center justify-center font-semibold text-xl font-sans">
                Hey {email}, check your email for a link to reset your password
              </div>
            )}
          </form>
          <div className=" w-full flex justify-center my-5">
            <button
              onClick={sendPwdReset}
              className=" p-5 bg-emerald-200  text-white rounded-full"
            >
              Reset Password
            </button>
          </div>
        </>
      )}
      <p
        onClick={() => setResetPwd((val) => !val)}
        className=" cursor-pointer hover:underline"
      >
        {resetPwd ? "Login" : "Reset my password"}
      </p>
    </div>
  );
};

export default LoginPage;
