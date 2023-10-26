import React, { useState, useEffect } from 'react';
import Button from '../../components/button/Button';
import { GenerateLoadingIcon } from '../../components/generate/GenerateDataStyled';

export const Certifications = ({ selectedCertification, setSelecteCertification,
    CertificationForm, handleSaveToArray, setIsEditMode, isEditMode, isLoading }) => {
    const { position, jobDescription } = CertificationForm || {};

    const placeholder = {
        title: 'Google Ads Certification',
        description:
      'A professional certification for individuals who demonstrate proficiency in Google Ads.' +
      'The certification includes a comprehensive assessment of Google Ads fundamentals, search, display, video, ' +
      'shopping, and mobile advertising.',
        link: 'https://www.google.com',
    };

    const [isTitleEmpty, setIsTitleEmpty] = useState(true);

    useEffect(() => {
        setIsTitleEmpty(!selectedCertification?.title);
    }, [selectedCertification?.title]);
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelecteCertification((prevData) => ({ ...prevData, [name]: value }));
    };

    const { ...payload } = selectedCertification;
    
    const certification = [
        ...CertificationForm.certifications,
        payload
    ];

    const handleAddCertifications = () => {
        const certification = [...CertificationForm.certifications, payload];
        handleSaveToArray({ certifications: certification });
    };

    const handleUpdateCertifications = () => {
        const updatedCertification = CertificationForm.certifications.map((certification) => {
            if (certification._id === selectedCertification._id) {
                return selectedCertification;
            } else {
                return certification;
            }
        });
        handleSaveToArray({ certifications: updatedCertification });
        setIsEditMode(false);
    };
    
    return (
        <>
            <div className='shadow-secondary px-10 py-5'>
                <div className="w-full grid grid-cols-1 my-1">
                    <label htmlFor='title' className="text-sm font-normal mb-2 ml-1">Certificate Title</label>
                    {isTitleEmpty && <span className='text-danger'><sup>***</sup> this field cannot be empty</span>}
                    <input 
                        name="title"
                        autoFocus
                        type="text"
                        value={selectedCertification?.title}
                        onChange={handleChange}
                        placeholder={placeholder.title}
                        className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                </div>
                <div className="w-full grid grid-cols-1 my-1">
                    <label htmlFor='description' 
                        className="text-sm font-normal mb-2 ml-1">Certificate Description</label>
                    <textarea 
                        rows={6}
                        name="description"
                        type="text"
                        value={selectedCertification?.description}
                        onChange={handleChange}
                        placeholder={placeholder.description}
                        className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                </div>
                <div className="w-full grid grid-cols-1 my-1">
                    <label htmlFor='link' className="text-sm font-normal mb-2 ml-1">Certificate Link</label>
                    <input 
                        name="link"
                        type="text"
                        value={selectedCertification?.link}
                        onChange={handleChange}
                        placeholder={placeholder.link}
                        className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                </div>
                {/* <Button onClick={handleSubmit}>Save  to certification</Button> */}
                <Button onClick={() => {
                    if (isEditMode) {
                        handleUpdateCertifications();
                    } else {
                        handleAddCertifications();
                    }
                }} disabled={isTitleEmpty}>
                    {isLoading ? 'Saving Data' : 'certifications'} {isLoading && <GenerateLoadingIcon/>}
                </Button>
            </div>
        </>
    );
};
