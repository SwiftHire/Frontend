import React, { useState, useEffect, useContext } from 'react';
import { Link , useNavigate, useLocation  } from 'react-router-dom';
import { MdLogout } from 'react-icons/md'; 
import { FaUser, FaRegUser } from 'react-icons/fa';
import { AiFillDashboard } from 'react-icons/ai';
import { SiBookstack } from 'react-icons/si';
import { BsChatDotsFill, BsPlusCircleFill } from 'react-icons/bs';
import { FaGraduationCap } from 'react-icons/fa';
import dashboardIcon from '../../assets/svg/dashboard.svg';
import dashboardIconActive from '../../assets/svg/dashboard-active.svg';
import logo from '../../assets/svg/Logo.svg';
import plusIconWhite from '../../assets/svg/plus-icon-white.svg';
import resumeIcon from '../../assets/svg/resume-icon.svg';
import resumeIconActive from '../../assets/svg/resume-icon-active.svg';
import { UserContext } from '../../contexts/UserContext';
import tokenService from '../../services/token.service';
// import NewUserCraftResume from '../../pages/no-resume/NewUserCraftResume';

const SideBar = () => {
    const [activeLink, setActiveLink] = useState(1);
    const navigateTo = useNavigate();
    const { setUserContext } = useContext(UserContext);

    const location = useLocation();
    const currentUrl = location.pathname;
    const isDashboard = currentUrl.includes('/resumai/craft-template/dashboard')


    const handleSignOut = (e) => {
        e.preventDefault();
        tokenService.removeUser();
        setUserContext({});
        navigateTo('/');
        return;
    };

    const sideBarNavLinks = [

        {   
            id:1,
            name:'Create new resume',
            image: <img src={plusIconWhite} alt="" />,
            imageActive: <img src={plusIconWhite} alt="" />,
            url:'resumai/start-crafting'
        },
        {   
            id:2,
            name:'Dashboard',
            image: <img src={dashboardIcon} alt="" />,
            imageActive: <img src={dashboardIconActive} alt="" />,
            url:'resumai/start-crafting'
        },
        {   
            id:4,
            name:'Template Library',
            image: <img src={resumeIcon} alt="" />,
            imageActive: <img src={resumeIconActive} alt="" />,
            url:'resumai/templates'
        },
        {   
            id:5,
            name:'Resumes',
            image: <img src={resumeIcon} alt="" />,
            imageActive: <img src={resumeIconActive} alt="" />,
            url:'resumes'
        },
        {   
            id:6,
            name:'Chat Bot',
            image: <img src={resumeIcon} alt="" />,
            imageActive: <img src={resumeIconActive} alt="" />,
            url:'chat'
        },
        {   
            id:3,
            name:'Profile',
            image: <FaRegUser/>,
            imageActive: <FaUser/>,
            url:'resumai/profile'
        },
    ];

    const dashBoardNavLinks = [
        {
            id:1,
            image:<BsPlusCircleFill className='h-[1.5rem] w-[1.5rem] text-primary'/>,
            url:'resumai/start-crafting'
        },
        {
            id:2,
            image:<AiFillDashboard className='h-[1.5rem] w-[1.5rem] text-primary'/>,
            url:'resumai/start-crafting'
        },
        {
            id:3,
            image:<FaRegUser className='h-[1.5rem] w-[1.5rem] text-primary'/>,
            url:'resumai/profile'
        },
        {
            id:4,
            image:<SiBookstack className='h-[1.5rem] w-[1.5rem] text-primary'/>,
            url:'resumai/templates'
        },
        {
            id:5,
            image:<FaGraduationCap className='h-[1.5rem] w-[1.5rem] text-primary'/>,
            url:'resumes'
        },
        {
            id:6,
            image:<BsChatDotsFill className='h-[1.5rem] w-[1.5rem] text-primary'/>,
            url:'chat'
        },
    ]

    return (
        <>
            <div className={`${isDashboard ? 'hidden md:block h-[100vh] w-1/12 fixed border-r bg-[#F8F9FA]' : 'hidden md:block h-[100vh] w-2/12 fixed border-r bg-[#F8F9FA]'} `}>
                <div className='w-10/12 m-auto mt-10'>
                    <Link to='/'>
                        <div className='flex gap-2 items-center'>
                            <img src={logo} alt="" />
                            <span>SwiftHire</span>
                        </div>
                    </Link>
                    <div className={`${isDashboard && 'hidden'} mt-10`}>
                        {sideBarNavLinks.map((link, index) => {
                            const active = activeLink === link.id;
                            const isFirst = index === 0;
                            const bg = isFirst ? 'bg-primary text-white' : active ? 'bg-[#ECEFF1] text-[#17141B]' : 'text-black';
                            return (
                                <Link to={link.url} key={index}>
                                    <div className={`${bg} flex items-center gap-3 w-[90%] mt-2 py-4 px-3 text-[0.9rem] font-bold rounded-[0.3rem]`} onClick={() => setActiveLink(link.id)}>
                                        {active ? link.imageActive : link.image}
                                        <span>{link.name}</span>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                    {isDashboard && (
                        <div className='mt-10'>
                            {dashBoardNavLinks.map((link, index) => {
                            const active = activeLink === link.id;
                            const bg = active ? 'bg-[#ECEFF1] text-[#17141B]' : 'text-black';
                            return (
                                <Link to={link.url} key={index}>
                                    <div className={`${bg}  flex items-center justify-center gap-3 w-[70%] mt-2 py-4 px-3 text-[0.9rem] font-bold rounded-full`} onClick={() => setActiveLink(link.id)}>
                                        {link.image}
                                        {/* <span>{link.name}</span> */}
                                    </div>
                                </Link>
                            );
                        })}
                        </div>
                    )}
                    <div className={`${isDashboard && 'hidden'} w-full flex flex-col items-center gap-2`}>
                    </div>
                    <div className='flex gap-2 items-center font-medium text-sm mt-[30%]'>
                        <span><MdLogout/></span>
                        <span className='cursor-pointer' onClick={handleSignOut}>Logout</span>
                    </div>
                </div>
            </div>
            {/* {!loadingResume && resumes?.length === 0 ? <NewUserCraftResume /> : null} */}
        </>
    );
};

export default SideBar;