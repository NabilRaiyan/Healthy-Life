import { Link } from "@inertiajs/react";



export default function Footer(){
    return(
        <div className="p-[20px] mt-[100px] dark:text-white dark:bg-gray-900 w-full flex">

            <div className="flex flex-col gap-1 ml-5">
            <h4 className="text-lg mb-3 border-b border-violet-500">COMPANY INFORMATION</h4>
                <Link href="/" className="text-white hover:text-cyan-300 underline">About</Link>
                <Link href="/" className="text-white hover:text-cyan-300 underline">Contact Us</Link>
                <Link href="/" className="text-white hover:text-cyan-300 underline">BMR Calculator</Link>
            </div>
        </div>
    )
}