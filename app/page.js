"use client"
import React from "react"
import { useRouter } from 'next/navigation'
import Image from "next/image";

export default function Home() {
  const router = useRouter()

  const [handle, setHandle] = React.useState("");

  return (
    <main>
      <section className="bg-[#254f1a] min-h-[100vh] grid grid-cols-2">
        <div className="flex justify-center flex-col ml-[10vw] gap-3">
          <p className="text-yellow-300 font-bold text-5xl mt-10">Everything you</p>
          <p className="text-yellow-300 font-bold text-5xl">are. In one,</p>
          <p className="text-yellow-300 font-bold text-5xl">
            simple link in bio.
          </p>

          <p className="text-yellow-300 text-lg my-4">
            Join 50M+ people using Linktree for their link in bio. One link to help
            you share everything you create, curate and sell from your Instagram,
            TikTok, Twitter, YouTube and other social media profiles.
          </p>

          <div className="input flex gap-5">
            <input
              value={handle}
              onChange={(e)=> setHandle(e.target.value)}
              className="px-2 py-1 pl-5 bg-white text-black focus:outline-green-800 rounded-lg"
              type="text"
              placeholder="Enter your Handle"
            />
            <button onClick={()=> router.push(`/generate?handle=${handle}`)} className="bg-pink-500 cursor-pointer text-white rounded-full px-6 py-4 font-semibold">
              Claim your Bittree
            </button>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col mr-[10vw]">
          <img src="/home.png" alt="homepage image" />
        </div>
      </section>

      <section className="bg-red-700 min-h-[100vh]"></section>
    </main>
  );
}