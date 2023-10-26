import React, { useReducer, createContext, useContext, useState } from 'react';
import { FETCH_RESUMES, LOADING_RESUMES } from '../actions/types';
import { resumeReducer } from '../reducers/resumeRducers';
import { initialState } from '../reducers/resumeRducers';
import coreClient from '../services/coreApi';

const ResumeContext = createContext();
export const ResumeContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(resumeReducer, initialState);
    const [loading, setLoading] = useState(false);

    const config = {};
    const fetchResumes = async (type, form, linkedinPayload, fileFormData) =>{
        const endPoint = type==='linkedin'? 'new-linkedin-resume': type==='file-upload' ? 'upload-resume'
            : 'multiple-user-request';
        const requestBody = {
            type,
        };

        const coverLetterReqBody = {
            type,
            form
        };

        if (type === 'file-upload') {
            config.headers = { 'content-type': 'multipart/form-data' };
        }

        const payload = type==='linkedin' ? { ...linkedinPayload }
            : type==='file-upload' ? fileFormData : type==='cover-letter'? coverLetterReqBody: requestBody;
        try {
            dispatch({
                type:LOADING_RESUMES,
                payload:setLoading(true)
            });
            const { status, data } = await coreClient.post(`/${endPoint}`, payload, config);
            dispatch({
                type:FETCH_RESUMES,
                payload:data
            });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return(
        <ResumeContext.Provider value={{ fetchResumes, resumeList:state.resumes, loading }}>
            {children}
        </ResumeContext.Provider>
    );
};

const useResumeContext = () => {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error(`${context} not found===`);
    }
    return context;
};

export default useResumeContext;
