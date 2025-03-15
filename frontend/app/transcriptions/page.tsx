import Link from 'next/link';

async function getData() {
    try {
        console.log('about to fetch...')
        const res = await fetch('http://127.0.0.1:8000/all-jobs', { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('Failed to fetch');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; 
    }
}

export default async function TranscriptionsPage() {
    const transcriptions = await getData();
    
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900">Transcriptions</h1>
              <Link 
                href="/"
                className="flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-300"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 19l-7-7m0 0l7-7m-7 7h18" 
                  />
                </svg>
                Back to Home
              </Link>
            </div>
            <p className="text-gray-600">View and manage your transcribed audio files</p>
          </header>
          
          {transcriptions.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-200">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-16 w-16 mx-auto text-gray-400 mb-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" 
                />
              </svg>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">No transcriptions found</h2>
              <p className="text-gray-600 mb-6">Upload an audio file to get started</p>
              <Link 
                href="/start-service" 
                className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors duration-300"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-2" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 4v16m8-8H4" 
                  />
                </svg>
                Create New Transcription
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {transcriptions.map((item: any) => (
                <Link key={item.id} href={`/transcriptions/${item.id}`}>
                  <div className="bg-white rounded-lg p-6 border border-red-100 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-red-300">
                    <div className="flex items-start">
                      <div className="bg-red-100 rounded-md p-3 mr-4">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-6 w-6 text-red-500" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" 
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h2 className="text-lg font-semibold text-gray-800 mb-2">ID: {item.id}</h2>
                        <p className="text-gray-600 mb-1 text-sm truncate">
                          {item.file_path.split('/')[1]}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {new Date(item.created_at).toLocaleString()}
                        </p>
                        <div className="mt-4 pt-4 border-t border-gray-100 flex justify-end">
                          <span className="inline-flex items-center text-sm font-medium text-red-500">
                            View details
                            <svg 
                              xmlns="http://www.w3.org/2000/svg" 
                              className="h-4 w-4 ml-1" 
                              fill="none" 
                              viewBox="0 0 24 24" 
                              stroke="currentColor"
                            >
                              <path 
                                strokeLinecap="round" 
                                strokeLinejoin="round" 
                                strokeWidth={2} 
                                d="M9 5l7 7-7 7" 
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          <div className="mt-8 flex justify-center">
            <Link 
              href="/start-service" 
              className="inline-flex items-center px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors duration-300"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 4v16m8-8H4" 
                />
              </svg>
              Create New Transcription
            </Link>
          </div>
        </div>
      </div>
    );
  }