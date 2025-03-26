"use client"

import React, { useState } from 'react'
import "../css/index.css";
import { useRouter } from 'next/navigation';
import { useLoggedUser } from '../contexts/loggedincontext';

export default function Navbar() {
    const router = useRouter();
    const { pd, name, setPd } = useLoggedUser();
    const [showlog, setShowLog] = useState(false)

    const logs = (whichlog) => {
        if(whichlog === "Login") {
            router.push("/login")
        } else {
                localStorage.removeItem("token"); // Remove JWT token
                setPd("")
                router.push("/login")
        }
    }

    return (
        <div className='nav-main'>
            <div className="nav-container">
                <h4 onClick={() => router.push("/")} style={{cursor: "pointer"}}>Medscape</h4>
                <div className="logindiv">
                    {
                        pd === "Doctor" || pd === "Patient" ? (<p>{pd === "Doctor" ? `Hi Doctor ${name}` : `Hi ${name}`}</p>) : ""
                    }
                    {
                        pd === "Doctor" || pd === "Patient" ? <button onClick={() => logs("Logout")}>Logout</button> : <button onClick={() => logs("Login")}>Login</button>
                    }
                </div>
            </div>
        </div>
    )
}
