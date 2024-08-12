import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, usePage } from '@inertiajs/react';
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import {useForm} from "@inertiajs/react";
import Feature from "@/Components/Feature";

export default function Index({feature, answer, children})
{
    const {data, reset, processing, setData, post, errors} = useForm({
        weight: "",
        height: "",
    });

    
    const submit = (e) =>{
        e.preventDefault();

        post(route("healthCalculator.bmiCalculate"), {
            onSuccess(){
                reset();
            }
        });
    };

    return (
        <Feature feature={feature} answer={answer}>
        <h1 className="text-xl dark:text-white text-gray-700 mt-3 ml-8">BMI Calculator</h1>
        
            <form onSubmit={submit} className="p-8 grid grid-cols-2 gap-3">
                <div>
                    <InputLabel htmlFor="weight" value="Enter Weight in kg" className="dark:text-white"/>
                    <TextInput placeholder="e.g: 85" id="weight" type="text" name="weight" value={data.weight} 
                               className="mt-1 block w-full" onChange={(e)=>setData("weight", e.target.value)}

                    />
                    <InputError message={errors.weight} className="mt-3" />
                </div>

                <div>
                    <InputLabel htmlFor="height" value="Enter Height in feet & inches" className="dark:text-white" />
                    <TextInput placeholder="e.g: 1.80" id="height" type="text" name="height" value={data.height} 
                               className="mt-1 block w-full" onChange={(e)=>setData("height", e.target.value)}

                    />
                    <InputError message={errors.height} className="mt-3" />
                </div>
                <div className="flex items-center justify-end mt-4 col-span-2">
                    <PrimaryButton className="ms-4  dark:bg-white dark:text-black" disabled={processing}>Calculate BMI</PrimaryButton>
                </div>
                {children}
            </form>

            {/* Showing the answer */}
                    {
                        answer !== null && (
                            <div className="px-6 py-5 text-white mb-4 rounded bg-gray-800">
                                <h5 className="text-white text-2xl font-serif ml-4 mb-3">Result: </h5>
                                <p className="ml-4 text-xl font-sans text-cyan-300">BMI = {answer.bmi} kg/m<sup>2</sup></p>
                                <p className="ml-4 text-xl font-sans text-cyan-300">Category = {answer.category}</p>
                                <ul className="ml-4 text-lg mt-4 font-sans text-white list-disc">
                                    <li className="ml-4 text-white">Healthy BMI range: 18.5 kg/m2 - 25 kg/m2</li>
                                </ul>
                            </div>
                            
                        )
                    }
        </Feature>
        
    )
}