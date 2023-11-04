import React, { useState } from 'react';
import { Register, Profile, GetHired } from './sections';

const HowItWorks = () => {
    const userSteps = ['Register', 'Complete Profile', 'Get Hired'];
    const [selectedStep, setSelectedStep] = useState(userSteps[0]);

    const handleSelectStep = (step) => {
        setSelectedStep(step);
    }

    const RenderHowItWorks = () => {
        switch(selectedStep){
            case 'Register':
                return <Register />
            case 'Complete Profile':
                return <Profile />
            case 'Get Hired':
                return <GetHired />
            default:
                return null
        }
    }

    return (
        <div className='font-Montserrat'>
            <div className='flex items-center justify-center'>
                {userSteps.map((step, index)=>(
                    <button 
                        key={index}
                        onClick={() => handleSelectStep(step)}
                        className={`border text-primary font-medium text-sm py-2 px-5 ${selectedStep === step && 'bg-primary text-white' }`}
                    >{step}</button>
                ))}
            </div>
            <>
                { RenderHowItWorks() }
            </>
        </div>
    )
}

export default HowItWorks
