import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import Feature from "@/Components/Feature";
import Footer from "@/Components/Footer";
import MoreLink from "@/Components/MoreLink";


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

    const required_plan = "basicFit";

    return(
        <Feature feature={feature} answer={answer} subscribedPlan={required_plan}>
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
                        <select onChange={(e) =>setData("gender", e.target.value)} value={data.gender} id="gender" className="dark:bg-white bg-gray-500 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-700 dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option defaultValue={'value'}>Choose gender</option>
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

            {/* About Fat calculation Information */}
            <div className="dark:text-white font-sans text-xl ml-7">
                        <h1 className="ml-3 font-roboto">What is Body Fat?</h1>
                        <p className="text-[0.9rem] ml-3 text-justify mr-6 mt-6 text-gray-100 font-roboto mb-[4rem]">
                        The scientific term for body fat is "adipose tissue." Adipose tissue serves a number of important functions. Its primary purpose is to store lipids from which the body creates energy. In addition, it secretes a number of important hormones, and provides the body with some cushioning as well as insulation.
                        Body fat includes essential body fat and storage body fat. Essential body fat is a base level of fat that is found in most parts of the body. It is necessary fat that maintains life and reproductive functions. The amount of essential fat differs between men and women, and is typically around 2-5% in men, and 10-13% in women. The healthy range of body fat for men is typically defined as 8-19%, while the healthy range for women is 21-33%. While having excess body fat can have many detrimental effects on a person's health, insufficient body fat can have negative health effects of its own, and maintaining a body fat percentage below, or even at the essential body fat percentage range is a topic that should be discussed with a medical professional.
                        </p>

                        <div className="flex gap-[130px]">
                        <h1 className="ml-3 font-roboto mt-6 mb-4">Jackson & Pollock Ideal Body Fat Percentages</h1>
                        <h1 className="ml-3 font-roboto mt-6 mb-4">The American Council on Exercise Body Fat Categorization</h1>
                        </div>

                        {/* body fat table chart */}
                        <div className="flex gap-[200px]">
                            <table className="w-1/4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border mb-6 ml-4 font-mono">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-gray-500">
                                    <tr className="text-nowrap p-10 border">
                                        <th className="text-white p-2">Age</th>
                                        <th className="text-white p-2">Women</th>
                                        <th className="text-white p-2">Men</th>

                                    </tr>
                                </thead>
                                <tbody className="border-white">
                                    <tr className="text-nowrap p-10 border">
                                        <td className="text-white p-2">20</td>
                                        <td className="text-white p-2">17.7%</td>
                                        <td className="text-white p-2">8.5%</td>

                                    </tr>

                                    <tr className="text-nowrap p-10 border">
                                        <td className="text-white p-2">25</td>
                                        <td className="text-white p-2">18.4%</td>
                                        <td className="text-white p-2">10.5%</td>

                                    </tr>

                                    <tr className="text-nowrap p-10 border">
                                        <td className="text-white p-2">30</td>
                                        <td className="text-white p-2">19.3%</td>
                                        <td className="text-white p-2">12.7%</td>

                                    </tr>


                                    <tr className="text-nowrap p-10 border">
                                        <td className="text-white p-2">35</td>
                                        <td className="text-white p-2">21.5%</td>
                                        <td className="text-white p-2">13.7%</td>
                                    </tr>


                                    <tr className="text-nowrap p-10 border">
                                        <td className="text-white p-2">40</td>
                                        <td className="text-white p-2">22.2%</td>
                                        <td className="text-white p-2">15.3%</td>
                                    </tr>

                                    <tr className="text-nowrap p-10 border">
                                        <td className="text-white p-2">45</td>
                                        <td className="text-white p-2">22.9%</td>
                                        <td className="text-white p-2">16.4%</td>
                                    </tr>

                                    <tr className="text-nowrap p-10 border">
                                        <td className="text-white p-2">50</td>
                                        <td className="text-white p-2">25.2%</td>
                                        <td className="text-white p-2">18.9%</td>
                                    </tr>

                                    <tr className="text-nowrap p-10 border">
                                        <td className="text-white p-2">55</td>
                                        <td className="text-white p-2">26.3%</td>
                                        <td className="text-white p-2">20.9%</td>
                                    </tr>
                                </tbody>
                            </table>

                            <table className="w-1/4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border mb-6 ml-4 font-mono">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-gray-500">
                                    <tr className="text-nowrap p-10 border">
                                        <th className="text-white p-2">Description</th>
                                        <th className="text-white p-2">Men</th>
                                        <th className="text-white p-2">Womne</th>
                                    </tr>
                                </thead>
                                <tbody className="border-white">
                                		
                                    <tr className="text-nowrap p-10 border">
                                        <td className="text-white p-2">Essential fat</td>
                                        <td className="text-white p-2">10-13%</td>
                                        <td className="text-white p-2">2-5%</td>

                                    </tr>

                                    <tr className="text-nowrap p-10 border">
                                        <td className="text-white p-2">Athletes</td>
                                        <td className="text-white p-2">14-20%</td>
                                        <td className="text-white p-2">6-13%</td>

                                    </tr>

                                    <tr className="text-nowrap p-10 border">
                                        <td className="text-white p-2">Fitness</td>
                                        <td className="text-white p-2">21-24%</td>
                                        <td className="text-white p-2">14-17%</td>

                                    </tr>


                                    <tr className="text-nowrap p-10 border">
                                        <td className="text-white p-2">Average</td>
                                        <td className="text-white p-2">25-31%</td>
                                        <td className="text-white p-2">18-24%</td>
                                    </tr>


                                    <tr className="text-nowrap p-10 border">
                                        <td className="text-white p-2">Obese</td>
                                        <td className="text-white p-2">32+%</td>
                                        <td className="text-white p-2">25+%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <MoreLink />
                    <Footer />

        </Feature>
    )
}