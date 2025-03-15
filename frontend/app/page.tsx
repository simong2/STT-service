import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="container max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8">
        <Link
          href="/transcriptions"
          className="flex-1 p-8 h-75 bg-white border border-red-200 rounded-lg shadow-md hover:shadow-lg hover:bg-red-50 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-48"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
            See Transcriptions
          </h2>
          <p className="font-normal text-gray-600">
            View previously transcribed text
          </p>
        </Link>
        
        <Link
          href="/start-service"
          className="flex-1 p-8 h-75 bg-white border border-red-200 rounded-lg shadow-md hover:shadow-lg hover:bg-red-50 transition-all duration-300 text-center flex flex-col items-center justify-center min-h-48"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-red-500 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            />
          </svg>
          <h2 className="mb-3 text-2xl font-bold tracking-tight text-gray-900">
            Start a STT Service
          </h2>
          <p className="font-normal text-gray-600">
            STT services powered by Eleven Labs and IBM Watson
          </p>
        </Link>
      </div>
    </div>
  );
}