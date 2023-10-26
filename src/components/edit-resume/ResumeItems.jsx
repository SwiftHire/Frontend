import React from 'react';
import RenameForm from './RenameForm';
import { HiDotsHorizontal } from 'react-icons/hi';
import resumeImage from '../../assets/jpg/resume-list-image.jpg';

const ResumeItems = ({ item, selectedResume, openRenameForm, onClick }) => {
    // Get the shortened version of requestId
    const shortRequestId = item.requestId.substring(0, 5);

    

    return (
        <div className=''>
            <div className='border border-lightBorder rounded-[0.5rem]'>
                <div className='p-[5rem] md:p-10'>
                    <img src={resumeImage} alt="resume image sample" className='shadow-square' />
                </div>
                <div className='flex justify-between items-center border-t border-lightBorder px-5 py-5 relative'>
                    <span>
                        {openRenameForm && (selectedResume.requestId === item.requestId) ? <RenameForm 
                            text={selectedResume.requestId}/> : `Resume-${shortRequestId}`}</span> 
                    <span className='cursor-pointer'
                        onClick={onClick}><HiDotsHorizontal className='text-[2rem]' /></span>
                </div>
            </div>
        </div>
    );
};

export default ResumeItems;
