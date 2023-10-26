import React, { useState, useEffect } from 'react';
import { BsCheckCircle } from 'react-icons/bs';
import { VscError } from 'react-icons/vsc';
import { RxCross2 } from 'react-icons/rx';

export function AlertBox({ isSuccess, message, setIsSuccess, setMessage }) {
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    useEffect(() => {
        if (isSuccess || message !== '') {
            setIsAlertVisible(true);
            setTimeout(() => {
                setIsAlertVisible(false);
                setIsSuccess(false);
                setMessage('');
            }, 10000);
        }
    }, [isSuccess, message, setIsSuccess, setMessage]);

    function handleAlertClose() {
        setIsAlertVisible(false);
        setIsSuccess(false);
        setMessage('');
    }

    return (
        <>
            {
                isAlertVisible && (
                    <div className='w-3/12 absolute top-[5%] right-2 rounded-[0.6rem] bg-body shadow-square py-3 px-5'>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-5'>
                                <span>{isSuccess ? <BsCheckCircle className='text-green-600'/>
                                    : <VscError className='text-danger'/>}</span>
                                <div>
                                    <h5 className='font-bold text-sm'>{isSuccess 
                                        ? 'Successfully saved!' : 'An error occured'}</h5>
                                    <p className='text-xsm'>{message}</p>
                                </div>
                            </div>
                            <span className='font-bold cursor-pointer' onClick={handleAlertClose}><RxCross2/></span>
                        </div>
                    </div>
                )
            }
            
        </>
    );
}

