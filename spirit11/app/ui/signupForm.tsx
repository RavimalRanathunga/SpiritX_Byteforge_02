'use client';

import { AtSymbolIcon, KeyIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useActionState } from 'react';
import { RegisterUser } from '@/app/lib/actions';
import { useState } from 'react';

export default function SignupForm() {
 
  const [errorMessage, formAction, isPending] = useActionState(RegisterUser, undefined);
  const [passwordMatchError, setPasswordMatchError] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (event: { target: any; preventDefault: () => void; }) => {
    const form = event.target;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      event.preventDefault();
      setPasswordMatchError("Passwords do not match!");
    } else {
      setPasswordMatchError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} action={formAction} className="space-y-3">
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl text-black">Signup to SecureConnect</h1>

        <div className="w-full">
          <label className="mb-3 block text-xs font-medium text-gray-900" htmlFor="username">
            Username
          </label>
          <div className="relative">
            <input id="username" type="text" name="username" required placeholder="Enter your username" minLength={8}
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500 focus:text-black"/>
            <AtSymbolIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <label className="mt-4 block text-xs font-medium text-gray-900" htmlFor="password">
            Create a Password
          </label>
          <div className="relative">
            <input id="password" type="password" name="password" required minLength={8} placeholder="Enter a strong password"
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500 focus:text-black"/>
            <KeyIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          <label className="mt-4 block text-xs font-medium text-gray-900" htmlFor="confirm-password">
            Confirm Password
          </label>
          <div className="relative">
            <input id="confirm-password" type="password" name="confirmPassword" required minLength={8} placeholder="Re-enter your password"
              className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm placeholder:text-gray-500 focus:text-black"/>
            <KeyIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>

          {passwordMatchError && <p className="text-sm text-red-500 mt-1">{passwordMatchError}</p>}
        </div>

        <input type="hidden" name="redirectTo" value={"/dashboard"} />
        <Button className="mt-4 w-full" aria-disabled={isPending}>
          Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>

        {errorMessage && (
          <div className="flex h-8 items-end space-x-1">
            <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{errorMessage}</p>
          </div>
        )}
      </div>
    </form>
  );
}
