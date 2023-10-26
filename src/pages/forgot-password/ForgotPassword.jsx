import React, { useState } from 'react';
import {
    ErrorMsg,
    Label,
    Input,
} from './ForgotPasswordStyled';
import Button from '../../components/button/Button';
import { Loader } from '../../components/shared/loader/Loader';
import { CustomAlertBox } from '../../components/alert-box/CustomAlertBox';
import { useForgotPassword } from '../../hooks/useForgotPassword';
import { validateEmail } from '../../utils/validateEmail';
export const ForgotPassword = () => {
    const [form, setForm] = useState({
        email: '',
    });
    const [errors, setErrors] = useState({});
    const [errorProcessingMsg, setErrorProcessingMsg] = useState('');
    const [successProcessingMsg, setSuccessProcessingMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const requiredFields = ['email'];
    const forgotPassword = useForgotPassword();

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

        return true;
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm({
            ...form,
            [name]: value
        });

        if (!value && requiredFields.includes(name)) {
            setErrors({
                ...errors,
                [name]: `${name} is required`,
            });
            return;
        }

        if (name === 'email') {
            const userEmail = value.toLowerCase();

            if (!validateEmail(userEmail)) {
                setErrors({
                    ...errors,
                    email: 'Invalid email address',
                });

                return;
            }
        }

        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleForgotPassword = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        if (validateRequiredFields()) {
            const { status } = await forgotPassword({
                email: form.email,
            });
            setIsLoading(false);

            if (status === 200) {
                setSuccessProcessingMsg('If your email is registered, you"ll receive a link to reset the password');
                return;
            }

            setErrorProcessingMsg('There was an error processing your request. Try again later.');
        } else {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className='h-screen grid grid-cols-1 place-items-center'>
                <div className='w-6/12 shadow-secondary px-10 py-5 rounded-[0.5rem]'>
                    <div className='w-7/12 m-auto text-center my-10'>
                        <h2 className='text-[0.9rem] lg:text-[2rem] font-bold font-primary capitalize'>
                        Reset Your Password</h2>
                        <p className='text-sm font-normal'>Check your verified email for a link to 
                        reset your password.</p>
                    </div>
                    <div className="justify-content-md-center" style={{ marginTop: '3%' }}>
                        <div>
                            <Label>Email</Label>
                            <Input
                                name='email'
                                autoComplete='email'
                                type='text'
                                value={form.email}
                                onChange={handleChange}
                                placeholder='test@gmail.com'
                            />
                            { errors?.email && (
                                <ErrorMsg>{errors.email}</ErrorMsg>
                            )}
                        </div>
                    </div>
                    <div className="justify-content-md-center" style={{ marginTop: '3%' }}>
                        {
                            isLoading ?
                                <Loader /> 
                                :
                                <Button onClick={handleForgotPassword}>Send Reset Link</Button>
                        }
                    </div>
                    {errorProcessingMsg &&
                <div className="justify-content-md-center" style={{ marginTop: '3%' }}>
                    <div>
                        <CustomAlertBox
                            severity='error'
                            message={errorProcessingMsg}
                            onClose={() => setErrorProcessingMsg('')}
                            timeout={5000}
                        />
                    </div>
                </div>
                    }
                    {successProcessingMsg &&
                <div className="justify-content-md-center" style={{ marginTop: '3%' }}>
                    <div>
                        <CustomAlertBox
                            severity='success'
                            message={successProcessingMsg}
                            onClose={() => setSuccessProcessingMsg('')}
                            timeout={5000}
                        />
                    </div>
                </div>
                    }
                </div>
            </div>
        </>
    );
};
