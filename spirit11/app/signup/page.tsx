import { Suspense } from 'react';
import SignupForm from '../ui/signupForm';
 
export default function SignupPage() {
  return (
    <main className="flex items-center justify-center md:h-screen bg-gray-200">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex h-1000 w-full items-center justify-center rounded-lg bg-pink-500 p-3 md:h-64">
        <Suspense>
          <SignupForm/>
        </Suspense>
        </div>
      </div>
    </main>
  );
}