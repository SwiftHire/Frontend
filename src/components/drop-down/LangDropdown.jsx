import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUserPlanContext } from '../../contexts/UserPlansContext';
import france from "../../assets/png/france.png";
import us from "../../assets/png/united.png";
import { languageOptions } from '../../utils/languageOptions';

function LangDropdown() {

    const [openLangMenu, setOpenLangMenu] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(languageOptions[0]);
    const { userPlans } = useUserPlanContext();
    const showLangMenu = () => {
        setOpenLangMenu(!openLangMenu)
    }

    const handleSelectedCountry = (country) =>{
        const selected = languageOptions.find((option) => option.value === country);
        setSelectedCountry(selected);
        console.log(selected, 'selected')
    }

    const navigateTo = useNavigate();

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
    const resumeTemplateUrl = '/resumai/on-demand-plans';

    const planStatus = () =>{
        if(activePlan.toLowerCase()==='free'){
            navigateTo(resumeTemplateUrl)
        }
    };

  return (
    <div>
        <button onClick={showLangMenu} className=' bg-white border border-gray-300 flex gap-32 text-black justify-between items-center rounded-xl py-3 px-4 text-[15px]'>
            <span className=' flex items-center gap-6'>
                <span>
                    <img className=' w-5 h-5' src={selectedCountry?.flag} alt="" />
                </span>
                <p class=" hover:bg-gray-100 text-gray-700">{selectedCountry.value}</p>
            </span>
            <span>
                <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.41706 0.999687L4.00372 3.58635L6.59039 0.999687C6.85039 0.739688 7.27039 0.739688 7.53039 0.999687C7.79039 1.25969 7.79039 1.67969 7.53039 1.93969L4.47039 4.99969C4.21039 5.25969 3.79039 5.25969 3.53039 4.99969L0.470391 1.93969C0.210391 1.67969 0.210391 1.25969 0.470391 0.999687C0.730391 0.746354 1.15706 0.739688 1.41706 0.999687Z" fill="#3F3F46" />
                </svg>
            </span>
        </button>
        <div class={" absolute w-64 bg-white rounded-xl text-base z-50 list-none divide-y divide-gray-100 shadow my-4 transition-all duration-300" + (openLangMenu ? " block" : " hidden")} id="dropdown">
            <ul class="py-1" aria-labelledby="dropdown">
                {/* <li className=' flex items-center gap-6 px-4 py-2'>
                    <span>
                        <img className=' w-5 h-5' src={us} alt="" />
                    </span>
                    <p class="text-sm hover:bg-gray-100 text-gray-700">English</p>
                </li> */}
                {languageOptions.map((option)=>(
                    <li className=' flex border-b border-b-gray-100 
                    items-center gap-6 px-4 py-2 cursor-pointer' 
                    key={option.label} onClick={()=>{
                        planStatus();
                        handleSelectedCountry(option.value);
                        showLangMenu();
                    }}>
                        <span>
                            <img className=' w-5 h-5' src={option?.flag} alt="" />
                        </span>
                        <p class="text-sm hover:bg-gray-100 text-gray-700">{option.value}</p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
  )
}

export default LangDropdown