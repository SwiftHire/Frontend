import React from 'react';

const ResumeStepsCard = ({ type, title, content, image, ...props }) => {
    return (
        <div className='flex flex-col justify-center h-[11.9rem] w-[16rem] rounded-[1rem] bg-body my-1 shadow-sm px-10'>
            <div className='text-[#17141B]'>
                <img src={image} alt="" />
                <h6 className='text-xsm font-medium py-3'>{title}</h6>
                <p className='text-xsm'>{content}</p>
            </div>
        </div>
    );
};

export default ResumeStepsCard;