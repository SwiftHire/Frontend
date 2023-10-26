import React, { useState } from 'react';
import { Education } from '../Education'; 
import carretDown from '../../../assets/svg/carret-down.svg';
import carretUp from '../../../assets/svg/carret-up.svg';
import deleteIconRed from '../../../assets/svg/delete-icon-red.svg';
import editIcon from '../../../assets/svg/edit-icon.svg';

const API_URL = process.env.REACT_APP_API_URL;

const EducationList = ({ educationForm, handleSaveToArray, handleDeleteEducation, isLoading }) => { 
    const [selectedEducation, setSelectedEducation] = useState([]);
    const [showItems, setShowItems] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleToggle = () => {
        setShowItems(!showItems);
    };

    const handleUpdate = (degree) => {
        const selected = educationForm.education.find((education) => education.degree === degree);
        setSelectedEducation(selected);
        setIsEditMode(true); // Set the edit mode to true
    };

    const handleEducationSave = async () => {
        // Find the index of the education item to be updated if in edit mode
        const indexToUpdate = isEditMode
            ? educationForm.education.findIndex(
                (education) => education._id === selectedEducation._id
            )
            : -1;
      
        // Create a new education array with the updated data if in edit mode, otherwise add the new education item
        const updatedEducation = indexToUpdate !== -1
            ? [
                ...educationForm.education.slice(0, indexToUpdate),
                selectedEducation,
                ...educationForm.education.slice(indexToUpdate + 1),
            ]
            : [...educationForm.education, selectedEducation];
      
        // Call the general handleSaveToArray function with the updated education data
        await handleSaveToArray({ education: updatedEducation });
      
        // Reset the edit mode and selected education state
        setIsEditMode(false);
        setSelectedEducation({});
    };

    

    return (
        <div className='flex justify-between gap-5 mt-1 z-0'>
            <div className='w-8/12'>
                <Education 
                    educationForm={educationForm} 
                    selectedEducation={selectedEducation}
                    setSelectedEducation={setSelectedEducation}
                    // handleSaveToArray={handleSaveToArray}
                    handleSaveToArray={handleEducationSave}
                    isEditMode={isEditMode}
                    setIsEditMode={setIsEditMode}
                    isLoading={isLoading}
                />
            </div>
            <div className='w-3/12 mt-10'>
                <div onClick={handleToggle} 
                    className='flex items-center justify-between 
                    border border-[#E4E6F1] px-4 py-2 rounded-[0.5rem] cursor-pointer'>
                    <h3>Your Education History</h3> 
                    {showItems ? <span><img src={carretUp} alt="mjorgrn carret" /></span> 
                        : <span><img src={carretDown} alt="mjorgrn carret" /></span>}
                </div>
                {
                    showItems && <>
                        {educationForm.education?.map((education, index)=>(
                            <div key={index} className='flex gap-5 items-center justify-between mt-5 
                        bg-[#F8F9FA] rounded-[0.5rem] px-3 py-1'>
                                <span>{education.degree}</span>
                                <div className='flex items-center gap-1'>
                                    <span onClick={() => handleUpdate(education.degree)} 
                                        className='cursor-pointer'><img src={editIcon} alt="" /></span>
                                    <span onClick={()=> handleDeleteEducation({
                                        property:'education',
                                        value:education?._id
                                    })} 
                                        className='cursor-pointer'><img src={deleteIconRed} alt="" /></span>
                                </div>
                            </div>
                        ))}
                    </>
                }

            </div>
        </div>
    );
};

export default EducationList;