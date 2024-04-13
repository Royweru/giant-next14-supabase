"use client"
import React from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
export const SignOut = () => {
    const router = useRouter()
    const onSignOut = async () => {
        await supabase
        .auth
        .signOut()   
  
        router.refresh()
       }
  return (
    <div className=' w-full my-4 flex justify-center'>
       <button 
       className=' font-semibold text-xl font-serif bg-red-500 text-white p-5 rounded-xl hover:cursor-pointer'
       onClick={onSignOut}
       >
         LOGOUT
        </button> 
    </div>
  )
}
