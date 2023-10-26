import React from 'react';
import { BsTelephone } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { TfiWorld, TfiLocationPin } from 'react-icons/tfi';
import userAvatar from '../../../assets/png/user-icon.png';

function Resume3({ data }) {
    const dateFomatted = (date) => {
        let year = "";
        let month = "";
        if (date ==='' || date === undefined) {
          return '';
        }else{
            year = date.slice(0, 4);
            month = date.slice(5, 7);
            return `${month}/${year}`
        }
        // let year = date?.slice(0, 4);
        // let month = date?.slice(5, 7)
        // return `${month}/${year}`
    }

    return (
        <div className=' bg-white rounded-[10px] py-0 shadow-square font-rubik'>
            <div className=' grid grid-cols-3'>
                <div className=' col-span-2 px-[50px] py-[40px]'>
                    <div>
                        <h1 className=' text-[35px] font-normal font-inter'>{data?.name}</h1>
                        {data?.position && (<h2 className=' text-sm text-cyan-500 font-normal'>{data.position}</h2>)}
                        <div className=' mt-8'>
                            {data?.phone && (<div className=' flex gap-5'>
                                <BsTelephone />
                                <p>{data.phone}</p>
                            </div>)}
                            {data?.address && (<div className=' flex gap-5 mt-3'>
                                <TfiLocationPin />
                                <p>{data.address}</p>
                            </div>)}
                            {data?.email && (<div className=' flex gap-5 mt-3'>
                                <AiOutlineMail />
                                <p>{data.email}</p>
                            </div>)}
                            {data?.linkedin && (<div className=' flex gap-5 mt-3'>
                                <TfiWorld />
                                <p>{data.linkedin}</p>
                            </div>)}
                        </div>

                        {data?.summary && (<div className=' mt-8'>
                            <h2 className=' text-[20px] font-normal border-b border-gray-200 pb-4'>SUMMARY</h2>
                            <p className=' mt-4'>{data.summary}</p>
                        </div>)}

                        {data?.workExperience?.length > 0 && (<div className=' mt-8'>
                            <h2 className=' text-[20px] font-normal border-b border-gray-200 pb-4'>EXPERIENCE</h2>
                            {data.workExperience.map(experience => (
                                <div className=' mt-4'>
                                    <div className=' flex justify-between'>
                                        <div className=''>
                                            <h3 className=' text-sm font-normal '>{experience.title}</h3>
                                            <p className=' text-sm font-normal mt-1 text-cyan-500'>{experience.company}</p>
                                        </div>
                                        <div className=' mt-8 text-xsm'>
                                            <p>{`${experience.dateStart} - ${experience.dateEnd}`}</p>
                                            <p className=' mt-1'>{experience.location}</p>
                                        </div>
                                    </div>
                                    <div className=' mt-4'>
                                        <ul className=' text-gray-600'>
                                            {experience.bulletPoints.map(points => (
                                                <li>{points}.</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>)}


                        {data?.projects?.length > 0 && (<div className=' mt-8'>
                            <h2 className=' text-[20px] font-normal border-b border-gray-200 pb-4'>PROJECTS</h2>
                            {data.projects.map(project => (
                                <div className=' mt-4'>
                                    <div className=' flex justify-between'>
                                        <div className=''>
                                            <h3 className=' text-sm font-normal '>{project.title}</h3>
                                        </div>
                                        <div className=' text-xsm'>
                                            <p>{`${dateFomatted(project.startDate)} - ${dateFomatted(project.endDate)}`}</p>
                                        </div>
                                    </div>
                                    <div className=' mt-4'>
                                        <h3 className=' text-sm font-normal'>Link</h3>
                                        <p className=' text-gray-600'>{project.link}.</p>
                                    </div>
                                    <div className=' mt-4'>
                                        <h3 className=' text-sm font-normal'>Technologies</h3>
                                        <ul className=' mt-2 flex gap-10'>
                                            {project.technologies.map(tech => (
                                                <li className=' text-gray-600'>{tech}.</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>)}

                        {data?.education?.length > 0 && (<div className=' mt-8'>
                            <h2 className=' text-[20px] font-normal border-b border-gray-200 pb-4'>EDUCATION</h2>
                            {data.education.map(edu => (
                                <div className=' mt-4'>
                                    <div className=' flex justify-between'>
                                        <div className=''>
                                            <h3 className=' text-sm font-normal '>
                                                {/* {`${edu.fieldOfStudy}, ${edu.degree}`} */}
                                                {edu.fieldOfStudy !==undefined ? edu.fieldOfStudy + ', ' : ''}
                                                {edu.degree !==undefined ? edu.degree : ''}
                                            </h3>
                                            <p className=' text-sm font-normal mt-1 text-cyan-500'>
                                                {`${edu.institution !== undefined ? edu.institution :''} 
                                                ${edu.location !==undefined ? ',' + edu.location : ''}`}
                                            </p>
                                        </div>
                                        <div className=' text-xsm'>
                                            <p>{edu.year !==undefined ? edu.year : ''}</p>
                                            <p className=' mt-1'>{edu.location !==undefined ? edu.location : ''}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>)}

                    </div>
                </div>
                <div className=' col-span-1 bg-[#1d2e3c]'>
                    <div className=' py-[40px] px-[35px] text-white'>
                        <img className=' w-[170px] h-[170px] object-cover object-top rounded-full mx-auto' src={`${data?.imageUrl ? data?.imageUrl : userAvatar}`} alt="" />

                        {data?.skill?.length > 0 && (<div className=' mt-10'>
                            <h2 className=' text-[20px] font-normal pb-4'>Skills</h2>
                            <div>
                                {data?.skill.map(skill => (
                                    <ul className=' mt-4'>
                                        <li className=' font-light mt-4'>
                                            <div>
                                                <p>{skill.skill}</p>
                                                <div class="w-full bg-[#344350] mt-2 rounded-full h-1.5">
                                                    <div class="bg-white h-1.5 rounded-full w-[80%]"></div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                ))}
                            </div>
                        </div>)}

                        {data?.certifications?.length > 0 && (<div className=' mt-10'>
                            <h2 className=' text-[20px] font-normal pb-4'>Certifications</h2>
                            <div>
                                {data.certifications.map(certificate => (
                                    <ul className=''>
                                        <li className=' font-light mt-2'>
                                            <div className=' text-xsm flex justify-between'>
                                                <p>{certificate.title}</p>
                                                <p>{`${dateFomatted(certificate.startDate)}-${dateFomatted(certificate.endDate)}`}</p>
                                            </div>
                                        </li>
                                    </ul>
                                ))}
                            </div>
                        </div>)}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Resume3