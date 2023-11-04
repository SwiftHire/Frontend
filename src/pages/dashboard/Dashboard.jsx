import React from 'react';
import { Outlet } from 'react-router-dom';
import { SideBar } from '../../components/sidebar';

const Dashboard = () => {
  return (
    <div className='h-screen flex bg-[#F8F9FA]'>
        <SideBar />
        <div className='md:ml-[19%]  px-5 md:px-0 '>
            <Outlet />
        </div>
    </div>
  )
}

export default Dashboard