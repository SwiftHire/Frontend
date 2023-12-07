import React from 'react';
import { toast } from 'react-toastify';
import { BiPencil } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import tokenService from '../../services/token.service';
import userAvtar from '../../assets/png/user-icon.png';

const ProfileCard = ({ profileInfo }) => {
    const user = tokenService.getUser()
    const navigateTo = useNavigate();

    const navigateToProfileUpdate = () => {
        navigateTo('/dashboard/update-profile/applicant', { state: { profileInfo } });
      };

    const handleVisitResumeURL = ()=>{
        const resumeUrl = profileInfo[0]?.resume;
        if(!resumeUrl){
            toast.error('This user has not added a resume yet');
            return;
        }
        if (resumeUrl) {
            window.open(resumeUrl, '_blank');
        }
    }

  return (
    <section className='w-[75vw] flex gap-5'>
            <div className='w-5/12 bg-white shadow-lg p-5'>
                <div className='flex items-center h-32 relative mb-10'>
                {
                    user.userType === 'applicant' && (
                        <button 
                            onClick={navigateToProfileUpdate}
                            className='text-xsm flex gap-3 items-center cursor-pointer absolute top-0 right-5'>
                            <span><BiPencil className='text-primary'/></span> Edit Profile 
                        </button>
                    )
                }
                <div className='h-full w-1/3'>
                    <img src={userAvtar} alt="profile picture" className='rounded-full' />
                </div>
                <div className='h-full mt-10 flex flex-col justify-between'>
                    <div>
                        <h3 className='font-medium text-sm'>{profileInfo && profileInfo[0]?.fullName}</h3>
                        <h5 className='text-xsm'>{profileInfo && profileInfo[0]?.professionalTitle}</h5>
                    </div>
                    {/* {
                        user.userType === 'employer' && (
                        <button 
                            onClick={handleVisitResumeURL}
                        className='bg-primary text-white py-1 px-2 rounded-[0.5rem] shadow-lg'>View Applicant's Resume</button>
                        )
                    } */}
                    
                </div>
                <div></div>
            </div>
            <div className='mt-5'>
                {profileInfo && profileInfo[0]?.experience?.length > 0 && (
                    <>
                        <h3 className='font-medium text-xsm border-b uppercase'>Experience</h3>
                        <div className='my-3 flex gap-3'>
                            {profileInfo && profileInfo[0]?.experience.map((experience)=>(
                                <h3 key={experience._id} className='text-xsm'>{experience?.title} | {experience?.company} | {experience?.years}</h3>
                            ))}
                        </div>
                    </>
                )}
                
            </div>
            <div className='mt-5'>
                {profileInfo && profileInfo[0]?.education?.length > 0 && (
                    <>
                        <h3 className='font-medium text-xsm border-b uppercase'>Education</h3>
                        <div className='my-3 flex gap-3'>
                            {profileInfo && profileInfo[0]?.education.map((education)=>(
                                <h3 key={education._id} className='text-xsm'>{education?.degree} | {education?.institution} | {education?.year}</h3>
                            ))}
                        </div>
                    </>
                )}
                
            </div>
            <div className='mt-5'>
                {
                    profileInfo && profileInfo[0]?.skills?.length > 0 && (
                        <>
                            <h3 className='font-medium text-xsm border-b uppercase'>Skills</h3>
                            <div className='my-3 flex gap-3'>
                                {profileInfo && profileInfo[0]?.skills.map((skill, index)=>(
                                    <span key={index} className='bg-primary rounded-full px-4 py-1 text-xsm text-white'>{skill}</span>
                                ))}
                            </div>
                        </>
                    )
                }
                
            </div>
        </div>
        <div className='w-7/12 relative'>
            <embed src={profileInfo && profileInfo[0]?.resume} type="application/pdf" width="100%" height="600px" />
            <div className='bg-body absolute top-0 left-0 w-full h-[3.7rem]'></div>
        </div>
    </section>
  )
}

export default ProfileCard