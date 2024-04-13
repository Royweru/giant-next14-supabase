import { supabase } from "@/lib/supabase";
import { SignOut } from "@/components/sign-out";
import Image from "next/image";

export default function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly p-24">
      <div className=" text-3xl font-semibold ">
          LOGGED IN
      </div>
    <SignOut />
    </main>
  );
}
