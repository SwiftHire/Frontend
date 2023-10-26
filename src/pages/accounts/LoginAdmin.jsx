/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { NavBar } from '../../components/navbar';
import { useSignInAdmin } from '../../hooks/useSignInAdmin';
import TextInput  from '../../components/forms/inputs/TextInput';
import Button from '../../components/button/Button';
import logo from '../../assets/svg/Logo.svg';

import TokenService from '../../services/token.service';
import { UserContext } from '../../contexts/UserContext';

const LoginAdmin = () => {
    const { setUserContext } = useContext(UserContext);
    const navigateTo = useNavigate();
    const signInAdmin = useSignInAdmin();
    return (
        <section className='h-screen grid place-items-center px-5 lg:px-0'>
            <NavBar/>
            <div className='w-full lg:w-5/12 shadow-secondary px-5 lg:px-10 py-10 rounded-[1rem] '>
                <div className='flex items-center gap-2 justify-center'>
                    <img src={logo} alt="mojorgen logo" /> 
                    <span className='text-sm font-normal'>SwiftHire</span>
                </div>
                <div className='my-10'>
                    <h4 className='text-sm font-normal my-2'>Login to Admin account</h4>
                </div>
                <div>
                    <Formik
                        initialValues={{ email:'', adminKey:'' }}
                        onSubmit={async (values, { setSubmitting }) => {
                            const { status, data } = await signInAdmin({ email: values.email, adminKey: values.adminKey });
                            if (status === 200) {
                                TokenService.setUser(data);
                                setUserContext(data);
                                navigateTo('/resumai/start-crafting', { replace: true });
                                setTimeout(() => window.location.reload(), 100); // Adjust the timeout if necessary
                                return;
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
                                    <TextInput 
                                        label='adminKey'
                                        name='adminKey'
                                        type='adminKey'
                                        placeholder='Your admin key'
                                    />
                        
                                </div>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'accessing account' : 'submit'}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    
                </div>
            </div>
        </section>
    );
};

export default LoginAdmin;
