import React from 'react';
import { Formik, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { SignUpFormSchema } from '../../utils/yupSchemas';
import { useSignUp } from '../../hooks/useSignUp';
import TextInput from '../../components/forms/inputs/TextInput';
import Button from '../../components/button/Button';
import logo from '../../assets/svg/Logo.svg';

const SignUp = () => {
    const navigateTo = useNavigate();
    const signUp = useSignUp();

    return (
        <section className='h-screen grid place-items-center px-5 lg:px-0'>
            <div className='w-full lg:w-5/12 shadow-secondary px-10 py-10 rounded-[1rem]'>
                <div className='flex items-center gap-2 justify-center'>
                    <img src={logo} alt="mojorgen logo" />
                    <span className='text-sm font-normal'>SwiftHire</span>
                </div>
                <div>
                    <h4 className='text-center text-sm font-normal my-2'>Create your account</h4>
                    <Formik
                        initialValues={{ name: '', email: '', password: '', passwordRepeated: '' }}
                        validationSchema={SignUpFormSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            const { status } = await signUp({
                                name: values.name,
                                email: values.email,
                                password: values.password,
                            });
                            if (status === 201) {
                                navigateTo('/email-confirmation');
                                return;
                            }
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
                                        type='password'
                                        placeholder='Your password'
                                    />
                                    <TextInput
                                        label='Confirm Password'
                                        placeholder='Confirm password'
                                        name='passwordRepeated'
                                        type='password'
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
        </section>
    );
};

export default SignUp;
