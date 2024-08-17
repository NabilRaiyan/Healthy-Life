import Feature from "@/Components/Feature";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";



// Gemini api key: AIzaSyAl_R41ZomsBFP08xE627b42KdP4r3pp64
export default function NewsIndex({ answer, feature, children }) {

    // adding count to reset the limit based on count
    const [count, setCount] = useState(1);

    // setting up the count based on user request 
    const { data, processing, errors, reset, post, setData } = useForm({
        limit: count,
    });
    console.log('limit: ',data.limit);

   
    // Function to submit the form and call the API
    const loadNews = () => {
        post(route('health.getNews'), {
            onSuccess() {
                // reset();
            }
        });
    };


    // Function to increment the count
    const incrementCount = () => {
        setCount(prevCount => prevCount + 1);
    };

    // Update the limit in the form whenever `count` changes
    useEffect(() => {
    setData('limit', count);
    loadNews(); // Load news with the updated limit
    }, [count]); // Only run when `count` changes

    const required_plan = "basicFit";

    return (
        <Feature feature={feature} answer={answer} subscribedPlan={required_plan}>
            <h2 className="text-white text-4xl ml-7 mb-6 mt-6 font-serif">Top News</h2>
            <div className="mt-7">
            {
                answer !== null && answer.data.map((item, index)=>(
                    <div className="flex mt-[10px] h-[280px] gap-6" key={index}>
                        <div className="text-white h-[500px] w-[400px] ml-8">
                            <img className="rounded mt-2 w-[500px] h-[210px]" src={item.photo_url} alt={item.title} />
                        </div>
                        <div className="mr-7 ml-7 inline mt-2 w-[75%] h-[210px]">
                            <h2 className="text-white text-4xl w-[58%] font-serif">{item.title}</h2>
                            <p className="mt-4 text-sm font-mono text-white text-clip text-justify w-[55%]">
                                {item.snippet}
                            </p>
                            <a className="text-blue-400 underline font-mono text-sm mt-4" href={item.link}>
                                Read more
                            </a>
                        </div>
                    </div>
                ))
            }
            </div>
            <div className="flex mt-6 mb-6 justify-center">
                <button className="mt-2 px-4 py-2 bg-gray-800 text-center border hover:bg-gray-50 hover:text-gray-900 hover:border-gray-900 text-white rounded" onClick={incrementCount}>
                        Load more news
                </button>
            </div>
            {children}
        </Feature>
    );
}
