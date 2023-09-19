"use client"
import React, {useEffect, useState} from 'react';
import {useMutation} from "@tanstack/react-query";
import {axiosInstance} from "@/utils/axiosInstance";
import {useRouter} from "next/navigation";

const SignIn = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const createUser = async ({name,email,password}) => {
        try {
            const res = await axiosInstance.post("/users",{name,email,password});
            return res.data;
        }catch (e) {
            console.log(e)
        }
    }
    const {mutateAsync} = useMutation({
        mutationKey:['post',"user"],
        mutationFn:createUser
    })
    const handleSubmit =async (e) => {
        e.preventDefault();
        await mutateAsync({name,email,password})
        setEmail("")
        setPassword("")
        router.push("/dashboard")
    }
    useEffect(() => {
        router.prefetch("/dashboard")
    }, [router]);
    return (
        <form onSubmit={handleSubmit} className='pt-[85px] max-w-screen-md mx-auto'>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" required/>
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required/>
            </div>
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        </form>
    );
};

export default SignIn;
