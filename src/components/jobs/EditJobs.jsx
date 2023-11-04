import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useEditJob } from '../../hooks/useEditJob';


const EditJobs = ({ handleToggleEditJob, selectedJob, getEmployerJobs }) => {
    const [loading, setLoading] = useState(false);
    const {_id, title, description } = selectedJob;
    const EditJob = useEditJob()
    const [formData, setFormData] = useState(Object.assign({}, {
        title, description
    }));

    const handleChange = (e)=>{
        const { name, value } = e.target;
        setFormData({ ...formData, [name]:value });
    }

    const handleSubmitEditJob = async()=>{
        const payload = {
            title:formData.title,
            description:formData.description,
        }
        try {
            setLoading(true)
            const { status, data } = await EditJob(_id, payload);
            if(status===200){
                toast.success(data.message);
                getEmployerJobs();
                handleToggleEditJob();
            }
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
  return (
    <div className='h-screen w-full fixed top-0 left-0 grid place-items-center bg-primary/70'>
        <div className='w-6/12 bg-white p-10 rounded-[0.5rem] relative'>
            <span className='absolute top-5 right-5 cursor-pointer' onClick={handleToggleEditJob}><FaTimes className='text-primary'/></span>
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
                <textarea
                    cols={10}
                    rows={10} 
                    name='description'
                    type='text'
                    placeholder='enter job description'
                    className='w-full outline-0 border py-1 px-1 text-gray-700 rounded-[8px]'
                    value={formData.description}
                    onChange={handleChange}
                />
            </div>
            <button onClick={handleSubmitEditJob}  className='bg-primary w-full rounded-[0.5rem] text-white py-2 mt-4'>{loading ? 'processing' : 'Submit Changes'}</button>
        </div>
    </div>
  )
}

export default EditJobs