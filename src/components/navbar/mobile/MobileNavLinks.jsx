import React from 'react';
import { Link } from 'react-router-dom';

const MobileNavLinks = ({ navClose }) => {
    const sideBarNavLinks = [

        {   
            id:1,
            name:'Create new resume',
            url:'resumai/start-crafting'
        },
        {   
            id:2,
            name:'Dashboard',
            url:'resumai/start-crafting'
        },
        {   
            id:3,
            name:'Profile',
            url:'resumai/profile'
        },
        {   
            id:4,
            name:'Template Library',
            url:'templates'
        },
        {   
            id:5,
            name:'Resumes',
            url:'resumes'
        },
    ];
  return (
    <ul className="flex flex-col lg:flex-row gap-5 font-secondary 
        font-medium text-primary text-sm px-10 md:px-10 lg:ml-[10rem]">
            {sideBarNavLinks.map((navItem) => (
                <Link key={navItem.name} 
                    to={navItem.url}
                    // className={({ isActive })=>isActive ? 'text-primary' : 'text-darkText'}
                    >
                    <li onClick={navClose}>
                        {navItem.name}
                    </li>
                </Link>
            ))}
        </ul>
  )
}

export default MobileNavLinks