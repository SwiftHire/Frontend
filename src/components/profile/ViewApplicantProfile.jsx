import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGetOwnProfile } from '../../hooks/useGetOwnProfile';
import { useManageApplicant } from '../../hooks/useManageApplicant';
import { FaTimes } from 'react-icons/fa';
import { BsToggleOff, BsToggleOn } from 'react-icons/bs';
import { ProfileCard } from '../cards';

const ViewApplicantProfile = ({ handleShowProfile, selectedApplicant, jobId, getApplicants }) => {
    const [applicantProfile, setApplicantProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showApprovalButton, setShowApprovalButton] = useState(false);
    const getApplicantProfile = useGetOwnProfile();
    const manageApplicant = useManageApplicant();
    // console.log(applicantProfile, 'applicantProfile')
    //console.log(selectedApplicant, 'selectedApplicant')

    const statuses = ['pending', 'approved', 'rejected']
    const [jobStatus, setJobStatus] = useState(selectedApplicant?.status || statuses[0]);
    const [selectedStatus, setSelectedStatus] = useState(jobStatus);

    const handleToggleApprovalButton = ()=>{
        setShowApprovalButton(!showApprovalButton);
    }

    // console.log(selectedStatus, 'selectedStatus')

    const handleSelectStatus = async(status) => {
        let updatedStatus;
        if (status !== jobStatus) {
            setSelectedStatus(status);
            setJobStatus(status);
            updatedStatus = status
        } else {
            setSelectedStatus(null);
            setJobStatus(null);
            updatedStatus = null
        }

        try {
            const { status, data } = await manageApplicant(selectedApplicant?.user._id, jobId, updatedStatus);
            if(status===200){
                toast.success(data.message);
                getApplicants();
                handleShowProfile();
            }
        } catch (error) {
            console.log(error);
        }
    }

    
      useEffect(()=>{
        async function getUserProfile(){
            try {
                setLoading(true);
                const { status, data } = await getApplicantProfile(selectedApplicant?.user._id);
                if(status===200){
                    setApplicantProfile(data)
                }
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false)
            }
          } 
        
        getUserProfile();
      },[selectedApplicant?.user._id])
    
      if(loading){
        return <h3> loading data</h3>
      }
  return (
    <div className='h-screen w-full fixed top-0 left-0 grid place-items-center bg-primary/70 font-Montserrat'>
        <div className='w-11/12 bg-white p-10 rounded-[0.5rem] relative'>
            <span className='absolute top-5 right-5 cursor-pointer' onClick={handleShowProfile}><FaTimes className='text-primary'/></span>
           <div className='flex gap-5'>
                <div className=''>
                    <ProfileCard profileInfo={applicantProfile} />
                </div>
                <div className='w-3/12 '>
                    {
                        statuses && statuses.map((status, index)=>(
                            <div className='h-32 border flex flex-col justify-center items-center hover:bg-primary/10' key={index}>
                                <h3 className='text-sm font-medium'>{status}</h3>
                                <button onClick={()=>{
                                    handleSelectStatus(status);
                                    handleToggleApprovalButton();
                                }}>
                                    {selectedStatus !== status 
                                    ? <BsToggleOff className='w-9 h-9' /> 
                                    : <BsToggleOn 
                                    style={{ color: selectedStatus==='approved' 
                                    ? 'green' 
                                    : selectedStatus==='pending' 
                                    ? 'yellow' 
                                    : 'red', height:'2.5rem', width:'2.5rem' }}
                                />}
                                </button>
                            </div>
                        ))
                    }
                    
                </div>
           </div>
        </div>
    </div>
  )
}

export default ViewApplicantProfile