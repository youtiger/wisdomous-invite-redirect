'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function YCWelcome() {
  const [countdown, setCountdown] = useState(5);
  const router = useRouter();

  useEffect(() => {
    // Get key from URL params on client side
    const urlParams = new URLSearchParams(window.location.search);
    const keyFromUrl = urlParams.get('key');

    if (!keyFromUrl) {
      router.push('/');
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Redirect to the API route which will handle the actual redirect
          router.push(`/api/invite?key=${encodeURIComponent(keyFromUrl)}`);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <main className="text-center max-w-2xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-12">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-4">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22 12C22 6.48 17.52 2 12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 12 17.52 22 12ZM12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4Z"/>
                <path d="M13 7H11V12L15.25 14.15L16 12.92L12.5 11.25V7Z"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent">
              Welcome, Y Combinator!
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Thank you for your interest in Wisdomous
            </p>
          </div>

          <div className="mb-8 text-left bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-3">You&apos;re about to experience:</h2>
            <ul className="space-y-2 text-gray-700 dark:text-gray-300">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>A personalized demo as <strong>Franziska Chen-Mueller</strong></span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Head of Digital Innovation at <strong>Steinbach Precision Systems GmbH</strong></span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Full access to explore our enterprise features</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Pre-configured workspace with sample data</span>
              </li>
            </ul>
          </div>

          <div className="mb-6">
            <div className="text-5xl font-bold text-orange-500 mb-2">{countdown}</div>
            <p className="text-gray-600 dark:text-gray-400">
              Redirecting to your personalized demo...
            </p>
          </div>

          <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need help? Reach out to us at{' '}
              <a href="mailto:yc@wisdomous.io" className="text-orange-500 hover:underline">
                yc@wisdomous.io
              </a>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}