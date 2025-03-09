// "use client";
import { signOut } from "@/auth";
import { PowerIcon } from "lucide-react";

import NavLinks from "../ui/navigation";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-br from-pink-400 to-blue-900 via-white flex flex-col items-center justify-center p-6 text-black">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full bg-white-900 text-pink py-2 px-6 text-lg font-bold shadow-md text-left flex justify-between">
      <h1 className="text-2xl font-bold my-auto">Welcome to Spirit11</h1>
      <form
              action={async () => {
                'use server';
                await signOut({ redirectTo: '/' });
              }}>
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
          </form>
      </div>
      <div>
     
        <NavLinks></NavLinks>
      
      </div>
    </div>
    
  );
}

