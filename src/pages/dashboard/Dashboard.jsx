import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import SideBar from '../../components/sidebar/SideBar';
import MobileNavBar from '../../components/navbar/mobile/MobileNavBar';

const Dashboard = () => {
    const location = useLocation();
    const currentUrl = location.pathname;
    const isDashboard = currentUrl.includes('/resumai/craft-template/dashboard');
    return (
        <div className='flex'>
            <div className='md:hidden'><MobileNavBar/></div>
            <SideBar/>
            <div className={`${isDashboard && 'lg:ml-[9%]'} lg:ml-[18%] px-5 md:px-0`}>
                <Outlet/>
            </div>
        </div>
    );
};

export default Dashboard;