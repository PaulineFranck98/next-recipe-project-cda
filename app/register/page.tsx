'use client'

import { useState } from 'react';
import { useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React from 'react'


// test page to see if manual register is working 

const RegisterPage = () => {
    // isLoaded : objet signup ready or not ?
    const {isLoaded, signUp, setActive} = useSignUp();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // set to true when verification code is verified
    const [pendingVerification, setPendingVerification] = useState(false);
    const [code, setCode] = useState('');
    const route = useRouter();

    // form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        // if signup object is not loaded 
        if(!isLoaded){
            return;
        }

        try{
            await signUp.create({
                emailAddress: email,
                password
            });

            // send email --> strategy : email code or email link
            await signUp.prepareEmailAddressVerification({strategy: 'email_code'});

            //change UI
            setPendingVerification(true);
        } catch (error) {
            console.log(error)
        }
    }

    //Verify User email code 
    const onPressVerify = async (e) => {
        e.preventDefault();
        // if signup object is not loaded 
        if(!isLoaded){
            return;
        }

        try {
            const completeSignUp = await signUp.attemptEmailAddressVerification({
                code,
            });
            if(completeSignUp.status !== 'complete'){
                // check the response to see if there was an error or if the user needs to complete more steps.
                console.log(JSON.stringify(completeSignUp, null, 2));
            }
            if(completeSignUp.status === 'complete'){
                await setActive({session: completeSignUp.createdSessionId});
                route.push('/');
            }
        } catch (error) {
            console.error(JSON.stringify(error, null, 2))
        }

    }

  return (
    <div className='border p-5 rounded w-[500px] mx-auto'>
      <h1 className="text-2xl mb-4">Register</h1>
      {!pendingVerification && (
        <form onSubmit={handleSubmit} className='space-y-4 md:space-y-6'>
            <div>
                <label 
                    htmlFor="email"
                    className='block mb-2 text-sm font-medium text-white'
                >
                    Email
                </label>
                <input 
                    type="email"
                    name="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    className='w-full p-2.5'
                    placeholder='name@email.com'
                    required={true} />
            </div>
            <div>
                <label 
                    htmlFor="password"
                    className='block mb-2 text-sm font-medium text-white'
                >
                    Password
                </label>
                <input 
                    type="password"
                    name="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className='w-full p-2.5'
                    required={true} />
            </div>
            <button
                type='submit'
                className='w-full rounded-lg text-sm px-5 py-2.5 text-center'>
                Create an account
            </button>
        </form>
      )}
       {/* if email was sent and we're waiting for the code */}
      { pendingVerification && (
        <div>
            <form className='space-y-4 md:space-y-6'>
                <input 
                    value={code}
                    className='block w-full p-2.5'
                    placeholder='Enter Verification Code ...'
                    onChange={(e) => setCode(e.target.value)} 
                />
                <button
                    type='submit'
                    className='w-full rounded-lg text-sm px-5 py-2.5 text-center'
                    onClick={onPressVerify}
                >
                    Verify Email
                </button>
            </form>
        </div>
      )}
    </div>
  )
}

export default RegisterPage
