import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiUsers } from 'react-icons/hi';
import { BiPencil } from 'react-icons/bi';
import { BsTrash } from 'react-icons/bs';
import { toast } from 'react-toastify';

import { useDeleteJob } from '../../hooks/useDeleteJob';

const EmployerJobCard = ({ job, getEmployerJobs, handleToggleEditJob, handleSelectedJob }) => {
  const [loading, setLoading] = useState(false);
  const deleteJob = useDeleteJob();
  const navigateTo = useNavigate();

  const handleViewApplicant = (jobId)=>{
    navigateTo(`/dashboard/job-applicants/${jobId}`);
  }

  const handleDeleteJob = async(jobId)=>{
    try {
      setLoading(true);
      const { status, data } = await deleteJob(jobId);
      if(status===200){
         toast.success(data.message);
         getEmployerJobs();
      }
    } catch (error) {
      console.log(error);
    }finally{
      setLoading(false);
    }
  }
  return (
    <div className='p-10 shadow-lg bg-white rounded-[]0.5rem font-Montserrat'>
        <div className='flex items-center justify-between'>
            <h1 className='text-sm font-normal'>{job.title}</h1>
            <button className='rounded-full bg-primary text-white text-xxsm px-2 py-1'>
              {job?.applicants?.length} Applicant{job?.applicants?.length > 1 && 's'}
            </button>
        </div>
        <p className='my-5 text-xsm'>{job.description}</p>
        <div className='flex items-center gap-5 justify-between'>
            <button 
              onClick={()=>handleViewApplicant(job._id)}
              className='text-xsm flex gap-3 items-center cursor-pointer hover:text-primary'
            ><span><HiUsers className='text-primary'/></span> View applicants </button>
            <button 
              onClick={()=>{
                handleSelectedJob(job);
                handleToggleEditJob();
              }}
              className='text-xsm flex gap-3 items-center cursor-pointer'>
              <span><BiPencil className='text-primary'/></span> Edit Job </button>
            <button 
              onClick={()=>handleDeleteJob(job._id)}
              className='text-xsm flex gap-3 items-center cursor-pointer'>
              <span><BsTrash className='text-red-500'/></span> {loading ? 'Deleting' : 'Delete'} </button>
        </div>
    </div>
  )
}

export default EmployerJobCard