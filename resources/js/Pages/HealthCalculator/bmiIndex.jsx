import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import {useForm} from "@inertiajs/react";
import Feature from "@/Components/Feature";
import { Bar, BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";


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

    // rechart data
    const barData = [
        { name: 'BMI', underweight: 18.5, normal: 6.5, overweight: 5, obese: 10 },
    ];


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

            {/* rechart bar */}
        
            <div className="mt-7 ml-7 mb-4 block max-w-lg p-6 bg-white border border-white rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">BMI Bar</h5>
                <ResponsiveContainer height={100}>
                    <BarChart
                        width={600}
                        height={76}
                        data={barData}
                        margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                        layout='vertical'
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="none" />
                        <XAxis 
                        type='number' 
                        domain={[0, 40]} 
                        ticks={[0, 18.5, 25, 30, 40]} 
                        tickFormatter={(value) => {
                            if (value === 0) return '0';
                            if (value === 18.5) return '18.5';
                            if (value === 25) return '25';
                            if (value === 30) return '30';
                            if (value === 40) return '40';
                            return '';
                        }}
                        />
                        <YAxis type='category' dataKey='name' axisLine={false} tickLine={false} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey='underweight' stackId="a" fill="#f54278" />
                        <Bar dataKey='normal' stackId="a" fill="#42f5b6" />
                        <Bar dataKey='overweight' stackId="a" fill="#eff542" />
                        <Bar dataKey='obese' stackId="a" fill="#f55742" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
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