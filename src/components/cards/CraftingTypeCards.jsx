import React from 'react';

const CraftingTypeCards = ({ type, title, content, rightImage, leftImage, height, ...props }) => {
    return (
        <div className={`${type==='resume' ? 'bg-primary text-body' : 
        'border border-[#E9ECEF] bg-[#FFFFFF]'} h-[${height}rem] w-[21rem] md:w-[24rem] 
        rounded-[8px] py-4 px-5 shadow-lg cursor-pointer hover:-translate-y-1`} {...props}>
            <div className='h-full flex justify-between items-center'>
                <div className='flex items-center gap-5'>
                    <img src={leftImage} alt={title} className='' /> 
                    <div className='flex flex-col items-start'>
                        <small>{title}</small>
                        <span className='font-normal'>{content}</span>
                    </div>
                </div>
                <span><img src={rightImage} alt={title} /></span>
            </div>
        </div>
    );
};

export default CraftingTypeCards;