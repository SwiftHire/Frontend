import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation  } from 'react-router-dom';
import { ImFileText2 } from 'react-icons/im';
import { MdArrowBackIosNew } from 'react-icons/md';
import { toast } from 'react-toastify';
import tokenService from '../../services/token.service';
import { useCreateProfile } from '../../hooks/useCreateProfile';
import { Button } from '../../components/button';

const UpdateProfile = () => {
    const location = useLocation();
    const profileInfo = location?.state?.profileInfo;
    const [loading, setLoading] = useState(false);
    const [skillsData, setSkillsData] = useState(profileInfo[0]?.skills);
    const [file, setFile] = useState(null);
    const [isHovering, setIsHovering] = useState(false);
    const fileRef = useRef();
    const [formData, setFormData] = useState(Object.assign({},{
        resume:profileInfo[0].resume,
        fullName:profileInfo[0].fullName,
        professionalTitle:profileInfo[0].professionalTitle,
        title: profileInfo[0]?.experience[0]?.title,
        company: profileInfo[0]?.experience[0]?.company,
        years: profileInfo[0]?.experience[0]?.years,
        degree:profileInfo[0]?.education[0]?.degree,
        institution:profileInfo[0]?.education[0]?.institution,
        year: profileInfo[0]?.education[0]?.year,
        skills:'',
        
    }))

    console.log(profileInfo)
    

    const navigateTo = useNavigate();
    
    const createProfile = useCreateProfile();
    const user = tokenService.getUser();
    

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData({ ...formData, [name]:value });
    }

    const handleDragDrop = (e) => {
        e.preventDefault();
        setIsHovering(false);
        const droppedFile = e.dataTransfer.files[0];
        if (droppedFile && droppedFile.type === 'application/pdf') {
          setFile(droppedFile);
        } else {
          toast.error('Only PDF files are allowed');
        }
      };
    
      const handleDragOver = (e) => {
        e.preventDefault();
        setIsHovering(true);
      };
    
      const handleDragLeave = () => {
        setIsHovering(false);
      };
    
      const handleFileSelect = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
      };
    
      const handleUploadButtonClick = () => {
        fileRef.current.click();
      };
      

    

    const handleRemoveSkill = (skill)=>{
        const updatedSkill = skillsData.filter((item) => item !== skill);
        setSkillsData(updatedSkill);
        toast.success('skill removed!')
    }

    const handleSubmitSkill = ()=>{
        if(!formData.skills){
            toast.error('you need to provide a skill');
            return;
        }
        setSkillsData(prev => ([...prev, formData.skills]));
        setFormData({ ...formData, skills:'' });
        toast.success('new skill added!')
    }

    const handleSubmitProfile = async()=>{

        const payload = {
            userId:user.id,
            fullName:formData.fullName,
            professionalTitle:formData.professionalTitle,
            resume:formData.resume,
            education:[
                {
                    degree:formData.degree,
                    institution:formData.institution,
                    year: formData.year,
                }
            ],
            experience: [
                {
                    title: formData.title,
                    company: formData.company,
                    years: formData.years,
                }
            ],
            skills:skillsData,
        }

        // const newFormData = new FormData();
        // newFormData.append('userId', user.id);
        // newFormData.append('education[0][degree]', formData.degree);
        // newFormData.append('education[0][institution]', formData.institution);
        // newFormData.append('education[0][year]', formData.year);
        // newFormData.append('experience[0][title]', formData.title);
        // newFormData.append('experience[0][company]', formData.company);
        // newFormData.append('experience[0][years]', formData.years);
        // newFormData.append('skills', skillsData);

        

        // if (file) {
        //     newFormData.append('resume', file);
        // }

        // for (const [key, value] of newFormData) {
        //     console.log(`${key}:`, value);
        //   }
       
        try {
            setLoading(true)
            const { status, data } = await createProfile(payload);
            if(status===200){
                toast.success(data.message);
                // setTimeout(()=>{
                //     navigateTo('/dashboard/user')
                // }, 1000)
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='w-[65vw] my-10 font-Montserrat pb-[3rem]'>
        <div className=''>
        <button onClick={()=>navigateTo(-1)} className='flex items-center gap-2 mb-10'><span><MdArrowBackIosNew className='text-primary' /> </span> Back </button>
            <div className='bg-white py-5 px-10 rounded-[0.5rem] relative grid grid-cols-1 md:grid-cols-2 gap-5'>
                <div className=''>
                    <h3 className='my-10 font-medium'>Portfolio:</h3>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='fullName'>Enter Full Name</label>
                        <input 
                            name='fullName'
                            type='text'
                            placeholder='enter your full name'
                            className='w-full outline-0 border py-2 px-1 text-gray-700 rounded-[8px]'
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2 mt-3'>
                        <label htmlFor='professionalTitle'>Your Professional Title</label>
                        <input 
                            name='professionalTitle'
                            type='text'
                            placeholder='e.g Social Media Manager'
                            className='w-full outline-0 border py-2 px-1 text-gray-700 rounded-[8px]'
                            value={formData.professionalTitle}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div>
                    <h3 className='my-10 font-medium'>Skills:</h3>
                    <div className='flex items-center'>
                        <div className='w-2/3 flex flex-col gap-2'>
                            <label htmlFor='Skills'>Your Professional Skills</label>
                            <input 
                                name='skills'
                                type='text'
                                placeholder='enter skill'
                                className='w-full outline-0 border py-2 px-1 text-gray-700 rounded-[8px]'
                                value={formData.skills}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='1/3 mt-8'>
                            <button onClick={handleSubmitSkill} className='text-white bg-gray-800 py-2 px-3'>Add Skill</button>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-3 my-3'>
                        {skillsData.length > 0 && (
                            skillsData.map((skill, index)=>(
                                <button 
                                key={index}
                                className='text-white bg-primary py-1 px-3 flex items-center justify-between gap-3 rounded-[0.5rem]'>
                                    {skill} <span onClick={()=>handleRemoveSkill(skill)}>x</span></button>
                            ))
                        )}
                        
                    </div>
                </div>
                <div className=''>
                    <h3 className='my-10 font-medium'>Experience:</h3>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='title'>Enter Job Title</label>
                        <input 
                            name='title'
                            type='text'
                            placeholder='enter job title'
                            className='w-full outline-0 border py-2 px-1 text-gray-700 rounded-[8px]'
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2 mt-3'>
                        <label htmlFor='title'>Enter Company Name</label>
                        <input 
                            name='company'
                            type='text'
                            placeholder='enter company name'
                            className='w-full outline-0 border py-2 px-1 text-gray-700 rounded-[8px]'
                            value={formData.company}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2 mt-3'>
                        <label htmlFor='title'>Enter years of experience</label>
                        <input 
                            name='years'
                            type='number'
                            placeholder='Enter years of experience'
                            className='w-full outline-0 border py-2 px-1 text-gray-700 rounded-[8px]'
                            value={formData.years}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                <div className=''>
                    <h3 className='my-10 font-medium'>Education:</h3>
                    <div className='flex flex-col gap-2'>
                        <label htmlFor='title'>Enter degree</label>
                        <input 
                            name='degree'
                            type='text'
                            placeholder='enter degree'
                            className='w-full outline-0 border py-2 px-1 text-gray-700 rounded-[8px]'
                            value={formData.degree}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2 mt-3'>
                        <label htmlFor='title'>Enter institution</label>
                        <input 
                            name='institution'
                            type='text'
                            placeholder='enter institution'
                            className='w-full outline-0 border py-2 px-1 text-gray-700 rounded-[8px]'
                            value={formData.institution}
                            onChange={handleChange}
                        />
                    </div>
                    <div className='flex flex-col gap-2 mt-3'>
                        <label htmlFor='title'>Enter year</label>
                        <input 
                            name='year'
                            type='number'
                            placeholder='Enter year'
                            className='w-full outline-0 border py-2 px-1 text-gray-700 rounded-[8px]'
                            value={formData.year}
                            onChange={handleChange}
                        />
                    </div>
                </div>
                
                <div>
                    {/* <div 
                        className='w-8/12 text-center border border-dashed border-primary p-10 flex flex-col justify-center items-center'
                        style={{ backgroundColor: isHovering ? '#f0f0f0' : 'white', }}
                        onDrop={handleDragDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}>
                        <span className='text-center'><ImFileText2 className='w-12 h-12 text-primary' /></span>
                        {file ? <span className='text-xxsm font-normal mt-5 border px-2 py-1 rounded-full'>*** {file.name}</span>
                            : <h3 className='text-sm font-normal mt-5'>{isHovering ? 'Drop file here' : 'Drag and drop your files here'}</h3>
                        }
                    
                    </div>
                    <div className='w-8/12'>
                        <input 
                            ref={fileRef}
                            name='resumeFile' 
                            onChange={handleFileSelect}
                            id="resumeFile"
                            type="file"
                            accept=".pdf"
                            style={{ display: 'none' }}
                        />
                        <Button onClick={handleUploadButtonClick}>Upload from device</Button>  
                    </div> */}
                    <h3 className='my-5 font-medium'>Resume File URL</h3>
                    <div className='flex items-center'>
                        <div className='w-full'>
                            {/* <label htmlFor='title'>Enter institution</label> */}
                            <input 
                                name='resume'
                                type='text'
                                placeholder='enter a link to your resume'
                                className='w-full outline-0 border py-2 px-1 text-gray-700 rounded-[8px]'
                                required 
                                pattern="https?://.+"
                                value={formData.resume}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <button onClick={handleSubmitProfile}  className='bg-primary w-full rounded-[0.5rem] text-white py-2 mt-4'>{loading ? 'processing' : 'Update Profile'}</button>
    </div>
  )
}

export default UpdateProfile