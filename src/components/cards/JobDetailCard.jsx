import React from 'react';
import { HiUsers } from 'react-icons/hi';
import { BiPencil } from 'react-icons/bi';
import { toast } from 'react-toastify';
import tokenService from '../../services/token.service';


const JobDetailCard = ({ JobDetail, handleApplyJob, isLoading }) => {
    const user = tokenService.getUser();
  return (
    <div className='p-10 shadow-lg bg-white rounded-[0.5rem] font-Montserrat'>
        <div className='flex items-center justify-between'>
            <h1 className='text-sm font-normal'>{JobDetail?.title}</h1>
            <button className='rounded-full bg-primary text-white text-xxsm px-2 py-1'>{JobDetail?.applicants?.length} Applicant{JobDetail?.applicants?.length > 1 && 's'}</button>
        </div>
        <p className='my-5 text-xsm'>{JobDetail?.description}</p>
        <div className='flex items-center gap-5 justify-between'>
            {/* <button 
            onClick={()=>handleViewJobDetails(job._id)}
            className='text-xsm flex gap-3 items-center hover:text-primary'><span><HiUsers className='text-primary'/></span> View Job Details </button> */}
            <button 
            onClick={()=>handleApplyJob(JobDetail?._id, user.id)}
            className='text-xsm flex gap-3 items-center hover:text-primary'><span><BiPencil className='text-primary'/></span> {isLoading ? 'processing' : 'Apply'}  </button>
        </div>
    </div>
  )
}

export default JobDetailCard