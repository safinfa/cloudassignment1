import Link from "next/link";

export default function ComingSoon() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-xl w-full mx-4 p-8 border rounded shadow-sm text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-white">
            Coming Soon
        </h1>
        <p className="mb-6 text-gray-700 dark:text-gray-300">
          This page is currently under construction. Please check back later!
        </p>
        <Link
          href="/"
          className="px-4 py-2 border rounded text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}
