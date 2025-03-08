import Link from 'next/link';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-400 to-blue-900 via-white">
      <h1 className="text-6xl font-bold mb-6 text-black">Welcome to Spirit11</h1>
      <p className="text-lg text-gray-600 mb-8">Built your Dream Team - Compete - Conquer</p>
      <div className="flex space-x-4">
        <Link href="/login">
          <button className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-400">
            Sign In
          </button>
        </Link>
        <Link href="/signup">
          <button className="px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-400">
            Sign Up
          </button>
        </Link>
      </div>
    </div>
  );
}