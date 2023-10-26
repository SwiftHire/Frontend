import React, { useState } from 'react';
import { Certifications } from '../Certifications';
import carretDown from '../../../assets/svg/carret-down.svg';
import carretUp from '../../../assets/svg/carret-up.svg';
import deleteIconRed from '../../../assets/svg/delete-icon-red.svg';
import editIcon from '../../../assets/svg/edit-icon.svg';

const CertificationsList = ({ CertificationForm, handleSaveToArray, handleDeleteCertification, isLoading }) => { 
    const [selectedCertification, setSelecteCertification] = useState([]);
    const [showItems, setShowItems] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleToggle = () => {
        setShowItems(!showItems);
    };
  
    const handleUpdate = (title) => {
        const selected = CertificationForm.certifications.find((certification) => 
            certification.title === title);
        setSelecteCertification(selected);
        setIsEditMode(true);
    };

    const handleCertificationSave = async () => {
        // Find the index of the education item to be updated if in edit mode
        const indexToUpdate = isEditMode
            ? CertificationForm.certifications.findIndex(
                (certification) => certification._id === selectedCertification._id
            )
            : -1;
      
        // Create a new education array with the updated data if in edit mode, otherwise add the new education item
        const updatedCertification = indexToUpdate !== -1
            ? [
                ...CertificationForm.certifications.slice(0, indexToUpdate),
                selectedCertification,
                ...CertificationForm.certifications.slice(indexToUpdate + 1),
            ]
            : [...CertificationForm.certifications, selectedCertification];
      
        // Call the general handleSaveToArray function with the updated education data
        await handleSaveToArray({ certifications: updatedCertification });
      
        // Reset the edit mode and selected education state
        setIsEditMode(false);
        setSelecteCertification({});
    };
    return (
        <div className='flex justify-between gap-5 mt-1'>
            <div className='w-8/12'>
                <Certifications 
                    CertificationForm={CertificationForm} 
                    selectedCertification={selectedCertification}
                    setSelecteCertification={setSelecteCertification}

                    handleSaveToArray={handleCertificationSave}
                    isEditMode={isEditMode}
                    setIsEditMode={setIsEditMode}
                    isLoading={isLoading}
                />
            </div>
            <div className='w-3/12 mt-10'>
                <div onClick={handleToggle} 
                    className='flex items-center justify-between 
                    border border-[#E4E6F1] px-4 py-2 rounded-[0.5rem] cursor-pointer'>
                    <h3>Your certification History</h3> 
                    {showItems ? <span><img src={carretUp} alt="mjorgrn carret" /></span> 
                        : <span><img src={carretDown} alt="mjorgrn carret" /></span>}
                </div>
                {
                    showItems && <>
                        {CertificationForm.certifications?.map((certification, index)=>(
                            <div key={index} className='flex gap-5 items-center justify-between mt-5 
                        bg-[#F8F9FA] rounded-[0.5rem] px-3 py-1'>
                                <span>{certification.title}</span>
                                <div className='flex items-center gap-1'>
                                    <span onClick={() => handleUpdate(certification.title)} 
                                        className='cursor-pointer'><img src={editIcon} alt="" /></span>
                                        <span onClick={()=> handleDeleteCertification({
                                        property:'certifications',
                                        value:certification?._id
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

export default CertificationsList;