/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
// import { NavBar } from '../../../components/navbar';
import { LoginFormSchema } from '../../../utils/yupSchemas';
import { useSignIn } from '../../../hooks/useSignIn';
import { TextInput }  from '../../../components/forms/inputs';
import { Button } from '../../../components/button';

import TokenService from '../../../services/token.service';


const Login = () => {
    const navigateTo = useNavigate();
    const signIn = useSignIn();

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    return (
        <section className='h-screen w-full m-auto px-5 lg:px-0 font-Montserrat'>
            <div className='h-full w-11/12 flex'>
                <div className='w-1/2 bg-primary flex justify-center items-center flex-col'>
                    <div className='px-2 lg:px-10'>
                        <h3 className='font-bold text-sm text-lg text-white'>SwiftHire</h3>
                        <p className='text-white my-10 text-sm'>Join SwiftHire and unlock 
endless career opportunities. 
Sign up now and land your dream job</p>
                        <span><BsArrowRight className='text-white' /></span>
                    </div>
                </div>
                <div className='w-full lg:w-1/2 flex justify-center items-center flex-col shadow-secondary px-5 lg:px-10 py-10 rounded-[1rem] '>
                    {/* <div className='my-10'>
                        <h4 className='text-sm font-normal my-2'>Login to account</h4>
                        <span className='text-xsm font-light'>Enter your credentials to access your account</span>
                    </div> */}
                    <div className='w-full'>
                        <Formik
                            initialValues={{ email:'', password:'' }}
                            validationSchema={LoginFormSchema}
                            onSubmit={async (values, { setSubmitting }) => {
                                const { status, data } = await signIn({ email: values.email, password: values.password });
                                if (status === 200) {
                                    TokenService.setUser(data);
                                    navigateTo('/dashboard/user', { replace: true });
                                    setTimeout(() => window.location.reload(), 100); // Adjust the timeout if necessary
                                    return;
                                }
                                if(status === 404){
                                    const errorMsg = 'There was an error validating your account. Check your inputs and try again.'
                                    toast.error(errorMsg);
                                }
                                setSubmitting(false);
                            }}
                            
                        >
                            {({ isSubmitting })=>(
                                <Form>
                                    <div>
                                        <TextInput 
                                            label='email'
                                            name='email'
                                            autoComplete='email'
                                            type='email'
                                            placeholder='Your email'
                                        />
                                        <div className='relative'>
                                            <TextInput 
                                                label='password'
                                                name='password'
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder='Your password'
                                                handleTogglePassword={handleTogglePassword}
                                                passwordIcon={showPassword ? <FaEye className='text-primary'/> : <FaEyeSlash className='text-primary'/>}
                                            />
                                        </div>
                                    </div>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? 'accessing account' : 'submit'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        <p className='text-center pt-5'>Don't have an account yet?  
                            <span onClick={()=> navigateTo('/sign-up')} className='text-primary cursor-pointer'> Sign up now</span> <br />
                            <span onClick={()=> navigateTo('/forgot-password')} 
                            className='text-center text-red-500 cursor-pointer border-b'>forgot password?  
                        </span>
                        </p>
                        
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;