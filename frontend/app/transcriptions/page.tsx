import Link from 'next/link';

async function getData() {
    try {
        console.log('about to fetch...')
        const res = await fetch('http://127.0.0.1:8000/items', { cache: 'no-store' });

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
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-primary mb-6">Transcriptions</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transcriptions.map((item: any) => (
                    <Link key={item.id} href={`/transcriptions/${item.id}`}>
                        <div className="bg-white shadow-md rounded-lg p-4 border border-red-100 border-primary hover:shadow-lg transition-shadow cursor-pointer">
                            <h2 className="text-lg font-semibold text-gray-800">ID: {item.id}</h2>
                            <p className="">Filename: {item.file_path.split('/')[1]}</p>
                            <p className="">Created at: {new Date(item.created_at).toLocaleString()}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}



