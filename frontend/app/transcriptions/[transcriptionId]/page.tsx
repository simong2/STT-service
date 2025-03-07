import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getTranscription(id: number) {
    try {
        const res = await fetch(`http://127.0.0.1:8000/jobs/${id}`, { cache: 'no-store' });

        if (!res.ok) {
            throw new Error('Failed to get data');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return []; 
    }
}

export default async function TranscriptionDetail({ params }: { params: { transcriptionId: number } }) {

    const { transcriptionId } = params;

    const transcription = await getTranscription(transcriptionId);

    if (!transcription) return notFound(); 

    return (
        <>
        <div className="min-h-screen bg-gray-100 p-6">
            <Link href='/transcriptions'>
                <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2">Back</button>
            </Link>

            <div className='flex justifiy-between'>
                <div className="w-[40%] mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-primary mb-4">Transcription {transcription.id}</h1>
                    <p className="text-gray-600">{transcription.transcript}</p>
                </div>
            </div>
        </div>
        </>
    )
}