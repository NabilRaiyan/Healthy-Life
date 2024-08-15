import Feature from "@/Components/Feature";
import { Link } from "@inertiajs/react";
import { useForm } from "@inertiajs/react";
import { useEffect } from "react";

export default function NewsIndex({ answer, feature, children, allNews }) {
    const { data, processing, errors, reset, post, setData } = useForm();

    // Function to submit the form and call the API
    const loadNews = () => {
        post(route('health.getNews'), {
            onSuccess() {
                reset();
            }
        });
    };

    // useEffect hook to call the API on first load

    // useEffect(() => {
    //     loadNews();
    // }, []);

    const required_plan = "basicFit";
    if(answer){
        console.log(answer.data[0].title);

    }

    return (
        <Feature feature={feature} answer={answer} subscribedPlan={required_plan}>
            <div className="">
               {
                answer !== null && (
                    <div className="flex mt-7">
                        <div className="text-white h-[500px] w-[400px] ml-8">
                            <img className=" mt-2" src={answer.data[0].photo_url}></img>
                        </div>
                        <div className="mr-7 ml-7 inline">
                            <h2 className="text-white text-4xl w-[55%] font-serif">{answer.data[0].title}</h2>
                            <p className="mt-4 text-sm font-mono text-white text-clip text-justify w-[55%]">{answer.data[0].snippet}</p>
                            <a className="text-blue-400 underline font-mono text-sm mt-4" href={answer.data[0].link}>Read more</a>
                            
                        </div>
                    </div>
                )
               }
            </div>
            {children}
        </Feature>
    );
}
