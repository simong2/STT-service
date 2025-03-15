'use client'
import Link from 'next/link';
import React, { useState } from 'react';


export default function StartService() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [speaker0, setSpeaker0] = useState('');
    const [speaker1, setSpeaker1] = useState('');
    const [showSpeakerFields, setShowSpeakerFields] = useState(false);
    
    const handleFileChange = async(e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile) {
            setFile(selectedFile)
            setSuccess(false)
            console.log(selectedFile)
        }
        
    }

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()

        if (!file) {
            alert('Please upload a file first')
            return
        }
        setUploading(true)
        

        const formData = new FormData()
        formData.append('file', file)

        if (speaker0) {
          formData.append('speaker0', speaker0)
        }

        if (speaker1) {
          formData.append('speaker1', speaker1)
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/jobs/', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('File upload failed')
            }

            const result = await response.json();
            console.log(`Finished result from api: ${result}`)
            setUploading(false)
            setFile(null)
            setSpeaker0('');
            setSpeaker1('');
            setSuccess(true)
            alert('service finished: ' + result.status)
        } catch (error) {
            console.error(error)
            alert('error uploading file')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 transition-all duration-300">
            <div className="text-center mb-8">
              <div className="flex justify-center mb-4">
                <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-8 w-8 text-red-500" 
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
                </div>
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Upload Audio File</h1>
              <p className="text-gray-600 mt-2">Select an MP3 file to transcribe</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-red-400 transition-colors duration-300">
                {file ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-center">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-10 w-10 text-red-500" 
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
                    <p className="text-gray-900 font-medium">{file.name}</p>
                    <p className="text-gray-500 text-sm">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    <button
                      type="button"
                      onClick={() => setFile(null)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium"
                    >
                      Select different file
                    </button>
                  </div>
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="audio/mp3"
                      onChange={handleFileChange}
                      className="hidden"
                      id="fileInput"
                    />
                    <label 
                      htmlFor="fileInput"
                      className="cursor-pointer"
                    >
                      <div className="flex flex-col items-center">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-12 w-12 text-gray-400 mb-3" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                          />
                        </svg>
                        <p className="text-gray-700 font-medium mb-1">Drag and drop or click to select</p>
                        <p className="text-gray-500 text-sm">MP3 files only</p>
                      </div>
                    </label>
                  </div>
                )}
              </div>


              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => setShowSpeakerFields(!showSpeakerFields)}
                  className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center"
                >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className={`h-4 w-4 mr-1.5 transition-transform ${showSpeakerFields ? 'rotate-90' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                  Optional: Add Speaker Information
                </button>
              </div>

              {showSpeakerFields && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-4 border border-gray-200">
                  <p className="text-sm text-gray-600 mb-3">Provide names for speakers in the audio (optional)</p>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Speaker 0</label>
                    <input 
                      type="text" 
                      value={speaker0}
                      onChange={(e) => setSpeaker0(e.target.value)}
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5" 
                      placeholder="Client (James)" 
                    />
                  </div>
                  
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Speaker 1</label>
                    <input 
                      type="text" 
                      value={speaker1}
                      onChange={(e) => setSpeaker1(e.target.value)}
                      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-red-500 focus:border-red-500 block w-full p-2.5" 
                      placeholder="Attorney (Alex)" 
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors duration-300 ${
                  uploading || !file 
                    ? "bg-gray-400 cursor-not-allowed" 
                    : "bg-red-500 hover:bg-red-600"
                }`}
                disabled={uploading || !file}
              >
                {uploading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Audio...
                  </div>
                ) : (
                  "Start Transcription"
                )}
              </button>
            </form>
            
            {success && (
              <div className="mt-6 space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-md p-4 flex items-center">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 text-green-500 mr-2" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                  <span className="text-green-700 font-medium">File transcribed successfully!</span>
                </div>
                <Link 
                  href='/transcriptions'
                  className="block w-full text-center py-3 px-4 bg-white border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-300"
                >
                  View Transcriptions
                </Link>
              </div>
            )}
            
            <div className="mt-6 text-center">
              <Link 
                href="/"
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      );

}