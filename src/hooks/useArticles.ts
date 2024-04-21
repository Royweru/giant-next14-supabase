import { supabase } from '@/lib/supabase'
import React, { useEffect, useState } from 'react'

export const useArticles = () => {
  const[articles,setArticles] = useState<any[]>([])


  const subscribeToArticles = ()=>{ supabase
  . channel("articles-follow-up")
  .on("postgres_changes",{
    event:"*",
    schema:"public",
    table:"articles"
  },(payload:any)=>{
    console.log(payload)
  })
  .subscribe()
}


  const getArticles = async () => {
    const{data,error} = await supabase
    .from("articles")
    .select("*")

if (data)setArticles(data)

  }
  return {
    articles,
    getArticles,
    subscribeToArticles
  }
}
