import React from 'react';
import globeImage from '../../assets/jpg/globe.jpg';
import resumeImage from '../../assets/jpg/ressume-image.jpg';
import { IoIosArrowRoundForward } from 'react-icons/io';

const LinkedinLanding = () => {
  return (
    <div className='w-full md:w-9/12 m-auto mb-[7rem]'>
        <div className='w-full md:w-10/12 m-auto text-center'>
            <h1 className='text-[2rem] md:text-xl font-montserrat font-xbold'>SwiftHire: One-Click
             <br className='hidden md:block' /> <span className='text-primary'>Job Applications.</span></h1>
            <p className='text-sm'>
            Streamline repetitive tasks; empower your job search.</p>
        </div>
        <div className='flex flex-col md:flex-row items-center gap-5 my-10 '>
            <img src={globeImage} alt="" />
            <h5 className='font-bold font-bold text-md font-montserrat'>over <span className='text-primary '>15K+</span> users and counting</h5>
        </div>
       

    </div>
  )
}

export default LinkedinLanding