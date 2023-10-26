import React from 'react';
import { NavLink } from 'react-router-dom';
import { PageNavLinks } from '../navbar';
import { Social } from './Social';
const footerLinks = [
    {
        name: 'Terms of Use',
        url: '/terms-of-service',
    },
    {
        name: 'Privacy policy',
        url: '/privacy-policy',
    },
];

const Footer = () => {
    return (
        <div className=''>
            <div className='h-[6.5rem] flex justify-between items-center gap-5 border-b'>
                <div className='hidden lg:block'><PageNavLinks/></div>
                <Social/>
            </div>
            <div className='h-[6.5rem] flex justify-between items-center text-center'>
                <span>SwiftHire ©2023</span>
                <ul className="flex items-center flex-row gap-4 font-secondary font-light text-primary text-xsm md:text-sm">
                    {footerLinks.map((item) => (
                        <NavLink key={item.name} to={item.url} 
                            className={({ isActive })=>isActive ? 'text-primary' : 'text-darkText'}>
                            <li>
                                {item.name}
                            </li>
                        </NavLink>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Footer;