import Link from 'next/link'
import React from 'react'
import Image from "next/image"

const NavBar = () => {
  return (
      <nav className='flex gap-3 bg-slate-800 px-16 py-4 mb-8 items-center justify-between'>
      {/* https://res.cloudinary.com/dgydgrbim/image/upload/v1730844476/lets-cook-logo_aopxi2.png */}
      <Image 
        src='https://res.cloudinary.com/dgydgrbim/image/upload/v1730899044/lets-cook-logo-lime_d9uk96.png'
        width={180}
        height={100}
        alt='logo'
    />
        <Link className=' hover:text-slate-400 duration-300' href="/recipe">Recipes</Link>
        
      </nav>
    
  )
}

export default NavBar