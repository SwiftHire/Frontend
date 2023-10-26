import React, { forwardRef } from 'react';
import { BsFillPhoneFill } from 'react-icons/bs';
import { AiOutlineMail, AiFillLinkedin } from 'react-icons/ai';
import { TfiWorld, TfiLocationPin } from 'react-icons/tfi';


const Resume5 = forwardRef(({ data }, docReference) => {

    const dateFomatted = (date) => {
        let year = "";
        let month = "";
        if (date ==='' || date === undefined) {
          return '';
        }else{
            year = date.slice(0, 4);
            month = date.slice(5, 7);
        }
        if (month === '01') {
          month = 'Jan';
        } else if (month === '02') {
          month = 'Feb';
        } else if (month === '03') {
          month = 'Mar';
        } else if (month === '04') {
          month = 'Apr';
        } else if (month === '05') {
          month = 'May';
        } else if (month === '06') {
          month = 'Jun';
        } else if (month === '07') {
          month = 'Jul';
        } else if (month === '08') {
          month = 'Aug';
        } else if (month === '09') {
          month = 'Sep';
        } else if (month === '10') {
          month = 'Oct';
        } else if (month === '11') {
          month = 'Nov';
        } else if (month === '12') {
          month = 'Dec';
        }
        return `${month} ${year}`;
      };
      
  return (
    <div className='bg-white rounded-[10px] shadow-square font-serif p-10'>
        <div className='font-rubik'>
            <h3 className='text-[2rem] font-rubik font-bold text-[#704778]'>{data?.name}</h3>
            <p className='text-[#951CC3] text-sm'>{ data?.position }</p>
            {/* <ul>
                {data?.phone && (
                     <li className='flex items-center gap-5'><span><BsFillPhoneFill /></span> {data.phone}</li>
                )}
            </ul> */}
            <div className='mt-4 flex items-center gap-3'>
                {data?.phone && (<div className='flex items-center gap-2'>
                    <BsFillPhoneFill className='text-[#951CC3]' />
                    <p className='text-xsm'>{data.phone}</p>
                </div>)}
                {data?.address && (<div className='flex items-center gap-2'>
                    <TfiLocationPin className='text-[#951CC3]'/>
                    <p className='text-xsm'>{data.address}</p>
                </div>)}
                {data?.email && (<div className='flex items-center gap-2'>
                    <AiOutlineMail className='text-[#951CC3]'/>
                    <p className='text-xsm'>{data.email}</p>
                </div>)}
                {data?.linkedin && (<div className='flex items-center gap-2'>
                    <AiFillLinkedin className='text-[#951CC3]'/>
                    <p className='text-xsm'>{data.linkedin}</p>
                </div>)}
            </div>
        </div>
        {data?.summary && (
          <div className='font-rubik my-3'>
            <h3 className='uppercase text-[1.2em] my-1 text-[#704778] font-bold font-rubik'>summary</h3>
            <p className='text-xsm'>{data?.summary}</p>
          </div>
        )}
        {data?.workExperience?.length > 0 &&
        <div className='font-rubik my-3'>
            <h3 className='uppercase text-[1.2em] my-1 text-[#704778] font-bold'>professional experience</h3>
            { data?.workExperience && data?.workExperience?.map((experience, index)=>(
              <div className='grid grid-cols-8 gap-5 font-rubik' key={experience?._id}>
                <div>
                    <h4><span className='text-xsm'>{experience?.dateStart !== undefined ? experience?.dateStart : ''}</span> 
                      <span className='text-xsm'>{experience?.dateEnd !== undefined ? ' - ' + experience?.dateEnd : ''}</span>
                    </h4>
                    <p className='font-medium text-[#704778]'>{experience?.location !== undefined ? experience?.location : ''}</p>
                </div>
                <div className='flex flex-col items-center gap-1 '>
                    <span className='w-[0.4rem] h-[0.4rem] rounded-full bg-gray-400'></span>
                    <div className='w-[0.15rem] h-full bg-gray-400 border-1'></div>
                </div>
                <div className='col-span-6'>
                  <h3 className='font-medium text-[1.1rem] capitalize'>{ experience?.title !== undefined ? experience?.title : '' }</h3>
                  <h3 className='font-medium text-sm text-[#951CC3]'>{experience.company !== undefined ? experience?.company : ''}</h3>
                {experience?.bulletPoints && experience?.bulletPoints?.map((bulletPoint)=>(
                  <p className='text-sm my-1'>{bulletPoint}</p>
                ))}
                </div>
              </div>
            ))}
        </div>
        }
        {data?.education?.length > 0 &&
        <div className='font-rubik my-3'>
            <h3 className='uppercase text-[1.2em] my-1 text-[#704778] font-bold'>education</h3>
            { data?.education && data?.education?.map((education, index)=>(
              <div className='grid grid-cols-8 gap-5 font-rubik' key={education?._id}>
                <div>
                    <h4><span className='text-xsm'>{education?.year !== undefined ? dateFomatted(education?.year) : ''}</span> 
                    </h4>
                    <p className='font-medium text-[#704778]'>{education?.location !== undefined ? education?.location : ''}</p>
                </div>
                <div className='flex flex-col items-center gap-1 '>
                    <span className='w-[0.4rem] h-[0.4rem] rounded-full bg-gray-400'></span>
                    <div className='w-[0.15rem] h-full bg-gray-400 border-1'></div>
                </div>
                <div className='col-span-6'>
                  <h3 className='font-medium text-[1.1rem] capitalize'>{education?.degree !== undefined ? education?.degree  : ''} {education?.fieldOfStudy !== undefined ? ' , ' + education?.fieldOfStudy : ''}</h3>
                  <h3 className='font-medium text-sm text-[#951CC3]'>{education?.institution !== undefined ? education?.institution : ''}</h3>
                  <h3 className='font-normal text-sm font-rubik'>
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
        <div className='font-rubik my-3'>
            <h3 className='uppercase text-[1.2em] my-1 text-[#704778] font-bold'>projects</h3>
            { data?.projects && data?.projects?.map((project, index)=>(
              <div className='grid grid-cols-8 gap-5 font-rubik' key={project?._id}>
                <div>
                    <h4>
                      <span className='text-xsm'>{project?.startDate !== undefined ? dateFomatted(project?.startDate) : ''}</span> 
                      <span className='text-xsm'>{project?.endDate !== undefined ? ' - ' + dateFomatted(project?.endDate) : ''}</span>
                    </h4>
                    {/* <p className='font-medium text-[#704778]'>{education?.location !== undefined ? education?.location : ''}</p> */}
                </div>
                <div className='flex flex-col items-center gap-1 '>
                    <span className='w-[0.4rem] h-[0.4rem] rounded-full bg-gray-400'></span>
                    <div className='w-[0.15rem] h-full bg-gray-400 border-1'></div>
                </div>
                <div className='col-span-6'>
                <h3 className='font-bold text-sm font-rubik'>
                  {project?.title !== undefined ? project?.title : ''}
                </h3>
                <p className='font-bold text-xsm font-rubik text-[#283d56]'>{ project?.description }</p>
                </div>
              </div>
            ))}
        </div>
        }
        {data?.certifications?.length > 0 &&
        <div className='font-rubik my-3'>
            <h3 className='uppercase text-[1.2em] my-1 text-[#704778] font-bold'>certifications</h3>
            { data?.certifications && data?.certifications?.map((certification, index)=>(
              <div className='grid grid-cols-8 gap-5 font-rubik' key={certification?._id}>
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
                <h3 className='font-bold text-sm font-rubik'>
                    {certification?.title !== undefined ? certification?.title : ''}
                </h3>
                <p className='font-bold text-xsm font-rubik text-[#283d56]'>{ certification?.description }</p>
                </div>
              </div>
            ))}
        </div>
        }
        {data?.skill?.length > 0 && 
          <>
            <div className='my-5 font-rubik'>
              <h3 className='uppercase text-[1.2em] my-1 text-[#704778] font-bold font-rubik'>Technical skills</h3>
              <div className=''>
                  {data?.skill.map((skill)=>(
                    <button className='px-4 mx-2 py-1 text-xsm min-w-[9] border-2 border-lavender rounded-lg'>{skill.skill}</button>
                  ))}
              </div>
            </div>
          </>
        }
    </div>
  )
})

export default Resume5