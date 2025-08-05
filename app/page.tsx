'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [inviteKey, setInviteKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteKey.trim()) {
      setIsLoading(true);
      router.push(`/invite?key=${encodeURIComponent(inviteKey.trim())}`);
    }
  };

  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <main className="text-center max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2">Welcome to Wisdomous</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Enter your invite key to access the demo
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                value={inviteKey}
                onChange={(e) => setInviteKey(e.target.value)}
                placeholder="Enter your invite key"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
                autoFocus
              />
            </div>
            
            <button
              type="submit"
              disabled={!inviteKey.trim() || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Redirecting...' : 'Access Demo'}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don&apos;t have an invite key? Contact your administrator.
            </p>
          </div>
        </div>
        
        <div className="mt-8 text-xs text-gray-500 dark:text-gray-400">
          <p>Powered by Next.js on Vercel</p>
        </div>
      </main>
    </div>
  );
}