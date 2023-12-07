import React from 'react';
import Skeleton from 'react-loading-skeleton'

const ApplicantsCardSkeleton = ({ skeletons }) => {
  return (
    <>
        {Array(skeletons).fill(0).map((_, index)=>(
            <div key={index} className='p-10 shadow-lg bg-white rounded-[0.5rem] font-Montserrat'>
                <div className='flex items-center justify-between'>
                    <h1 className='text-sm font-normal'><Skeleton/></h1>
                    <button className='flex items-center gap-2 rounded-full text-xsm px-2 py-1 font-normal'><Skeleton/></button>
                </div>
                <p className='my-5 text-xsm'><Skeleton count={4}/></p>
                <div className='flex items-center justify-between'>
                <button className='rounded-full bg-primary text-white text-xxsm px-2 py-1'><Skeleton/></button>
                <div className='flex items-center gap-5'>
                    <button 
                    className='text-xsm flex gap-2 items-center hover:text-primary'>
                        <Skeleton />
                        </button>
                    <button 
                    className='text-xsm flex gap-2 items-center hover:text-primary'>
                        <Skeleton/> 
                    </button>
                </div>
                </div>
            </div>
        ))}
    </>
    
  )
}

export default ApplicantsCardSkeleton