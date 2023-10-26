import React from 'react';

const ResumeStepsCard = ({ type, title, content, image, ...props }) => {
    return (
        <div className='flex flex-col justify-center h-[11.9rem] w-[24rem] font-montserrat rounded-[1rem] bg-body my-1 shadow-sm px-10'>
            <div className='text-[#17141B]'>
                <span>{image}</span>
                <h6 className='text-lg font-bold py-3'>{title}</h6>
                <p className='text-sm'>{content}</p>
            </div>
        </div>
    );
};

export default ResumeStepsCard;