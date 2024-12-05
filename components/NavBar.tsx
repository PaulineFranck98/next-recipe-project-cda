'use client'

import Link from 'next/link'
import React, {useState} from 'react'
import Image from "next/image"
import ThemeToggle from "./ThemeToggle"
import { SignedOut, UserButton, SignedIn, Protect } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';


const NavBar = () => {
  
  const [isOpen, setIsOpen] = useState(false);


  const handleClick = () => {
      setIsOpen(!isOpen);
  };

  return (
    <header>
      <nav className='flex gap-3 bg-secondary dark:bg-dark-secondary px-5 md:px-16 py-4 mb-8 items-center justify-between text-white'>
          <Image 
            src='https://res.cloudinary.com/dgydgrbim/image/upload/v1730899044/lets-cook-logo-lime_d9uk96.png'
            width={180}
            height={100}
            alt='logo'
          />  
          {/* menu burger */}
          <button onClick={handleClick} className='block md:hidden text-white z-20 relative'>
            {isOpen? <X size={24}/> : <Menu size={24}/>}
          </button>
         <div className={`${isOpen? 'translate-x-0' : 'translate-x-full'} fixed top-0 right-0 h-full bg-secondary dark:bg-dark-secondary flex flex-col gap-5 items-center pt-20 md:pt-0  px-4 transform transition-transform duration-300 ease-in-out z-10 md:relative md:transform-none md:translate-x-0 md:flex md:flex-row md:bg-transparent `}>
            <SignedIn>
              <Link className=' hover:text-gray-400 duration-200' href="/profile">Profile</Link>
              <Link className=' hover:text-gray-400 duration-200' href="/recipe">Recipes</Link>
              <Link className=' hover:text-gray-400 duration-200' href="/article">Blog</Link>
              <Link className=' hover:text-gray-400 duration-200' href="/favorite">Favorites</Link>
              <div className='ml-4'>
                <UserButton />
              </div>
              <Protect
                condition={(has) => has({ role: 'org:admin'})}
              >
                <Link className=' hover:text-gray-400 duration-200' href="/admin">Admin Dashboard</Link>
              </Protect>
            </SignedIn>
            <SignedOut>
              <Link href='/sign-in'>
                <button className='text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base mr-4'>
                  Login
                </button>
              </Link>
              <Link href='/sign-up'>
                <button className='text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base'>
                  Sign Up
                </button>
              </Link>
            </SignedOut>
            <button>
              <ThemeToggle />
            </button>
        </div> 
      </nav>
     
  </header>
    
  )
}

export default NavBar