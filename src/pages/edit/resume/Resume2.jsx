import React, { forwardRef } from 'react'



const Resume2 = forwardRef(({ data }, docReference) => {
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
        <div className=' bg-white rounded-[10px] py-0 shadow-square font-serif'>
            
            <div className=' px-[60px] pt-[50px] border-b-[1px] border-gray-200 pb-8'>
                {data?.position && (<p className=' text-gray-400 text-sm'>{data.position}</p>)}
                <h1 className=' text-[60px] leading-tight font-bold'>{data?.name}</h1>
            </div>
            <div className=' w-full grid grid-cols-3 px-[60px]'>
                <div className=' col-span-2 pr-12 pb-[50px]'>
                    {data?.summary && (<div className=' py-6'>
                        <h2 className=' text-[20px] font-bold'>Profile</h2>
                        <p className=' mt-4 text-gray-600'>{data.summary}</p>
                    </div>)}

                    {data?.education?.length > 0 && (<div className=' py-6'>
                        <h2 className=' text-[20px] font-bold'>Education</h2>
                        {data?.education.map(edu => (
                            <div className=' mt-4'>
                                <div className=' flex items-center justify-between'>
                                    <h3 className=' font-bold text-sm'>{edu.institution}</h3>
                                    <p className=' text-gray-600'>{edu.year}</p>
                                </div>
                                <p className=' text-gray-600 mt-2'>{edu.fieldOfStudy}</p>
                            </div>
                        ))}
                    </div>)}

                    {data?.workExperience?.length > 0 && (<div className=' pt-6'>
                        <h2 className=' text-[20px] font-bold'>Employment</h2>
                        {data.workExperience.map(experience => (
                            <div className=' mt-4'>
                                <div className=' flex items-center justify-between'>
                                    <h3 className=' font-bold text-sm'>{`${experience.title} at ${experience.company}`}</h3>
                                    <p className=' text-gray-600'>{`${experience.dateStart} - ${experience.dateEnd}`}</p>
                                </div>
                                <ul className=' mt-2 text-gray-600'>
                                    {experience.bulletPoints.map(points => (
                                        <li>{points}.</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>)}

                    {data?.projects?.length > 0 && (<div className=' pt-6'>
                        <h2 className=' text-[20px] font-bold'>Projects</h2>
                        {data.projects.map(project => (
                            <div className=' mt-4'>
                                <div className=' flex items-center justify-between'>
                                    <h3 className=' font-bold text-sm'>{project.title}</h3>
                                    <p className=' text-gray-600'>{`${dateFomatted(project.startDate)} - ${dateFomatted(project.endDate)}`}</p>
                                </div>
                                <div className=' mt-2 text-gray-600'>
                                    <p>{project.description}.</p>
                                </div>
                                <div className=' mt-2 text-gray-600'>
                                    <h3 className=' font-bold text-black'>Link</h3>
                                    <p>{project.link}.</p>
                                </div>
                                <div className=' mt-2 text-gray-600'>
                                    <h3 className=' font-bold text-black'>Link</h3>
                                    <ul className=' mt-2 flex gap-10'>
                                        {project.technologies.map(tech => (
                                            <li>{tech}.</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>)}

                    {data?.certifications?.length > 0 && (<div className=' pt-6'>
                        <h2 className=' text-[20px] font-bold'>Certifications</h2>
                        {data.certifications.map(certificate => (
                            <div className=' mt-4'>
                                <div className=' flex items-center justify-between'>
                                    <h3 className=' font-bold text-sm'>{certificate.title}</h3>
                                    <p className=' text-gray-600'>{`${dateFomatted(certificate.startDate)} - ${dateFomatted(certificate.endDate)}`}</p>
                                </div>
                                <div className=' mt-2 text-gray-600'>
                                    <p>{certificate.description}.</p>
                                </div>
                                <div className=' mt-2 text-gray-600'>
                                    <h3 className=' font-bold text-black'>Link</h3>
                                    <p>{certificate.link}.</p>
                                </div>
                                <div className=' mt-2 text-gray-600'>
                                    <h3 className=' font-bold text-black'>Link</h3>
                                    <ul className=' mt-2 flex gap-10'>
                                        {certificate.technologies.map(tech => (
                                            <li>{tech}.</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>)}

                </div>
                <div className=' col-span-1 border-l-[1px] pb-[50px] border-gray-200 pl-12'>
                    <div className=' py-6'>
                        <h2 className=' text-[20px] font-bold'>Contacts</h2>
                        {data?.address && (<div className=' mt-4'>
                            <h3 className=' font-bold text-sm'>Address</h3>
                            <p className=' mt-2 text-gray-600'>{data.address}</p>
                        </div>)}
                        {data?.email && (<div className=' mt-4'>
                            <h3 className=' font-bold text-sm'>Email</h3>
                            <p className=' mt-2 text-gray-600'>{data.email}</p>
                        </div>)}
                        {data?.phone && (<div className=' mt-4'>
                            <h3 className=' font-bold text-sm'>Phone</h3>
                            <p className=' mt-2 text-gray-600'>{data.phone}</p>
                        </div>)}
                        {data?.linkedin && (<div className=' mt-4'>
                            <h3 className=' font-bold text-sm'>Portfolio</h3>
                            <p className=' mt-2 text-gray-600'>{data.linkedin}</p>
                        </div>)}
                    </div>
                    {data?.skill?.length > 0 && (<div className=' pt-6'>
                        <h2 className=' text-[20px] font-bold'>Skills</h2>
                        <ul className=' mt-4'>
                        {data?.skill?.map(skill => (
                                <li className=' font-bold mt-4'>
                                    <p>{skill.skill}</p>
                                    <div class="w-full bg-[#f2f2f2] mt-2 rounded-full h-1.5">
                                        <div class="bg-[#585858] h-1.5 rounded-full w-[80%]"></div>
                                    </div>
                                </li>
                        ))}
                        </ul>
                    </div>)}
                </div>
            </div>


        </div>
    )
})

export default Resume2