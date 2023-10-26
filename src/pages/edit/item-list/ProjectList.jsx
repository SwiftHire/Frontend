import React, { useState } from 'react';
import { Projects } from '../Projects';
import carretDown from '../../../assets/svg/carret-down.svg';
import carretUp from '../../../assets/svg/carret-up.svg';
import deleteIconRed from '../../../assets/svg/delete-icon-red.svg';
import editIcon from '../../../assets/svg/edit-icon.svg';

const ProjectList = ({ projectForm, handleSaveToArray, handleDeleteProject,  isLoading }) => { 
    const [selectedProject, setSelectedProject] = useState([]);
    const [showItems, setShowItems] = useState(true);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleToggle = () => {
        setShowItems(!showItems);
    };
  
    const handleUpdate = (title) => {
        const selected = projectForm.projects.find((project) => project.title === title);
        setSelectedProject(selected);
        setIsEditMode(true); // Set the edit mode to true
    };

    const handleProjectsSave = async () => {
        // Find the index of the project item to be updated if in edit mode
        const indexToUpdate = isEditMode
            ? projectForm.projects.findIndex(
                (project) => project._id === selectedProject._id
            )
            : -1;
      
        // Create a new project array with the updated data if in edit mode, otherwise add the new project item
        const updatedProject = indexToUpdate !== -1
            ? [
                ...projectForm.projects.slice(0, indexToUpdate),
                selectedProject,
                ...projectForm.projects.slice(indexToUpdate + 1),
            ]
            : [...projectForm.projects, selectedProject];
      
        // Call the general handleSaveToArray function with the updated project data
        await handleSaveToArray({ projects: updatedProject });
      
        // Reset the edit mode and selected project state
        setIsEditMode(false);
        setSelectedProject({});
    };

    return (
        <div className='flex justify-between gap-5 mt-1'>
            <div className='w-8/12'>
                <Projects 
                    projectForm={projectForm} 
                    selectedProject={selectedProject}
                    setSelectedProject={setSelectedProject}
                    handleSaveToArray={handleProjectsSave}
                    isEditMode={isEditMode}
                    setIsEditMode={setIsEditMode}
                    isLoading={isLoading}
                />
            </div>
            <div className='w-3/12 mt-10'>
                <div onClick={handleToggle} 
                    className='flex items-center justify-between 
                    border border-[#E4E6F1] px-4 py-2 rounded-[0.5rem] cursor-pointer'>
                    <h3>Your Project History</h3> 
                    {showItems ? <span><img src={carretUp} alt="mjorgrn carret" /></span> 
                        : <span><img src={carretDown} alt="mjorgrn carret" /></span>}
                </div>
                {
                    showItems && <>
                        {projectForm.projects?.map((project, index)=>(
                            <div key={index} className='flex gap-5 items-center justify-between mt-5 
                        bg-[#F8F9FA] rounded-[0.5rem] px-3 py-1'>
                                <span>{project.title}</span>
                                <div className='flex items-center gap-1'>
                                    <span onClick={() => handleUpdate(project.title)} 
                                        className='cursor-pointer'><img src={editIcon} alt="" /></span>
                                    <span onClick={()=> handleDeleteProject({
                                        property:'projects',
                                        value:project?._id
                                    })} 
                                        className='cursor-pointer'><img src={deleteIconRed} alt="" /></span>
                                </div>
                            </div>
                        ))}
                    </>
                }

            </div>
        </div>
    );
};

export default ProjectList;