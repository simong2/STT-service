import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 h-20">
        <div className="flex justify-between items-center h-full">
          <Link href="/" className="flex items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 text-white" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" 
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-800">
                <span className="text-red-500">Operation</span> Scribe
              </h1>
            </div>
          </Link>
          
          <div className="hidden md:flex space-x-2">
            <Link 
              href="/transcriptions" 
              className="px-4 py-2 text-gray-700 hover:text-red-500 font-medium rounded-md transition-colors duration-300"
            >
              Transcriptions
            </Link>
            <Link 
              href="/start-service" 
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors duration-300"
            >
              New Transcription
            </Link>
          </div>
          
          <div className="md:hidden">
            <Link 
              href="/start-service" 
              className="inline-flex items-center px-3 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded-md transition-colors duration-300 text-sm"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-1" 
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
              New
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;