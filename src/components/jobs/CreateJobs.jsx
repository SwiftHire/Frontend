import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'
import { useCreateJobs } from '../../hooks/useCreateJobs';
import tokenService from '../../services/token.service';

const CreateJobs = ({ handleToggleCreateJob }) => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title:"",
        description:"",
    })

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData({ ...formData, [name]:value });
    }

    const createJob = useCreateJobs();
    const user = tokenService.getUser();

    const handleSubmitJob = async()=>{
        const payload = {
            title:formData.title,
            description:formData.description,
            userId:user.id
        }
        try {
            setLoading(true)
            const { status, data } = await createJob(payload);
            console.log(data, 'created')
            if(status===201){
                handleToggleCreateJob();
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='h-screen w-full fixed top-0 left-0 grid place-items-center'>
        <div className='w-5/12 bg-white p-10 rounded-[0.5rem] relative'>
            <span className='absolute top-5 right-5' onClick={handleToggleCreateJob}><FaTimes className='text-primary'/></span>
            <div className='flex flex-col gap-2'>
                <label htmlFor='title'>Enter Job Title</label>
                <input 
                    name='title'
                    type='text'
                    placeholder='enter job title'
                    className='w-full outline-0 border py-1 px-1 text-gray-700 rounded-[8px]'
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>
            <div className='flex flex-col gap-2 mt-3'>
                <label htmlFor='title'>Enter Job Description</label>
                <input 
                    name='description'
                    type='text'
                    placeholder='enter job description'
                    className='w-full outline-0 border py-1 px-1 text-gray-700 rounded-[8px]'
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <button onClick={handleSubmitJob}  className='bg-primary w-full rounded-[0.5rem] text-white py-2 mt-4'>{loading ? 'processing' : 'Create Job'}</button>
        </div>
    </div>
  )
}

export default CreateJobs