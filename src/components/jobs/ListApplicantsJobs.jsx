import React, { useState, useEffect } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { useGetOwnProfile } from '../../hooks/useGetOwnProfile';
import { useApplyJob } from '../../hooks/useApplyJob';
import tokenService from '../../services/token.service';
import { useListAvailableJobs } from '../../hooks/useListAvailableJobs';
import { ListAvailableJobsCard } from '../cards';
import { ApplicantsCardSkeleton } from '../page-skeletons';


const ListApplicantsJobs = () => {
  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [profileInfo, setProfileInfo] = useState(null);
  const [jobMatches, setJobMatches] = useState([]);
  const [jobFormData, setJobFormData] = useState({ job:'' });
  const availableJobs = useListAvailableJobs();
  const applyForJob = useApplyJob();
  const getOwnProfile = useGetOwnProfile();
  const user = tokenService.getUser();

  console.log(jobs, 'jobs ....');
  console.log(profileInfo && profileInfo, 'profile ....');


  const handleChange = (e)=>{
    const { name, value } = e.target;
    setJobFormData({ ...jobFormData, [name]:value })
  }
  const findJobMatches = ()=>{
    const matchedJobs = jobs && jobs?.filter((job)=>{
      if(job?.title?.toLowerCase().includes(profileInfo[0]?.professionalTitle.toLowerCase())){
        return job
      }
    });
    setJobMatches(matchedJobs);
  }

  const searchJobs = ()=>{
    if(!jobFormData?.job){
      toast.error('field cannot be empty');
      setJobMatches(jobMatches)
      return
    }
    const matchedJobs = jobs?.filter((job)=>{
      if(job?.title?.toLowerCase().includes(jobFormData.job.toLowerCase())){
        return job
      }
    });
    setJobMatches(matchedJobs);
  }


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


  async function getUserProfile(){
    try {
        const { status, data } = await getOwnProfile(user.id);
        if(status===200){
          setProfileInfo(data)
        }
    } catch (error) {
        console.log(error);
    }
  } 

  useEffect(()=>{
    
    getUserProfile();
  },[user.id])

  useEffect(()=>{
    async function getAvailableJobs(){
        try {
          setLoading(true);
          setTimeout(async () => {
            const { status, data } = await availableJobs(user.id);
            if (status === 200) {
              setJobs(data.jobs);
            }
            setLoading(false);
          }, 2000); 
        } catch (error) {
          console.log(error);
          setLoading(false);
        }
    }
    getAvailableJobs();
  }, [])

  useEffect(()=>{
    findJobMatches();
  },[jobs, profileInfo])

  
  return (
    <div className='h-full mt-10'>
        <div className='w-full'>
          <div className='w-full h-[60px] bg-white my-5'>
            <div className='w-full h-full flex items-center justify-center gap-5 rounded-[0.5rem] px-10 relative'>
              <input 
                name='job'
                type="text"
                placeholder='Job Title, Company or Keywords'
                className='w-10/12 h-4/5 px-5 rounded-[0.5rem] text-[#a8a5a5] outline-none'
                onChange={handleChange}
                value={jobFormData.job}
              />
              <div className='w-2/12 h-4/5'>
                <button 
                onClick={searchJobs}
                className='w-full bg-primary h-full text-white rounded-[0.5rem] hover:bg-[#e3e3e3]'>
                  Find Jobs</button>
              </div>
              <span className='absolute top-5 left-5'><IoSearchOutline /></span>
            </div>
          </div>
          <div className='flex  gap-4'>
          <div className='h-full w-4/12 bg-white p-5'>
            {/* <h3 className='font-bold text-sm'>Job Titles</h3>
            <ul className=''>
              <li className='flex items-center gap-4 mt-3'>
                <input 
                  type="checkbox" 
                  name="" 
                  id=""
                  className='accent-primary h-6 w-6'
                />
                <h6>Real Estate Consultant</h6>
              </li>
              <li className='flex items-center gap-4 mt-3'>
                <input 
                  type="checkbox" 
                  name="" 
                  id=""
                  className='accent-primary h-6 w-6'
                />
                <h6>Software Developer</h6>
              </li>
              <li className='flex items-center gap-4 mt-3'>
                <input 
                  type="checkbox" 
                  name="" 
                  id=""
                  className='accent-primary h-6 w-6 cursor-pointer'
                />
                <h6>Devops Engineer</h6>
              </li>
            </ul> */}
          </div>
          <div className='w-8/12'>
            <div className='py-10'>
              <h3>Showing <span className='text-primary font-bold'>{jobMatches && jobMatches.length}</span> jobs according to your profile</h3>
            </div>
            <div className='h-full w-full grid grid-cols-1 md:grid-cols-1 gap-3'>
                  {loading 
                  ? (<div>
                      <ApplicantsCardSkeleton skeletons={jobs?.length} />
                    </div>)
                  : jobMatches && jobMatches.length === 0 ? (
                    <h3 className='font-bold'>No Jobs available</h3>
                  ): (
                    <>
                      {jobMatches && jobMatches?.map((job)=>(
                          <ListAvailableJobsCard 
                          job={job} 
                          handleApplyJob={handleApplyJob} 
                          isLoading={isLoading}
                          key={job._id}/>
                      ))}
                    </>
                  )
                }
                  
            </div>
          </div>
        </div>
        </div>
    </div>
  )
}

export default ListApplicantsJobs