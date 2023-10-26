import React from 'react';
import { RxCrossCircled } from 'react-icons/rx';
import PaymentPlansData from './PaymentPlansData';

const PaymentPlans = ({ showPlans, togglePlans }) => {
    return (
        <>
            {
                showPlans && (
                    <div className='h-screen w-[100vw] left-0 top-0 right-0 grid grid-cols 
            place-items-center bg-gray-500/80 px-3 md:px-10 py-5 absolute z-40 overflow-y-scroll'>
                        <div className='w-full md:w-5/12 bg-body  relative rounded-[0.5rem] z-40'>
                            <div className='bg-primary h-10 flex items-center px-5 font-bold rounded-t-lg'>
                                <h3 className='text-body'>Upgrade Account - Plan and Payment</h3>
                                <span onClick={togglePlans} 
                                    className='cursor-pointer absolute right-5 top-3 text-body font-bold'><RxCrossCircled/></span>
                            </div>
                            <div className='p-5'>
                                <PaymentPlansData />
                            </div>
                        </div>
                
                    </div>
                )
            }
    
        </>
    );
};

export default PaymentPlans;