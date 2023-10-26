import React from 'react';
import { Link } from 'react-router-dom';

const NavItems = [
    {
        name: 'Features',
        url:'',
        section: 'ai-resume-features'
    },
    {
        name: 'Showcase',
        url:'',
        section: 'showcase'
    },
    {
        name: 'Pricing',
        url:'',
        section: 'pricing'
    },
    {
        name: 'Blog',
        url:'https://blog.majorgen.com',
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
        font-medium text-primary text-sm px-10 md:px-10 lg:ml-[10rem]">
            {NavItems.map((navItem) => (
                <Link key={navItem.name} 
                    to={navItem.url}
                    // className={({ isActive })=>isActive ? 'text-primary' : 'text-darkText'}
                    >
                    <li onClick={()=>{
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
