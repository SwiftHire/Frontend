import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../../components/button/Button';
import { Loader } from '../../components/shared/loader/Loader';

const PersonalForm = ({ formData, handleSaveToArray, isLoading, handleSaveImage }) => {
    const { name, email, linkedin, phone, country, city, state, website, address, imageUrl } = formData || {};
    const [personalInfo, setPersonalInfo] = useState(Object.assign({},
        { name, email, linkedin, phone, country, city, state, website, address, imageUrl }));
    const [imageFile, setImageFile] = useState(null);

    const { resumeId } = useParams();
    const hintPlaceholders = {
        name: 'John Doe',
        phone: '+1 123 456 7890',
        email: 'john@gmail.com',
        country: 'United States',
        state: 'California',
        city: 'San Francisco',
        linkedin: 'https://www.linkedin.com/in/johndoe',
        website: 'https://www.johndoe.com',
    };
    const handleChange = (event) => {
        const { name, value: val } = event.target;
        setPersonalInfo({ ...personalInfo, [name]: val });
    };


    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        setImageFile(file);
      };

      const imagePayload = new FormData();
      if(imageFile){
          imagePayload.append('image', imageFile);
      }


    return (
        <div className='w-full mt-5 ml-10 shadow-secondary px-10 py-5'>
            <div className='flex gap-5'>
                <div className='w-6/12'>
                    <div className="w-full grid grid-cols-1 relative my-1">
                        <label htmlFor='name' className="text-sm font-normal mb-2 ml-1">Enter full name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={personalInfo?.name}
                            onChange={handleChange}
                            placeholder={hintPlaceholders.name}
                            className='text-placeholder text-sm font-light py-2 px-2
                        outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                    </div>
                    <div className="w-full grid grid-cols-1 relative my-1">
                        <label htmlFor='email' className="text-sm font-normal mb-2 ml-1">Email address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={personalInfo?.email}
                            onChange={handleChange}
                            placeholder={hintPlaceholders.email}
                            className='text-placeholder text-sm font-light py-2 px-2
                        outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                    </div>
                    <div className="w-full grid grid-cols-1 relative my-1">
                        <label htmlFor='linkedin' className="text-sm font-normal mb-2 ml-1">linkedin url</label>
                        <input
                            type="text"
                            id="linkedin"
                            name="linkedin"
                            pattern="https://.*"
                            value={personalInfo?.linkedin}
                            onChange={handleChange}
                            placeholder={hintPlaceholders.linkedin}
                            className='text-placeholder text-sm font-light py-2 px-2
                        outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                    </div>
                    <div className="w-full grid grid-cols-1 relative my-1">
                        <label htmlFor='phone' className="text-sm font-normal mb-2 ml-1">phone</label>
                        <input
                            type="text"
                            id="phone"
                            name="phone"
                            value={personalInfo?.phone}
                            onChange={handleChange}
                            placeholder={hintPlaceholders.phone}
                            className='text-placeholder text-sm font-light py-2 px-2
                        outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                    </div>
                    <div className="w-full grid grid-cols-1 relative my-1">
                        <label htmlFor='address' className="text-sm font-normal mb-2 ml-1">address</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={personalInfo?.address}
                            onChange={handleChange}
                            placeholder={hintPlaceholders.address}
                            className='text-placeholder text-sm font-light py-2 px-2
                        outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                    </div>
                </div>
                <div className='w-6/12'>
                    <div className="w-full grid grid-cols-1 relative my-1">
                        <label htmlFor='country' className="text-sm font-normal mb-2 ml-1">country</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            value={personalInfo?.country}
                            onChange={handleChange}
                            placeholder={hintPlaceholders.country}
                            className='text-placeholder text-sm font-light py-2 px-2
                        outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                    </div>
                    <div className="w-full grid grid-cols-1 relative my-1">
                        <label htmlFor='country' className="text-sm font-normal mb-2 ml-1">city</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            value={personalInfo?.city}
                            onChange={handleChange}
                            placeholder={hintPlaceholders.city}
                            className='text-placeholder text-sm font-light py-2 px-2
                        outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                    </div>

                    <div className="w-full grid grid-cols-1 relative my-1">
                        <label htmlFor='country' className="text-sm font-normal mb-2 ml-1">state</label>
                        <input
                            type="text"
                            id="state"
                            name="state"
                            value={personalInfo?.state}
                            onChange={handleChange}
                            placeholder={hintPlaceholders.state}
                            className='text-placeholder text-sm font-light py-2 px-2
                        outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                    </div>

                    <div className="w-full grid grid-cols-1 relative my-1">
                        <label htmlFor='country' className="text-sm font-normal mb-2 ml-1">website</label>
                        <input
                            type="text"
                            id="website"
                            name="website"
                            value={personalInfo?.website}
                            onChange={handleChange}
                            placeholder={hintPlaceholders.website}
                            className='text-placeholder text-sm font-light py-2 px-2
                        outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                    </div>
                    <div className='flex items-center gap-5 mt-2'>
                        <div>
                            <label class="block mb-2 text-sm font-normal ml-1 bg-[#F5F3FF] text-primary shadow-lg px-5 py-1 rounded-[0.5rem]" for="imageFile">Upload a photo (this is optional)</label>
                            <input class="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-md file:border-0
                                file:text-sm file:font-semibold
                                file:bg-primary file:text-white
                                hover:file:bg-primary border border-primary rounded-[0.5rem]"
                                aria-describedby="file_input_help"
                                name='imageFile' onChange={handleFileSelect}
                                id="imageFile"
                                type="file"
                                accept="image/*"
                                />
                            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300" id="file_input_help">SVG, PNG, JPG or GIF (MAX. 800x400px).</p>
                        </div>
                        <button
                            className='min-w-3/4 bg-primary text-center px-3 py-2 text-body rounded-[0.5rem] flex items-center gap-1 mt-2'
                            onClick={() => handleSaveImage(imagePayload)}>

                            {/* { loadingImage ? <><span>saving</span> <GenerateLoadingIcon/></> : 'save image'} */}
                            save image
                        </button>
                        {
                            !personalInfo?.imageUrl ? (
                                <div className='animate-pulse h-[5rem] w-[5rem] rounded-full bg-gray-300 mt-1'></div>
                            ) : (
                                <div className='h-[5rem] w-[5rem] rounded-full border-2 shadow-lg mt-1'>
                                <img
                                    src={personalInfo?.imageUrl}
                                    alt='resume profile picture'
                                    className='h-full w-full object-fill rounded-full'
                                />
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>

            {/* <Button onClick={() => handleSaveToArray(personalInfo)}>
                {isLoading ? 'Saving' : 'Save to personal info'} {isLoading && <GenerateLoadingIcon />}
            </Button> */}
            {isLoading ? <Loader /> :  <Button onClick={() => handleSaveToArray(personalInfo)}>
            Save to personal info
            </Button>}
        </div>
    );
};

export default PersonalForm;