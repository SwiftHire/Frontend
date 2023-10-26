/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AlertBox } from '../components/alert-box/AlertBox';
import { TYPES } from '../utils/constants';
import { validateEmail } from '../utils/validateEmail';
//import tokenService from '../services/token.service';
import useResumeContext from '../contexts/resumeContext';
import { useUserPlanContext } from '../contexts/UserPlansContext';
import Button from '../components/button/Button';


import PlanStatusModal from '../components/modals/PlanStatusModal';

const CraftResumeTemplatePage = () => {
    const [file, setFile] = useState(null);
    const type = new URL(window.location).searchParams.get('type');
    // const acceptedTypes = [TYPES.COVER_LETTER, TYPES.RESUME.CUSTOM_RESUME, TYPES.RESUME.LINKEDIN, TYPES.RESUME.FILE_UPLOAD];
    //const [openAiResult, setOpenAiResult] = useState('');
    const [errors, setErrors] = useState({});
    const [errorProcessingMsg, setErrorProcessingMsg] = useState('');
    const { fetchResumes, resumeList, loading } = useResumeContext();

    const { updateUserPlans, userPlans } = useUserPlanContext();
    const [openStatusModal, setOpenStatusModal] = useState(false);

    console.log('userPlans A', userPlans)


    function setActivePlan(userPlans) {
        let hasProPlan = false;
        let hasBasicPlan = false;
      
        for (const plan of userPlans) {
          if (plan.planName === 'Basic On Demand') {
            hasProPlan = true;
            break;
          } else if (plan.planName === 'Basic') {
            hasBasicPlan = true;
          }
        }
      
        if (hasProPlan) {
          return 'Basic On Demand';
        } else if (hasBasicPlan) {
          return 'Basic';
        } else {
          return 'Free';
        }
      }
      
      const activePlan = setActivePlan(userPlans); // Output: Basic On Demand, Basic, or Free based on the conditions

      console.log('activePlan A', activePlan)
    
    useEffect(()=>{
        updateUserPlans()
    },[userPlans]);

    function toggleStatusModal(){
        setOpenStatusModal(!openStatusModal);
      }

    const [form, setForm] = useState({
        name: '',
        email: '',
        linkedin: '',
        companyName: '',
        nextJobTitle: '',
        currentJobTitle: '',
        jobDescription:'',
        yearsOfExperience: 0,
        skills: '',
        language: '',
        pdf:null
    });
    const requiredFields =
    type === TYPES.COVER_LETTER
        ? ['email', 'name', 'companyName']
        : type===TYPES.RESUME.LINKEDIN ? ['email', 'name', 'currentJobTitle','nextJobTitle', 'jobDescription' ]
            : type===TYPES.RESUME.FILE_UPLOAD ? ['pdf','email', 'name','nextJobTitle', 'jobDescription']
                : [
                    'email',
                    'name',
                    'nextJobTitle',
                    'currentJobTitle',
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
        currentJobTitle: 'Software Engineer',
        jobDescription:'Add job description',
        skills: 'React, JavaScript, Node.js, HTML, CSS',
        yearsOfExperience: '5',
    };
    
    //const user = tokenService.getUser();
  
    const navigateTo = useNavigate();

    // if (!acceptedTypes.includes(type)) {
    //     return (
    //         <AlertBox
    //             severity="warning"
    //             message="This page supports only resumé or cover letter crafting"
    //             onClose={() => (navigateTo('/sign-in'))}
    //             timeout={10000}
    //         />
    //     );
    // }

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

    const goToEditPage = () => {
        navigateTo(`/resumai/craft-template/dashboard/${resumeList?.requestId}`);
        return;
    };
    return (
        <div className='w-8/12 m-auto shadow-secondary px-10 mt-10'>
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
                        />
                    </div>
                    {errors?.name && (
                        <div>
                            <div className='text-red-500'>{errors.name}</div>
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
                        />
                    </div>
                    {errors?.email && (
                        <div>
                            <div className='text-red-500'>{errors.email}</div>
                        </div>
                    )}
                </div>
                {
                    type===TYPES.RESUME.FILE_UPLOAD &&
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
                        />
                    </div>
                    {errors?.pdf && (
                        <div>
                            <div className='text-danger'>{errors.pdf}</div>
                        </div>
                    )}
                </div>
                }
          
                {type === TYPES.RESUME.CUSTOM_RESUME || type===TYPES.RESUME.LINKEDIN ? (
                    <>
                        <div style={{ marginTop: '1%' }}>
                            <div style={{ marginBottom: '1%' }}>
                                <label>LinkedIn profile</label>
                            </div>
                            <div>
                                <input
                                    name="linkedin"
                                    type="url"
                                    pattern="https://.*"
                                    size="30"
                                    value={form.linkedin}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder={hintPlaceholders.linkedin}
                                />
                            </div>
                            {errors?.linkedin && (
                                <div>
                                    <div>{errors.linkedin}</div>
                                </div>
                            )}
                        </div>
                    
                    </>
                ): ''}

                <div className='grid grid-cols-1 relative my-1'>
                    <div style={{ marginBottom: '1%' }}>
                        <label className="text-sm font-light mb-1 ml-1">Current job position</label>
                    </div>
                    <div>
                        <input
                            name="currentJobTitle"
                            type="text"
                            value={form.currentJobTitle}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={hintPlaceholders.currentJobTitle}
                            className='w-full text-[#989093] text-sm font-light py-2 px-2 outline-0 rounded-[8px] border border-[#E4E6F1] pl-4'
                        />
                    </div>
                    {errors?.currentJobTitle && (
                        <div>
                            <div>{errors.currentJobTitle}</div>
                        </div>
                    )}
                </div>
           
                <div className='grid grid-cols-1 relative my-1'>
                    <div style={{ marginBottom: '1%' }}>
                        <label className="text-sm font-light mb-1 ml-1">Job position you want to apply for</label>
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
                        />
                    </div>
                    {errors?.nextJobTitle && (
                        <div>
                            <div>{errors.nextJobTitle}</div>
                        </div>
                    )}
                </div>
           
                <div className='grid grid-cols-1 relative my-1'>
                    <div style={{ marginBottom: '1%' }}>
                        <label className="text-sm font-light mb-1 ml-1">Add job description</label>
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
                        />
                    </div>
                    {errors?.jobDescription && (
                        <div>
                            <div>{errors.jobDescription}</div>
                        </div>
                    )}
                </div>

                {type !== TYPES.RESUME.LINKEDIN && type !== TYPES.RESUME.FILE_UPLOAD &&
            <>
                <div style={{ marginTop: '1%' }}>
                    <div style={{ marginBottom: '1%' }}>
                        <label>Company you want to apply for</label>
                    </div>
                    <div>
                        <input
                            name="companyName"
                            type="text"
                            value={form.companyName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={hintPlaceholders.companyName}
                        />
                    </div>
                    {errors?.companyName && (
                        <div>
                            <div>{errors.companyName}</div>
                        </div>
                    )}
                </div>
                <div style={{ marginTop: '1%' }}>
                    <div style={{ marginBottom: '1%' }}>
                        <label>Years of experience</label>
                    </div>
                    <div>
                        <input
                            name="yearsOfExperience"
                            type="number"
                            min={0}
                            max={40}
                            value={form.yearsOfExperience || 0}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={0}
                        />
                    </div>
                    {errors?.yearsOfExperience && (
                        <div>
                            <div>{errors.yearsOfExperience}</div>
                        </div>
                    )}
                </div>
                <div style={{ marginTop: '1%' }}>
                    <div style={{ marginBottom: '1%' }}>
                        <label>Skills</label>
                    </div>
                    <div>
                        <textarea
                            name="skills"
                            maxLength={1000}
                            value={form.skills}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={hintPlaceholders.skills}
                        />
                    </div>
                    {errors?.skills && (
                        <div>
                            <div>{errors.skills}</div>
                        </div>
                    )}
                </div>

                <div style={{ marginTop: '1%' }}>
                    <div style={{ marginBottom: '1%' }}>
                        <label>Language Settings</label>
                    </div>
                </div>
            </>}
            
                <div>
                    {resumeList && goToEditPage()}
                    <Button onClick={() =>{
                        if (activePlan === 'Basic On Demand') {
                            validateRequiredFields();
                            fetchResumes(type, form, linkedinPayload, fileFormData);
                          } else {
                            setOpenStatusModal(true);
                          }
                    }}>{loading ? '...loading' : 'Generate'}</Button>
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
            {openStatusModal && <PlanStatusModal navigateTo={navigateTo} toggleStatusModal={toggleStatusModal}/>}
            <div className='w-full text-body'>
                    Experience unparalleled job search success with SwiftHire's ResumAI, 
                    our next-gen AI resume builder. Craft ATS-friendly resumes and cover
                     letters quickly using ChatGPT's cutting-edge technology, and delight 
                     in natural, hirable content like never before. </div>
        </div>
        
    );
};

export default CraftResumeTemplatePage;