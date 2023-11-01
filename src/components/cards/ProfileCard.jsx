import React from 'react';
import { BiPencil } from 'react-icons/bi';
import userAvtar from '../../assets/png/user-icon.png';

const ProfileCard = () => {
    const skills = ['tailwind css', 'html', 'css', 'javascript']
  return (
    <div className='bg-white shadow-lg p-5'>
        <div className='flex items-center h-32 relative mb-10'>
            <button className='text-xsm flex gap-3 items-center cursor-pointer absolute top-3 right-10'><span><BiPencil className='text-primary'/></span> Edit Profile </button>
            <div className='h-full w-1/3'>
                <img src={userAvtar} alt="profile picture" className='rounded-full' />
            </div>
            <div className='h-full mt-5 flex flex-col justify-between'>
                <div>
                    <h3 className='font-medium text-sm'>Jon Doe</h3>
                    <h5 className='text-xsm'>Full Stack Developer</h5>
                </div>
                <button className='bg-gray-700 text-white py-1 px-2 rounded-[0.5rem]'>Download Resume</button>
            </div>
            <div></div>
        </div>
        <div className='mt-5'>
            <h3 className='font-medium text-sm border-b'>Experience:</h3>
            {/* <div className='my-3 flex gap-3'>
                {skills && skills.map((skill)=>(
                    <span className='bg-primary rounded-full px-4 py-1 text-xsm text-white'>{skill}</span>
                ))}
            </div> */}
        </div>
        <div className='mt-5'>
            <h3 className='font-medium text-sm border-b'>Education:</h3>
            {/* <div className='my-3 flex gap-3'>
                {skills && skills.map((skill)=>(
                    <span className='bg-primary rounded-full px-4 py-1 text-xsm text-white'>{skill}</span>
                ))}
            </div> */}
        </div>
        <div className='mt-5'>
            <h3 className='font-medium text-sm border-b'>Skills:</h3>
            <div className='my-3 flex gap-3'>
                {skills && skills.map((skill)=>(
                    <span className='bg-primary rounded-full px-4 py-1 text-xsm text-white'>{skill}</span>
                ))}
            </div>
        </div>
    </div>
  )
}

export default ProfileCard