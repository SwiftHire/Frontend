import React  from 'react';
import { WorkExperienceList, EducationList, ProjectList, CertificationsList } from './item-list';

export const CustomSection = ({ form, formFieldName, handleSaveToArray, handleDeleteProperty, isLoading }) => { 
    switch(formFieldName) {
        case 'workExperience': {
            return (
                <WorkExperienceList 
                    workExperienceForm={form}
                    handleSaveToArray={handleSaveToArray}
                    handleDeleteWorkExperience={handleDeleteProperty}
                    isLoading={isLoading}
                />
                
            );
        }
        case 'education': {
            return (
                <EducationList 
                    educationForm={form}
                    handleSaveToArray={handleSaveToArray}
                    handleDeleteEducation={handleDeleteProperty}
                    isLoading={isLoading}
                />
            );
        }
        case 'projects': {
            return (
                <ProjectList
                    projectForm={form}
                    handleSaveToArray={handleSaveToArray}
                    handleDeleteProject={handleDeleteProperty}
                    isLoading={isLoading}
                />
            );
        }
        case 'certifications': {
            return (
<CertificationsList
    CertificationForm={form}
    handleSaveToArray={handleSaveToArray}
    handleDeleteCertification={handleDeleteProperty} // Changed this line
    isLoading={isLoading}
/>

            );
        }
        default: {
            return null;
        }
    }
};