import { Link } from "@inertiajs/react";


export default function MoreLink(){
    return (
        <div className="p-[20px] mt-[50px] dark:text-white dark:bg-gray-700 w-1/5 rounded border ml-[45px]">
            <div className="flex flex-col gap-1 ml-5">
                <h4 className="text-lg mb-3">More Fitness and Health Calculators</h4>
                    <Link href={route('healthCalculator.fatIndex')} className="text-amber-400 hover:text-amber-200 underline">Body Fat Percentage</Link>
                    <Link href="/" className="text-amber-400 hover:text-amber-200 underline">Calorie Intake Calculator</Link>
                    <Link href="/" className="text-amber-400 hover:text-amber-200 underline">BMR Calculator</Link>
            </div>
        </div>
    )
}