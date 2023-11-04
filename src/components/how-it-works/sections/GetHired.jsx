import React from 'react';
import applyJobIcon from '../../../assets/svg/apply-job.svg'

const GetHired = () => {
  return (
    <div className='flex items-center flex-col md:flex-row gap-10 mt-10'>
        <div className='w-full px-5 md:px-0 md:w-1/2'>
            <img src={applyJobIcon} alt="" />
        </div>
        <div className='w-full px-5 md:px-0 md:w-1/2'>
            <h3 className='font-bold text-sm md:text-lg text-center text-[#353535] my-5'>Get Hired Instatly</h3>
        <p className='text-sm font-normal text-center'>Start applying to jobs that match your skills and aspirations. With <span className='text-primary font-bold'>SwiftHire</span>, you have the tools and resources to stand out and secure your dream job.</p>
        </div>
    </div>
  )
}

export default GetHired