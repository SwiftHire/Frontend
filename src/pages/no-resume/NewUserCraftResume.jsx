import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';
import { TYPES } from '../../utils/constants';
import useResumeContext from '../../contexts/resumeContext';
import CraftingLinkedin from './CraftingLinkedin';
import CraftingUpload from './CraftingUpload';
import { CraftingTypeCards } from '../../components/cards';
import { BackLinks } from '../../components/backlink/BackLinks';

import dashBoard from '../../assets/png/dashboard-icon.png';
import blueFileIcon from '../../assets/svg/blue-file-icon.svg';
import whiteFileIcon from '../../assets/svg/white-file-icon.svg';
import arrowRighDefault from '../../assets/svg/arrow-right-icon-default.svg';
import linkedinIcon from '../../assets/svg/linkedin-card-icon.svg';
import fileIcon from '../../assets/svg/file-card-icon.svg';

const type = {
    default: 'home',
    resume: ['Custom', 'LinkedIn', 'File Upload'],
    coverLetter: 'Generate',
};

const NewUserCraftResume = () => {
    const [activeStep, setActiveStep] = useState('home');
    const { fetchResumes, loading } = useResumeContext();
    const navigate = useNavigate();
    function getActiveStep(step) {
        setActiveStep(step);
    }

    const handleRedirectCustom = ()=>{
        fetchResumes(TYPES.RESUME.CUSTOM_RESUME);
        if(!loading){
            navigate(`/resumai/craft-template?type=${TYPES.RESUME.CUSTOM_RESUME}`);
        }
    };

    function activePage() {
        switch (activeStep) {
            case type.default:
                return <>
                    <div className='mt-5 flex items-center flex-col gap-5'>
                        <h1 className='text-[1.5rem] lg:text-lg font-bold text-body capitalize'>Choose <br />crafting type</h1>
                        <CraftingTypeCards 
                            onClick={() => getActiveStep(type.resume)}
                            type='resume' 
                            content='Craft resume'
                            leftImage={blueFileIcon}
                            rightImage={arrowRighDefault}
                            height={4}
                        />
                        <CraftingTypeCards 
                            onClick={() => getActiveStep(type.coverLetter)}
                            content='Craft cover-letter'  
                            leftImage={whiteFileIcon}
                            rightImage={arrowRighDefault}
                            height={4}
                        />
                    </div>
                </>;
            case type.resume:
                return <>
                    <div className='mt-5 flex items-center flex-col gap-5'>
                        <h1 className='text-[1.5rem] lg:text-lg font-bold text-body capitalize'>Choose <br />prefered Method</h1>
                        <CraftingTypeCards 
                            onClick={handleRedirectCustom}
                            content='Craft from scratch'
                            leftImage={blueFileIcon}
                            rightImage={arrowRighDefault}
                            height={4}
                        />
                        <CraftingTypeCards 
                            onClick={() => getActiveStep(type.resume[1])}
                            content='Craft from linkedin'  
                            leftImage={linkedinIcon}
                            rightImage={arrowRighDefault}
                            height={4}
                        />
                        <CraftingTypeCards 
                            onClick={() => getActiveStep(type.resume[2])}
                            content='upload a file'  
                            leftImage={fileIcon}
                            rightImage={arrowRighDefault}
                            height={4}
                        />
                        <span className='absolute top-0 right-10'>
                            <BackLinks onClick={() => getActiveStep(type.default)}><BsArrowLeft/>Back </BackLinks>
                        </span>
                    </div>
                </>;
            case type.resume[1]:
                return <>
                    <CraftingLinkedin/>
                    <span className='absolute top-0 right-10'>
                        <BackLinks onClick={() => getActiveStep(type.resume)}><BsArrowLeft/>Back </BackLinks>
                    </span>
                </>;
            case type.resume[2]:
                return <>
                    <CraftingUpload/>
                    <span className='absolute top-0 right-10'>
                        <BackLinks onClick={() => getActiveStep(type.resume)}><BsArrowLeft/>Back </BackLinks>
                    </span>
                </>;
            case type.coverLetter:
                return <>
                    <div className='mt-5 flex items-center flex-col gap-5'>
                        <CraftingTypeCards 
                            onClick={handleRedirectCustom}
                            content='visit dashboard'  
                            leftImage={dashBoard}
                            rightImage={arrowRighDefault}
                            height={4}
                        />
                        <span className='absolute -top-10 right-[30%]'>
                            <BackLinks onClick={() => getActiveStep(type.resume)}><BsArrowLeft/>Back </BackLinks>
                        </span>
                    </div>
                </>;
            default:
                return null;
        }
    }

    return (
        <div className='h-screen w-full left-0 top-0 right-0 grid grid-cols-1 
    place-items-center bg-gray-700/90 px-10 py-5 absolute z-[1100]'>
            <div className='w-8/12 relative'>
                <div>{activePage()}</div>
            </div>
        </div>
    );
};

export default NewUserCraftResume;
