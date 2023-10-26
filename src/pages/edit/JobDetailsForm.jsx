import React, { useState } from 'react';
import Button from '../../components/button/Button';
import { GenerateLoadingIcon } from '../../components/generate/GenerateDataStyled';

const JobDetailsForm = ({ formData, handleSaveToArray, isLoading }) => {
    const { position, jobDescription } = formData;
    const [jobDetails, setJobDetails] = useState(
        Object.assign({}, { position, jobDescription })
    );

    const hintPlaceholders = {
        position: '',
        jobDetails: '',
    };

    const handleChange = (event) => {
        const { name, value: val } = event.target;
        setJobDetails({ ...jobDetails, [name]: val });
    };

    return (
        <div className='w-7/12 mt-5 ml-10 shadow-secondary px-10 py-5'>
            <div className="w-full grid grid-cols-1 my-1">
                <label htmlFor='position' className="text-sm font-normal mb-2 ml-1">Job Position</label>
                <input 
                    type="text"
                    id="position"
                    name="position"
                    placeholder={hintPlaceholders.position}
                    value={jobDetails?.position}
                    onChange={ handleChange }
                    className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
            </div>
            <div className="w-full grid grid-cols-1 my-1">
                <label htmlFor='jobDescription' className="text-sm font-normal mb-2 ml-1">Paste the job description you want to tailor your resume to</label>
                <textarea
                    rows={4}
                    type="text"
                    id="jobDescription"
                    name="jobDescription"
                    placeholder={hintPlaceholders.jobDetails}
                    value={jobDetails?.jobDescription}
                    onChange={handleChange}
                    className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
            </div>
            <Button onClick={()=> handleSaveToArray(jobDetails)}>
                {isLoading ? 'Saving' : 'Save to Job Details'} {isLoading && <GenerateLoadingIcon/>}</Button>
        </div>
    );
};

export default JobDetailsForm;