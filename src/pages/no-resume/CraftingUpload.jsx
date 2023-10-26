/* eslint-disable max-len */
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { AlertBox } from '../../components/alert-box/AlertBox';
import { TYPES } from '../../utils/constants';
import { validateEmail } from '../../utils/validateEmail';
//import tokenService from '../services/token.service';
import useResumeContext from '../../contexts/resumeContext';
import Button from '../../components/button/Button';
import { ThreeDots } from 'react-loader-spinner';

const CraftingUpload = () => {
    const [file, setFile] = useState(null);
    const type = new URL(window.location).searchParams.get('type');
    // console.log(type, '%%%');
    const [errors, setErrors] = useState({});
    const [errorProcessingMsg, setErrorProcessingMsg] = useState('');
    const { fetchResumes, resumeList, loading } = useResumeContext();

    const [isGenerating, setIsGenerating] = useState(false);

    const [form, setForm] = useState({
        name: '',
        email: '',
        linkedin: '',
        companyName: '',
        nextJobTitle: '',
        //nextJobTitle: '',
        jobDescription:'',
        yearsOfExperience: 0,
        skills: '',
        language: '',
        pdf:null
    });
    const requiredFields =
    type === TYPES.COVER_LETTER
        ? ['email', 'name', 'companyName']
        : type===TYPES.RESUME.LINKEDIN ? ['email', 'name', 'nextJobTitle','nextJobTitle', 'jobDescription' ]
            : type===TYPES.RESUME.FILE_UPLOAD ? ['pdf','email', 'name','nextJobTitle', 'jobDescription']
                : [
                    'email',
                    'name',
                    'nextJobTitle',
                    'nextJobTitle',
                    'jobDescription',
                    'yearsOfExperience',
                    'skills',
                ];
    const hintPlaceholders = {
        name: 'John Doe',
        email: 'john@gmail.com',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        companyName: 'Google',
        nextJobTitle: 'Senior Software Engineer',
        //: 'Software Engineer',
        jobDescription:'Add job description',
        skills: 'React, JavaScript, Node.js, HTML, CSS',
        yearsOfExperience: '5',
    };
  
    const navigateTo = useNavigate();
    const handleBlur = (event) => {
        const { name, value: val } = event.target;
        let success = true;
        const validNumber = typeof parseInt(val) === 'number' && parseInt(val) >= 0;

        if (!val && !validNumber && requiredFields.includes(name)) {
            setErrors({
                ...errors,
                [name]: `${name} is required`,
            });
            success = false;
        }

        if (name === 'email') {
            const userEmail = val.toLowerCase();

            if (!validateEmail(userEmail)) {
                setErrors({
                    ...errors,
                    email: 'Invalid email address',
                });
                success = false;
            }
        }

        if (name === 'linkedin') {
            try {
                // new URL might thdiv an exception too if the link is invalid
                const url = new URL(val);
                if (!url.href.includes('www.linkedin.com/in/')) {
                    throw new Error('Invalid LinkedIn profile');
                }
            } catch (e) {
                setErrors({
                    ...errors,
                    linkedin:
            'Entered link is not valid. Please check the link you\'ve entered.',
                });
                success = false;
            }
        }

        if (success) {
            setErrors({
                ...errors,
                [name]: null,
            });
            setForm({ ...form, [name]: val });
        }
    };

    const handleChange = (event) => {
        const { name, value: val, files } = event.target;
        setForm({ ...form, [name]: files ? files[0] : val });
    };

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const validateRequiredFields = () => {
        const missingFields = requiredFields.filter((field) => !form[field]);
        if (missingFields?.length) {
            const allErrors = { ...errors };
            missingFields.forEach((missingField) => {
                allErrors[missingField] = 'This field is required';
            });
            setErrors(allErrors);
            setErrorProcessingMsg('Please fill all required fields');
            return false;
        }
        setErrors({});
        setErrorProcessingMsg('');
        return true;
    };

    const resetErrorAlert = () => {
        setErrorProcessingMsg('');
    };
   
    const linkedinPayload = {
        name:form.name,
        email:form.email,
        nextJobTitle : form.nextJobTitle,
        jobDescription : form.jobDescription,
        linkedinURL : form.linkedin
    };

    const fileFormData = new FormData();

    // fileFormData.append('pdf', form.pdf);
    fileFormData.append('pdf', file);
    fileFormData.append('name', form.name);
    fileFormData.append('email', form.email);
    fileFormData.append('jobTitle', form.nextJobTitle);
    fileFormData.append('jobDescription', form.jobDescription);

    if(resumeList?.requestId !== undefined){
        navigateTo(`/resumai/craft-template/dashboard/${resumeList?.requestId}`);
    }
    return (

        <div className='bg-body w-7/12 h-auto m-auto rounded-[0.8rem]'>
            <div className='py-7 px-10'>
                <div>
                    <div className='grid grid-cols-1 relative my-1'>
                        <div style={{ marginBottom: '1%' }}>
                            <label className="text-sm font-light mb-1 ml-1">Full name</label>
                        </div>
                        <div>
                            <input
                                name="name"
                                autoFocus
                                autoComplete="given-name"
                                type="text"
                                value={form.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={hintPlaceholders.name}
                                className='w-full text-[#989093] text-sm font-light py-2 px-2 outline-0 rounded-[8px] border border-[#E4E6F1] pl-4'
                                disabled={isGenerating} // Disable the input field when the form is being processed
                            />
                        </div>
                        {errors?.name && (
                            <div>
                                <div className='text-danger'>{errors.name}</div>
                            </div>
                        )}
                    </div>
                    <div className='grid grid-cols-1 relative my-1'>
                        <div style={{ marginBottom: '1%' }}>
                            <label className="text-sm font-light mb-1 ml-1">Email</label>
                        </div>
                        <div>
                            <input
                                name="email"
                                autoComplete="email"
                                type="text"
                                value={form.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={hintPlaceholders.email}
                                className='w-full text-[#989093] text-sm font-light py-2 px-2 outline-0 rounded-[8px] border border-[#E4E6F1] pl-4'
                                disabled={isGenerating} // Disable the input field when the form is being processed

                            />
                        </div>
                        {errors?.email && (
                            <div>
                                <div className='text-danger'>{errors.email}</div>
                            </div>
                        )}
                    </div>
                    <div className='grid grid-cols-1 relative my-1'>
                        <div style={{ marginBottom: '1%' }}>

                            <label className="text-sm font-light mb-1 ml-1">Upload PDF file</label>
                        </div>
                        <div>
                            <input
                                name="pdf"
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                onBlur={handleBlur}
                                className='w-full text-[#989093] text-sm font-light py-2 px-2 outline-0 rounded-[8px] border border-[#E4E6F1] pl-4'
                                disabled={isGenerating} // Disable the input field when the form is being processed

                            />
                        </div>
                        {errors?.pdf && (
                            <div>
                                <div className='text-danger'>{errors.pdf}</div>
                            </div>
                        )}
                    </div>
                    <div className='grid grid-cols-1 relative my-1'>
                        <div style={{ marginBottom: '1%' }}>
                            <label className="text-sm font-light mb-1 ml-1">Job Position Applying to</label>
                        </div>
                        <div>
                            <input
                                name="nextJobTitle"
                                type="text"
                                value={form.nextJobTitle}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={hintPlaceholders.nextJobTitle}
                                className='w-full text-[#989093] text-sm font-light py-2 px-2 outline-0 rounded-[8px] border border-[#E4E6F1] pl-4'
                                disabled={isGenerating} // Disable the input field when the form is being processed

                            />
                        </div>
                        {errors?.nextJobTitle && (
                            <div>
                                <div className='text-danger'>{errors.nextJobTitle}</div>
                            </div>
                        )}
                    </div>
                    <div className='grid grid-cols-1 relative my-1'>
                        <div style={{ marginBottom: '1%' }}>
                            <label className="text-sm font-light mb-1 ml-1">Paste the job description you want to tailor your resume to</label>
                        </div>
                        <div>
                            <textarea
                                name="jobDescription"
                                type="text"
                                value={form.jobDescription}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder={hintPlaceholders.jobDescription}
                                className='w-full text-[#989093] text-sm font-light py-2 px-2 outline-0 rounded-[8px] border border-[#E4E6F1] pl-4'
                                disabled={isGenerating} // Disable the input field when the form is being processed
                            />
                        </div>
                        {errors?.jobDescription && (
                            <div>
                                <div className='text-danger'>{errors.jobDescription}</div>
                            </div>
                        )}
                    </div>
                    <div>
                    <Button onClick={() =>{
    validateRequiredFields();
    setIsGenerating(true); // Set isGenerating to true when the button is clicked
    fetchResumes(TYPES.RESUME.FILE_UPLOAD, form, linkedinPayload, fileFormData);
}}>
    {loading ? '...loading' : 'Generate'}
    {isGenerating && <ThreeDots color="#00BFFF" height={80} width={80} />}

</Button>

                    </div>
                    {errorProcessingMsg && (
                        <AlertBox
                            severity="error"
                            message={errorProcessingMsg}
                            onClose={resetErrorAlert}
                            timeout={10000}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CraftingUpload;