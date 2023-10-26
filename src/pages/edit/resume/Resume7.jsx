import React, { forwardRef } from 'react';
import { MdLocationOn, MdEmail } from 'react-icons/md';
import { BsFillPhoneFill } from 'react-icons/bs';
import { AiFillLinkedin } from 'react-icons/ai';

const Resume7 = forwardRef(({ data }, docReference) => {

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
    <div className='bg-white rounded-[10px] shadow-square font-serif p-10 font-Merriweather'>
      <div className='w-8/12 border-b-2 pb-3'>
        <h3 className='text-[1.5rem] text-[#283d56] font-Merriweather capitalize font-bold'>{data.name}</h3>
      </div>
      <div className='mt-4 flex items-center gap-5 font-Merriweather text-xsm text-[#283d56]'>
          {data?.address && (<div className='flex items-center gap-1'>
              <MdLocationOn />
              <p>{data.address}</p>
          </div>)}
          {data?.email && (<div className='flex items-center gap-1'>
              <MdEmail />
              <p>{data.email}</p>
          </div>)}
          {data?.email && (<div className='flex items-center gap-1'>
              <BsFillPhoneFill />
              <p>{data.phone}</p>
          </div>)}
          {data?.linkedin && (<div className='flex items-center gap-1'>
              <AiFillLinkedin />
              <p>{data.linkedin}</p>
          </div>)}
      </div>
      {data?.workExperience?.length > 0 &&
        <div className='my-10 '>
          <h2 className='text-[1.25rem] text-[#283d56] font-bold'>EXPERIENCE</h2>
          {data?.workExperience && data?.workExperience?.map((experience, index)=>(
            <div className='my-3 text-[#283d56]'>
                {/* <h3 className='font-bold text-sm font-Merriweather'>Software Engineer (product) | Company A | New York, NY | June 2020 - present</h3> */}
                <h3 className='font-bold text-sm font-Merriweather' key={experience?._id}>
                  { experience?.title !== undefined ? experience?.title : '' } 
                  {experience.company !== undefined ? ' | ' + experience?.company + ' ' : ''} 
                  {experience?.location !== undefined ? '| ' + experience?.location : ''} 
                  {experience?.dateStart !== undefined ? ' | ' + experience?.dateStart : ''}
                   {experience?.dateEnd !== undefined ? ' - ' + experience?.dateEnd : ''}</h3>
                {experience?.bulletPoints && experience?.bulletPoints?.map((bulletPoint)=>(
                  <p className='text-sm'>{bulletPoint}</p>
                ))}
            </div>
          ))}
          
        </div>
      }
      {data?.education?.length > 0 && 
        <div className='my-10 '>
        <h2 className='text-[1.25rem] text-[#283d56] font-bold'>EDUCATION</h2>
          {data?.education && data?.education?.map((education, index)=>(
            <div className='my-3 text-[#283d56]' key={education?._id}>
                <h3 className='font-bold text-sm font-Merriweather'>
                  {education?.degree !== undefined ? education?.degree : ''}
                  {education?.fieldOfStudy !== undefined ? ' | ' + education?.fieldOfStudy : ''}
                  {education?.institution !== undefined ? ' | ' + education?.institution : ''}
                  {education?.location !== undefined ? ' | ' + education?.location : ''}
                  {education?.country !== undefined ? ' | ' + education?.country : ''}
                  {education?.year !== undefined ? ' | ' + dateFomatted(education?.year) : ''}
                </h3>
            </div>
          ))}
      </div>
      }
      {data?.projects?.length > 0 && 
        <div className='my-10 '>
        <h2 className='text-[1.25rem] text-[#283d56] font-bold'>PROJECTS</h2>
          {data?.projects && data?.projects?.map((project, index)=>(
            <div className='my-3 text-[#283d56]' key={project?._id}>
                <h3 className='font-bold text-sm font-Merriweather'>
                  {project?.title !== undefined ? project?.title : ''}
                  {project?.startDate !== undefined ? ' | ' + dateFomatted(project?.startDate) + ' - ' : ''}
                  {project?.endDate !== undefined ? '  ' + dateFomatted(project?.endDate) : ''}
                </h3>
                <p className='font-bold text-xsm font-Merriweather text-[#283d56]'>{ project?.description }</p>
            </div>
          ))}
      </div>
      }
      {data?.certifications?.length > 0 && 
        <div className='my-10 '>
        <h2 className='text-[1.25rem] text-[#283d56] font-bold'>CERTIFICATIONS</h2>
          {data?.certifications && data?.certifications?.map((certification, index)=>(
            <div className='my-3 text-[#283d56]' key={certification?._id}>
                <h3 className='font-bold text-sm font-Merriweather'>
                  {certification?.title !== undefined ? certification?.title : ''}
                  {certification?.link !== undefined ? ' | ' + certification?.link : ''}
                </h3>
                <p className='font-bold text-xsm font-Merriweather text-[#283d56]'>{ certification?.description }</p>
            </div>
          ))}
      </div>
      }
      {data?.skill?.length > 0 && <>
            <h2 className='text-[1.25rem] text-[#283d56] font-bold'>SKILLS</h2>
            {data?.skill && data?.skill.map((skill, index)=>(
              <span className='font-bold text-sm font-Merriweather text-[#283d56]'>
                {index === data.skill?.length - 1 ? skill.skill + '.' : skill.skill + ', '}
              </span>
            ))}
          </>}
    </div>
  )
})

export default Resume7