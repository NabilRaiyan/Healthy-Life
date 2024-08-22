
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import Feature from "@/Components/Feature";

import Footer from "@/Components/Footer";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";



export default function DietPlan({feature, prompt, answer, children}){
    const {data, setData, processing, errors, reset, post} = useForm({
        prompt: [],
        answer: [],        
    });

    const [currentInput, setCurrentInput] = useState('');


    // Handle input change
    const handleInputChange = (e) => {
        setCurrentInput(e.target.value);
    };

    // Add prompt to the array
    const handleAddPrompt = () => {
        
        setData('prompt', [...data.prompt, currentInput]);
        setCurrentInput(''); // Clear input field
    };


    const submit = (e) => {
        e.preventDefault();
        post(route("diet.dietPlan"), {
            preserveScroll: true,
            onSuccess(){
                // reset();
            }
        });
        googleText();
    }
    
    

    // formate message 
    function cleanAndOrderMessage(message) {
        // Remove asterisks
        let cleanedMessage = message.replace(/\*\*/g, '').replace(/\*/g, '').replace(/\#\#/g, '').replace(/\#/g, '');
    
        // Convert list items to ordered list
        cleanedMessage = cleanedMessage.replace(/(\n\s*)?(\* )/g, (match, p1) => {
            const index = (cleanedMessage.substring(0, match.index).match(/(\d+\.\s)/g) || []).length + 1;
            return `${p1 || '\n'}${index}. `;
        });
    
        return cleanedMessage;
    }


    // google AI text generate
    async function googleText(){
        // console.log(data.prompt)

        const apiKey = "AIzaSyAXZRghqU58r-uFAzMdzqQ-0sfoDbygPSE";
        const genModel = new GoogleGenerativeAI(apiKey);
        const model = genModel.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(data.prompt);
        // console.log(result.response.text());
        const generatedText = result.response.text(); // Get the text from the response
        const cleanMessage = cleanAndOrderMessage(generatedText)

        // Update the answer array by adding the new generated text
        setData('answer', [...data.answer, cleanMessage]);

    }


 
     // Ensure both arrays are defined and have the same length
     const prompts = data.prompt || [];
     const answers = data.answer || [];


    // Combine the prompts and answers arrays
    const combined = [];

    const maxLength = Math.min(prompts.length, answers.length);

    for (let i = 0; i < maxLength; i++) {
        combined.push({ type: 'prompt', content: prompts[i] });
        combined.push({ type: 'answer', content: answers[i] });
    }



    const required_plan = "basicFit";

    return (
        <Feature preserveScroll feature={feature} answer={answer} subscribedPlan={required_plan} className='overscroll-none'>
            <h1 className="text-xl dark:text-white text-gray-700 mt-5 ml-8 font-mono">Chat with AI Bot</h1>
            <div className="bg-gray-900 rounded-lg p-3 m-[20px] h-[400px] overflow-y-scroll">
                
                    <div>
                    {combined.map((item, index) => (
                        <div
                            className={`text-gray-900 m-[20px] p-4 rounded w-[500px] text-justify leading-loose shadow-sm -z-10 shadow-orange-500 ${item.type === 'prompt' ? 'bg-blue-100' : 'bg-green-100'}`}
                            key={index}
                        >
                            <p className="text-sm font-mono">
                                {item.type === 'prompt' ? `You: ${item.content}` : `Bot: ${item.content}`}
                            </p>
                        </div>
                    ))}
                    </div>
            </div>
            

            <form onSubmit={submit} className="p-8 grid grid-cols-2 gap-3 mt-[10px]">
                <div>
                    <InputLabel className="text-white font-mono text-lg">Enter Your Message</InputLabel>
                    <TextInput id="prompt" type="text" name="prompt" value={currentInput} // Use local state for input value
                        onChange={handleInputChange} className="w-full mt-4" placeholder="Message Health Bot" />
                </div>


                <div className="flex items-center mt-9">
                <PrimaryButton
                    className="p-2 text-white rounded bg-gray-900"
                    disabled={processing}
                    onClick={handleAddPrompt}
                    >
                    Send
                </PrimaryButton>

                </div>
                {children}
            </form>
            <Footer />

        </Feature>
    )
    
}