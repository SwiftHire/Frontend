import React from 'react';
import { useNavigate} from 'react-router-dom';
import tokenService from '../services/token.service';
import { CraftingTypeCards } from '../components/cards';
import { TYPES } from '../utils/constants';
import whiteFileIcon from '../assets/svg/white-file-icon.svg';
import blueFileIcon from '../assets/svg/blue-file-icon.svg';
import arrowRightWhite from '../assets/svg/arrow-right-white.svg';
import arrowRighDefault from '../assets/svg/arrow-right-icon-default.svg';


const CraftingPage = () => {
    const user = tokenService.getUser();
    const navigateTo = useNavigate();

    const handleClick = (type) => () => {
        navigateTo(`/resumai/craft-template?type=${type}`);
    };

    const resumeTemplateUrl = '/resumai/resume-crafting-template';
    return (
        <section className=''>
            <div className='my-10 mt-[7rem] md:mt-0'>
                <h1 className='text-[1.5rem] font-bold'>Start crafting</h1>
                <small className='text-xsm font-normal'>What do you want to create ?</small>
            </div>
            <div className='flex flex-col md:flex-row gap-3'>
                <CraftingTypeCards 
                    onClick={()=>navigateTo(resumeTemplateUrl)}
                    type='resume' title = 'Resume' 
                    content='Craft resume'
                    leftImage={blueFileIcon}
                    rightImage={arrowRightWhite}
                    height={8}
                />
                {/* <CraftingTypeCards 
                    onClick={handleClick(TYPES.COVER_LETTER)} 
                    title = 'Cover' 
                    content='Craft cover-letter'  
                    leftImage={whiteFileIcon}
                    rightImage={arrowRighDefault}
                    height={8}
                /> */}
            </div>
        </section>
    );
};

export default CraftingPage;