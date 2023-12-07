import React, { useState, useEffect } from 'react';
import { BiPencil } from 'react-icons/bi';
import { FaCheck, FaRegTimesCircle  } from "react-icons/fa";
import { TbBadgeFilled } from "react-icons/tb";
import { IoIosWarning } from "react-icons/io";
import { useGetOwnAppliedJobs } from '../../hooks/useGetOwnAppliedJobs';
import tokenService from '../../services/token.service';
import { ApplicantsCardSkeleton } from '../page-skeletons';

const AppliedJobs = () => {
    const [appliedJobs, listAppliedJobs] = useState(null);
    const [loading, setIsLoading] = useState(false);
    const getOwnAppliedJobs = useGetOwnAppliedJobs()
    const user = tokenService.getUser();

    console.log(appliedJobs)


    useEffect(()=>{
        async function getAppliedJobs(){
           try {
            setIsLoading(true);
            setTimeout(async () => {
                const { status, data } = await getOwnAppliedJobs(user.id);
                if (status === 200) {
                    listAppliedJobs(data);
                }
                setIsLoading(false);
              }, 2000); 
           } catch (error) {
            console.log(error)
           }
        }

        getAppliedJobs();
    },[])


  return (
    <>
        {/* {
            loading 
            ? <div className='mt-10'><ApplicantsCardSkeleton /></div>
            : (<>
            {
                appliedJobs && appliedJobs.map((job)=>(
                    <div key={job?.jobId} className='w-10/12 px-10 py-5 mt-10 shadow-lg bg-white rounded-[0.5rem] font-Montserrat'>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-sm font-normal'>{job?.title}</h1>
                            <button className={`${job?.applicationStatus==='approved' 
                            ? 'bg-green' 
                            : job?.applicationStatus==='pending' 
                            ? 'bg-yellow' 
                            : 'bg-red-500'} flex items-center gap-2 text-white text-xsm px-2 py-1 font-normal shadow-lg rounded-full`}>
                            {job?.applicationStatus==='approved' 
                            ? <FaCheck className='text-white' /> 
                            :job?.applicationStatus==='pending' ? <IoIosWarning /> : <FaRegTimesCircle  />}  {job?.applicationStatus} 
                            </button>
                        </div>
                        <p className='my-5 text-xsm'>{job?.description}</p>
                    </div>
                ))
            }
            </>)  
        } */}

        {loading 
            ? (<div>
                <ApplicantsCardSkeleton skeletons={appliedJobs?.length} />
            </div>)
            : appliedJobs && appliedJobs.length === 0 ? (
                <div className='h-full flex flex-col justify-center items-center mt-10 font-bold'><h3>You haven't applied to any jobs yet</h3></div>
            ): (<>
            {
                appliedJobs && appliedJobs.map((job)=>(
                    <div key={job?.jobId} className='w-10/12 px-10 py-5 mt-10 shadow-lg bg-white rounded-[0.5rem] font-Montserrat'>
                        <div className='flex items-center justify-between'>
                            <h1 className='text-sm font-normal'>{job?.title}</h1>
                            <button className={`${job?.applicationStatus==='approved' 
                            ? 'bg-green' 
                            : job?.applicationStatus==='pending' 
                            ? 'bg-yellow' 
                            : 'bg-red-500'} flex items-center gap-2 text-white text-xsm px-2 py-1 font-normal shadow-lg rounded-full`}>
                            {job?.applicationStatus==='approved' 
                            ? <FaCheck className='text-white' /> 
                            :job?.applicationStatus==='pending' ? <IoIosWarning /> : <FaRegTimesCircle  />}  {job?.applicationStatus} 
                            </button>
                        </div>
                        <p className='my-5 text-xsm'>{job?.description}</p>
                    </div>
                ))
            }
         </>)  
        }
    </>
    
  )
}

export default AppliedJobs