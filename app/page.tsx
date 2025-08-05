export default function Home() {
  return (
    <div className="font-sans flex items-center justify-center min-h-screen p-8">
      <main className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">Wisdomous Invite Handler</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
          This service handles invite link redirects for Wisdomous demo.
        </p>
        
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">How it works:</h2>
          <ol className="text-left space-y-2">
            <li className="flex items-start">
              <span className="font-mono mr-2">1.</span>
              <span>Users click on invite links with format: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">/invite?key=xxx</code></span>
            </li>
            <li className="flex items-start">
              <span className="font-mono mr-2">2.</span>
              <span>Click is tracked using Vercel KV and Analytics</span>
            </li>
            <li className="flex items-start">
              <span className="font-mono mr-2">3.</span>
              <span>User is redirected to the demo at: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">{process.env.REDIRECT_URL || 'https://demo.wisdomous.io'}</code></span>
            </li>
          </ol>
        </div>

        <div className="text-sm text-gray-500 dark:text-gray-500">
          <p>Powered by Next.js on Vercel</p>
        </div>
      </main>
    </div>
  );
}