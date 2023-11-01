import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../components/sidebar/SideBar';

const Dashboard = () => {
  return (
    <div className='h-screen flex bg-[#F8F9FA]'>
        <SideBar />
        <div className='lg:ml-[4%]  px-5 md:px-0 '>
            <Outlet />
        </div>
    </div>
  )
}

export default Dashboard