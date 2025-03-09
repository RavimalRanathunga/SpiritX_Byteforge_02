"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function NavLinks()
{
    const router = useRouter();
  console.log('Router State:', router);
    return(
        <div>
              <p className="text-lg font-semibold text-center max-w-2xl leading-relaxed mb-8">
        Spirit11 is your ultimate fantasy team management platform. <br />
        Navigate through different sections to build your dream team, manage your budget, and compete on the leaderboard. <br />
        Stay ahead with real-time updates and engage with our AI-powered chatbot for assistance.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-2xl">
        <NavButton href="/players" text="Players View" />
        <NavButton href="/team-selection" text="Select Your Team" />
        <NavButton href="/team" text="Team View" />
        <NavButton href="/budget" text="Budget View" />
        <NavButton href="/leaderboard" text="Leaderboard" />
      </div>
      <button onClick={() => router.push('/test')}>Go to Test Page</button>

      {/* Chatbot Icon */}
      <Link
        href="/spiriter"
        className="fixed bottom-16 right-6 bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-800 transition"
      >
        💬
      </Link>
        </div>
    );
}

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