import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiUsers } from 'react-icons/hi';
import { BiPencil } from 'react-icons/bi';

import tokenService from '../../services/token.service';



const ListAvailableJobsCard = ({ job, handleApplyJob, isLoading }) => {

  const navigateTo = useNavigate();
  const user = tokenService.getUser();

  const handleViewJobDetails = (joibId)=>{
    navigateTo(`/dashboard/job-details/${joibId}`)
  }
  return (
    <div className='p-10 shadow-lg bg-white rounded-[0.5rem] font-Montserrat'>
        <div className='flex items-center justify-between'>
            <h1 className='text-sm font-normal'>{job.title}</h1>
            <button className='rounded-full bg-primary text-white text-xxsm px-2 py-1'>{job.applicants.length} Applicant{job.applicants.length > 1 && 's'}</button>
        </div>
        <p className='my-5 text-xsm'>{job.description}</p>
        <div className='flex items-center gap-5 justify-between'>
            <button 
            onClick={()=>handleViewJobDetails(job._id)}
            className='text-xsm flex gap-3 items-center hover:text-primary'><span><HiUsers className='text-primary'/></span> View Job Details </button>
            <button 
              onClick={()=>handleApplyJob(job._id, user.id)}
            className='text-xsm flex gap-3 items-center hover:text-primary'><span><BiPencil className='text-primary'/></span> {isLoading ? 'processing' : 'Apply'}  </button>
        </div>
    </div>
  )
}

export default ListAvailableJobsCard