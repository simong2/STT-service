import UpdateContext from '@/app/components/updateContext';
import Link from 'next/link';
import { notFound } from 'next/navigation';

async function getTranscription(id: string) {
    try {
        const res = await fetch(`http://127.0.0.1:8000/jobs/${id}`, { cache: 'no-store' });
        
        if (!res.ok) {
            throw new Error('Failed to get data');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null
    }
}

async function updateContext(id: string) {
    try {
        const res = await fetch(`http://127.0.0.1:8000/jobs/update-context/${id}`, { cache: 'no-store' });
        
        if (!res.ok) {
            throw new Error('Failed to get data');
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null
    }
}


export default async function TranscriptionDetail({ params } : { params: { transcriptionId: string } } ) {

    const { transcriptionId } = await params;

    const transcription = await getTranscription(transcriptionId);

    if (!transcription) return notFound();

    
    
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Link href="/transcriptions">
                <button className="text-white bg-red-700 hover:bg-red-800 px-5 py-2.5 rounded-full">Back</button>
            </Link>

            <div className="flex justify-between">
                <div className="w-[40%] mx-auto bg-white shadow-lg rounded-lg p-6">
                    <h1 className="text-2xl font-bold text-primary mb-4">Transcription {transcription.job_id}</h1>
                    <p className="text-gray-600">{transcription.transcript}</p>
                    <br />
                    <p className="text-gray-600">
                        <b className="text-red-600">Speaker info:</b> {JSON.stringify(transcription.speaker_info)}
                    </p>
                </div>
                <UpdateContext transcriptionId={transcriptionId} initialContext={transcription.context_text} />
            </div>
        </div>
    );
}