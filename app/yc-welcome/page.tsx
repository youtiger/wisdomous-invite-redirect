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
              You&apos;re about to experience Wisdomous through the lens of Steinbach Precision Systems GmbH, a leading German precision machinery manufacturer serving aerospace and automotive industries. In this demo, you&apos;ll step into the Smart Factory Initiative 2025 - a critical digital transformation project aimed at achieving 30% efficiency gains through IoT integration and predictive maintenance.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-4">Your First 5 Minutes:</h2>
            
            <ol className="space-y-4 text-gray-700 dark:text-gray-300">
              <li>
                <strong>Explore the Stakeholder Landscape</strong> - Navigate to the AI Agents section to meet your 14 diverse stakeholders, from Werner Steinbach (traditionalist CEO) to Chen Wei (innovation-focused engineer). Notice how each has unique personalities, hidden agendas, and complex relationships that mirror real organizational dynamics.
              </li>
              <li>
                <strong>Review the Project Journey</strong> - Check the Smart Factory roadmap in the Journeys section. See how the project evolves from initial IoT sensor deployment through to full predictive maintenance implementation, with realistic challenges and decision points.
              </li>
              <li>
                <strong>Run a Stakeholder Simulation</strong> - Try the &ldquo;Prioritization Meeting&rdquo; simulation to watch your stakeholders debate feature priorities. Observe how Werner&apos;s cost concerns clash with Franziska&apos;s innovation drive, while Chen Wei pushes technical excellence and Helga advocates for workforce considerations.
              </li>
              <li>
                <strong>Check the Knowledge Base</strong> - Browse technical specifications and meeting notes that capture the organization&apos;s collective intelligence about smart manufacturing, Industry 4.0 standards, and change management strategies.
              </li>
              <li>
                <strong>Generate Insights</strong> - Use the AI Assistant to interview specific stakeholders about their concerns. Try asking Werner about ROI or Helga about workforce training needs to uncover hidden requirements before any code is written.
              </li>
            </ol>

            <p className="text-gray-600 dark:text-gray-400 mt-6">
              This demo showcases how Wisdomous prevents the typical 60% enterprise software failure rate by surfacing organizational dynamics, hidden resistances, and unspoken requirements before development begins.
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