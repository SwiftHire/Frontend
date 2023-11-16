import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetJobDetail } from '../../hooks/useGetJobDetail';
import { useApplyJob } from '../../hooks/useApplyJob';

import { JobDetailCard } from '../../components/cards';

const JobDetails = () => {
  const [JobDetail, setJobDetail] = useState([])
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const applyForJob = useApplyJob();
  const getJobDetail = useGetJobDetail();
  const { jobId }  = useParams()


  const handleApplyJob = async(jobId, userId)=>{
    try {
        setIsLoading(true);
        const { status, data } = await applyForJob(jobId, userId);
        console.log(data)
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
    async function getJobDetails(){
        try {
          setLoading(false);
          const { status, data } = await getJobDetail(jobId);
          if(status===200){
            setJobDetail(data.job)
          }
        } catch (error) {
          console.log(error);
        }finally{
          setLoading(false);
        }
    }
    getJobDetails();
  }, [jobId])

  if(loading){
    return <h3>.. loading data</h3>
  }
  return (
    <div className='w-[60vw] mt-10'>
      <JobDetailCard 
        JobDetail={JobDetail}
        handleApplyJob={handleApplyJob}
        isLoading={isLoading}
      />
    </div>
  )
}

export default JobDetails