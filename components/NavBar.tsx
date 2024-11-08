'use client'

import Link from 'next/link'
import React from 'react'
import Image from "next/image"
import ThemeToggle from "./ThemeToggle"
import { SignedOut, UserButton, SignedIn, useSession  } from '@clerk/nextjs';
import { checkUserRole } from '@/utils/userUtils';

const NavBar = () => {
  const { session } = useSession();
  const userRole = checkUserRole(session);

  const links = [
    { title: 'Profile', url: '/profile' },
    { title: 'Dashboard', url: '/users' },
    { title: 'Recipes', url: '/recipe' },
    { title: 'Blog', url: '/article' },
    { title: 'Favorites', url: '/favorite' },
    { title: 'Admin Dashboard', url: '/admin', role: 'admin' },
  ];

  return (
    <header>
      <nav className='flex gap-3 bg-secondary dark:bg-dark-secondary px-16 py-4 mb-8 items-center justify-between'>
        {/* https://res.cloudinary.com/dgydgrbim/image/upload/v1730844476/lets-cook-logo_aopxi2.png */}
          <Image 
            src='https://res.cloudinary.com/dgydgrbim/image/upload/v1730899044/lets-cook-logo-lime_d9uk96.png'
            width={180}
            height={100}
            alt='logo'
          />  
         <div className='flex gap-5'>
          <SignedIn>
            {links.map((link) =>
              (link.role === 'admin' && userRole === 'admin') || !link.role ? (
                <Link key={link.title} href={link.url}>
                  {/* Use a div instead of an anchor tag */}
                  <div className='mr-5 cursor-pointer hover:text-gray-900'>
                    {link.title}
                  </div>
                </Link>
              ) : null
            )}
            <div className='ml-4'>
              <UserButton afterSignOutUrl='/' />
            </div>
          </SignedIn>
          <SignedOut>
            <a href='/sign-in'>
              <button className='text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base mr-4'>
                Login
              </button>
            </a>
            <a href='/sign-up'>
              <button className='text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded text-base'>
                Sign Up
              </button>
            </a>
          </SignedOut>
        </div> 
       
      </nav>
     
  </header>
    
  )
}

export default NavBar