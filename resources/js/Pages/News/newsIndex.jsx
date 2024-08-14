import Feature from "@/Components/Feature";
import { Link } from "@inertiajs/react";
import {useForm} from "@inertiajs/react";
import { useEffect } from "react";

export default function NewsIndex({answer, feature, children})
{
    const {data, processing, errors, reset, post, setData} = useForm();

    const onLoad = (e)=>{
        // e.preventDefault();
        post(route('health.getNews'), {
            onSuccess(){
                reset();
            }
        });
    }

    // useEffect(()=>{
    //     onLoad()
    // }, []);

    // console.log(allNews);
    return (
        <div>
            <pre>{JSON.stringify(answer, null, 2)}</pre>
        </div>
    )
}