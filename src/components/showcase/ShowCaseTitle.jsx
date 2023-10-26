import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';

const ShowCaseTitle = () => {
    const navigateTo = useNavigate();
    return (
        <div className='h-auto flex flex-col items-center justify-center text-center'>
            <span className='px-2 py-2 text-xsm uppercase font-bold text-primary'>Craft resume</span>
            <h1 className='text-[2rem] lg:text-xl font-bold'>Showcase</h1>
            <p className='font-normal text-md'>AI has opened up a world of endless possibilities. 
With SwiftHire, We can do a lot more with job documents and,   <br className='hidden md:block' /> 
achieve 10x better results in less time and with less effort.</p>
            <div className='w-full lg:w-3/12'>
                <Button onClick={()=>navigateTo('resumai/start-crafting')}>Start crafting</Button></div>
        </div>
    );
};

export default ShowCaseTitle;