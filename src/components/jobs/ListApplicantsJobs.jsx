import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useListAvailableJobs } from '../../hooks/useListAvailableJobs';
import { ListAvailableJobsCard } from '../cards';

import { useApplyJob } from '../../hooks/useApplyJob';

const ListApplicantsJobs = () => {
  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const availableJobs = useListAvailableJobs();
  const applyForJob = useApplyJob();



  const handleApplyJob = async(jobId, userId)=>{
    try {
        setIsLoading(true);
        const { status, data } = await applyForJob(jobId, userId);
        if(status===200){
          toast.success(data.message);
        }
        if(status===400){
          toast.error(data.message);
        }
      } catch (error) {
        console.log(error);
      }finally{
        setIsLoading(false);
      }
  }


  useEffect(()=>{
    async function getAvailableJobs(){
        try {
          setLoading(true);
          const { status, data } = await availableJobs();
          if(status===200){
            setJobs(data.jobs)
          }
        } catch (error) {
          console.log(error);
        }finally{
          setLoading(false);
        }
    }
    getAvailableJobs();
  }, [])

  if(loading){
    return <h3>.. loading data</h3>
  }
  return (
    <div className='mt-10  grid grid-cols-1 md:grid-cols-2 gap-5'>
      {jobs && jobs.length===0 
      ? <h3>No Jobs available</h3>
      : (<>
        {jobs && jobs?.map((job)=>(
          <ListAvailableJobsCard 
          job={job} 
          handleApplyJob={handleApplyJob} 
          isLoading={isLoading}
          key={job._id}/>
        ))}
      </>)} 
    </div>
  )
}

export default ListApplicantsJobs