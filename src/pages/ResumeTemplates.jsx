import React, { useState, useEffect } from 'react';
import coreClient from '../services/coreApi';
import ResumeItemsList from '../components/edit-resume/ResumeItemsList';

const ResumeTemplates = () => {
    const [resumes, setResumes] = useState([]);
    const [loadingResume, setLoadingResume]  = useState(true);

    useEffect(() => {
        coreClient.get('/get-all-resumes')
            .then(response => {
                if (response.data.resumes === undefined) {
                    setResumes([]);
                } else {
                    setResumes(response.data.resumes);
                    setLoadingResume(false); 
                }
            })
            .catch(error => {
                console.log(error);
                setLoadingResume(false); 
            });
    }, []);

    async function handleDeleteResume(resumeId) {
        setResumes(prevResumes => prevResumes.filter(resume => resume.requestId !== resumeId));
    }

    return (
        <div className='mt-[7rem] md:mt-0'>
            <div className='my-10'>
                <h1 className='text-[1.5rem] font-bold'> Your Documents</h1>
            </div>
            <div>
                <ResumeItemsList 
                    items={resumes}
                    onDeleteResume={handleDeleteResume}
                    loadingResume={loadingResume}
                />
            </div>
        </div>
    );
};

export default ResumeTemplates;