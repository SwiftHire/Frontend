import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
    <div className='h-screen grid place-items-center'>
      <div className='border w-6/12'>
        <div className='py-10'>
          <h2 className='text-center mb-10'>Join as an Applicant or an Employer</h2>
          <div className='w-full flex gap-5 px-5'>
            <div
              className={`h-48 w-1/2 border flex justify-center items-center relative ${
                selectedOption === 'applicant' ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleOptionClick('applicant')}
            >
              <input
                type="radio"
                name='applicant'
                className='absolute top-10 right-10'
                checked={selectedOption === 'applicant'}
                readOnly
              />
              <h3>I Need A Job</h3>
            </div>
            <div
              className={`h-48 w-1/2 border flex justify-center items-center relative ${
                selectedOption === 'employer' ? 'bg-gray-200' : ''
              }`}
              onClick={() => handleOptionClick('employer')}
            >
              <input
                type="radio"
                name='employer'
                className='absolute top-10 right-10'
                checked={selectedOption === 'employer'}
                readOnly
              />
              <h3>I Need An Employee</h3>
            </div>
          </div>
          <div className='px-5 mt-10'>
            <button
              className='bg-primary w-full rounded-[0.5rem] text-white py-2'
              onClick={handleSubmit}
              disabled={!selectedOption}
            >
              {selectedOption === 'applicant' 
              ? 'Register as an Applicant' 
              : selectedOption === 'employer' 
              ? 'Register as an employer': 'Register'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
