"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface LoginProps {
  // Add any props you might need to communicate with parent components
}

export default function Login(props: LoginProps) {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // API call would go here
      
      // Simulating a successful login for demonstration:
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check your credentials.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-sm max-w-md mx-auto w-full">
        {/* Logo will be placed here - leave comment for manual placement */}
        {/* <div className="flex justify-center mb-6">
          <Image 
            src="/path-to-your-logo.png" 
            alt="Logo" 
            width={120} 
            height={80}
          />
        </div> */}
        
        <h2 className="text-center text-xl font-semibold mb-6">
          Sign in Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                Remember my preference
              </label>
            </div>
          </div>
          
          {/* <div className="text-sm">
            <Link href="/pages/forgotpassword" className="text-gray-600 hover:text-gray-800">
              Forgot Password?
            </Link>
          </div> */}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-900 text-white rounded-md py-2 px-4 text-sm font-medium hover:bg-blue-800 transition"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-sm">
          Don't have an account?{' '}
          <Link href="/register" className="text-blue-600 hover:text-blue-500">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}