"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { hospital, x } from '../../../public/imports';


export default function AuthCard({ children }) {
    const [currentLocation, setCurrentLocation] = useState("");
    const pathname = usePathname()

    useEffect(() => {
        setCurrentLocation(pathname)

    }, [])




    return (
        <main className='authcard-main row'>
            <div className='auth-children'>
                {children}
            </div>

            <div className='authcard-container'>
                <Image src={hospital} width={35} height={35} alt='thumbs-Up' className='hosi' />

            </div>

        </main>
    )
}
