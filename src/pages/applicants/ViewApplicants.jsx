import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useGetApplicants } from '../../hooks/useGetApplicants';
import { useParams } from 'react-router-dom';

import { CandidatesCard } from '../../components/cards';
import { ViewApplicantProfile } from '../../components/profile';

const ViewApplicants = () => {
    const [jobApplicants, setJobApplicants] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [selectedApplicant, setSelectedApplicant] = useState(null);
    const { jobId } = useParams();

    const getJobApplicants = useGetApplicants();
    const navigateTo = useNavigate();

    // console.log(jobApplicants, 'jobApplicants');
    // console.log(jobId, 'jobId');

    const handleShowProfile = ()=>{
        setShowProfile(!showProfile);
    }

    const handleSelectApplicant = (profile)=>{
        setSelectedApplicant(profile);
    }

    async function getApplicants(){
        try {
            setLoading(true);
            const { status, data } = await getJobApplicants(jobId);
            if(status===200){
                setJobApplicants(data)
            }
        } catch (error) {
            console.log(error);
        }finally{
            setLoading(false)
        }
    }
   
    useEffect(()=>{
        getApplicants();
    },[jobId])


    if(loading){
        return <h2>Fetching data</h2>
    }

  
  return (
    <>
    {
        jobApplicants && jobApplicants?.applicants.length > 0 &&(
            <>
                <h3 className='text-sm font-medium my-10 font-Montserrat'>View All Applicants for this Job</h3>
                <button onClick={()=>navigateTo(-1)} className='flex items-center gap-2 mb-10'><span><MdArrowBackIosNew className='text-primary' /> </span> Back </button>
            </>
        )
    }
        <div className='w-[60vw] font-Montserrat'>
            {jobApplicants && jobApplicants?.applicants.length > 0 ? (
                jobApplicants && jobApplicants?.applicants.map((applicant)=>(
                    <CandidatesCard 
                        applicant={applicant} 
                        handleShowProfile={handleShowProfile}
                        handleSelectApplicant={handleSelectApplicant}
                        key={applicant._id}
                     />
                ))
            ): (
                <>
                    <div className='h-screen grid grid-cols place-items-center'>
                        <div>
                            <button onClick={()=>navigateTo(-1)} className='flex items-center gap-2 mb-10'><span><MdArrowBackIosNew className='text-primary' /> </span> Back </button>
                            <h2>No Applicants for this job yet</h2>
                        </div>
                    </div>
                </>
            )
            }
        </div>
        { showProfile && (
            <ViewApplicantProfile
                handleShowProfile={handleShowProfile}
                selectedApplicant={selectedApplicant}
                jobId={jobId}
                getApplicants={getApplicants}
            />
        )}
    </>
  )
}

export default ViewApplicants