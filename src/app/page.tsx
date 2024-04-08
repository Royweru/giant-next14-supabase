import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function Home() {
  const setNewView  = async()=>{
    const {data,error} = await supabase.from("views")
    .insert({
      name:"random page"
    })

    if(data)console.log(data)
    if(error)console.log(error)
  }
setNewView()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className=" text-3xl font-semibold ">
          LOGGED IN
      </div>
    </main>
  );
}
