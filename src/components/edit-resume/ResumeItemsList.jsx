import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';
import { BackLinks } from '../backlink/BackLinks';
import Button from '../button/Button';
import ResumeItems from './ResumeItems';
import ResumePopUp from './ResumePopUp';

import { PageLoader } from '../loaders';

const ResumeItemsList = ({ loadingResume, items,  onDeleteResume }) => {
    const [openRenameForm, setOpenrenameForm] = useState(false);
    const [selectedResume, setSelectedResume] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);
    const resumesPerPage = 4;
    //const totalPages = Math.ceil(items.length / resumesPerPage);

    const startIndex = currentPage * resumesPerPage;
    const lastIndex = startIndex + resumesPerPage;

    const displayedResumes = items.slice(startIndex, lastIndex);

    const handleSelectedResume = (item)=>{
        setSelectedResume(item);
    };

    const handleCloseSelectedItem = ()=>{
        setSelectedResume(null);
    };

    const handlePageChange = (direction)=>{
        if(direction==='next'){
            setCurrentPage(currentPage=>currentPage+1);
        }else if(direction==='prev'){
            setCurrentPage(currentPage=>currentPage-1);
        }
    };

    const toggleRenameForm = ()=>{
        setOpenrenameForm(!openRenameForm);
    };

    const navigateTo = useNavigate();
    if(loadingResume){
        return <PageLoader>Loading...</PageLoader>;
    }

    

    if(displayedResumes.length===0){
        return <div className='h-[70vh] w-[80vw] grid place-items-center px-5 lg:px-0 text-center'>
                <div className='w-full lg:w-5/12 shadow-secondary px-5 lg:px-10 py-10 rounded-[1rem]'>
                    <div>
                        <h3>Your resume libray is empty</h3>
                        <Button onClick={() => navigateTo('/resumai/start-crafting')}>Start Crafting</Button>
                    </div>
                </div>
            </div>
            
    }
    return (
        <div className='mt-10 relative'>
            <div className='grid grid-cols-1 lg:grid-cols-4 gap-5'>
                {displayedResumes.map((item)=>(
                    <div key={item.requestId} className='relative'>
                        <ResumeItems item={item} selectedResume={selectedResume}
                            openRenameForm={openRenameForm} 
                            onClick={()=>handleSelectedResume(item)}/>
                        {selectedResume && selectedResume.requestId === item.requestId && (
                            <div className='w-8/12 h-[40%] absolute bottom-[5rem] 
                            right-3 py-4 bg-body shadow-resumeEdit rounded-[0.5rem]'>
                                <ResumePopUp 
                                    selectedResume={selectedResume} 
                                    toggleRenameForm={toggleRenameForm}
                                    onClose={handleCloseSelectedItem}
                                    onDeleteResume={onDeleteResume}
                                />
                            </div>
                        )}
                    </div>
                    
                ))}
                {/* <div className='absolute top-0 right-0'>
                    {selectedResume && <ResumePopUp selectedResume={selectedResume} />}
                </div> */}
            </div>
            
            <div className={`${items.length < 5 && 'hidden'} mt-10 flex gap-5 absolute top-[30%] -right-[8rem]`}>
                {currentPage !== 0 ? 
                    <BackLinks onClick={() => handlePageChange('prev')} 
                    ><BsArrowLeft/>Previous </BackLinks>
                    : <BackLinks onClick={() => handlePageChange('next')}
                    ><BsArrowRight/>Next </BackLinks> }
            </div>
        </div>
    );
};

export default ResumeItemsList;