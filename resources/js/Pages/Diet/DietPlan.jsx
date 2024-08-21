
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import Feature from "@/Components/Feature";

import Footer from "@/Components/Footer";
import { useEffect } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";



export default function DietPlan({feature, prompt, answer, children}){
    const {data, setData, processing, errors, reset, post} = useForm({
        prompt: "Hello",
        answer: [],
        
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("diet.dietPlan"), {
            onSuccess(){
                // reset();
            }
        });
        googleText();
    }



    // google AI text generate
    async function googleText(){
        // console.log(data.prompt)

        // const apiKey = "AIzaSyAXZRghqU58r-uFAzMdzqQ-0sfoDbygPSE";
        // const genModel = new GoogleGenerativeAI(apiKey);
        // const model = genModel.getGenerativeModel({ model: "gemini-1.5-flash" });

        // const prompt = data.prompt;

        // const result = await model.generateContent(prompt);
        // // console.log(result.response.text());
        // const generatedText = result.response.text(); // Get the text from the response

        // // Update the answer array by adding the new generated text
        // setData('answer', [...data.answer, generatedText]);

    }
    useEffect(() => {
        googleText();
    }, []);

    const required_plan = "basicFit";

    return (
        <Feature feature={feature} answer={answer} subscribedPlan={required_plan}>
            <h1 className="text-xl dark:text-white text-gray-700 mt-5 ml-8 font-mono">Chat with AI Bot</h1>
            {
                data.answer !== null && data.answer.map((answer, index) => (
                    <div key={index}>{answer}</div>
                    
                ))
            }

            <form onSubmit={submit} className="p-8 grid grid-cols-2 gap-3 mt-[500px]">
                <div>
                    <InputLabel className="text-white font-mono text-lg">Enter Your Message</InputLabel>
                    <TextInput id="prompt" type="text" name="prompt" value={data.prompt} onChange={(e) => setData("prompt", e.target.value) } className="w-full mt-4" placeholder="Message Health Bot" />
                </div>


                <div className="flex items-center mt-9">
                        <PrimaryButton className="ms-4 dark:bg-white dark:text-black" disabled={processing}>Send</PrimaryButton>
                </div>
                {children}
            </form>

        </Feature>
    )
    
}