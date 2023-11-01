import React from 'react';
import { useNavigate } from 'react-router-dom';
import hrManager from '../../../assets/jpg/resume-image-6.jpg';
import { FaLongArrowAltLeft } from 'react-icons/fa';


const EmailConfirmation = () => {
  const navigateTo = useNavigate();
  return (
    <div className='h-screen grid place-items-center font-Montserrat'>
        <div className='w-9/12 flex flex-col items-center md:flex-row gap-5'>
            <div className='w-full h-full shadow-secondary rounded-[0.5rem]'>
                <div className='flex items-center gap-5 cursor-pointer w-3/12' onClick={()=>navigateTo('/login')}>
                  <FaLongArrowAltLeft  
                  className='font-bold text-primary cursor-pointer hover:text-darkText my-10' />
                  <span className='hover:text-primary'>Back Home</span>
                </div>
                <img src={hrManager} alt="" className='object-fill shadow-lg rounded-[0.5rem] p-10' />
            </div>
            <div className='w-7/12 p-10'>
            <h1 className='text-[1.5rem] lg:text-[3rem] font-bold md:leading-[4rem]'>Account Created
                        <br className='hidden md:block' /> <span className='text-primary'>Successfully!</span></h1>
                <p className='text-sm font-normal mt-4'>
                To complete your registration <b> please verify your email address.</b> We have sent a confirmation email to the address you provided during registration.<b> Check your inbox for an email</b> from us to Confirm your registration.
                </p>
            </div>
        </div>
    </div>
  )
}

export default EmailConfirmation