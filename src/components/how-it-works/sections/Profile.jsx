import React from 'react';
import userProfileIcon from '../../../assets/svg/user-profile.svg';

const Profile = () => {
  return (
    <div className='flex items-center flex-col md:flex-row gap-10 mt-10'>
        <div className='w-full px-5 md:px-0 md:w-1/2'>
            <img src={userProfileIcon} alt="" />
        </div>
        <div className='w-full px-5 md:px-0 md:w-1/2'>
            <h3 className='font-bold text-sm md:text-lg text-center text-[#353535] my-5'>Create An Account</h3>
        <p className='text-sm font-normal text-center'>Craft a standout profile that highlights your skills, experience, and achievements. This is your chance to make a strong impression on potential employers.</p>
        </div>
    </div>
  )
}

export default Profile