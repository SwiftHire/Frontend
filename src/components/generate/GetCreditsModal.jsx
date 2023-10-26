import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import { RxCrossCircled } from 'react-icons/rx';

const GetCreditsModal = ({ handleToggleModal, imageSrc } ) => {
    const navigateTo = useNavigate();
    
    return (
        <div className='w-full h-full grid grid-cols place-items-center absolute top-0 left-0 bg-black/50'>
            <div className='w-5/12 h-[50%] flex gap-5 items-center text-center 
            bg-body shadow-secondary rounded-[0.5rem] relative'>
                <div className='h-full'>
                    <img src={imageSrc} alt="" className='h-full object-cover rounded-tl-[0.5rem] rounded-bl-[0.5rem]' />
                </div>
                <div className='lg:px-7'>
                    <h2 className='text-[0.9rem] lg:text-[2.6rem] font-bold font-primary capitalize'>
                                Not Enough Credits?</h2>
                    <p className='text-sm font-normal'>Purchase more credits to continue using the
                        <span className='text-primary border-b-2 border-primary'> AI Writer</span> feature.</p>
                    <Button onClick={()=>navigateTo('/resumai/on-demand-plans')}>Buy AI Credits</Button>
                </div>
                <span onClick={handleToggleModal} 
                    className='cursor-pointer absolute right-5 top-3 text-primary font-bold'><RxCrossCircled/></span>
            </div>
        </div>
    );
};

export default GetCreditsModal;