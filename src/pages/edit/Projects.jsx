import React, { useState, useEffect } from 'react';
import Button from '../../components/button/Button';
import { GenerateLoadingIcon } from '../../components/generate/GenerateDataStyled';

export const Projects = ({ selectedProject, setSelectedProject, projectForm, handleSaveToArray, isEditMode,
    setIsEditMode, isLoading }) => {
    // const { position, jobDescription, requestId } = projectForm || {};
    const [isTitleEmpty, setIsTitleEmpty] = useState(true);

    useEffect(() => {
        setIsTitleEmpty(!selectedProject?.title);
    }, [selectedProject?.title]);

    const placeholder = {
        title: 'Social Media Campaign',
        description:'Developed a comprehensive social media campaign ' + 'to increase brand awareness and customer engagement.',
        link: 'https',
        startDate: '2021',
        endDate: '2022',
        technologies: ['String']
    };
 
    const handleChange = (e) => {
        const { name, value } = e.target;
        // console.log(value, 'value');
        setSelectedProject((prevData) => ({ ...prevData, [name]: value }));
    };

    const { ...payload } = selectedProject;
    // console.log(payload, 'payload');
    
    const project = [
        ...projectForm.projects,
        payload
    ];

    // console.log(project, 'projects ARRAY');

    const handleAddProjects = () => {
        const project = [...projectForm.projects, payload];
        handleSaveToArray({ projects: project });
    };

    const handleUpdateProjects = () => {
        const updatedProject = projectForm.projects.map((project) => {
            if (project._id === selectedProject._id) {
                return selectedProject;
            } else {
                return project;
            }
        });
        handleSaveToArray({ projects: updatedProject });
        setIsEditMode(false);
    };
    
    return (
        <>
            <div className=''>
                <div className="w-full grid grid-cols-1 my-1">
                    <label htmlFor='title' className="text-sm font-normal mb-2 ml-1">Project Title</label>
                    {isTitleEmpty && <span className='text-danger'><sup>***</sup> this field cannot be empty</span>}
                    <input 
                        name="title"
                        autoFocus
                        type="text"
                        value={selectedProject?.title}
                        onChange={handleChange}
                        placeholder={placeholder.title}
                        className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                </div>
                <div className="w-full grid grid-cols-1 my-1">
                    <label htmlFor='link' className="text-sm font-normal mb-2 ml-1">Project Link</label>
                    <input 
                        name="link"
                        type="text"
                        value={selectedProject?.link}
                        onChange={handleChange}
                        placeholder={placeholder.link}
                        className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                </div>
                <div className='flex items-center gap-5'>
                    <div className="w-full grid grid-cols-1 my-1">
                        <label htmlFor='startDate' className="text-sm font-normal mb-2 ml-1">Start Date</label>
                        <input 
                            name="startDate"
                            type="month"
                            min="1959-01"
                            value={selectedProject?.startDate}
                            onChange={handleChange}
                            placeholder={placeholder.startDate}
                            className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                    </div>
                    <div className="w-full grid grid-cols-1 my-1">
                        <label htmlFor='endDate' className="text-sm font-normal mb-2 ml-1">End Date</label>
                        <input 
                            name="endDate"
                            type="month"
                            min="1959-01"
                            value={selectedProject?.endDate}
                            onChange={handleChange}
                            placeholder={placeholder.endDate}
                            className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                    </div>
                </div>
                <div className="w-full grid grid-cols-1 my-1">
                    <label htmlFor='description' className="text-sm font-normal mb-2 ml-1">Project Description</label>
                    <textarea 
                        name="description"
                        value={selectedProject?.description}
                        onChange={handleChange}
                        placeholder={placeholder.description}
                        className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                </div>
                <div className="w-full grid grid-cols-1 my-1">
                    <label htmlFor='technologies' className="text-sm font-normal mb-2 ml-1">Technologies used in Project</label>
                    <textarea
                        name="technologies"
                        value={selectedProject?.technologies}
                        onChange={handleChange}
                        placeholder={placeholder.technologies}
                        className='text-placeholder text-sm font-light py-2 px-2 
                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                </div>
                {/* <Button onClick={handleSubmit}>Save  to Projects</Button> */}
                <Button onClick={() => {
                    if (isEditMode) {
                        handleUpdateProjects();
                    } else {
                        handleAddProjects();
                    }
                }} disabled={isTitleEmpty}>
                    {isLoading ? 'Saving Data' : 'Save to Projects'} {isLoading && <GenerateLoadingIcon/>}
                </Button>

            </div>
        </>
    );
};
