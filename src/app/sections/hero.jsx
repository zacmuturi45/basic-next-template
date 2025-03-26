import Image from 'next/image'
import React from 'react'
import { hos } from '../../../public/imports'
import "../css/index.css";

export default function Hero() {
  return (
    <div className='hero-main'>
        <div className="hero-container">
            <Image src={hos} width={100} height={100} alt='hos-image' className='hos' unoptimized/>
            <div className="butt">
                <button>Get Started</button>
            </div>
        </div>
    </div>
  )
}
