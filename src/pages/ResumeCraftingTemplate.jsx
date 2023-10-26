import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TYPES } from '../utils/constants';
import { CraftingTypeCards } from '../components/cards';
import useResumeContext from '../contexts/resumeContext';
import { useUserPlanContext } from '../contexts/UserPlansContext';

import blueFileIcon from '../assets/svg/blue-file-icon.svg';
import arrowRightWhite from '../assets/svg/arrow-right-white.svg';
import arrowRighDefault from '../assets/svg/arrow-right-icon-default.svg';
import linkedinIcon from '../assets/svg/linkedin-card-icon.svg';
import fileIcon from '../assets/svg/file-card-icon.svg';

import PlanStatusModal from '../components/modals/PlanStatusModal';

const ResumeCraftingTemplate = () => {
    const navigate = useNavigate();
    const { fetchResumes, loading } = useResumeContext();

    const { updateUserPlans, userPlans } = useUserPlanContext();
    const [openStatusModal, setOpenStatusModal] = useState(false);

   

    useEffect(()=>{
        updateUserPlans();
    },[userPlans]);

    function setActivePlan(userPlans) {
        let hasProPlan = false;
        let hasBasicPlan = false;
      
        for (const plan of userPlans) {
          if (plan.planName === 'Basic On Demand') {
            hasProPlan = true;
            break;
          } else if (plan.planName === 'Basic') {
            hasBasicPlan = true;
          }
        }
      
        if (hasProPlan) {
          return 'Basic On Demand';
        } else if (hasBasicPlan) {
          return 'Basic';
        } else {
          return 'Free';
        }
      }
      
      const activePlan = setActivePlan(userPlans); // Output: Basic On Demand, Basic, or Free based on the conditions

    function toggleStatusModal(){
        setOpenStatusModal(!openStatusModal);
      }

    const handleRedirectCustom = ()=>{
        //navigate(`/resumai/craft-template?type=${TYPES.RESUME.CUSTOM_RESUME}`);
        if (activePlan === 'Basic' || activePlan === 'Basic On Demand') {
            fetchResumes(TYPES.RESUME.CUSTOM_RESUME);
            if(!loading){
                navigate(`/resumai/craft-template?type=${TYPES.RESUME.CUSTOM_RESUME}`);
            }
          }else{
            setOpenStatusModal(true);
          }
    };
    const handleRedirectLinkedin = ()=>{
        navigate(`/resumai/craft-template?type=${TYPES.RESUME.LINKEDIN}`);
    };
    const handleRedirectFileUpload = ()=>{
        navigate(`/resumai/craft-template-page?type=${TYPES.RESUME.FILE_UPLOAD}`);
    };
    return (
      <div className='flex flex-col items-center mt-[6rem] md:mt-[10rem] w-full justify-center'>
          <h1 className='text-[2rem] lg:text-xl font-bold text-center'>Craft your resume</h1>
          <p className='font-light text-sm text-center'>Customise your resume to the job you're applying for.   
              <br className='hidden md:block' /> 
              Use keywords from the job description to highlight your relevant experience and skills.</p>
          <div className='flex flex-col md:flex-row gap-5 mt-10 justify-center'>
              <CraftingTypeCards onClick={handleRedirectFileUpload} type='File' 
                  title = 'Resume' content='Upload a Resumee'  leftImage={blueFileIcon} rightImage={arrowRightWhite} style={{visibility: 'hidden'}}/>
                <CraftingTypeCards onClick={handleRedirectLinkedin}  title = 'LinkedIn' 
                    content='Upload from LinkedIn'  leftImage={linkedinIcon} rightImage={arrowRighDefault}/>
              <CraftingTypeCards onClick={handleRedirectFileUpload}  title = 'File' 
                  content='Upload a Resume'  leftImage={fileIcon} rightImage={arrowRighDefault} style={{visibility: 'hidden'}}/>
          </div>
          {openStatusModal && <PlanStatusModal navigateTo={navigate} toggleStatusModal={toggleStatusModal}/>}
      </div>
    );
    
};

export default ResumeCraftingTemplate;