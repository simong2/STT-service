import Link from "next/link"

const Navbar = () => {
    return (
        <>
        <div className="w-full h-20 bg-red-400">
            <div className="container mx-auto px-4 h-full">
                <div className="flex justify-center items-center h-full">
                    <Link href='/'>
                        <p className="text-[2.3rem] hover:text-white">
                            Operation Scribe
                        </p>
                    </Link>
                </div>
            </div>
        </div>
        </>
    )
}

export default Navbar