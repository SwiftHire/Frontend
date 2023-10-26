import React from 'react';
import hrManager from '../../assets/jpg/resume-image-6.jpg';

const EmailConfirmation = () => {
  return (
    <div className='h-screen grid place-items-center'>
        <div className='w-9/12 flex flex-col items-center md:flex-row gap-5'>
            <div className='w-full h-full shadow-secondary rounded-[0.5rem]'>
                <img src={hrManager} alt="" className='object-fill shadow-lg rounded-[0.5rem] p-10' />
            </div>
            <div className='w-7/12 p-10'>
            <h1 className='text-[1.5rem] lg:text-[3rem] font-bold md:leading-[4rem]'>Account Created
                        <br className='hidden md:block' /> <span className='text-primary'>Successfully!</span></h1>
                <p className='text-sm font-normal mt-4'>
                To complete your registration <b> please verify your email address.</b>. We have sent a confirmation email to the address you provided during registration.<b>Check your inbox for an email</b>from us to Confirm your registration.
                </p>
            </div>
        </div>
    </div>
  )
}

export default EmailConfirmation