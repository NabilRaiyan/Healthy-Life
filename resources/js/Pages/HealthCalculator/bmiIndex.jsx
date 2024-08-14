import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import Feature from "@/Components/Feature";
import { FaArrowDown } from "react-icons/fa";
import { Bar, BarChart, ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import Footer from "@/Components/Footer";
import MoreLink from "@/Components/MoreLink";

export default function Index({ feature, answer, children, lowWeight, highWeight }) {
    const { data, reset, processing, setData, post, errors } = useForm({
        weight: "",
        height: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("healthCalculator.bmiCalculate"), {
            onSuccess() {
                reset();
            }
        });
    };


    //Function to determine the position of the ReferenceDot based on BMI result  {/* obese: 20 overweight:16 normal: 13 underweight:  5 */}

    var position = 0;
    var color = 'cyan';
    if (answer && answer.bmi !== null){
        if (answer.bmi <= 18.5){
            position = 5;
            color = '#f54278';
        }
        else if(answer.bmi > 18.5 && answer.bmi <= 25){
            position = 13;
            color = '#42f5b6';
        }
        else if(answer.bmi > 25 && answer.bmi <= 30){
            position = 16;
            color = '#eff542';
        }
        else if(answer.bmi > 30){
            position = 20;
            color = '#f55742';
        }
    }


    // rechart data
    const barData = [
        { name: 'BMI', underweight: 18.5, normal: 6.5, overweight: 5, obese: 10 },
    ];

    return (
        <Feature feature={feature} answer={answer}>
            <h1 className="text-xl dark:text-white text-gray-700 mt-3 ml-8">BMI Calculator</h1>
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
                <div className="flex items-center justify-end mt-4 col-span-2">
                    <PrimaryButton className="ms-4 dark:bg-white dark:text-black" disabled={processing}>Calculate BMI</PrimaryButton>
                </div>
                {children}
            </form>

            {/* Showing the answer */}
            {
                answer !== null && (
                    <div className="px-6 py-5 text-white mb-4 rounded bg-gray-800 font-roboto">
                        <h5 className="text-white text-2xl font-serif ml-4 mb-3">Result: </h5>
                        <p className="ml-4 text-xl font-sans text-cyan-300">BMI = {answer.bmi} kg/m<sup>2</sup></p>
                        <p className="ml-4 text-xl font-sans text-cyan-300">Category = {answer.category}</p>
                        <ul className="ml-4 text-lg mt-4 font-sans text-white list-disc">
                            <li className="ml-4 text-white">Healthy BMI range: 18.5 kg/m2 - 25 kg/m2</li>
                            <li className="ml-4 text-white">Healthy weight range for you is: {lowWeight} kg - {highWeight} kg</li>
                        </ul>
                    {/* rechart bar */}
                    <div className="mt-7 ml-5 mb-4 block max-w-lg p-6 bg-white border border-white rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">BMI Bar</h5>
                            
                        <ResponsiveContainer height={100}>
                   
                            <div className="mt-6" style={{
                                marginLeft: `${position}rem`, fontSize: `${1.3}rem`, color: `${color}`}}>
                            <FaArrowDown className="ml-12" />

                            </div>
                            <BarChart
                                width={600}
                                height={76}
                                data={barData}
                                margin={{ top: 15, right: 30, left: 0, bottom: 5 }}
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
                    </div>
                )
            }

            {/* About BMI Information */}
            <div className="dark:text-white font-sans text-xl ml-7">
                <h1 className="ml-3 font-roboto">BMI introduction</h1>
                <p className="text-[0.9rem] ml-3 text-justify mr-6 mt-6 text-gray-100 font-roboto mb-[4rem]">
                    BMI is a measurement of a person's leanness or corpulence based on their height and weight, and is intended to quantify tissue mass. It is widely used as a general indicator of whether a person has a healthy body weight for their height. Specifically, the value obtained from the calculation of BMI is used to categorize whether a person is underweight, normal weight, overweight, or obese depending on what range the value falls between. These ranges of BMI vary based on factors such as region and age, and are sometimes further divided into subcategories such as severely underweight or very severely obese. Being overweight or underweight can have significant health effects, so while BMI is an imperfect measure of healthy body weight, it is a useful indicator of whether any additional testing or action is required. Refer to the table below to see the different categories based on BMI that are used by the calculator.
                </p>

                <h1 className="ml-3 font-roboto mt-6 mb-4">BMI table for adults</h1>
                <p className="text-[0.9rem] ml-3 justify-center mt-6 text-gray-100 font-roboto mb-[2rem]">This is the World Health Organization's (WHO) recommended body weight based on BMI values for adults. It is used for both men and women, age 20 or older.</p>
                {/* bmi table chart */}
                <table className="w-1/4 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border mb-6 ml-4 font-mono">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-gray-500">
                        <tr className="text-nowrap p-10 border">
                            <th className="text-white p-2">Classification</th>
                            <th className="text-white p-2">BMI range - kg/m<sup>2</sup></th>
                        </tr>
                    </thead>
                    <tbody className="border-white">
                        <tr className="text-nowrap p-10 border">
                            <td className="text-white p-2">Severe Thinness</td>
                            <td className="text-white p-2"> {'<'} 16</td>
                        </tr>

                        <tr className="text-nowrap p-10 border">
                            <td className="text-white p-2">Moderate Thinness</td>
                            <td className="text-white p-2">16 - 17</td>
                        </tr>

                        <tr className="text-nowrap p-10 border">
                            <td className="text-white p-2">Normal</td>
                            <td className="text-white p-2">17 - 18.5</td>
                        </tr>


                        <tr className="text-nowrap p-10 border">
                            <td className="text-white p-2">Mild Thinness</td>
                            <td className="text-white p-2">18.5 - 25</td>
                        </tr>


                        <tr className="text-nowrap p-10 border">
                            <td className="text-white p-2">Overweight</td>
                            <td className="text-white p-2">25 - 30</td>
                        </tr>

                        <tr className="text-nowrap p-10 border">
                            <td className="text-white p-2">Obese Class I</td>
                            <td className="text-white p-2">30 - 35</td>
                        </tr>

                        <tr className="text-nowrap p-10 border">
                            <td className="text-white p-2">Obese Class II</td>
                            <td className="text-white p-2">35 - 40</td>
                        </tr>

                        <tr className="text-nowrap p-10 border">
                            <td className="text-white p-2">Obese Class III</td>
                            <td className="text-white p-2"> &gt; 40</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <MoreLink />
            <Footer />
        </Feature>
    );
}
