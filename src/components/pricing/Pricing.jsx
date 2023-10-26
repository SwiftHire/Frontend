import React from 'react';
import { useNavigate } from 'react-router-dom';
import PricingCard from './PricingCard';

const pricingItems = [
    {
        name:'Basic On Demand',
        title:'Best for basic access',
        price:'1',
        features:[
            'Revamp your resume with AI',
            'Generate 5 new Resume with AI',
            'Generate 5 cover letters with AI',
            'Use AI Writer and Rewrite for Keyword Targeting and Content Analysis,',
            'AI work experience writer',
            'AI Skills writer',
            'Standard Resume Template',
            '10000 AI Credits for resume generation',
        ]
    }
]

const Pricing = () => {
    const navigateTo = useNavigate();
    const templateUrl = '/sign-up'
    return (
        <div className='flex flex-col items-center my-10'>
            <h3 className='px-2 py-2 text-xsm uppercase font-bold text-primary text-center'>pricing</h3>
            <h2 className='text-[2rem] lg:text-xl font-bold text-center'>Select the   
                            <br className='hidden md:block' /> <span className='text-primary'>pricing</span> that works for you</h2>
            <div className='flex flex-col items-center gap-5 md:flex-row md:items-start'>
                {
                    pricingItems.map((plans, index)=>(
                        <div key={index} className='flex justify-center'>
                            <PricingCard 
                                plans={plans}
                                onClick={()=> navigateTo(templateUrl)}
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Pricing
