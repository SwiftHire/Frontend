import React from 'react';
import footerHeroImageLeft from '../../assets/png/resume-image-3.png';
import footerHeroImageRight from '../../assets/png/resume-image-4.png';
import FooterHeroAction from './FooterHeroAction';

const FooterHero = () => {
    return (
        <div className='flex my-10 p-10 bg-[#DCD5FF] rounded-[0.5rem]'>
            <div className='translate-y-[4rem] -translate-x-[3.4rem] hidden lg:block'>
                <img src={footerHeroImageRight} alt="" />
            </div>
            <div className='w-full lg:w-6/12'>
                <FooterHeroAction />
            </div>
            <div className='translate-y-[3rem] translate-x-[3.4rem] hidden lg:block'>
                <img src={footerHeroImageLeft} alt="" />
            </div>
        </div>
    );
};

export default FooterHero;