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
        </Feature>
    )
}