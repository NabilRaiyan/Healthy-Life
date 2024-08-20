
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import Feature from "@/Components/Feature";
import { FaArrowDown } from "react-icons/fa";
import Footer from "@/Components/Footer";
import { useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";


export default function DietPlan({feature, prompt, answer}){
    const {data, setData, processing, errors, reset, post} = useForm({
        prompt: "",
        
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("diet.dietPlan"), {
            onSuccess(){
                reset();
            }
        });

    }


    // google AI text generate
    async function googleText(){
        // const apiKey = "AIzaSyAXZRghqU58r-uFAzMdzqQ-0sfoDbygPSE";
        const genModel = new GoogleGenerativeAI(apiKey);
        const model = genModel.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = "give me a diet plan to loss my weight. I am 103 kg, male, my height is 1.86 meter and I want to loss 30kg in 3 months ";

        const result = await model.generateContent(prompt);
        console.log(result.response.text());

    }
    useEffect(() => {
        googleText();
    }, []);

    const required_plan = "basicFit";

    return (
        <Feature feature={feature} answer={answer} subscribedPlan={required_plan}>
            <h1 className="text-xl dark:text-white text-gray-700 mt-3 ml-8 font-mono">Chat with AI Bot</h1>

            <form onSubmit={submit} className="p-8 grid grid-cols-2 gap-3 mt-[500px]">
                <div>
                    <InputLabel className="text-white font-mono text-lg">Enter Your Message</InputLabel>
                    <TextInput className="w-full mt-4" placeholder="Message Health Bot"></TextInput>
                </div>


                <div className="flex items-center mt-9">
                        <PrimaryButton className="ms-4 dark:bg-white dark:text-black" disabled={processing}>Send</PrimaryButton>
                </div>
            </form>

        </Feature>
    )
    
}