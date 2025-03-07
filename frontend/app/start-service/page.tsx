'use client'
import Link from 'next/link';
import React, { use, useState } from 'react';


export default function StartService() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [success, setSuccess] = useState(false);
    
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

        try {
            const response = await fetch('http://127.0.0.1:8000/jobs/', {
                method: 'POST',
                body: formData,
            })

            if (!response.ok) {
                throw new Error('File upload failed')
            }

            const result = await response.json();
            setUploading(false)
            setFile(null)
            setSuccess(true)
            alert('service finished: ' + result.status)
        } catch (error) {
            console.error(error)
            alert('error uploading file')
        }
    }

  return (
    <>

    <div className="flex items-center justify-center min-h-screen"> 

    
        <div className="w-96 bg-white rounded-lg shadow-lg p-6 text-center flex flex-col justify-between">
            <div>
                <h5 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
                Upload audio file
                </h5>
            </div>

            <div className="flex flex-col justify-between flex-grow space-y-4">
            
            <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
            <input
              type="file"
              accept="audio/mp3"
              onChange={handleFileChange}
              className="hidden"
              id="fileInput"
            />
            <div className="cursor-pointer bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md inline-block">
              Choose File
            </div>
            </label>
            <p className="text-gray-700">{file ? file.name : "No file selected"}</p>
          
            <button
                        type="submit"
                        className={`w-full py-2 px-4 rounded-md text-white ${
                            uploading ? "bg-gray-400 cursor-not-allowed" : "bg-gray-500 hover:bg-gray-600"
                        }`}
                        disabled={uploading}
                    >
                        {uploading ? "Uploading..." : "Upload"}
                    </button>
            </form>

             {/* Success Message */}
             {success && (
                <>
                    <div className="mt-4 bg-green-100 text-green-700 py-2 px-4 rounded-md text-sm font-semibold border border-green-400 transition-opacity duration-500">
                        ✅ File uploaded successfully!
                    </div>
                    <Link href='/transcriptions'>
                    <p className='text-blue-600 hover:underline'>See transcriptions</p>
                    </Link>
                    </>
                )}

            </div>
            </div>
    </div>
    </>
  );

}