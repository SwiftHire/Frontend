import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import Button from '../../components/button/Button';

const PricingCard = ({ plans, ...props }) => {

  // console.log(`Plan Name: ${plans.name}`); // Added console.log to list out the plan name

  // console.log(`Plan price: ${plans.price}`); // Added console.log to list out the plan price

  return (
    <div className='w-[24rem] cursor-pointer border border-[#E4E6F1] 
    shadow-resumeEdit p-10 rounded-[0.5rem] hover:scale-105 mt-10  hover:bg-primary/5' {...props}>
        <div>
          <h3 className='text-[#17141B] text-[1.5rem] font-bold'>{ plans.name }</h3>
          <span className='text-[#756790] text-sm my-2'>{ plans.title }</span>
        </div>
        <div>
          <div className='flex justify-between items-end'>
            <h3 className='text-[#17141B] text-[1.9rem] font-medium'>
            {plans.name === 'Free' ? '' : `€${plans.price}`}
            <span className='text-[#3C3446] text-sm font-light'>
       {plans.name === 'Free' ? '' : `/resume`}
              </span></h3>
            {/* <span className='text-[#756790] text-sm -translate-y-2'><sup className='text-red-500'>*</sup> billed annually</span> */}
          </div>
        </div>
        <button className= { plans.name === 'Free' || plans.name === 'Basic On Demand' ? 'w-full py-3 px-5 bg-[#F7F2FF] text-primary rounded-[0.5rem] my-5' 
        : 'w-full py-3 px-5 bg-primary text-body rounded-[0.5rem] my-5' }>Select Plan</button>
        <div>
        {
          plans.features.map((feature, index)=>(
            <div className='my-2 flex items-center gap-3' key={index}>
              <span className='text-primary'><AiOutlineCheck/></span>
                <span className='text-sm text-[#756790]'>{feature}</span>
            </div>
          ))
        }
        </div>
    </div>
  )
}

export default PricingCard
