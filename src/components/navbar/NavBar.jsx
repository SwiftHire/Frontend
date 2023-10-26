import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PageNavLinks, Accounts } from './';
import { GrClose } from 'react-icons/gr';
import { BiMenu } from 'react-icons/bi';
import logo from '../../assets/svg/Logo.svg';

const NavBar = () => {
    const [navOpen, setNavOpen] = useState(false);

    function navClose() {
        setNavOpen(false);
    }
    return (
        <>
            <div className="h-[5rem] bg-body fixed top-0 w-full z-[100] border-b">
                <div className="h-full flex items-center justify-between h-full container mx-auto px-5 md:px-7">
                    <Link to="/">
                        <img src={logo} alt="sda church logo" />
                    </Link>
                    <div className="hidden lg:inline-block">
                        <PageNavLinks />
                    </div>
                    <div
                        className={`lg:hidden ${
                            !navOpen && 'hidden'
                        } bg-gradient-to-br from-purple-100 to-blue-300 absolute w-full min-h-screen text-center top-0 left-0 flex flex-col justify-center items-center z-[10] transition-all duration-800 ease-in`}
                    >
                        <Accounts/>
                        <PageNavLinks navClose={navClose} />
                        <span
                            className="mt-8 cursor-pointer text-yellow shadow-lg shadow-yellow px-1 
                            py-1 rounded-full hover:translate-y-2"
                            onClick={() => setNavOpen(false)}
                        >
                            <GrClose />
                        </span>
                    </div>
                    <div className="hidden lg:block"><Accounts/></div>
                    <span onClick={() => setNavOpen(!navOpen)} className="lg:hidden">
                        <BiMenu className="h-[2.5rem] w-[2.5rem]" />
                    </span>
                </div>
            </div>
        </>
    );
};

export default NavBar;
