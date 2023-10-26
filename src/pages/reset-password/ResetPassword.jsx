import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    ResetPasswordContainer,
    ErrorMsg,
    Label,
    Input,
    Title,
} from './ResetPasswordStyled';
import Button from '../../components/button/Button';
import { Loader } from '../../components/shared/loader/Loader';
import { CustomAlertBox } from '../../components/alert-box/CustomAlertBox';
import { useResetPassword } from '../../hooks/useResetPassword';

import resetPasswordImg from '../../assets/png/reset-password.png';

export const ResetPassword = () => {
    const token = new URL(window.location).searchParams.get('token');
    const navigateTo = useNavigate();

    if (!token) {
        return (
            <div className="justify-content-md-center" style={{ marginTop: '3%' }}>
                <div>
                    <CustomAlertBox
                        severity='error'
                        message='The reset URL is invalid or has expired. Please, request a new link to reset your password.'
                        timeout={5000}
                    />
                </div>
            </div>
        );
    }

    const [form, setForm] = useState({
        password: '',
        passwordRepeated: '',
    });
    const [errors, setErrors] = useState({});
    const [errorProcessingMsg, setErrorProcessingMsg] = useState('');
    const [successProcessingMsg, setSuccessProcessingMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const requiredFields = ['password', 'passwordRepeated'];
    const resetPassword = useResetPassword();

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

        if (form.password !== form.passwordRepeated) {
            setErrorProcessingMsg('The passwords are different, and they must be the same. Please, type them again.');
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

        const isPasswordField = name === 'password' || name === 'passwordRepeated';
        let regex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/;
        if (isPasswordField && !regex.test(value)) {
            setErrors({
                ...errors,
                [name]: 'The password must have at least 8 characters, 1 letter in lower case, ' +
                '1 in upper case, 1 number and 1 special character.',
            });
            return;
        }

        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleResetPassword = async (event) => {
        event.preventDefault();

        setIsLoading(true);

        if (validateRequiredFields()) {
            const { status } = await resetPassword({
                token,
                password: form.password,
            });
            setIsLoading(false);

            if (status === 200) {
                setSuccessProcessingMsg('Successful reset! Please, login with your new password.');
                setTimeout(()=>{
                    navigateTo('/sign-in');
                }, 3000);
                return;
            }

            setErrorProcessingMsg('There was an error processing your request.' +
                ' Please, request a new link to reset your password later.');
        } else {
            setIsLoading(false);
        }
    };

    return (
        <div className='h-screen grid grid-cols-1 place-items-center'>
           <div className='w-6/12 shadow-secondary px-10 py-5 rounded-[0.5rem]'>
                <div className="w-full flex flex-col justify-center items-center"  style={{ marginTop: '3%' }}>
                        <div className=''>
                            <img src={resetPasswordImg} alt="" className='m-auto'/>
                            <h3 className='text-[2rem] my-5 font-medium'>Reset Your Password</h3>
                        </div>
                        {/* <div>
                            Reset Your Password
                        </div> */}
                </div>
                <div className="justify-content-md-center" style={{ marginTop: '3%' }}>
                    <div>
                        <Label>New Password</Label>
                        <Input
                            name='password'
                            type='password'
                            value={form.password}
                            onChange={handleChange}
                        />
                        { errors?.password && (
                            <ErrorMsg>{errors.password}</ErrorMsg>
                        )}
                    </div>
                </div>
                <div className="justify-content-md-center" style={{ marginTop: '3%' }}>
                    <div>
                        <Label>Repeat Password</Label>
                        <Input
                            name='passwordRepeated'
                            type='password'
                            value={form.passwordRepeated}
                            onChange={handleChange}
                        />
                        { errors?.passwordRepeated && (
                            <ErrorMsg>{errors.passwordRepeated}</ErrorMsg>
                        )}
                    </div>
                </div>
                <div className="justify-content-md-center" style={{ marginTop: '3%' }}>
                    {
                        isLoading ?
                            <Loader /> 
                            :
                            <Button onClick={handleResetPassword}>Reset Password</Button>
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
    );
};
