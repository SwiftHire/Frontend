import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
import { AlertBox } from '../components/alert-box/AlertBox';
//import tokenService from '../services/token.service';
import { TYPES } from '../utils/constants';
import { linkedinFormSchema, CoverLetterFormSchema, FileUploadFormSchema } from '../utils/yupSchemas';
import TextInput from '../components/forms/inputs/TextInput';
import TextAreaInput from '../components/forms/inputs/TextAreaInput';
import CustomFileInput from '../components/forms/inputs/CustomFileInput';
import Button from '../components/button/Button';
import useResumeContext from '../contexts/resumeContext';
import { useUserPlanContext } from '../contexts/UserPlansContext';
import { languageOptions } from '../utils/languageOptions';
// import Select from 'react-select';
import CustomSelectInput from '../components/forms/inputs/CustomSelectInput';
import { Loader } from '../components/shared/loader/Loader';

import PlanStatusModal from '../components/modals/PlanStatusModal';

const CraftingTemplate = () => {
    // const [file, setFile] = useState(null);
    const type = new URL(window.location).searchParams.get('type');
    // console.log(type, '%%%');
    const acceptedTypes = [TYPES.COVER_LETTER, TYPES.RESUME.CUSTOM_RESUME, TYPES.RESUME.LINKEDIN, TYPES.RESUME.FILE_UPLOAD];
    //const [openAiResult, setOpenAiResult] = useState('');
    const { fetchResumes, resumeList, loading } = useResumeContext();
    const { updateUserPlans, userPlans } = useUserPlanContext();
    const [openStatusModal, setOpenStatusModal] = useState(false);

    //const user = tokenService.getUser();
    const navigateTo = useNavigate();

    useEffect(()=>{
        updateUserPlans()
    },[userPlans]);


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

    function toggleStatusModal(){
        setOpenStatusModal(!openStatusModal);
      }

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

    if (!acceptedTypes.includes(type)) {
        return (
            <AlertBox
                severity="warning"
                message="This page supports only resumé or cover letter crafting"
                onClose={() => (navigateTo('/sign-in'))}
                timeout={10000}
            />
        );
    }

    const goToEditPage = () => {
        if (activePlan.toLowerCase() === 'basic' || activePlan.toLowerCase() === 'pro') {
            navigateTo(`/resumai/craft-template/dashboard/${resumeList?.requestId}`);
          } else {
            setOpenStatusModal(true);
          }
        return;
    };
    const showResult = () => {
        if (type === TYPES.COVER_LETTER) {
            return (
                <textarea
                    className='h-full top-[16%] left-[33%] right-[14%] absolute p-5 border outline-0 border-primary'
                    name="result"
                    autoFocus
                    maxLength={2000}
                    value={resumeList?.result?.information[0]?.content}
                    readOnly
                    high={true}
                />
            );
        }
        //setOpenAiResult('');
        goToEditPage();
    };
    
    return (
        <div className='w-8/12 m-auto shadow-secondary px-10 mt-10'>
            <h1 className='text-[2rem] lg:text-lg font-bold border-b pb-3'>Craft a
                <span className='text-primary'> {type}</span> resume</h1>
            <div className='pt-7'>
                <Formik
                    initialValues={{
                        name: '',
                        email: '',
                        linkedin: '',
                        nextJobTitle: '',
                        jobDescription:'',
                        skills:'',
                        yearsOfExperience:'',
                        languageOptions:'',
                        pdf:''
                    }}
                    validationSchema={type===TYPES.RESUME.CUSTOM_RESUME ? undefined 
                        : type===TYPES.RESUME.LINKEDIN ? linkedinFormSchema 
                            : type===TYPES.RESUME.FILE_UPLOAD ? FileUploadFormSchema : CoverLetterFormSchema}
                    onSubmit={(values, { setSubmitting })=>{
                        const linkedinPayload = {
                            name:values.name,
                            email:values.email,
                            nextJobTitle : values.nextJobTitle,
                            jobDescription : values.jobDescription,
                            linkedinURL : values.linkedin
                        };

                        const fileFormData = new FormData();
                        fileFormData.append('pdf', values.pdf);
                        fileFormData.append('pdf', values.pdf);
                        fileFormData.append('name', values.name);
                        fileFormData.append('email', values.email);
                        fileFormData.append('jobTitle', values.nextJobTitle);
                        fileFormData.append('jobDescription', values.jobDescription);
                

                        const form = {
                            name:values.name,
                            email:values.email,
                            nextJobTitle : values.nextJobTitle,
                            jobDescription : values.jobDescription,
                        };
                        if (activePlan === 'Basic On Demand') {
                            fetchResumes(type, form, linkedinPayload, fileFormData);
                            setSubmitting(false);
                          } else {
                            setOpenStatusModal(true);
                            setSubmitting(false);
                          }
                    }}
                >
                    {({ isSubmitting })=>(
                        <Form>
                            <div className='w-full relative'>
                                <TextInput 
                                    label='full name'
                                    name="name"
                                    autoFocus
                                    autoComplete="given-name"
                                    type="text"
                                    placeholder={hintPlaceholders.name}
                                    capitalize
                                />
                                <TextInput 
                                    label='your email'
                                    name="email"
                                    autoComplete="email"
                                    type="text"
                                    placeholder={hintPlaceholders.email}
                                />
                                {
                                    type === TYPES.RESUME.FILE_UPLOAD && 
                            
                                <CustomFileInput label="Choose a file" name="pdf" />
                                }
                                {
                                    type===TYPES.RESUME.LINKEDIN &&
                                <TextInput 
                                    label='linkedin'
                                    name="linkedin"
                                    type="url"
                                    pattern="https://.*"
                                    //pattern="^https?:\/\/(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]{3,30}$" 
                                    size="30"
                                    placeholder={hintPlaceholders.linkedin}
                                />
                                }
                                <TextInput 
                                    label='Next Job Title'
                                    name="nextJobTitle"
                                    type="text"
                                    placeholder={hintPlaceholders.nextJobTitle}
                                />

                                {type === TYPES.COVER_LETTER && 
                                <>
                                    <TextInput 
                                        label='Enter the number of years of experience'
                                        name="yearsOfExperience"
                                        type='number'
                                        min={0}
                                        max={40}
                                        placeholder={hintPlaceholders.yearsOfExperience}
                                    />
                                    <TextAreaInput 
                                        label='Enter your relevant skills'
                                        name="skills"
                                        type='text'
                                        placeholder={hintPlaceholders.skills}
                                    />
                                </>
                                }
                                <TextAreaInput
                                    label='Job Description'
                                    name="jobDescription"
                                    type="text"
                                    placeholder={hintPlaceholders.jobDescription}
                                />

                                <div className='my-2'>
                                    {/* <Select
                                    name="language"
                                    // value={languageOptions.find(
                                    //     (option) => option.value === form.language
                                    // )}
                                    // onChange={(option) => handleChange({ target: { name: 'language', value: option.value } })}
                                    // onBlur={handleBlur}
                                    options={languageOptions}
                                    isSearchable
                                /> */}
                                </div>
                                <CustomSelectInput label="Select a language" name="languageOptions">
                                    <option value={''}>-- Select a language  --</option>
                                    {languageOptions.map((lang, i) => (
                                        <option key={i} value={lang.value}>
                                            {lang.value}
                                        </option>
                                    ))}
                                </CustomSelectInput>
                            
                            </div>
                            <div>
                                {resumeList && showResult()}
                                {loading ? <Loader/> : <Button type="submit" disabled={isSubmitting}>submit</Button>}
                            </div>
                        
                        </Form>
                    )}
                </Formik>
                {openStatusModal && <PlanStatusModal navigateTo={navigateTo} toggleStatusModal={toggleStatusModal}/>}
                <div className='w-full text-body'>
                    Experience unparalleled job search success with SwiftHire's ResumAI, 
                    our next-gen AI resume builder. Craft ATS-friendly resumes and cover
                     letters quickly using ChatGPT's cutting-edge technology, and delight 
                     in natural, hirable content like never before. </div>
            </div>
        </div>
    );
};

export default CraftingTemplate;