import React, { useState, useEffect } from 'react'; 
import Button from '../../components/button/Button';
import { GenerateLoadingIcon } from '../../components/generate/GenerateDataStyled';

export const Education = ({ selectedEducation, setSelectedEducation, educationForm, handleSaveToArray, isEditMode,
    setIsEditMode, isLoading }) => {

    const [isDegreeEmpty, setIsDegreeEmpty] = useState(true);
    //console.log(educationForm, '###');
    const placeholder = {
        degree: 'Bachelor of Science',
        fieldOfStudy: 'Business Administration',
        institution: 'University of Southern California',
        location: 'Los Angeles, CA',
        country: 'USA',
        year: 2022,
    };

    useEffect(() => {
        setIsDegreeEmpty(!selectedEducation?.degree);
    }, [selectedEducation?.degree]);
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedEducation((prevData) => ({ ...prevData, [name]: value }));
    };

    const { ...payload } = selectedEducation;
    
    const education = [
        ...educationForm.education,
        payload
    ];

    const handleAddEducation = () => {
        const education = [...educationForm.education, payload];
        handleSaveToArray({ education: education });
    };

    const handleUpdateEducation = () => {
        const updatedEducation = educationForm.education.map((education) => {
            if (education._id === selectedEducation._id) {
                return selectedEducation;
            } else {
                return education;
            }
        });
        handleSaveToArray({ education: updatedEducation });
        setIsEditMode(false);
    };

    return (
        <>
            <div className='shadow-secondary px-10 py-5 z-0'>
                <div className="w-full grid grid-cols-1 my-1">
                    <label htmlFor='name' className="text-sm font-normal mb-2 ml-1">Qualification Earned (Degree)</label>
                    {isDegreeEmpty && <span className='text-danger'><sup>***</sup> this field cannot be empty</span>}
                    <input 
                        name="degree"
                        autoFocus
                        type="text"
                        value={selectedEducation?.degree}
                        onChange={handleChange}
                        placeholder={placeholder.degree}
                        className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                </div>
                <div className="w-full grid grid-cols-1 my-1">
                    <label htmlFor='name' className="text-sm font-normal mb-2 ml-1">Field of Study</label>
                    <input 
                        name="fieldOfStudy"
                        type="text"
                        value={selectedEducation?.fieldOfStudy}
                        onChange={handleChange}
                        placeholder={placeholder.fieldOfStudy}
                        className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                </div>
                <div className="w-full grid grid-cols-1 my-1">
                    <label htmlFor='name' className="text-sm font-normal mb-2 ml-1">Name of Institution</label>
                    <input 
                        name="institution"
                        type="text"
                        value={selectedEducation?.institution}
                        onChange={handleChange}
                        placeholder={placeholder.institution}
                        className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                </div>
                <div className="w-full grid grid-cols-1 my-1">
                    <label htmlFor='name' className="text-sm font-normal mb-2 ml-1">City</label>
                    <input 
                        name="location"
                        type="text"
                        value={selectedEducation?.location}
                        onChange={handleChange}
                        placeholder={placeholder.location}
                        className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                </div>
                <div className="w-full grid grid-cols-1 my-1">
                    <label htmlFor='name' className="text-sm font-normal mb-2 ml-1">Country</label>
                    <input 
                        name="country"
                        type="text"
                        value={selectedEducation?.country}
                        onChange={handleChange}
                        placeholder={placeholder.country}
                        className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                </div>
                <div className="w-full grid grid-cols-1 my-1">
                    <label htmlFor='name' className="text-sm font-normal mb-2 ml-1">Year of conclusion</label>
                    <input 
                        name="year"
                        type="number"
                        min={2000}
                        max={new Date().getFullYear()}
                        value={selectedEducation?.year}
                        onChange={handleChange}
                        placeholder={placeholder.year}
                        className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                </div>
                {/* <Button onClick={() => handleSaveToArray({ education: education })}>Save  to education</Button> */}
                <Button onClick={() => {
                    if (isEditMode) {
                        handleUpdateEducation();
                    } else {
                        handleAddEducation();
                    }
                }} disabled={isDegreeEmpty}>
                    {isLoading ? 'saving' : 'Save to education'} { isLoading && <GenerateLoadingIcon/>}
                </Button>

            </div>
        </>
    );
};