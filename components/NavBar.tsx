'use client'

import Link from 'next/link'
import React from 'react'
import Image from "next/image"
import ThemeToggle from "./ThemeToggle"
import { SignedOut, UserButton, SignedIn, Protect } from '@clerk/nextjs';


const NavBar = () => {
  
  return (
    <header>
      <nav className='flex gap-3 bg-secondary dark:bg-dark-secondary px-16 py-4 mb-8 items-center justify-between text-white'>
          <Image 
            src='https://res.cloudinary.com/dgydgrbim/image/upload/v1730899044/lets-cook-logo-lime_d9uk96.png'
            width={180}
            height={100}
            alt='logo'
          />  
         <div className='flex gap-5'>
          <SignedIn>
            <Link href="/profile">Profile</Link>
            <Link href="/recipe">Recipes</Link>
            <Link href="/article">Blog</Link>
            <Link href="/favorite">Favorites</Link>
            <div className='ml-4'>
              <UserButton />
            </div>
            <Protect
              condition={(has) => has({ role: 'org:admin'})}
            >
              <Link href="/admin">Admin Dashboard</Link>
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
        </div> 
       <button>
          <ThemeToggle />
       </button>
      </nav>
     
  </header>
    
  )
}

export default NavBar