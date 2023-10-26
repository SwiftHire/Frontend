import React from 'react';
import { Link } from 'react-router-dom';
import { BiEdit } from 'react-icons/bi';
import { CiEdit } from 'react-icons/ci';
import deleteIcon from '../../assets/svg/delete-icon-2.svg';
import coreClient from '../../services/coreApi';
const ResumePopUp = ({ selectedResume, toggleRenameForm, onDeleteResume }) => {
    async function deleteResume(){
        try {
            await coreClient.delete(`/resume/${selectedResume?.requestId}/delete-resume`);
            onDeleteResume(selectedResume?.requestId); 
        } catch (error) {
            console.error(error);
            alert('Error deleting resume');
        }
    }
    return (
        <div className=''>
            <Link to={`/resumai/craft-template/dashboard/${selectedResume?.requestId}`}>
                <span className='flex items-center gap-3 font-normal cursor-pointer hover:bg-[#F8F9FA] py-2 px-4'>
                <CiEdit className='text-primary font-bold'/> Edit </span>
            </Link>
            
            <span onClick={toggleRenameForm} 
                className='flex items-center gap-3 font-normal cursor-pointer my-1 hover:bg-[#F8F9FA] py-2 px-4'>
                <BiEdit className='text-primary font-bold'/> Rename 
            </span>
            <span onClick={() => deleteResume({ userId: selectedResume?.userId })}
             className='flex items-center gap-3 font-normal cursor-pointer hover:bg-[#F8F9FA] py-2 px-4'>
                <img src={deleteIcon} alt="" /> Delete 
            </span>
            {selectedResume.requestI}
        </div>
    );
};

export default ResumePopUp;