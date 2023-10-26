import React from 'react';
import { CustomSection } from './CustomSection';

const ResumeSectionList = ({ form, formFieldName, handleSaveToArray, handleDeleteProperty, isLoading }) => {

    return (
        <>
            {
                <CustomSection
                    formFieldName={formFieldName}
                    form={form}
                    handleSaveToArray={handleSaveToArray}
                    handleDeleteProperty={handleDeleteProperty}
                    isLoading={isLoading}
                />
            }
        </>
    );
};

export default ResumeSectionList;