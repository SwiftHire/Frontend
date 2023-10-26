import React, { useState, useEffect } from 'react';
import Button from '../../components/button/Button';
import { GenerateLoadingIcon } from '../../components/generate/GenerateDataStyled';

import carretDown from '../../assets/svg/carret-down.svg';
import carretUp from '../../assets/svg/carret-up.svg';
import deleteIconRed from '../../assets/svg/delete-icon-red.svg';

const SkillsForm = ({ formData, handleSaveToArray, handleDeleteProperty, loader }) => {


    const [skill, setSkill] = useState({ skills:'' });
  

    // toggle list of skills
    const [showItems, setShowItems] = useState(true);
    const [showRating, setShowRating] = useState(false);
    const [selectedRating, setSelectedRating] = useState('');
    const [isSkillEmpty, setIsSkillEmpty] = useState(true);


    useEffect(()=>{
        if((skill.skills.length > 3) &&  (selectedRating !=='')){
            setIsSkillEmpty(false);
        }
    },[skill.skills, selectedRating]);

    const handleToggle = () => {
        setShowItems(!showItems);
    };

    const handleToggleRating = ()=>{
        setShowRating(!showRating);
    }

    const handleSelectedRating = (rating) =>{
        setSelectedRating(rating);
    }

    // end toggle list of skills

    const handleChange = (event) => {
        const { name, value: val } = event.target;
        setSkill({ ...skill, [name]: val });
    };

    function handleAddSkill(payload){
        const data = {
            skill:payload.skills,
            rating:selectedRating
        }
        const skills = [...formData.skill, data]
         handleSaveToArray({ skill:skills })
    };

    function handleDeleteSkill(val){
            console.log(val, 'val');
            handleDeleteProperty({skill:val})
    };

   

    const ratings = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

    return (
        <>
            <div className='md:ml-10 grid grid-cols-3 gap-10'>
                <div>
                    <div className="w-full grid grid-cols-1 my-1">
                        <label htmlFor='skills' className="text-sm font-normal mb-2 ml-1">
                            Add Skill  </label>
                        <input 
                            type="text"
                            id="skills"
                            name='skills'
                            placeholder='React, Java, Ruby'
                            value={skill.skills}
                            onChange={ handleChange }
                            className='text-placeholder text-sm font-light py-2 px-2 
                            outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                    </div>
                </div>
                <div className='w-full grid grid-cols-1 my-1 relative'>
                    <div>
                        <h3 className="text-sm font-normal mb-2 ml-1">Select Rating</h3>
                        <div onClick={handleToggleRating} className='flex items-center justify-between 
                        border border-[#E4E6F1] px-4 py-2 rounded-[0.5rem] cursor-pointer'>
                        <span>{selectedRating ? selectedRating : '- - - - - -'}</span> <span>Rating</span>
                        </div>
                        {showRating && (
                            <div className='w-full rounded-[0.5rem] mt-2 shadow-square py-2 absolute'>
                            <ul>
                                { ratings.map((rating, index)=>(
                                    <li onClick={() => {
                                        handleSelectedRating(rating);
                                        handleToggleRating();
                                    }} 
                                    className='cursor-pointer my-2 font-normal text-sm font-satoshi px-5 py-1 hover:bg-lavender' key={index}>{rating}</li>
                                )) }
                            </ul>
                        </div>
                        )}
                    </div>
                </div>
                <div className='relative'>
                    <div className='mt-10'>
                        <div onClick={handleToggle} className='flex items-center justify-between border border-[#E4E6F1] px-4 py-2 rounded-[0.5rem] cursor-pointer'>
                        <h3>Your Skills List</h3> 
                        {showItems ? <span><img src={carretUp} alt="mjorgrn carret" /></span> : <span><img src={carretDown} alt="mjorgrn carret" /></span>}
                        </div>
                        {
                        showItems && 
                            formData?.skill?.map((skill, index) => (
                            <div key={index} 
                            className='w-full flex gap-5 items-center justify-between mt-10 
                            bg-[#F8F9FA] rounded-[0.5rem] px-3 py-1 absolute' style={{ top: `${(index + 1) * 3}rem` }}>
                                <h4>{skill.skill} - <span className='text-primary'>{skill.rating}</span></h4>
                                <div className='flex items-center gap-1'>
                                {/* <span className='cursor-pointer'><img src={editIcon} alt="" /></span> */}
                                <span className='cursor-pointer' onClick={()=>handleDeleteSkill(skill)}><img src={deleteIconRed} alt="" /></span>
                                </div>
                            </div>
                            ))
                        }
                    </div>
                </div>
                <div>
                {isSkillEmpty && <small className='text-red-500'><sup>*</sup>skill and rating is required<sup>*</sup></small>}
                <Button onClick={()=> handleAddSkill(skill)} disabled={isSkillEmpty}>
                    {loader ? 'Saving' : 'Save to Skills'} {loader && <GenerateLoadingIcon/>}
                </Button>
                </div>
            </div>
        </>
    );
};

export default SkillsForm;