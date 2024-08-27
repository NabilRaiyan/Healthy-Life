import { usePage } from "@inertiajs/react";


export default function PackagePricingCard({packages, features}){
    const {csrf_token} = usePage().props;


    return(
        <section className="bg-gray-900 rounded">
            <div className="py-8 px-4">
                <div className="text-center mb-8">
                    <h2 className="mb-4 text-4xl font-extrabold text-white">
                        Go for Pro Athlete package for bigger savings.
                    </h2>
                </div>

                <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 mt-8 rounded xl:gap-10 lg:space-y-0 ml-[50px]">
                    {packages.map((p)=>(
                        <div key={p.id} className="flex flex-col align-stretch p-6 mx-auto 
                                                    lg:mx-0 max-w-lg text-center rounded-lg border shadow
                                                    border-gray-600 bg-gray-800 text-white"
                        >
                        <h3 className="mb-4 text-2xl font-semibold">{p.name}</h3>
                        <p className="font-light text-gray-500 sm:text-sm text-justify dark:text-gray-400">Fitness & Health Calculators is a comprehensive tool designed to help you easily assess your health and fitness 
                            levels. With features like BMI calculation, body fat analysis, and more, it empowers you to make informed decisions on your wellness j
                            ourney.</p>
                        <div className="flex justify-center items-baseline my-8">
                            <span className="mr-2 text-5xl font-extrabold">${p.price}</span>
                            <span className="text-gray-500 dark:text-gray-400">/{p.duration_days} days</span>
                        </div>
                        <ul role="list" className="mb-8 space-y-4 text-left">
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                <span>Health Calculator</span>
                                
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                <span>Health Chatbot</span>
                                
                            </li>
                            <li className="flex items-center space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-green-500 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg>
                                <span>Health Article</span>
                                
                            </li>

                        {/* form for submission */}
                        </ul>
                        <form action={route("credit.buy", p)} method="post" className="w-full">
                            <input type="hidden" name="_token" value={csrf_token} autoComplete="off"></input>
                            <button className="w-full text-white bg-blue-600 hover:bg-blue-700 hover:ring-4 hover:ring-blue-200 
                                                    font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:text-white  dark:hover:ring-blue-900">
                                                    Get started
                            </button>
                        </form>

                        </div>
                    ))}

                </div>
            </div>
        </section>
    )
}