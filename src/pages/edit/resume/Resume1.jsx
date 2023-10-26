import React, { forwardRef } from 'react'

const Resume1 = forwardRef(({ data }, docReference) => {

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
            month = 'Jan'
        } 
        else if (month === '02'){
            month = 'Feb'
        }
        else if (month === '03'){
            month = 'Mar'
        }
        else if (month === '04'){
            month = 'Apr'
        }
        else if (month === '05'){
            month = 'May'
        }
        else if (month === '06'){
            month = 'Jun'
        }
        else if (month === '07'){
            month = 'Jul'
        }
        else if (month === '08'){
            month = 'Aug'
        }
        else if (month === '09'){
            month = 'Sep'
        }
        else if (month === '10'){
            month = 'Oct'
        }
        else if (month === '11'){
            month = 'Nov'
        }
        else if (month === '12'){
            month = 'Dec'
        }

        return `${month} ${year}`
    }
 
    return (
        <div className=' bg-white py-[50px] px-[20px] rounded-[10px] shadow-square font-mono'>
            <div className=' flex flex-col justify-center'>
                <h1 className=' text-center text-[30px] leading-[36px] font-bold'>{`${data?.name !== undefined ? data?.name : ''} ${data?.position !== undefined ? ', ' + data?.position : ''}`}</h1>
                {/* {(data?.address || data?.email || data?.phone) && (
                <p className=' text-center mx-16 text-gray-400 pt-2'>
                    {`${data?.address}, ${data?.email}, ${data?.phone}`}
                </p>)} */}
                <p className=' text-center mx-16 text-gray-400 pt-2'>
                    {data?.address !== undefined ? data?.address : ''}
                    {data?.email !== undefined ? ', ' + data?.email : ''}
                    {data?.phone !== undefined ? ', ' + data?.phone : ''}
                </p>

                {data?.summary && (<div className=' flex items-center border-t-[1px] border-gray-200 mx-16 mt-6 py-6'>
                    <h2 className=' basis-1/4 text-[20px] font-bold'>Profile</h2>
                    <p className=' basis-3/4 text-gray-400'>{data.summary}</p>
                </div>)}

                {data?.education?.length > 0 && (<div className=' border-t-[1px] border-gray-200 mx-16 py-6'>
                    <h2 className=' text-left text-[20px] font-bold'>Education</h2>
                    {data.education.map(edu => (
                        <div className=' flex mt-6 items-start'>
                            <p className=' basis-1/4 text-gray-400 text-xsm'>{edu.year}</p>
                            <div className=" basis-3/4">
                                <h3 className=' font-bold'>{edu.institution}</h3>
                                <p className=' mt-2 text-gray-400'>{edu.fieldOfStudy}</p>
                            </div>
                        </div>
                    ))}
                </div>)}

                {data?.workExperience.length > 0 && (<div className=' border-t-[1px] border-gray-200 mx-16 py-6'>
                    <h2 className=' text-left text-[20px] font-bold'>Employment</h2>
                    {console.log(data?.workExperience, 'work Ex')}

                    {data.workExperience.map(experience => (
                        <div className=' flex mt-6 items-start'>
                            <p className=' basis-1/4 text-gray-400 text-xsm'>{`${experience.dateStart} - ${experience.dateEnd}`}</p>
                            <div className=" basis-3/4">
                                <h3 className=' font-bold'>{`${experience.title} at ${experience.company ? experience.company : ''}`}</h3>
                                <ul className=' mt-2 text-gray-400'>
                                    {experience.bulletPoints.map(points => (
                                        <li>{points}.</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>)}

                {data?.projects.length > 0 && (<div className=' border-t-[1px] border-gray-200 mx-16 py-6'>
                    <h2 className=' text-left text-[20px] font-bold'>Projects</h2>

                    {data.projects.map(project => (
                        <div className=' flex mt-6 items-start'>
                            <p className=' basis-1/4 text-gray-400 text-xsm'>{`${dateFomatted(project.startDate)} - ${dateFomatted(project.endDate)}`}</p>
                            <div className=" basis-3/4">
                                <h3 className=' font-bold'>{project.title}</h3>
                                <div className=' mt-2 text-gray-400'>
                                    <p>{project.description}.</p>
                                </div>
                                <div className=' mt-2 text-gray-400'>
                                    <h3 className=' font-bold text-black'>Link</h3>
                                    <p>{project.link}.</p>
                                </div>
                                <div className=' mt-2 text-gray-400'>
                                    <h3 className=' font-bold text-black'>Technologies</h3>
                                    <ul className=' mt-2 flex gap-10'>
                                        {project.technologies.map(tech => (
                                            <li>{tech}.</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>)}

                {data?.certifications.length > 0 && (<div className=' border-t-[1px] border-gray-200 mx-16 py-6'>
                    <h2 className=' text-left text-[20px] font-bold'>Certifications</h2>

                    {data.certifications.map(certificate => (
                        <div className=' flex mt-6 items-start'>
                            <p className=' basis-1/4 text-gray-400 text-xsm'>{`${dateFomatted(certificate.startDate)} - ${dateFomatted(certificate.endDate)}`}</p>
                            <div className=" basis-3/4">
                                <h3 className=' font-bold'>{certificate.title}</h3>
                                <div className=' mt-2 text-gray-400'>
                                    <p>{certificate.description}.</p>
                                </div>
                                <div className=' mt-2 text-gray-400'>
                                    <h3 className=' font-bold text-black'>Link</h3>
                                    <p>{certificate.link}.</p>
                                </div>
                                <div className=' mt-2 text-gray-400'>
                                    <h3 className=' font-bold text-black'>Technologies</h3>
                                    <ul className=' mt-2 flex gap-10'>
                                        {certificate.technologies.map(tech => (
                                            <li>{tech}.</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>)}

                {data?.skill?.length > 0 && (<div className=' flex border-t-[1px] border-gray-200 mx-16 py-6'>
                    <h2 className=' basis-1/4 text-[20px] font-bold'>Skills</h2>
                    <div className=' w-full basis-3/4'>
                        <ul className=' font-bold grid grid-cols-2 gap-6 w-full'>
                            {data?.skill.map(skill => (
                                <li>{skill.skill}</li>
                            ))}
                        </ul>
                    </div>
                </div>)}

            </div>
        </div>
    )
})

export default Resume1