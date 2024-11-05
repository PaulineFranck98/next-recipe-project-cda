import Link from 'next/link'
import React from 'react'
import Image from "next/image"

const NavBar = () => {
  return (
    <div>
      <nav className='flex gap-3 bg-slate-800 px-16 py-5 mb-8'>
      {/* https://res.cloudinary.com/dgydgrbim/image/upload/v1730844476/lets-cook-logo_aopxi2.png */}
      <Image 
        className='rounded-md'
        src='https://res.cloudinary.com/dgydgrbim/image/upload/v1730844871/logo1-letscook_krvpgb.png'
        width={180}
        height={100}
        alt='logo'
    />
        <Link className=' hover:text-slate-400 duration-300' href="/recipe">Recipes</Link>
        
      </nav>
    </div>
  )
}

export default NavBar