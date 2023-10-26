import React, { useState } from 'react';
import Button from '../../components/button/Button';
import { useGenerateData } from '../../hooks/useGenerateData';
import { useRewriteData } from '../../hooks/useRewriteData';
import { GenerateDataActions } from '../../components/generate/GenerateDataActions';
import { GenerateLoadingIcon } from '../../components/generate/GenerateDataStyled';

import JobDetailsForm from './JobDetailsForm';

const SummaryForm = ({ formData, handleSaveToArray, loader }) => {
    const { summary, position, jobDescription, language, name, email, requestId } = formData;
    const [createSummary, setCreateSummary] = useState(Object.assign({},{ summary }));
    const [highlightedText, setHighlightedText] = useState('');
    const [showButton, setShowButton] = useState(false);
    const { generateNewdata, loading } = useGenerateData();
    const { rewriteData, isLoading, stopTypingEffect, showTypinEffectBtn } = useRewriteData();
  
    const handleChange = (event) => {
        const { name, value: val } = event.target;
        setCreateSummary({ ...createSummary, [name]: val });
    };

    const reWritePayload = {
        type:'summary',
        position,
        name,
        email,
        language,
        jobDescription,
        requestId,
        oldData:highlightedText
    };

    const generatePayload = {
        type:'summary',
        position,
        name,
        email,
        language,
        requestId,
        jobDescription
    };
    
    function handleTextHighlight() {
        const text = window.getSelection().toString();
        setHighlightedText(text);
        setShowButton(!showButton);
    }
    function createTextContent(generatedData){
        setCreateSummary({ ...createSummary, summary: generatedData });
    }
    function updateTextContent(highlightedText, generatedText, iterable){
        setCreateSummary({
            ...createSummary,
            summary: createSummary.summary.replace(highlightedText, generatedText.slice(0, iterable))
        });
    }

    function handleReplace() {
        rewriteData(highlightedText, reWritePayload, updateTextContent);
    }

    function handleCreate(){
        generateNewdata(generatePayload, createTextContent);
    }

    if(jobDescription==='' && position===''){
        return <>
            <div className='w-full h-screen  absolute top-0 left-0 bg-body/90'>
                <div className='h-full w-10/12 m-auto py-3 flex flex-col items-center justify-center'>
                    <div className='w-6/12 text-left'>
                    <h1 className='text-[0.9rem] lg:text-[2rem] text-primary font-bold capitalize'>Unlock the Perfect Resume with SwiftHire! 🚀</h1>
                        <p className='text-sm'>Simply provide your desired position and job description, and let our powerful AI create an eye-catching, professional resume and cover letter tailored just for you!🌟📄💼</p>
                    </div>
                <JobDetailsForm formData={formData} handleSaveToArray={handleSaveToArray} isLoading={loader}/>
                </div>
            </div>
        </>
    }

    return (
        <div className='w-8/12 mt-5 ml-10 shadow-secondary px-10 py-5'>
            <div className="w-full grid grid-cols-1 my-1">
                <div className='flex items-center justify-between mb-2'>
                    <label htmlFor='jobDescription' className="text-sm font-normal mb-2 ml-1">Professional Summary</label>
                    <div>
                        <GenerateDataActions 
                            loading={loading}
                            isLoading={isLoading} 
                            handleCreate={handleCreate}
                            showTypinEffectBtn={showTypinEffectBtn}
                            stopTypingEffect={stopTypingEffect} 
                            handleReplace={handleReplace} 
                        />
                    </div>
                </div>
                
                <textarea
                    rows={8}
                    name="summary"
                    maxLength='1000'
                    value={createSummary.summary}
                    onChange={handleChange}
                    placeholder="edit your summary"
                    onMouseUp={handleTextHighlight}
                    className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
            </div>
            <Button onClick={()=> handleSaveToArray(createSummary)}>
                {loader ? 'Saving' : 'Save to summary'} {loader && <GenerateLoadingIcon/>}</Button>
        </div>
    );
};

export default SummaryForm;