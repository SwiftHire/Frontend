import React from 'react';
import ShowCaseImages from './ShowCaseImages';
import ShowCaseTitle from './ShowCaseTitle';
import imageOne from '../../assets/jpg/resume-image-1.jpg';
import imageTwo from '../../assets/jpg/resume-image-2.jpg';
import imageFive from '../../assets/jpg/resume-image-5.jpg';
import imageSix from '../../assets/jpg/resume-image-6.jpg';

const ShowCase = () => {
    return (
        <div className='my-10 mb-[10rem]'>
            <ShowCaseTitle/>
            <ShowCaseImages imageOne={imageOne} imageTwo={imageTwo} imageFive={imageFive} imageSix={imageSix}/>
        </div>
    );
};

export default ShowCase;