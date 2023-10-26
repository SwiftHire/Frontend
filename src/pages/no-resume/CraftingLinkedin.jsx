import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from 'formik';
//import tokenService from '../services/token.service';
import { TYPES } from '../../utils/constants';
import { linkedinFormSchema } from '../../utils/yupSchemas';
import TextInput from '../../components/forms/inputs/TextInput';
import TextAreaInput from '../../components/forms/inputs/TextAreaInput';
import Button from '../../components/button/Button';
import useResumeContext from '../../contexts/resumeContext';
import { languageOptions } from '../../utils/languageOptions';
// import Select from 'react-select';
import CustomSelectInput from '../../components/forms/inputs/CustomSelectInput';

const CraftingLinkedin = () => {
    const { fetchResumes, resumeList, loading } = useResumeContext();
    const navigateTo = useNavigate();

    // console.log(resumeList?.requestId, 'res list of items');

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
    if(resumeList?.requestId !== undefined){
        navigateTo(`/resumai/craft-template/dashboard/${resumeList?.requestId}`);
    }
    return (
        <div>
            <div className='bg-body w-7/12 h-auto m-auto rounded-[0.8rem]'>
                <div className='py-7 px-10'>
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            linkedin: '',
                            nextJobTitle: '',
                            jobDescription:'',
                        }}
                        validationSchema={linkedinFormSchema}
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
                            fetchResumes(TYPES.RESUME.LINKEDIN, form, linkedinPayload, fileFormData);
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
                                    <TextInput 
                                        label='linkedin'
                                        name="linkedin"
                                        type="url"
                                        pattern="https://.*"
                                        size="30"
                                        placeholder={hintPlaceholders.linkedin}
                                    />
                                
                                    <TextInput 
                                        label='Next Job Title'
                                        name="nextJobTitle"
                                        type="text"
                                        placeholder={hintPlaceholders.nextJobTitle}
                                    />

                                    <TextAreaInput
                                        label='Job Description'
                                        name="jobDescription"
                                        type="text"
                                        placeholder={hintPlaceholders.jobDescription}
                                    />
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
                                    <Button type="submit" disabled={isSubmitting}>
                                        {loading ? 'creating document' : 'submit'}
                                    </Button>
                                </div>
                        
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
        </div>
    );
};

export default CraftingLinkedin;