import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from '@inertiajs/react';

export default function Feature({feature, answer, children, subscribedPlan})
{
    const {auth} = usePage().props;
    const availableDuration = auth.user.available_duration;
    const subscribed_plan = auth.user.subscribed_plan;

    function formatText(text) {
        // Replace uppercase letters with space + the same letter, then capitalize the first letter
        return text
            .replace(/([A-Z])/g, ' $1') // Add a space before each uppercase letter
            .replace(/^./, str => str.toUpperCase()) // Capitalize the first letter of the string
            .trim(); // Remove any leading or trailing spaces
    }
    
   
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold font-mono text-xl text-gray-800 leading-tight">{feature.name}</h2>}
        >
            <Head title="Health Calculator" />

            <div className="py-12">
                <div className="max-w-full mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg relative">
                            {availableDuration <= 0 || subscribed_plan !== subscribedPlan &&(
                                <div className="absolute left-0 right-0 bottom-0 top-0 z-20 flex flex-col items-center justify-center bg-white/70 gap-3">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6" >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                                </svg>
                                <div className="font-raleway">
                                    You need to purchase the {subscribed_plan} plan to continue with the feature. Go{" "}
                                    <Link href="/" className="underline">
                                        Buy Plan
                                    </Link>
                                </div>

                                </div>
                            )}
                            <div className="p-8 text-gray-400 border-b pb-4 font-mono">
                                <p>{feature.description}</p>
                                <p className="text-sm italic text-right mt-5 text-amber-400">
                                    Required {formatText(feature.required_plan)} Plan
                                </p>
                            </div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );


}