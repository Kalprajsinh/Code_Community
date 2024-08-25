"use client"

import React from 'react'
import { useRouter } from 'next/navigation';


export default function login(){
    const router = useRouter();
    return(
        <div>
            <h1>Login</h1>
            form submit
            <button onClick={()=>{
                router.push("/");
            }}>Home</button>
        </div>
    )
}