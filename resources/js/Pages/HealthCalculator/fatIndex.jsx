import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import Feature from "@/Components/Feature";
import { GoDotFill } from "react-icons/go";
import Footer from "@/Components/Footer";
import MoreLink from "@/Components/MoreLink";
import Dropdown from 'react-bootstrap/Dropdown';



export default function FatIndex({answer, feature, age, gender, weight, height, children})
{
    const {data, processing, errors, reset, post, setData} = useForm({
        weight: '',
        height: '',
        age: '',
        gender: '',

    });

    const submit = (e)=>{
        e.preventDefault();
        post(route('healthCalculator.fatCalculate'), {
            onSuccess(){
                reset();
            }
        });
    };

    return(
        <Feature feature={feature} answer={answer}>
            <h1 className="text-xl dark:text-white text-gray-700 mt-3 ml-8">Body Fat Calculator</h1>
            <form onSubmit={submit} className="p-8 grid grid-cols-2 gap-3">
                <div>
                        <InputLabel htmlFor="weight" value="Enter Weight in kg" className="dark:text-white" />
                        <TextInput
                            placeholder="e.g: 85"
                            id="weight"
                            type="text"
                            name="weight"
                            value={data.weight}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("weight", e.target.value)}
                        />
                        <InputError message={errors.weight} className="mt-3" />
                    </div>

                    <div>
                        <InputLabel htmlFor="height" value="Enter Height in meters" className="dark:text-white" />
                        <TextInput
                            placeholder="e.g: 1.80"
                            id="height"
                            type="text"
                            name="height"
                            value={data.height}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("height", e.target.value)}
                        />
                        <InputError message={errors.height} className="mt-3" />
                    </div>

                    <div>
                        <InputLabel htmlFor="age" value="Enter Age" className="dark:text-white" />
                        <TextInput
                            placeholder="e.g: 20"
                            id="age"
                            type="text"
                            name="age"
                            value={data.age}
                            className="mt-1 block w-full"
                            onChange={(e) => setData("age", e.target.value)}
                        />
                        <InputError message={errors.age} className="mt-3" />
                    </div>

                    <div>
                        <InputLabel htmlFor="gender" value="Select Gender" className="dark:text-white mb-1" />
                        <select onChange={(e) =>setData("gender", e.target.value)} value={data.gender} id="gender" class="dark:bg-white bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option selected>Choose gender</option>
                            <option value="male">male</option>
                            <option value="female">female</option>
                        </select>
                        <InputError message={errors.gender} className="mt-3" />
                    </div>




                    <div className="flex items-center justify-end mt-4 col-span-2">
                        <PrimaryButton className="ms-4 dark:bg-white dark:text-black" disabled={processing}>Calculate BMI</PrimaryButton>
                    </div>
                    {children}
            </form>

            {/* Showing the answer */}
            {
                answer !== null && (
                    <div className="px-6 py-5 text-white mb-4 rounded bg-gray-800">
                        <h5 className="text-white text-2xl font-serif ml-4 mb-3">Your Information: </h5>
                        <p className="ml-4 mt-2 text-xl font-sans text-amber-500"> Weight = {weight} kg</p>
                        <p className="ml-4 mt-2 text-xl font-sans text-amber-500"> Height = {height} meter</p>
                        <p className="ml-4 mt-2 text-xl font-sans text-amber-500"> Age = {age} </p>
                        <p className="ml-4 mt-2 text-xl font-sans text-amber-500"> Gender = {gender} </p>


                        <h5 className="text-white text-2xl font-serif ml-4 mb-3">Result: </h5>
                        <p className="ml-4 text-xl font-sans text-cyan-300">Body Fat = {answer}%</p>
                        
                    </div>
                )
            }

        </Feature>
    )
}