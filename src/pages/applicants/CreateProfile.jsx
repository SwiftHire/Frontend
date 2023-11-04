import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBackIosNew } from 'react-icons/md';
import { toast } from 'react-toastify';
import tokenService from '../../services/token.service';
import { useCreateProfile } from '../../hooks/useCreateProfile';
import { Button } from '../../components/button';

const CreateProfile = () => {
    const [loading, setLoading] = useState(false);
    const [skillsData, setSkillsData] = useState([]);
    const [formData, setFormData] = useState({
        fullName:'',
        professionalTitle:'',
        title: '',
        company: '',
        years: '',
        degree:"",
        institution:"",
        year: "",
        skills:'',
        resume:''
    })

    const navigateTo = useNavigate();
    const createProfile = useCreateProfile();
    const user = tokenService.getUser();

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData({ ...formData, [name]:value });
    }

    

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
       
        try {
            setLoading(true)
            const { status, data } = await createProfile(payload);
            if(status===201){
                toast.success(data.message);
                setTimeout(()=>{
                    navigateTo('/dashboard/user')
                }, 1000)
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='w-[65vw] my-10 font-Montserrat pb-[3rem]'>
        <div>
        <button onClick={()=>navigateTo(-1)} className='flex items-center gap-2 mb-10'><span><MdArrowBackIosNew className='text-primary' /> </span> Back </button>
            <div className='bg-white p-10 rounded-[0.5rem] relative grid grid-cols-1 md:grid-cols-2 gap-10'>
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
                    <h3 className='my-5 font-medium'>Resume File URL:</h3>
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
        <button onClick={handleSubmitProfile}  className='bg-primary w-full rounded-[0.5rem] text-white py-2 mt-4'>{loading ? 'processing' : 'Create Profile'}</button>
    </div>
  )
}

export default CreateProfile