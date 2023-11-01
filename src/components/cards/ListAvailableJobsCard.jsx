import React from 'react';
import { HiUsers } from 'react-icons/hi';
import { BiPencil } from 'react-icons/bi';


const ListAvailableJobsCard = () => {
  return (
    <div className='p-10 shadow-lg bg-white rounded-[]0.5rem font-Montserrat'>
        <div className='flex items-center justify-between'>
            <h1 className='text-sm font-normal'>title</h1>
            <button className='rounded-full bg-primary text-white text-xxsm px-2 py-1'>21 Applicants</button>
        </div>
        <p className='my-5 text-xsm'>description</p>
        <div className='flex items-center gap-5 justify-between'>
            <h3 className='text-xsm flex gap-3 items-center cursor-pointer'><span><HiUsers className='text-primary'/></span> View Job Details </h3>
            <h3 className='text-xsm flex gap-3 items-center cursor-pointer'><span><BiPencil className='text-primary'/></span> Apply </h3>
        </div>
    </div>
  )
}

export default ListAvailableJobsCard