/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/navbar';
import { LoginFormSchema } from '../../utils/yupSchemas';
import { useSignIn } from '../../hooks/useSignIn';
import TextInput  from '../../components/forms/inputs/TextInput';
import Button from '../../components/button/Button';
import logo from '../../assets/svg/Logo.svg';
import  CheckIcon from '../../assets/svg/check-icon.svg';
import  emailIcon from '../../assets/svg/email-icon.svg';
import  lockIcon from '../../assets/svg/lock-icon.svg';

import TokenService from '../../services/token.service';
import { UserContext } from '../../contexts/UserContext';

const Login = () => {
    const { setUserContext } = useContext(UserContext);
    const navigateTo = useNavigate();
    const signIn = useSignIn();
    return (
        <section className='h-screen grid place-items-center px-5 lg:px-0'>
            <NavBar/>
            <div className='w-full lg:w-5/12 shadow-secondary px-5 lg:px-10 py-10 rounded-[1rem] '>
                <div className='flex items-center gap-2 justify-center'>
                    <img src={logo} alt="mojorgen logo" /> 
                    <span className='text-sm font-normal'>SwiftHire</span>
                </div>
                <div className='my-10'>
                    <h4 className='text-sm font-normal my-2'>Login to account</h4>
                    <span className='text-xsm font-light'>Enter your credentials to access your account</span>
                </div>
                <div>
                    <Formik
                        initialValues={{ email:'', password:'' }}
                        validationSchema={LoginFormSchema}
                        onSubmit={(values, { setSubmitting }) => {
                            // const { status, data } = await signIn({ email: values.email, password: values.password });
                            // if (status === 200) {
                            //     TokenService.setUser(data);
                            //     setUserContext(data);
                                navigateTo('/resumai/templates', { replace: true });
                                setTimeout(() => window.location.reload(), 100); // Adjust the timeout if necessary
                            //     return;
                            // }
                            // setSubmitting(false);
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
                                    <TextInput 
                                        label='password'
                                        name='password'
                                        type='password'
                                        placeholder='Your password'
                                    />
                        
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
        </section>
    );
};

export default Login;