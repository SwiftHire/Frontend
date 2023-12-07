import React, { useState, useEffect } from 'react';
import tokenService from '../../services/token.service';
import { useListEmployerJobs } from '../../hooks/useListEmployerJobs';
import { EmployerJobCard } from '../cards';
import { ApplicantsCardSkeleton } from '../page-skeletons';

const ListJobs = ({ getEmployerJobs, loading, employerJobs, handleToggleEditJob, handleSelectedJob }) => {

    useEffect(()=>{
        getEmployerJobs();
    },[])

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 font-Montserrat'>
        {
            loading 
            ? <ApplicantsCardSkeleton skeletons={employerJobs?.length}/>
            : (<>
                {
                    employerJobs ? (
                        <>
                            {employerJobs && employerJobs.map((job)=>(
                                <EmployerJobCard 
                                    job={job} 
                                    getEmployerJobs={getEmployerJobs} 
                                    handleToggleEditJob={handleToggleEditJob}
                                    handleSelectedJob={handleSelectedJob}
                                    key={job._id}
                                />
                            ))}
                        </>
                    ):(
                        <>
                            <h3>No Jobs found</h3>
                        </>
                    )
                }
            </>)
        }
        
        
    </div>
  )
}

export default ListJobs