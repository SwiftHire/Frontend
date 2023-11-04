import React from 'react';
import { Link } from 'react-router-dom';

const NavItems = [
    {
        name: 'Post Jobs',
        url:'',
        section: 'ai-resume-features'
    },
    {
        name: 'Search Jobs',
        url:'',
        section: 'showcase'
    },
    {
        name: 'Contact Us',
        url:'',
        section: 'pricing'
    },

];

const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
};

const PageLinks = ({ navClose }) => {
    return (
        <ul className="flex flex-col items-center lg:flex-row gap-4 font-secondary 
        font-medium text-primary text-sm  font-Montserrat 
        ">
            {NavItems.map((navItem) => (
                <Link key={navItem.name} 
                    to={navItem.url}
                    >
                    <li 
                    className='hover:text-darkText hover:border-b hover:border-darkText transition-all duration-300'
                    onClick={()=>{
                        scrollToSection(navItem.section);
                        if (navClose) {
                            navClose();
                        }
                    }}>
                        {navItem.name}
                    </li>
                </Link>
            ))}
        </ul>
    );
};

export default PageLinks;
