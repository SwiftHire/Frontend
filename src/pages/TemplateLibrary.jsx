import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { TYPES } from '../utils/constants';
import useResumeContext from '../contexts/resumeContext';
import { useUserPlanContext } from '../contexts/UserPlansContext';
import resume0 from '../assets/png/resume-0.png';
import resume1 from '../assets/png/resume-1.png';
import resume2 from '../assets/png/resume-2.png';
import resume3 from '../assets/png/resume-3.png';
import resume4 from '../assets/png/resume-4.png';
import resume5 from '../assets/png/resume-5.png';
import resume6 from '../assets/png/resume-6.png';
import resume7 from '../assets/png/resume-7.png';
import resume8 from '../assets/png/resume-8.png';
import { useContext } from 'react';
import { templateContext } from '../contexts/templateContext';
import { BsCheckLg } from 'react-icons/bs';
import { AiOutlineFileDone } from 'react-icons/ai';
import { CgArrowLongRight } from 'react-icons/cg';
// import '@tailwindcss/forms';

import PlanStatusModal from '../components/modals/PlanStatusModal';

export default function TemplateLibrary() {
    const [activeTemplate, setActiveTemplate] = useState(null);
    const [isSelected, setIsSelected] = useState(false);
    const { template, selectTemplate } = useContext(templateContext);
    const { fetchResumes, loading } = useResumeContext();
    const { updateUserPlans, userPlans } = useUserPlanContext();
    
    const [openStatusModal, setOpenStatusModal] = useState(false);

    const navigateTo = useNavigate();

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
    

    const templateImages = [
        {
            id:0,
            image:resume0
        },
        {
            id:1,
            image:resume1
        },
        {
            id:2,
            image:resume2
        },
        {
            id:3,
            image:resume3
        }
    ]

    const handleRedirectCustom = ()=>{
        fetchResumes(TYPES.RESUME.LINKEDIN);
        if(!loading){
            navigateTo(`/resumai/craft-template?type=${TYPES.RESUME.LINKEDIN}`);
        }
    };
    const selectedTemplate = (template) =>{
        const selected = templateImages.find((temp)=> temp?.id === template?.id)
        setActiveTemplate(selected)
    }

    const handleIsSelected = () =>{
        selectTemplate(activeTemplate.id);
        setIsSelected(true);
    }
    const handleUnSelected = () =>{
        selectTemplate(null);
        setActiveTemplate(null)
        setIsSelected(false);
    }

    const handlePlanCheck = () => {
        if (activePlan.toLowerCase() === 'basic' || activePlan.toLowerCase() === 'pro') {
          handleRedirectCustom();
        } else {
            setOpenStatusModal(true);
        }
      };



    return (

        <div className=''>
            <div className=' text-center pt-10'>
                <h4 className=' text-xsm text-primary font-medium font-family drop-shadow-lg shadow-black'>RESUME LIBRARY</h4>
                <h1 className=' text-lg font-bold font-family'>Select a template</h1>
            </div>
            <div className=" w-full">
                <div className=' grid grid-cols-4 gap-5 mt-20'>
                    {templateImages.map((temp)=>(
                        <div className=' relative transition-all duration-300' key={temp.id}>
                            <img onClick={()=>selectedTemplate(temp)} className='hover:scale-110 transition-all duration-300' src={temp?.image} alt="" />
                            {/* { template === 1 && <div className=' absolute top-10 right-28 shadow-primary transition-all duration-300 bg-primary w-16 h-16 text-white flex justify-center items-center rounded-full'><BsCheckLg size={35} /></div>} */}
                        </div>
                    ))}
                </div>
                {activeTemplate && 
                <div className='h-screen w-full fixed top-0 left-0 bg-blue-500/60 grid place-items-center'> 
                    <div>
                        <div className=' relative transition-all duration-300'>
                            <img onClick={handleIsSelected} className=' hover:scale-110 transition-all duration-300' src={activeTemplate?.image} alt="" />
                            { template === activeTemplate.id && <div className=' absolute top-10 right-28 shadow-primary transition-all duration-300 bg-primary w-16 h-16 text-white flex justify-center items-center rounded-full'><BsCheckLg size={35} /></div>}
                        </div> 
                        <div className='mt-5'>
                            {/* <button onClick={()=>selectedTemplate(null)} className='bg-primary px-5 py-1 text-body font-normal rounded-full flex items-center gap-3'>select another template</button> */}
                            { !isSelected &&
                            <div className='flex items-cente justify-between'>
                                <button onClick={handleUnSelected} className='bg-body px-5 py-1 text-primary font-normal rounded-full flex items-center gap-3'>select another template</button>
                                <button onClick={handleIsSelected} 
                                className='bg-primary px-5 py-1 text-body font-normal rounded-full flex items-center gap-3'>use this template <AiOutlineFileDone/> </button>
                            </div>
                            }

                            {isSelected && <div className='flex items-cente justify-between'>
                                <button onClick={handleUnSelected} className='bg-body px-5 py-1 text-primary font-normal rounded-full flex items-center gap-3'>select another template</button>
                                <button onClick={handlePlanCheck} className='bg-primary px-5 py-1 text-body font-normal rounded-full flex items-center gap-3'>Continue <CgArrowLongRight/></button>
                            </div> }
                        </div>
                    </div>
                </div>
                }
            </div>
            {openStatusModal && <PlanStatusModal navigateTo={navigateTo} toggleStatusModal={toggleStatusModal}/>}
        </div>
    );
}
