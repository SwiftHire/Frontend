import React from 'react';

export const BackLinks = ({ children, ...props }) => {
    return (
        <button className='flex items-center gap-5 font-bold' {...props}>
            { children }
        </button>
    );
};

