import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';

const FooterHeroAction = () => {
    const navigateTo = useNavigate();
    return (
        <div className='h-full flex flex-col items-center justify-center text-center'>
            <h3 className='text-[1.9rem] lg:text-[3rem] font-bold'>
        Craft job-ready
        resumes and cover letters.
            </h3>
            <p className='font-normal text-md'>
        SwiftHire helps you create professional resumes and cover
         letters in just seconds with the power of AI. </p>
            <div className='w-full lg:w-5/12'>
                <Button onClick={()=>navigateTo('resumai/start-crafting')}>Start crafting</Button></div>
        </div>
    );
};

export default FooterHeroAction;