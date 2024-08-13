import { Link } from "@inertiajs/react";



export default function Footer(){
    return(
        <div className="p-[20px] mt-[100px] dark:text-white dark:bg-gray-700 w-full">
            <h4 className="ml-5 text-lg">More Fitness and Health Calculators</h4>
            <Link href="/" className="underline">Body Fat Percentage</Link>
            <Link href="/" className="underline">Calorie Intake Calculator</Link>
            <Link href="/" className="underline">BMR Calculator</Link>



        </div>
    )
}