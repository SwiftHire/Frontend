import React, { useState } from 'react';
import { WorkExperience } from '../WorkExperience';
import carretDown from '../../../assets/svg/carret-down.svg';
import carretUp from '../../../assets/svg/carret-up.svg';
import deleteIconRed from '../../../assets/svg/delete-icon-red.svg';
import editIcon from '../../../assets/svg/edit-icon.svg';

const WorkExperienceList = ( { workExperienceForm, handleSaveToArray, handleDeleteWorkExperience, isLoading }) => {
    const [selectedWorkExperience, setSelectedWorkExperience] = useState([]);
    const [showItems, setShowItems] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleToggle = () => {
        setShowItems(!showItems);
    };
  
    // const handleUpdate = (title) => {
    //     const selected = workExperienceForm.workExperience.find((workExperience) => workExperience.title === title);
    //     setSelectedWorkExperience(selected);
    // };

    const handleUpdate = (title) => {
        const selected = workExperienceForm.workExperience.find((workExperience) => workExperience?.title === title);
        setSelectedWorkExperience(selected);
        setIsEditMode(true); // Set the edit mode to true
    };

    const handleWorkExperienceSave = async () => {
        // Find the index of the workExperience item to be updated if in edit mode
        const indexToUpdate = isEditMode
            ? workExperienceForm.workExperience.findIndex(
                (workExperience) => workExperience._id === selectedWorkExperience._id
            )
            : -1;
    
        // Create a new workExperience array with the updated data if in edit mode, otherwise add the new workExperience item
        const updatedWorkExperience = indexToUpdate !== -1
            ? [
                ...workExperienceForm.workExperience.slice(0, indexToUpdate),
                selectedWorkExperience,
                ...workExperienceForm.workExperience.slice(indexToUpdate + 1),
            ]
            : [...workExperienceForm.workExperience, selectedWorkExperience];
    
        // Call the general handleSaveToArray function with the updated workExperience data
        await handleSaveToArray({ workExperience: updatedWorkExperience });
    
        // Reset the edit mode and selected workExperience state
        setIsEditMode(false);
        setSelectedWorkExperience({});
    };

    return (
        <div className='flex justify-between gap-5 mt-1'>
            <div className='w-8/12'>
                <WorkExperience
                    workExperienceForm={workExperienceForm}
                    selectedWorkExperience={selectedWorkExperience}
                    setSelectedWorkExperience={setSelectedWorkExperience}
                    handleSaveToArray={handleWorkExperienceSave}
                    handleSaveJobDetails={handleSaveToArray}
                    isEditMode={isEditMode}
                    setIsEditMode={setIsEditMode}
                    loader={isLoading}
                />

            </div>
            <div className='w-3/12 mt-10'>
                <div onClick={handleToggle}  
                    className='toggler flex items-center justify-between  
                    border border-[#E4E6F1] px-4 py-2 rounded-[0.5rem] cursor-pointer'>
                    <h3>Your experience list</h3> 
                    {showItems ? <span><img src={carretUp} alt="mjorgrn carret" /></span> 
                        : <span><img src={carretDown} alt="mjorgrn carret" /></span>}
                </div>
                
                {
                    showItems && <>
                        {workExperienceForm?.workExperience?.map((workExperience, index)=>(
                            <div key={index} className='itemToToggle flex gap-5 items-center justify-between mt-5 
                        bg-[#F8F9FA] rounded-[0.5rem] px-3 py-1'>
                                <span>{workExperience?.title}</span>
                                <div className='flex items-center gap-1'>
                                    <span onClick={() => handleUpdate(workExperience?.title)} 
                                        className='cursor-pointer'><img src={editIcon} alt="" /></span>
                                    <span className='cursor-pointer' 
                                    onClick={() => handleDeleteWorkExperience({
                                        property: "workExperience",
                                        value: workExperience._id
                                    })}
                                    >
                                        <img src={deleteIconRed} alt="" />
                                    </span>
                                </div>
                            </div>
                        ))}
                    </>
                }

            </div>
        </div>
    );
};

export default WorkExperienceList;