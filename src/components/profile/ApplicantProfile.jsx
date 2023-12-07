import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import tokenService from '../../services/token.service';
import { useCreateProfile } from '../../hooks/useCreateProfile';
import { useGetOwnProfile } from '../../hooks/useGetOwnProfile';
import { ProfileCard } from '../cards';
import { ApplicantsCardSkeleton } from '../page-skeletons';
import { Button } from '../button'

const ApplicantProfile = () => {
  const [profileInfo, setProfileInfo] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const createProfile = useCreateProfile();
  const getOwnProfile = useGetOwnProfile();

  const user = tokenService.getUser();
  const navigetTo = useNavigate();

  console.log(profileInfo, 'profileInfo')



  async function getUserProfile(){
    try {
      setLoading(true);
      setTimeout(async () => {
        const { status, data } = await getOwnProfile(user.id);
        if (status === 200) {
          setProfileInfo(data);
        }
        setLoading(false);
      }, 2000); 
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  } 

  useEffect(()=>{
    
    getUserProfile();
  },[user.id])


  return (
    <div className='w-7/12 mt-10'>
      {isLoading 
      ? <ApplicantsCardSkeleton />
      : <>
          {profileInfo && profileInfo.length > 0 ? (
          <ProfileCard profileInfo={profileInfo}/>
        ):
          <>
          <div className=''>
            No profile for this user
            {
              user.userType === 'applicant' && (
                <div className='w-6/12'>
                  <Button onClick={()=>navigetTo('/dashboard/create-profile/applicant')}>Create Your Profile</Button>
                </div>
              )
            }
          </div>
          </>
        }
      </>}
      
    </div>
  )
}

export default ApplicantProfile