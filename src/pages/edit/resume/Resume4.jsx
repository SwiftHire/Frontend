import React from 'react';
import { BsTelephone } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { TfiWorld, TfiLocationPin } from 'react-icons/tfi';
import userAvatar from '../../../assets/png/user-icon.png';


function Resume4({ data }) {
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
        // let year = date.slice(0, 4);
        // let month = date.slice(5, 7)
        // return `${month}/${year}`
    }

    return (
        <div className=' bg-white rounded-[10px] py-0 shadow-square font-inter'>
            <div className=' relative bg-[#1d2e3c] text-white pt-[55px] pb-[30px] px-[50px] flex gap-20'>
                <div className='my-10'>
                    <img className=' absolute top-20 w-[175px] h-[225px] object-cover object-top' src={`${ data?.imageUrl ? data?.imageUrl : userAvatar}`} alt="" />
                </div>
                <div className=' w-full ml-[280px]'>
                    <h1 className=' text-[55px] uppercase font-bold'>{data?.name}</h1>
                    {data?.position && (<h2 className=' text-[22px] uppercase font-bold'>{data.position}</h2>)}
                </div>
            </div>
            <div className=' flex'>
                <div className=' basis-4/12 bg-[#e0e5ea]'>

                    <div className=' px-[20px] pb-[40px]'>

                        <div className=' mt-44'>
                            <h2 className='text-[22px] uppercase font-bold'>CONTACT DETAILS</h2>
                            <div className=' mt-4'>
                                {data?.email && (<div className=' flex gap-3'>
                                    <AiOutlineMail size={19} />
                                    <p>{data.email}</p>
                                </div>)}
                                {data?.address && (<div className=' flex gap-3 mt-3'>
                                    <TfiLocationPin size={19} />
                                    <p>{data.address}</p>
                                </div>)}
                                {data?.phone && (<div className=' flex gap-3 mt-3'>
                                    <BsTelephone size={19} />
                                    <p>{data.phone}</p>
                                </div>)}
                            </div>
                        </div>

                        {data?.skill?.length > 0 && (<div className=' mt-16'>
                            <h2 className=' text-[22px] uppercase font-bold'>SKILLS</h2>
                            <div>
                                <ul className=' mt-4 list-disc list-inside'>
                                    {data?.skill.map(skill => (
                                        <li className=' font-light mt-4'>{skill.skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>)}
                    </div>

                </div>


                <div className=' basis-4/6 px-[50px] pb-[40px]'>

                    {data?.summary && (<div className=' mt-10'>
                        <h3 className=' text-[18px] font-bold'>PROFESSIONAL PROFILE</h3>
                        <p className=' mt-4'>{data.summary}</p>
                    </div>)}

                    {data?.workExperience?.length > 0 && (<div className=' mt-10'>
                        <h3 className=' text-[18px] font-bold'>PROFESSIONAL CAREER</h3>
                        {data.workExperience.map((experience) => (
                            <div className=' mt-4' key={experience._id}>
                                <div className=' flex items-center gap-5'>
                                    <h4 className=' text-[17px] font-bold '>{experience.title !== undefined ? experience.title : ''}</h4>
                                    <p>{`${experience.dateStart} - ${experience.dateEnd}`}</p>
                                </div>
                                <div className=' flex items-center gap-5'>
                                    <p className=' text-[17px] font-bold mt-1'>{experience.company}</p>
                                    <p className=' mt-1'>{experience.location}</p>
                                </div>
                                <div className=' mt-4'>
                                    <ul className=' list-disc list-inside'>
                                        {experience.bulletPoints.map((points, index) => (
                                            <li key={index}>{points}.</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>)}

                    {data?.education?.length > 0 && (<div className=' mt-10'>
                        <h3 className=' text-[18px] font-bold'>EDUCATION</h3>
                        {data.education.map(edu => (
                            <div className=' mt-4'>
                                <div className=' flex justify-between'>
                                    <div className=''>
                                        <h3 className=' text-[17px] font-bold'>
                                            {edu.degree !== undefined ?  edu.degree : ''}
                                            {edu.fieldOfStudy !== undefined ? ' , ' + edu.fieldOfStudy : ''}
                                        </h3>
                                        <p className='mt-1'>
                                            {`${edu.institution !== undefined ? edu.institution :''} 
                                            ${edu.location !==undefined ? ',' + edu.location : ''}`}
                                        </p>
                                    </div>
                                    <div className=''>
                                        <p>{edu.year}</p>
                                        <p className=' mt-1'>{edu.location !== undefined ? edu.location : ''}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>)}

                    {data?.projects?.length > 0 && (<div className=' mt-10'>
                        <h3 className=' text-[18px] font-bold'>PROJECTS</h3>
                        {data.projects.map(project => (
                            <div className=' mt-4'>
                                <div className=' flex items-center gap-5'>
                                    <h4 className=' text-[17px] font-bold '>{project.title}</h4>
                                    <p>{`${dateFomatted(project.startDate)} - ${dateFomatted(project.endDate)}`}</p>
                                </div>
                                <div className=' mt-4'>
                                    <p>{project.description}.</p>
                                </div>
                                <div className=' mt-4'>
                                    <h3 className=' font-bold text-black'>Link</h3>
                                    <p>{project.link}.</p>
                                </div>
                                <div className=' mt-4'>
                                <h3 className=' font-bold text-black'>Technologies</h3>
                                    <ul className=' mt-2 list-disc list-inside'>
                                        {project.technologies.map(tech => (
                                            <li>{tech}.</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>)}

                    {data?.certifications?.length > 0 && (<div className=' mt-10'>
                        <h3 className=' text-[18px] font-bold uppercase'>Certifications</h3>
                        {data.certifications.map(certificate => (
                            <div className=' mt-4'>
                                <div className=' flex items-center gap-5'>
                                    <h4 className=' text-[17px] font-bold '>{certificate.title}</h4>
                                    <p>{`${dateFomatted(certificate.startDate)} - ${dateFomatted(certificate.endDate)}`}</p>
                                </div>
                                <div className=' mt-4'>
                                    <p>{certificate.description}.</p>
                                </div>
                                <div className=' mt-4'>
                                    <h3 className=' font-bold text-black'>Link</h3>
                                    <p>{certificate.link}.</p>
                                </div>
                                <div className=' mt-4'>
                                <h3 className=' font-bold text-black'>Technologies</h3>
                                    <ul className=' mt-2 list-disc list-inside'>
                                        {certificate.technologies.map(tech => (
                                            <li>{tech}.</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>)}

                </div>
            </div>
        </div>
    )
}

export default Resume4