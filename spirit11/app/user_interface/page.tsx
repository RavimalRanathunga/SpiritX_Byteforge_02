"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-br from-pink-400 to-blue-900 via-white flex flex-col items-center justify-center p-6 text-black">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 w-full bg-gray-900 text-white py-2 px-6 text-lg font-bold shadow-md text-left">
        Spirit11
      </div>

      <h1 className="text-4xl font-bold mb-6 mt -10">Hi,</h1>
      <h1 className="text-4xl font-bold mb-6">Welcome to Spirit11</h1>

      {/* Centered Description */}
      <p className="text-lg font-semibold text-center max-w-2xl leading-relaxed mb-8">
        Spirit11 is your ultimate fantasy team management platform. <br />
        Navigate through different sections to build your dream team, manage your budget, and compete on the leaderboard. <br />
        Stay ahead with real-time updates and engage with our AI-powered chatbot for assistance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-2xl">
        <NavButton href="/auth" text="Authentication" />
        <NavButton href="/players" text="Players View" />
        <NavButton href="/team-selection" text="Select Your Team" />
        <NavButton href="/team" text="Team View" />
        <NavButton href="/budget" text="Budget View" />
        <NavButton href="/leaderboard" text="Leaderboard" />
      </div>

      {/* Chatbot Icon */}
      <Link
        href="/spiriter"
        className="fixed bottom-16 right-6 bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition"
      >
        💬
      </Link>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white py-2 px-6 text-lg font-bold shadow-md flex justify-between">
        <span>MoraSpirit</span>
        <span className="text-sm">University of Moratuwa</span>
      </div>
    </div>
  );
}

// Fixed TypeScript error by adding types
function NavButton({ href, text }: { href: string; text: string }) {
  return (
    <Link
      href={href}
      className="bg-purple-800 text-white text-lg font-semibold py-14 px-14 rounded-lg text-center hover:bg-blue-500 hover:shadow transition w-full block"
    >
      {text}
    </Link>
  );
}