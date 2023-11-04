import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { Button } from '../../../components/button';

const Register = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigateTo = useNavigate()

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    if (selectedOption === 'applicant') {
    //   window.location.href = '/register/applicant';
      navigateTo('/register/applicant')
    } else if (selectedOption === 'employer') {
    //   window.location.href = '/register/employer';
      navigateTo('/register/employer')
    }
  };

  return (
    <div className='h-screen grid place-items-center font-Montserrat'>
      <div className='border  w-6/12'>
        <div className='py-10'>
          <h2 className='text-center mb-10'>Join as an Applicant or an Employer</h2>
          <div className='w-full flex gap-5 px-5'>
            <div
              className={`h-48 w-1/2 border border-primary flex justify-center items-center relative ${
                selectedOption === 'applicant' ? 'bg-[#e3e3e3] text-primary cursor-pointer' : ''
              }`}
              onClick={() => handleOptionClick('applicant')}
            >
              <input
                type="radio"
                name='applicant'
                className='absolute top-10 right-10 h-[1rem] accent-primary outline-0 rounded-[10px] border border-primary'
                checked={selectedOption === 'applicant'}
                readOnly
              />
              <h3 className='text-[1.5rem]'>I Need A Job</h3>
            </div>
            <div
              className={`h-48 w-1/2 border border-primary flex justify-center items-center relative ${
                selectedOption === 'employer' ? 'bg-[#e3e3e3] text-primary cursor-pointer' : ''
              }`}
              onClick={() => handleOptionClick('employer')}
            >
              <input
                type="radio"
                name='employer'
                className='absolute top-10 right-10 h-[1rem] accent-primary outline-0 rounded-[10px] border border-primary'
                checked={selectedOption === 'employer'}
                readOnly
              />
              <h3 className='text-[1.5rem]'>I am An Employee</h3>
            </div>
          </div>
          <div className='px-5 mt-10'>
            <Button
              onClick={handleSubmit}
              disabled={!selectedOption}
            >
              {selectedOption === 'applicant' 
              ? 'Register as an Applicant' 
              : selectedOption === 'employer' 
              ? 'Register as an employer': 'Register'}
            </Button>
          </div>
        </div>
        <p className='text-center pt-5'>Already have an account yet?  
            <span onClick={()=> navigateTo('/login')} className='text-primary cursor-pointer'> Sign in</span> <br />
            <span onClick={()=> navigateTo('/forgot-password')} 
            className='text-center text-red-500 cursor-pointer border-b'>forgot password?  
        </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
