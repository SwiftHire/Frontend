import React, { useState, useEffect } from 'react';
import tokenService from '../../services/token.service';
import { useListEmployerJobs } from '../../hooks/useListEmployerJobs';
import { EmployerJobCard } from '../cards';

const ListJobs = () => {
    const [employerJobs, setEmployerJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const listEmployerJobs = useListEmployerJobs();
    const user = tokenService.getUser()

    console.log(employerJobs, 'employerJobs')


    useEffect(()=>{
        const getEmployerJobs = async()=>{
            try {
                setLoading(true)
                const { status, data } = await listEmployerJobs(user.id);
                if(status===200){
                    setEmployerJobs(data.jobs)
                }
            } catch (error) {
                console.log(error)
            }finally{
                setLoading(false);
            }
        }
        getEmployerJobs();
    },[])

    if(loading){
        return <h2>Fetching data</h2>
    }
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10 font-Montserrat'>
        {employerJobs && employerJobs.map((job)=>(
            <EmployerJobCard job={job} />
        ))}
    </div>
  )
}

export default ListJobs