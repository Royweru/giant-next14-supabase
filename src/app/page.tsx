"use client";
import { supabase } from "@/lib/supabase";
import { SignOut } from "@/components/sign-out";
import Image from "next/image";
import { useArticles } from "@/hooks/useArticles";
import { useEffect } from "react";

export default function Home() {
  const { articles, getArticles, subscribeToArticles } = useArticles();

  const subscribedChannel = supabase
    .channel("articles-follow-up")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "articles",
      },
      (payload: any) => {
        console.log(payload);
      }
    )
    .subscribe();

  const unsubscribeToArticles = () => {
    supabase.removeChannel(subscribedChannel);
  };

  useEffect(() => {
    getArticles();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
      <div>
        <button onClick={unsubscribeToArticles}>UNSUBSCRIBE</button>
      </div>
      <ul>
        {articles.map((article: any, key: number) => {
          return <li key={key} className=" font-semibold text-2xl">{article.title}</li>;
        })}
      </ul>
    </main>
  );
}
