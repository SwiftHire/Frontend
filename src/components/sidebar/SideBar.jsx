import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { GiFlyingDagger } from 'react-icons/gi';
import { AiFillHome } from 'react-icons/ai';
import { BsPersonWorkspace } from 'react-icons/bs';
import { HiOutlineLogout } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';
import tokenService from '../../services/token.service';

const SideBar = () => {
  const user = tokenService.getUser();
  const navigateTo = useNavigate();

  useEffect(()=>{
    if(!user){
        return navigateTo('/login');
    }
  },[]);

  const handleSignOut = (e) => {
      e.preventDefault();
      tokenService.removeUser();
      navigateTo('/login');
      return;
  };
  const navItems = [
    // {
    //   name:'Home',
    //   url:'Jobs',
    //   icon:<AiFillHome />
    // },
    // {
    //   name:'Jobs',
    //   url:'Jobs',
    //   icon: <BsPersonWorkspace />
    // },
  ]
  return (
    <div className='h-full bg-primary w-2/12 font-Montserrat fixed'>
      <div className='mt-10 px-5'>
        <h3 className='text-white flex items-center gap-3'><span><GiFlyingDagger /></span> SwiftHire</h3>
        <ul className='my-10'>
          {navItems.map((item, index)=>(
            <li 
              key={index}
              className='flex items-center gap-4 my-3 text-[1.2rem] text-white font-medium'>
              <span>{item.icon}</span> {item.name}
            </li>
          ))}
        </ul>
        {/* <h3 className='text-white flex items-center gap-3'><span><AiOutlinePlus /></span> Create New Job</h3> */}
        <button onClick={handleSignOut} className='text-white flex items-center gap-3'><span><HiOutlineLogout /></span> logout</button>
      </div>
    </div>
  )
}

export default SideBar