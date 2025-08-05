'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [inviteKey, setInviteKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isKeyFromUrl, setIsKeyFromUrl] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check URL parameters on client side
    const urlParams = new URLSearchParams(window.location.search);
    const keyFromUrl = urlParams.get('key');
    if (keyFromUrl) {
      setInviteKey(keyFromUrl);
      setIsKeyFromUrl(true);
      // Auto-redirect after a short delay to show the UI
      setTimeout(() => {
        setIsLoading(true);
        // Check if it's the Y Combinator key
        if (keyFromUrl === 'a6cfd525-c625-4caf-b6a1-1097f933f0bb') {
          router.push(`/yc-welcome?key=${encodeURIComponent(keyFromUrl)}`);
        } else {
          router.push(`/api/invite?key=${encodeURIComponent(keyFromUrl)}`);
        }
      }, 1000);
    }
  }, [router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inviteKey.trim()) {
      setIsLoading(true);
      // Check if it's the Y Combinator key
      if (inviteKey.trim() === 'a6cfd525-c625-4caf-b6a1-1097f933f0bb') {
        router.push(`/yc-welcome?key=${encodeURIComponent(inviteKey.trim())}`);
      } else {
        router.push(`/api/invite?key=${encodeURIComponent(inviteKey.trim())}`);
      }
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
                onChange={(e) => !isKeyFromUrl && setInviteKey(e.target.value)}
                placeholder="Enter your invite key"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                disabled={isLoading}
                readOnly={isKeyFromUrl}
                autoFocus={!isKeyFromUrl}
              />
            </div>
            
            <button
              type="submit"
              disabled={!inviteKey.trim() || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Redirecting...' : isKeyFromUrl ? 'Redirecting automatically...' : 'Access Demo'}
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don&apos;t have an invite key? Say{' '}
              <a 
                href="mailto:hello@wisdomous.io" 
                className="text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  window.location.href = 'mailto:' + 'hello' + '@' + 'wisdomous.io';
                }}
              >
                hello<span style={{ display: 'none' }}>nospam</span>@wisdomous.io
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}