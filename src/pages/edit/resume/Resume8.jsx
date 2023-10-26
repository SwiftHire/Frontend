import React, { forwardRef } from 'react';
import { BsFillPhoneFill } from 'react-icons/bs';
import { AiOutlineMail, AiFillLinkedin } from 'react-icons/ai';
import { TfiWorld, TfiLocationPin } from 'react-icons/tfi';
import { RxLinkedinLogo } from 'react-icons/rx';
import userIcon from '../../../assets/png/user-icon.png';

import { dateFomatted } from '../../../utils/dateFomatted';

const Resume8 = forwardRef(({ data }) => {
  return (
    <div className='bg-white rounded-[10px] shadow-square font-serif p-10'>
      <div className='flex items-center justify-between'>
        <div className='w-8/12'>
          <h2 className='text-lg uppercase'>{data?.name}</h2>
          <h3 className='border-t border-b py-2 text-[1.4rem] uppercase'>{data?.position}</h3>
        </div>
        <div className='rounded-full w-[8rem] h-[8rem] border'>
          {/* <img className='h-full w-full object-fill rounded-full' src={`${ data?.imageUrl ? data?.imageUrl : userIcon}`} alt="" /> */}
          <img className='h-full w-full object-fill rounded-full' src={`${ data?.imageUrl ? data?.imageUrl : userIcon}`} alt="" />
        </div>
      </div>
      <div className='flex mt-10'>
        <div className='w-3/12'>
          <div>
            <h3 className='uppercase tracking-[0.3rem] border-b pb-2 font-normal text-sm'>contact</h3>
            <ul className='my-3'>
              {data?.phone && <li className='flex items-center gap-3'><BsFillPhoneFill/> {data?.phone !== undefined ? data?.phone : ''}</li>}
              {data?.email && <li className='flex items-center gap-3'><AiOutlineMail/> {data?.email !== undefined ? data?.email : ''}</li>}
              {data?.address && <li className='flex items-center gap-3'><TfiLocationPin/> {data?.address !== undefined ? data?.address : ''}</li>}
              {data?.linkedin && <li className='flex items-start gap-3'><RxLinkedinLogo/> {data?.linkedin !== undefined ? data?.linkedin : ''}</li>}
            </ul>
          </div>
          {data?.education?.length > 0 &&
            <div>
                <h3 className='uppercase tracking-[0.3rem] border-b pb-2 font-normal text-sm'>education</h3>
              <div className='my-3'>
                  {data?.education.map((education)=>(
                    <div key={education._id} className='my-2'>
                        <h3 className='font-medium text-sm capitalize'>{education?.degree !== undefined ? education?.degree  : ''}</h3>
                        <h3 className='font-light text-sm capitalize'>{education?.fieldOfStudy !== undefined ? education?.fieldOfStudy : ''}</h3>
                        <h3 className='font-light text-sm capitalize'>{education?.institution !== undefined ? education?.institution : ''}</h3>
                        <h3 className='font-light text-sm capitalize'>{education?.country !== undefined ? education?.country : ''}</h3>
                        <h3 className='font-light text-sm capitalize'>{education?.year !== undefined ? dateFomatted(education?.year) : ''}</h3>
                    </div>
                  ))}
                </div>
            </div>
            }
          {data?.skill?.length > 0 &&
            <div>
                <h3 className='uppercase tracking-[0.3rem] border-b pb-2 font-normal text-sm'>skills</h3>
              <div className='my-3'>
                  {data?.skill.map((skill)=>(
                    <div key={skill} className='my-2'>
                        <h3 className='font-normal text-sm capitalize'>{skill.skill}</h3>
                    </div>
                  ))}
                </div>
            </div>
            }
        </div>
          
        <div className='1/12'>
            <div className='w-[0.11rem] h-full bg-gray-300 border-1 ml-3'></div>
        </div>
        <div className='w-full ml-5'>
          {data?.summary && (
            <div>
            <h3 className='uppercase tracking-[0.3rem] border-b pb-2 font-normal text-sm pb-2'>summary</h3>
            <p className='text-sm'>{data?.summary}</p>
          </div>
        )}
          {data?.workExperience?.length > 0 && (
            <div className='w-full mt-10'>
                <h3 className='uppercase tracking-[0.3rem] border-b pb-2 font-normal text-sm'>experience</h3>
                {data?.workExperience && data?.workExperience?.map((experience, index)=>(
                  <>
                    <div className='flex items-center justify-between' key={experience?._id}>
                        <div>
                            <h3 className='uppercase font-medium text-sm mt-4'>{ experience?.title !== undefined ? experience?.title : '' }</h3>
                            <em className='font-normal text-sm'>
                              {experience.company !== undefined ?  experience?.company + ' ' : ''}
                              {experience?.location !== undefined ? ' , ' + experience?.location : ''} 
                            </em>
                        </div>
                        <div>
                          <p>
                              {experience?.dateStart !== undefined ? experience?.dateStart : ''}
                              {experience?.dateEnd !== undefined ? ' - ' + experience?.dateEnd : ''}
                          </p>
                        </div>
                      </div>
                      {experience?.bulletPoints && experience?.bulletPoints?.map((bulletPoint)=>(
                        <p className='text-sm my-1'>{bulletPoint}</p>
                      ))}
                  </>
                ))}
            </div>
          )}
          {data?.projects?.length > 0 && (
            <div className='w-full mt-10'>
                <h3 className='uppercase tracking-[0.3rem] border-b pb-2 font-normal text-sm'>accademic projects</h3>
                {data?.projects && data?.projects?.map((project, index)=>(
                  <>
                    <div className='flex items-center justify-between' key={project?._id}>
                        <div>
                            <h3 className='uppercase font-medium text-sm mt-4'>{project?.title !== undefined ? project?.title : ''}</h3>
                
                        </div>
                        <div>
                          <p>
                              {project?.startDate !== undefined ? dateFomatted(project?.startDate) : ''}
                              {project?.endDate !== undefined ? ' - ' + dateFomatted(project?.endDate) : ''}
                          </p>
                        </div>
                      </div>
                      <p className='text-sm my-1'>{ project?.description }</p>
                  </>
                ))}
            </div>
          )}
          {data?.certifications?.length > 0 && (
            <div className='w-full mt-10'>
                <h3 className='uppercase tracking-[0.3rem] border-b pb-2 font-normal text-sm'>certifications</h3>
                {data?.certifications && data?.certifications?.map((certification, index)=>(
                  <>
                    <div className='flex items-center justify-between' key={certification?._id}>
                        <div>
                            <h3 className='uppercase font-medium text-sm mt-4'>{certification?.title !== undefined ? certification?.title : ''}</h3>
                
                        </div>
                        <div>
                          
                        </div>
                      </div>
                      <p className='text-sm my-1'>{ certification?.description }</p>
                  </>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
})

export default Resume8