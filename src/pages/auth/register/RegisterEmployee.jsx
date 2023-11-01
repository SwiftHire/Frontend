import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { SignUpFormSchema } from '../../../utils/yupSchemas';
import { useSignUp } from '../../../hooks/useSignUp';
import { TextInput } from '../../../components/forms/inputs';
import Button from '../../../components/button/Button';





const RegisterEmployee = () => {
    const navigateTo = useNavigate();
    const signUp = useSignUp();

    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className='h-screen grid place-items-center px-5 lg:px-0 font-Montserrat'>
            <div className='h-full w-full flex'>
                <div className='w-1/2 bg-primary flex justify-center items-center flex-col'>
                        <div className='px-2 lg:px-10'>
                            <h3 className='font-bold text-sm text-lg text-white'>SwiftHire</h3>
                            <p className='text-white my-10 text-sm'>Join SwiftHire and unlock 
                                endless career opportunities. 
                                Sign up now and land your dream job</p>
                            <span><BsArrowRight className='text-white' /></span>
                        </div>
                    </div>
                    <div className='w-full lg:w-1/2 flex justify-center items-center flex-col shadow-secondary px-5 lg:px-10 py-10 rounded-[1rem] font-Montserrat'>
                        <div>
                            <h4 className='text-center text-sm font-normal my-2'>Create your account</h4>
                            <Formik
                                initialValues={{ name: '', email: '', password: '', passwordRepeated: '' }}
                                validationSchema={SignUpFormSchema}
                                onSubmit={async (values, { setSubmitting }) => {
                                    const payload = {
                                        name: values.name,
                                        email: values.email,
                                        password: values.password,
                                        userType:'employer'
                                    }
                                    const { status, data } = await signUp({
                                        ...payload
                                    });
                                    if (status === 201) {
                                        navigateTo('/email-confirmation');
                                        return;
                                    }
                                    const errorMsg = status === 409 && data?.message ? data.message :'There was an error processing your request. Try again later.';
                                    toast.error(errorMsg);
                                    setSubmitting(false);
                                }}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div>
                                            <TextInput
                                                label='Name'
                                                name='name'
                                                autoComplete='given-name'
                                                type='text'
                                                placeholder='Your name'
                                            />
                                            <TextInput
                                                label='Email'
                                                name='email'
                                                autoComplete='email'
                                                type='email'
                                                placeholder='Your email'
                                            />
                                            <TextInput
                                                label='Password'
                                                name='password'
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder='Your password'
                                                handleTogglePassword={handleTogglePassword}
                                                passwordIcon={showPassword ? <FaEye className='text-primary'/> : <FaEyeSlash className='text-primary'/>}
                                            />
                                            <TextInput
                                                label='Confirm Password'
                                                placeholder='Confirm password'
                                                name='passwordRepeated'
                                                type={showPassword ? 'text' : 'password'}
                                                handleTogglePassword={handleTogglePassword}
                                                passwordIcon={showPassword ? <FaEye className='text-primary'/> : <FaEyeSlash className='text-primary'/>}
                                            />
                                        </div>
                                        <Button type="submit" disabled={isSubmitting}>
                                            {isSubmitting ? 'Creating account...' : 'Submit'}
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                            <p className='text-center my-2'>
                                By signing up, you agree to the terms and conditions and privacy policy
                            </p>
                            <p className='text-center'>
                                Already have an account{' '}
                                <span onClick={() => navigateTo('/sign-in')} className='text-primary cursor-pointer'>
                                    Log in
                                </span>
                            </p>
                        </div>
                    </div>
            </div>
        </section>
    );
};

export default RegisterEmployee;
