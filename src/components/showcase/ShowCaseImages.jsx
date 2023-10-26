import React from 'react';

//bg-gradient-to-r from-[#EBE5FF] via-[#FCF0FF] to-[#FBFBFF]
const ShowCaseImages = ({ imageOne, imageTwo, imageFive, imageSix }) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-4 gap-3 my-10 '>
            <div className='shadow-secondary'>
                <img src={imageFive} alt="" />
            </div>
            <div className='shadow-secondary translate-y-[6rem]'>
                <img src={imageTwo} alt="" />
            </div>
            <div className='shadow-secondary hidden lg:block'>
                <img src={imageOne} alt="" />
            </div>
            <div className='shadow-secondary translate-y-[6rem]'>
                <img src={imageSix} alt="" />
            </div>
        </div>
    );
};

export default ShowCaseImages;