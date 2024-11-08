import Link from 'next/link'
import React from 'react'
import Image from "next/image"
import ThemeToggle from "./ThemeToggle"

const NavBar = () => {
  return (
      <nav className='flex gap-3 bg-secondary dark:bg-dark-secondary px-16 py-4 mb-8 items-center justify-between'>
      {/* https://res.cloudinary.com/dgydgrbim/image/upload/v1730844476/lets-cook-logo_aopxi2.png */}
      <Image 
        src='https://res.cloudinary.com/dgydgrbim/image/upload/v1730899044/lets-cook-logo-lime_d9uk96.png'
        width={180}
        height={100}
        alt='logo'
    />  <ul className='flex gap-8 text-white'>
          <li>
            <Link className=' hover:text-hoverColor duration-300' href="/recipe">Recipes</Link>
          </li>
          <li>
            <Link className=' hover:text-hoverColor duration-300' href="">Search</Link>
          </li>
          <li>
            <Link className=' hover:text-hoverColor duration-300' href="/article">Blog</Link>
          </li>
          <li>
            <Link className=' hover:text-hoverColor duration-300' href="">Favorites</Link>
          </li>
          <li>
              <ThemeToggle />
          </li>
        </ul>
      </nav>
    
  )
}

export default NavBar