import React from 'react';

const Features = ({ reverse, image, subTitle, title, content }) => {
    return (
        <div className={`${reverse === 'reverse' && 'lg:flex-row-reverse'} 
        flex flex-col lg:flex-row lg:items-center gap-10 my-5 md:w-8/12`}>
            <div className=''>
                <img src={image} alt={title} />
            </div>
            <div className='w-full md:w-2/5'>
                <small className='px-2 py-2 text-xsm uppercase font-bold text-primary'>{subTitle}</small>
                <h6 className='text-sm uppercase py-4 font-bold'>{title}</h6>
                <p className='text-[15px] font-normal'>{content}</p>
            </div>
        </div>
    );
};

export default Features;