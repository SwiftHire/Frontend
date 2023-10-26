/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import { BsArrowRight, BsArrowLeft, BsCalendarCheck } from 'react-icons/bs';
import { useGenerateData } from '../../hooks/useGenerateData';
import { useCreditsCalculator } from '../../contexts/CreditsCalculator';
import Button from '../../components/button/Button';
import {  GenerateBtn, GenerateLoadingIcon } from '../../assets/styled-components/BulletPointsStyled';

import generateBtnWhite from '../../assets/svg/generateBtn-icon.svg';

import hrManager from '../../assets/jpg/majorgen-hr.jpg';

import JobDetailsForm from './JobDetailsForm';
import GetCreditsModal from '../../components/generate/GetCreditsModal';

export const WorkExperience = ({ workExperienceForm, selectedWorkExperience, setSelectedWorkExperience, handleSaveToArray, isEditMode,
    setIsEditMode, loader, handleSaveJobDetails }) => {
        
    const { position, jobDescription, language, name, email, requestId } = workExperienceForm || {};
    const { generateNewdata, loading, apiBulletPoints } = useGenerateData();
    const [bulletPointsData, setBulletPointsData] = useState([]);
    const [text, setText] = useState([]);


    //crdits checker + modal
    const [showModal, setShowModal] = useState(false);
    const { updateUserCredits, userCredits } = useCreditsCalculator();
    const [isTitleEmpty, setIsTitleEmpty] = useState(true);

    //building a custom date
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const [showStartdate, setShowStartdate] = useState(false);
    const [showEndDate, setShowEndDate] = useState(false);
    const [selectedYearStart, setSelectedYearStart] = useState(2015);
    const [selectedYearEnd, setSelectedYearEnd] = useState(2023);
    const [selectedMonthStart, setSelectedMonthStart] = useState('');
    const [selectedMonth, setSelectedMonth] = useState('');
    const [checkBoxValue, setCheckBoxValue] = useState('');

    const month = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const getDefaultMonth = (monthVal) => {
        const defaultMonth = 'Jan'; 
        for (let i = 0; i < months.length; i++) {
          if (i === monthVal) {
            return months[i];
          }
        }
        return defaultMonth; 
      };

    const getSelectedStartDate =()=>{
        return selectedMonthStart ? selectedMonthStart + ' ' + selectedYearStart.toString() : getDefaultMonth(month) + ' ' + selectedYearStart.toString()
    }

    const getSelectedEndDate = () =>{
        if(checkBoxValue){
            return checkBoxValue
        }else{
            return selectedMonth ? selectedMonth + ' ' + selectedYearEnd.toString() : getDefaultMonth(month) + ' ' + selectedYearEnd.toString()
        }
    }


    const toggleShowStartDate = ()=>{
        setShowStartdate(!showStartdate);
    }
    const toggleShowEndDate = ()=>{
        setShowEndDate(!showEndDate);
    }

    const yearForward =()=>{
        if(selectedYearStart < currentYear){
            setSelectedYearStart(selectedYearStart + 1);
        }else{
            return
        }
    }
    const yearBackward =()=>{
        if(selectedYearStart > 1996){
            setSelectedYearStart(selectedYearStart - 1);
        }else{
            return
        }
    }
    const yearForwardEnd =()=>{
        if(selectedYearEnd < currentYear){
            setSelectedYearEnd(selectedYearEnd + 1);
        }else{
            return
        }
    }
    const yearBackwardEnd =()=>{
        if(selectedYearEnd > 1996){
            setSelectedYearEnd(selectedYearEnd - 1);
        }else{
            return 
        }
    }

    const handleSelectedMonthStart = (month)=>{
        setSelectedMonthStart(month);
    }
    const handleSelectedMonthEnd = (month)=>{
        setSelectedMonth(month);
    }

    const handleChangeCheckBox = (e)=>{
        const { checked } = e.target;
        if (checked) {
            setCheckBoxValue("present");
        } else {
            setCheckBoxValue("");
        }
    }

    useEffect(() => {
        setSelectedWorkExperience((prevWorkExperience) => ({
          ...prevWorkExperience,
          dateStart: getSelectedStartDate()
        }));
      }, [selectedMonthStart, selectedYearStart]);

    useEffect(() => {
        setSelectedWorkExperience((prevWorkExperience) => ({
          ...prevWorkExperience,
          dateEnd: getSelectedEndDate()
        }));
      }, [selectedMonth, selectedYearEnd, checkBoxValue]);
    
    // end custom date functions

    const handleToggleModal = () => {
        setShowModal(!showModal);
    };

    useEffect(()=>{
        updateUserCredits()
    },[userCredits])

    // end credits checker + modal

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'bulletPoints') {
          const lines = value.split('\n');
          const lastLine = lines[lines.length - 1];
          const bulletPoint = '• ';
          if (!lastLine.startsWith(bulletPoint)) {
            lines[lines.length - 1] = bulletPoint + lastLine;
          } else if (lastLine.trim() === bulletPoint.trim()) {
            lines[lines.length - 1] = '';
          }
          const newValue = lines.join('\n');
          setSelectedWorkExperience((prevData) => ({ ...prevData, [name]: newValue.split('\n') }));
        } else {
          setSelectedWorkExperience((prevData) => ({ ...prevData, [name]: value }));
        }
      };
      

    useEffect(()=>{
        setSelectedWorkExperience((prevWorkExperience) => ({
            ...prevWorkExperience,
            bulletPoints: apiBulletPoints
          }));
    }, [apiBulletPoints]);

    useEffect(() => {
        const typingDelay = 10;
        let typingText = [];
      
        if (apiBulletPoints) {
          typingText = apiBulletPoints.join('\n');
        }
      
        let currentIndex = 0;
        let timeoutId;
      
        const typeCharacter = () => {
          setText((prevText) => prevText + typingText[currentIndex]);
      
          currentIndex++;
      
          if (currentIndex < typingText.length) {
            timeoutId = setTimeout(typeCharacter, typingDelay);
          }
        };
      
        timeoutId = setTimeout(typeCharacter, typingDelay);
      
        return () => {
          clearTimeout(timeoutId);
        };
      }, [apiBulletPoints]);
      
  
    const placeholder = {
        position: 'Software Engineer',
        company: 'Google',
        dateStart: '2022-01',
        // dateEnd: presentDate,
        location: 'New York, Ny',
        description:
      'responsible for delivering impactful features, documenting, refactoring code...',
    };

    

    useEffect(() => {
        setIsTitleEmpty(!selectedWorkExperience?.title);
    }, [selectedWorkExperience?.title]);

      

    const { ...payload } = selectedWorkExperience;

    const handleAddworkExperience = () => {
        const workExperience = [...workExperienceForm.workExperience, payload];
        handleSaveToArray({ workExperience: workExperience });
    };

    const handleUpdateWorkExperience = () => {
        const updatedWorkExperience = workExperienceForm.workExperience.map((workExperience) => {
            if (workExperience._id === selectedWorkExperience._id) {
                return selectedWorkExperience;
            } else {
                return workExperience;
            }
        });
        handleSaveToArray({ workExperience: updatedWorkExperience });
        setIsEditMode(false);
    };

    const generatePayload = {
        requestId,
        type:'workExperience',
        position,
        language,
        name,
        email,
        jobDescription
    };

    async function creditsCheck(){
        if(userCredits===0){
            handleToggleModal();
        }else{
            generateNewdata(generatePayload);
        }
    }

    if((jobDescription==='' && position==='') || (jobDescription === undefined && position===undefined)){
        return <>
            <div className='w-full h-screen  absolute top-0 left-0 bg-body/90'>
                <div className='h-full w-10/12 m-auto py-3 flex flex-col items-center justify-center'>
                    <div className='w-6/12 text-left'>
                    <h1 className='text-[0.9rem] lg:text-[2rem] text-primary font-bold capitalize'>Unlock the Perfect Resume with SwiftHire! 🚀</h1>
                        <p className='text-sm'>Simply provide your desired position and job description, and let our powerful AI create an eye-catching, professional resume and cover letter tailored just for you!🌟📄💼</p>
                    </div>
                <JobDetailsForm formData={workExperienceForm} handleSaveToArray={handleSaveJobDetails} isLoading={loader}/>
                </div>
            </div>
        </>
    }

    return (
        <div className='shadow-secondary px-10 py-5'>
            <div className="w-full grid grid-cols-1 my-1">
                <label htmlFor='title' className="text-sm font-normal mb-2 ml-1">What was your position at the company ?</label>
                {isTitleEmpty && <span className='text-danger'><sup>***</sup> this field cannot be empty</span>}
                <input 
                    name="title"
                    type="text"
                    value={selectedWorkExperience?.title}
                    onChange={handleChange}
                    placeholder={placeholder.position}
                    required
                    className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
            </div>
            <div className='flex items-center gap-5'>
                <div className="w-full grid grid-cols-1 my-1 relative">
                    <div className='rounded-[0.5rem] border-2 border-blue-500 cursor-pointer' onClick={toggleShowStartDate}>
                        <div className='flex items-center justify-between px-5 py-2'>
                            <h3>{selectedWorkExperience?.dateStart !==undefined ? selectedWorkExperience?.dateStart : getSelectedStartDate()}</h3>
                            <span><BsCalendarCheck/></span>
                        </div>
                    </div>
                    {showStartdate && (
                        <div className='w-full absolute top-[3rem] px-5 py-3 shadow-lg bg-body'>
                            <div className='flex items-center justify-between py-3'>
                                <span onClick={yearBackward} className='cursor-pointer py-2 px-2'><BsArrowLeft/></span>
                                <span>{selectedYearStart}</span>
                                <span className='cursor-pointer py-2 px-2' onClick={yearForward}><BsArrowRight/></span>
                            </div>
                            <div className='grid grid-cols-4 gap-2'>
                                {months.map((month, index)=>(
                                    <button key={index} onClick={()=>handleSelectedMonthStart(month)} 
                                    className='border rounded-[0.5rem]'>{month}</button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-full grid grid-cols-1 my-1 relative">
                    <div className='rounded-[0.5rem] border-2 border-blue-500 cursor-pointer' onClick={toggleShowEndDate}>
                        <div className='flex items-center justify-between px-5 py-2'>
                            <h3>{selectedWorkExperience?.dateEnd !==undefined ? selectedWorkExperience?.dateEnd : getSelectedEndDate()}</h3>
                            <span><BsCalendarCheck/></span>
                        </div>
                    </div>
                    {showEndDate && (
                        <div className='w-full absolute top-[3rem] px-5 py-1 shadow-lg bg-body'>
                            <div className='flex items-center justify-between py-3'>
                                <span onClick={yearBackwardEnd} className='cursor-pointer py-2 px-2'><BsArrowLeft/></span>
                                <span>{selectedYearEnd}</span>
                                <span className='cursor-pointer py-2 px-2' onClick={yearForwardEnd}><BsArrowRight/></span>
                            </div>
                            <div className='grid grid-cols-4 gap-2'>
                                {months.map((month, index)=>(
                                    <button key={index} onClick={()=>handleSelectedMonthEnd(month)} 
                                    className='border rounded-[0.5rem]'>{month}</button>
                                ))}
                            </div>
                            <div className='flex gap-5 mt-6'>
                                <input 
                                    type="checkbox" 
                                    name="present" 
                                    id="present" 
                                    className='accent-primary border border-primary border-2 h-[1.5rem] w-[1.5rem]' 
                                    onChange={handleChangeCheckBox}
                                 />
                                <label htmlFor="present">I currently work here</label>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="w-full grid grid-cols-1 my-1">
                <label htmlFor='name' className="text-sm font-normal mb-2 ml-1">Company name</label>
                <input 
                    name="company"
                    type="text"
                    value={selectedWorkExperience?.company}
                    onChange={handleChange}
                    placeholder={placeholder.company}
                    className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
            </div>
            <div className="w-full grid grid-cols-1 my-2">
                <label htmlFor='name' className="text-sm font-normal mb-2 ml-1">Company location</label>
                <input 
                    name="location"
                    type="text"
                    value={selectedWorkExperience?.location}
                    onChange={handleChange}
                    placeholder={placeholder.location}
                    className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
            </div>
            <div className="w-full grid grid-cols-1 my-1">
                <div className='flex justify-between items-center'>
                    <label htmlFor='bulletPoints' className="text-sm font-normal mb-2 ml-1">What did you do at the company?</label>
                    <div>
                        <GenerateBtn primary onClick={() =>{
                            creditsCheck();
                        }}> {loading ? <GenerateLoadingIcon/> : <img src={generateBtnWhite} alt="" />}   
                            {bulletPointsData?.length > 2 ? 'AI Writer' : 'AI Writer'} </GenerateBtn>
                    </div>
                </div>
                <textarea 
                        rows={5}
                        name="bulletPoints"
                        maxLength={5000}
                        value={selectedWorkExperience?.bulletPoints?.join('\n')}
                        onChange={handleChange}
                        placeholder={placeholder.description}
                        className='w-full text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4 mt-2' />
            </div>
            {/* <Button onClick={handleSubmit}>Save to work experience</Button> */}
            <Button onClick={() => {
                if (isEditMode) {
                    handleUpdateWorkExperience();
                } else {
                    handleAddworkExperience();
                }
            }} disabled={isTitleEmpty}>
                {loader ? 'saving' : 'Save to WorkExperience'}  { loader && <GenerateLoadingIcon/>}
            </Button>
            {showModal && (
                <GetCreditsModal 
                    handleToggleModal={handleToggleModal}
                    imageSrc={hrManager}
                />
            )}
        </div>
    );
};

export default WorkExperience;

