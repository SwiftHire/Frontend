import React, {useState} from 'react';
import Button from '../../components/button/Button';
import majorgenHr from '../../assets/jpg/majorgen-hr.jpg';
import { MdOutlinePlaylistRemove } from 'react-icons/md';

export const PlanStatusModal = ({ navigateTo, toggleStatusModal }) => {
  return (
        <>
        <div className='h-full fixed w-full top-0 left-0 bg-primary/40 grid place-items-center'>
            <div
                class="flex flex-col rounded-lg bg-body md:max-w-xl md:flex-row shadow-secondary p-1 relative">
                <img
                    class="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:rounded-none md:rounded-l-lg"
                    src={majorgenHr}
                    alt="" 
                />
                <div class="flex flex-col justify-start p-6">
                <h5
                    class="mb-2 text-lg font-medium text-neutral-800 text-body leading-[2.4rem]">
                    Premium feature
                </h5>
                <p class="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                    You need a plan to use this feature
                </p>
                <Button onClick={()=>navigateTo('/resumai/subscription-plans')}>Buy A Plan</Button>
                </div>
                <span onClick={toggleStatusModal} className='absolute right-10 top-5 cursor-pointer '>
                    <MdOutlinePlaylistRemove className='h-[1.5rem] w-[1.5rem] text-primary'/>
                </span>
            </div>
        </div>
        </>
  )
}

export default PlanStatusModal