'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function YCWelcome() {
  const [key, setKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Get key from URL params on client side
    const urlParams = new URLSearchParams(window.location.search);
    const keyFromUrl = urlParams.get('key');
    setKey(keyFromUrl);

    if (!keyFromUrl) {
      router.push('/');
    }
  }, [router]);

  const handleStartDemo = () => {
    if (key) {
      setIsLoading(true);
      router.push(`/api/invite?key=${encodeURIComponent(key)}`);
    }
  };

  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-8 bg-gray-50 dark:bg-gray-900">
      <main className="max-w-4xl w-full">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6">Welcome to the Steinbach Precision Systems Demo</h1>
          
          <div className="prose dark:prose-invert max-w-none mb-8">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              You&apos;re about to experience Wisdomous through the lens of Steinbach Precision Systems GmbH, a leading German manufacturer of high-precision CNC machining centers for aerospace and automotive industries. Founded in 1967 with 850 employees and €180M in annual revenue, Steinbach is embarking on their Smart Factory Initiative 2025 - a critical €2.5M digital transformation aimed at reducing machine downtime by 30% through Industry 4.0 technologies.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">Your First 5 Minutes:</h2>
            
            <ol className="space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Meet Your Key Stakeholders</strong> - Navigate to the AI Agents section to meet Werner Steinbach (CEO and third-generation owner), Franziska Chen-Mueller (Head of Digital Innovation), Klaus Zimmermann (35-year Production Manager veteran), Dr. Hans Petersen (Aerospace Customer Representative), and Stefan Wolf (Works Council Chairman). Each brings unique perspectives on balancing innovation with German manufacturing excellence.
              </li>
              <li>
                <strong>Explore the Smart Factory Features</strong> - Check the Features section to see the planned initiatives: IoT Sensor Network for machine monitoring, Predictive Maintenance Dashboard, Digital Quality Control systems, Operator Training Platform with AR support, and Production Analytics for real-time OEE tracking.
              </li>
              <li>
                <strong>Run the Kickoff Meeting Simulation</strong> - Try the &ldquo;Smart Factory Initiative Kickoff&rdquo; simulation to watch stakeholders debate the transformation approach. Observe the tension between Werner&apos;s &ldquo;evolution not revolution&rdquo; philosophy, Franziska&apos;s digital vision, Klaus&apos;s production stability concerns, Dr. Petersen&apos;s quality requirements, and Stefan&apos;s worker protection priorities.
              </li>
              <li>
                <strong>Interview Individual Stakeholders</strong> - Use the AI Assistant to dig deeper. Ask Klaus about his failed ERP experience in 2003, or Stefan about job security guarantees. Uncover the hidden concerns that could derail your Industry 4.0 implementation.
              </li>
              <li>
                <strong>Review Initial Insights</strong> - Notice how each stakeholder&apos;s psychological profile reveals their triggers and motivations - from Klaus&apos;s &ldquo;operators know best&rdquo; mindset to Dr. Petersen&apos;s &ldquo;quality saves lives&rdquo; principle.
              </li>
            </ol>

            <p className="text-gray-600 dark:text-gray-400 mt-6">
              This demo showcases how Wisdomous surfaces the human dynamics that determine whether enterprise transformations succeed or fail - before a single line of code is written.
            </p>
          </div>

          <button
            onClick={handleStartDemo}
            disabled={isLoading || !key}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Starting Demo...' : 'Start Demo'}
          </button>
        </div>
      </main>
    </div>
  );
}