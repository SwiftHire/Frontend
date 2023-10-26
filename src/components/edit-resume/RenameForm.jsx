import React, { useState } from 'react';
import coreClient from '../../services/coreApi';
import { AlertBox } from '../alert-box/AlertBox';

const API_URL = process.env.REACT_APP_API_URL;

const RenameForm = ({ text }) => {
    const [form, setForm] = useState({ resumeName:text });
    const [formData, setFormData] = useState(null);
    const [isLoading,  setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState('');

    function handleChange(e){
        const { name, value } = e.target;
        setForm({ ...form, [name]:value });
    }

    async function handleSaveToArray(value){
        setIsLoading(true);
        setTimeout(async()=>{
            try {
                const response = await coreClient.put(`${API_URL}/resume/${text}/update`, value);
                setFormData({ ...formData, ...response.data.data });
                setIsSuccess(true);
                setMessage(response.data.message);
            } catch (err) {
                console.log(err);
                setIsSuccess(false);
                setMessage('an error occured, pls try again');
            }finally{
                setIsLoading(false);
            }
        },3000);
    }
    return (
        <div className='flex items-center gap-3 absolute top-4'>
            <input 
                type="text"
                name='resumeName'
                value={form.resumeName}
                onChange={handleChange}
                className='w-8/12 h-[2rem] border border-primary'
            />
            <button onClick={()=> handleSaveToArray({ requestId:form.resumeName })} 
                className='bg-primary px-4 py-1 text-body font-normal rounded-[1rem]'>{isLoading ? 'saving...' : 'save'}</button>
            <AlertBox
                isSuccess={isSuccess}
                message={message}
                setIsSuccess={setIsSuccess}
                setMessage={setMessage}
            />
        </div>
    );
};

export default RenameForm;