import React from 'react';
import registerUserIcon from '../../../assets/svg/register-user.svg'

const Register = () => {
  return (
    <div className='flex items-center flex-col md:flex-row gap-10 mt-10'>
        <div className='w-full px-5 md:px-0 md:w-1/2'>
            <img src={registerUserIcon} alt="" />
        </div>
        <div className='w-full px-5 md:px-0 md:w-1/2'>
            <h3 className='font-bold text-sm md:text-lg text-center text-[#353535] my-5'>Create An Account</h3>
        <p className='text-sm font-normal text-center'>Create your account and gain access to a platform designed to connect job seekers with employers. Join a community of professionals and streamline your job search or hiring process like never before.</p>
        </div>
    </div>
  )
}

export default Register