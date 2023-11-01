import React from 'react';
import { HiUsers } from 'react-icons/hi';
import { BiPencil } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';

const EmployerJobCard = ({ job }) => {
  return (
    <div className='p-10 shadow-lg bg-white rounded-[]0.5rem font-Montserrat'>
        <div className='flex items-center justify-between'>
            <h1 className='text-sm font-normal'>{job.title}</h1>
            <button className='rounded-full bg-primary text-white text-xxsm px-2 py-1'>21 Applicants</button>
        </div>
        <p className='my-5 text-xsm'>{job.description}</p>
        <div className='flex items-center gap-5 justify-between'>
            <button className='text-xsm flex gap-3 items-center cursor-pointer'><span><HiUsers className='text-primary'/></span> View applicants </button>
            <button className='text-xsm flex gap-3 items-center cursor-pointer'><span><BiPencil className='text-primary'/></span> Edit Job </button>
            <button className='text-xsm flex gap-3 items-center cursor-pointer'><span><BsTrash className='text-red-500'/></span> Delete </button>
        </div>
    </div>
  )
}

export default EmployerJobCard