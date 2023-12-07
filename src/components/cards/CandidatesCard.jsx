import React from 'react';
import { AiFillEye } from 'react-icons/ai';

const CandidatesCard = ({ applicant, handleShowProfile, handleSelectApplicant }) => {
  
  return (
    <div className='mt-10 font-Montserrat'>
        <ul className='bg-white shadow-lg px-6 py-3 flex items-center justify-between gap-5 rounde-[0.5rem] rounded-[0.5rem]'>
            <li>
                <div>
                    <h3 className='font-medium text-sm'>{applicant?.user?.name}</h3>
                    <span className='text-xsm'>Backend Developer</span>
                </div>
            </li>
            <li>Today</li>
            <li>{applicant?.user.email}</li>
            <li 
            className='px-3 py-1 rounded-[0.5rem] text-white'
            style={{ 
              backgroundColor:`${applicant?.status==='pending' ? '#F5BA13' : applicant?.status==='approved' ? 'green' : 'red'}`
             }}
            >{applicant?.status}</li>
            <li onClick={()=>{
              handleSelectApplicant(applicant);
              handleShowProfile();
            }} className='cursor-pointer'><AiFillEye className='text-primary'/></li>
        </ul>
    </div>
  )
}

export default CandidatesCard