import React, { forwardRef } from 'react';
import { BsFillPhoneFill } from 'react-icons/bs';
import { AiOutlineMail, AiFillLinkedin } from 'react-icons/ai';
import { TfiWorld, TfiLocationPin } from 'react-icons/tfi';
import { dateFomatted } from '../../../utils/dateFomatted';


const Resume6 = forwardRef(({ data }, docReference) => {

  return (
    <div className='bg-white rounded-[10px] shadow-square font-serif p-10'>
        <div className='font-openSans'>
            <h3 className='text-[2rem] font-openSans font-bold text-[#00297D]'>{data?.name}</h3>
            <p className='text-[#F86500] text-sm'>{ data?.position }</p>
            {/* <ul>
                {data?.phone && (
                     <li className='flex items-center gap-5'><span><BsFillPhoneFill /></span> {data.phone}</li>
      #F86500
            </ul> */}
            <div className='mt-4 flex items-center gap-3'>
                {data?.phone && (<div className='flex items-center gap-2'>
                    <BsFillPhoneFill className='text-[#F86500]' />
                    <p className='text-xsm'>{data.phone}</p>
                </div>)}
                {data?.address && (<div className='flex items-center gap-2'>
                    <TfiLocationPin className='text-[#F86500]'/>
                    <p className='text-xsm'>{data.address}</p>
                </div>)}
                {data?.email && (<div className='flex items-center gap-2'>
                    <AiOutlineMail className='text-[#F86500]'/>
                    <p className='text-xsm'>{data.email}</p>
                </div>)}
                {data?.linkedin && (<div className='flex items-center gap-2'>
                    <AiFillLinkedin className='text-[#F86500]'/>
                    <p className='text-xsm'>{data.linkedin}</p>
                </div>)}
            </div>
        </div>
        {data?.summary && (<div className='font-openSans my-3'>
            <h3 className='uppercase text-[1.2em] my-1 text-[#00297D] font-bold font-openSans'>summary</h3>
            <p className='text-xsm min-w-[9] '>{data?.summary}</p>
          </div>
        )
        }
        
        {data?.workExperience?.length > 0 &&
        <div className='font-openSans my-3'>
            <h3 className='uppercase text-[1.2em] my-1 text-[#00297D] font-bold'>professional experience</h3>
            { data?.workExperience && data?.workExperience?.map((experience, index)=>(
              <div className='grid grid-cols-8 gap-5 font-openSans' key={experience?._id}>
                <div>
                    <h4><span className='text-xsm text-[#677FB2]'>{experience?.dateStart !== undefined ? experience?.dateStart : ''}</span> 
                      <span className='text-xsm text-[#677FB2]'>{experience?.dateEnd !== undefined ? ' - ' + experience?.dateEnd : ''}</span>
                    </h4>
                    <p className='font-normal text-xsm'>{experience?.location !== undefined ? experience?.location : ''}</p>
                </div>
                <div className='flex flex-col items-center gap-1 '>
                    <span className='w-[0.4rem] h-[0.4rem] rounded-full bg-gray-400'></span>
                    <div className='w-[0.15rem] h-full bg-gray-400 border-1'></div>
                </div>
                <div className='col-span-6'>
                  <h3 className='font-medium text-[1.1rem] capitalize text-[#677FB2]'>{ experience?.title !== undefined ? experience?.title : '' }</h3>
                  <h3 className='font-medium text-sm text-[#F86500]'>{experience.company !== undefined ? experience?.company : ''}</h3>
                {experience?.bulletPoints && experience?.bulletPoints?.map((bulletPoint)=>(
                  <p className='text-sm my-1'>{bulletPoint}</p>
                ))}
                </div>
              </div>
            ))}
        </div>
        }
        {data?.education?.length > 0 &&
        <div className='font-openSans my-3'>
            <h3 className='uppercase text-[1.2em] my-1 text-[#00297D] font-bold'>education</h3>
            { data?.education && data?.education?.map((education, index)=>(
              <div className='grid grid-cols-8 gap-5 font-openSans' key={education?._id}>
                <div>
                    <h4><span className='text-xsm'>{education?.year !== undefined ? dateFomatted(education?.year) : ''}</span> 
                    </h4>
                    <p className='font-normal text-xsm'>{education?.location !== undefined ? education?.location : ''}</p>
                </div>
                <div className='flex flex-col items-center gap-1 '>
                    <span className='w-[0.4rem] h-[0.4rem] rounded-full bg-gray-400'></span>
                    <div className='w-[0.15rem] h-full bg-gray-400 border-1'></div>
                </div>
                <div className='col-span-6'>
                  <h3 className='font-medium text-[1.1rem] capitalize text-[#677FB2]'>{education?.degree !== undefined ? education?.degree  : ''} {education?.fieldOfStudy !== undefined ? ' , ' + education?.fieldOfStudy : ''}</h3>
                  <h3 className='font-medium text-sm text-[#F86500]'>{education?.institution !== undefined ? education?.institution : ''}</h3>
                  <h3 className='font-normal text-sm font-openSans'>
                  {education?.location !== undefined ? education?.location : ''}
                  {education?.country !== undefined ? ' , ' + education?.country : ''}
                  {education?.year !== undefined ? ' , ' + dateFomatted(education?.year) : ''}
                </h3>
                </div>
              </div>
            ))}
        </div>
        }
        {data?.projects?.length > 0 &&
        <div className='font-openSans my-3'>
            <h3 className='uppercase text-[1.2em] my-1 text-[#00297D] font-bold'>projects</h3>
            { data?.projects && data?.projects?.map((project, index)=>(
              <div className='grid grid-cols-8 gap-5 font-openSans' key={project?._id}>
                <div>
                    <h4>
                      <span className='text-xsm text-[#677FB2]'>{project?.startDate !== undefined ? dateFomatted(project?.startDate) : ''}</span> 
                      <span className='text-xsm text-[#677FB2]'>{project?.endDate !== undefined ? ' - ' + dateFomatted(project?.endDate) : ''}</span>
                    </h4>
                    {/* <p className='font-medium text-[#704778]'>{education?.location !== undefined ? education?.location : ''}</p> */}
                </div>
                <div className='flex flex-col items-center gap-1 '>
                    <span className='w-[0.4rem] h-[0.4rem] rounded-full bg-gray-400'></span>
                    <div className='w-[0.15rem] h-full bg-gray-400 border-1'></div>
                </div>
                <div className='col-span-6'>
                <h3 className='font-bold text-sm font-openSans text-[#677FB2]'>
                  {project?.title !== undefined ? project?.title : ''}
                </h3>
                <p className='font-bold text-xsm font-openSans text-[#283d56]'>{ project?.description }</p>
                </div>
              </div>
            ))}
        </div>
        }
        {data?.certifications?.length > 0 &&
        <div className='font-openSans my-3'>
            <h3 className='uppercase text-[1.2em] my-1 text-[#00297D] font-bold'>certifications</h3>
            { data?.certifications && data?.certifications?.map((certification, index)=>(
              <div className='grid grid-cols-8 gap-5 font-openSans' key={certification?._id}>
                <div>
                    {/* <h4>
                      <span className='text-xsm'>{project?.startDate !== undefined ? dateFomatted(project?.startDate) : ''}</span> 
                      <span className='text-xsm'>{project?.endDate !== undefined ? ' - ' + dateFomatted(project?.endDate) : ''}</span>
                    </h4> */}
                </div>
                <div className='flex flex-col items-center gap-1 '>
                    <span className='w-[0.4rem] h-[0.4rem] rounded-full bg-gray-400'></span>
                    <div className='w-[0.15rem] h-full bg-gray-400 border-1'></div>
                </div>
                <div className='col-span-6'>
                <h3 className='font-bold text-sm font-openSans text-[#677FB2]'>
                    {certification?.title !== undefined ? certification?.title : ''}
                </h3>
                <p className='font-bold text-xsm font-openSans text-[#283d56]'>{ certification?.description }</p>
                </div>
              </div>
            ))}
        </div>
        }
        {data?.skill?.length > 0 && 
          <div className='my-5 font-openSans'>
          <h3 className='uppercase text-[1.2em] my-1 text-[#00297D] font-bold font-openSans'>Technical skills</h3>
          <div className=''>
              {data?.skill && data?.skill.map((skill)=>(
                <button className='px-6 mx-2 py-1 text-xsm min-w-[9] border-b-2 border-lavender'>{skill.skill}</button>
              ))}
          </div>
          </div>
        }
        
    </div>
  )
})

export default Resume6