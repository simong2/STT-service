import Link from "next/link";

export default function Home() {
  return (
    <>

    <div className="h-screen flex items-center justify-center">
      <Link href="/transcriptions" className="h-40 w-100 bg-white border border-red-200 rounded-lg shadow-sm hover:bg-red-100 text-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">See Transcriptions</h5>
        <p className="font-normal text-gray-700">View previously transcribe text.</p>
      </Link>

      <div className="m-5"></div>

      <Link href="/start-service" className="h-40 w-100 p-1 bg-white border border-red-200 rounded-lg shadow-sm hover:bg-red-100 text-center">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Start a STT service</h5>
        <p className="font-normal text-gray-700">STT services powered by Eleven Lab and IBM Watson</p>
      </Link>
    </div>


    </>
  )
}
