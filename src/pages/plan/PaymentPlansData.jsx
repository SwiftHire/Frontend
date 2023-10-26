import React, { useState, useEffect } from 'react';
import { IoMdRadioButtonOn } from 'react-icons/io';
// import { usePlans } from '../../hooks/usePlans';
import { useCustomCheckout } from '../../hooks/useCustomCheckout';
// import { useCreditsCalculator } from '../../contexts/CreditsCalculator';
import checkIcon from '../../assets/svg/check-icon.svg';
import Button from '../../components/button/Button';
import { useGetAllPlansContext } from '../../contexts/GetAllPlansContext';

export function PaymentPlansData() {
    const [activeIndex, setActiveIndex] = useState(null);
    // const [plans, setPlans] = useState([]);
    // const userPlanData = useCreditsCalculator();
    // const listPlans = usePlans();
    const rediretToCheckout = useCustomCheckout();

    const { plans, isLoading } = useGetAllPlansContext();
    
    // useEffect(() => {
    //     listPlans(userPlanData).then(({ status, data }) => {
    //         if (status !== 200) return;
    //         setPlans(data);
    //     });
    // }, []);

   
    
    const redirectToCustomCheckout = (planId) => {
        rediretToCheckout(planId).then(({ status, data }) => {
            if (status !== 200) return;
            const { redirectUrl } = data;
            window.open(redirectUrl, '_self');
        });
    };

    const onItemClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className=''>
            {plans.filter((plan)=>(plan.name==='Basic') || (plan.name==='Basic On Demand')).map((plan, index) => (
                <div key={index}>
                    <div onClick={() => onItemClick(index)} 
                        className={`${activeIndex === index && 'border-2 border-primary'} 
          border border-primary/60 hover:border-primary hover:border-2 my-3 p-5 rounded-[0.5rem] bg-[#F7F7F7] cursor-pointer`}>
                        <div className='flex justify-between'>
                            <div className='lg:w-9/12 flex gap-5'>
                                {activeIndex === index ? <span className='text-primary mt-3'><IoMdRadioButtonOn/></span> 
                                    : <span className='mt-3 text-darkFade'><IoMdRadioButtonOn/></span>}
                                <div className=''> 
                                    <h3 className={`font-bold text-[1.1rem] md:text-[1.5rem] capitalize ${plan.name==='On Demand' && 'text-primary'}`}>{plan.name}</h3>
                                    <p className='font-light text-sm'>{plan.description} </p>
                                </div>
                            </div>
                            <h3 className={`font-bold text-[1.1rem] md:text-[1.5rem] ${plan.name==='On Demand' && 'text-primary'}`}>
                                {plan.price} {plan.currency} 
                                <span className='font-medium text-sm normal-case'>/mo.</span>
                            </h3>
                        </div>
                        <div className='ml-10 mt-2'>
                            {activeIndex === index && (
                                <div>
                                    <div className='my-5'>
                                        <span className='rounded-full bg-body/30 px-10 py-2 font-bold text-primary shadow-pill'>
                                            {plan.credits} credits</span>
                                    </div>
                                    {plan.features.map((feature, index)=>(
                                        <div className='flex gap-5 mt-2' key={index}>
                                            <img src={checkIcon} alt="" />
                                            <p>{feature}</p>
                                        </div>
                                    ))} 
                                    {plan.name !== 'Free' 
                                    && <Button onClick={() => redirectToCustomCheckout(plan.id)}>
                                        Upgrade plan</Button>}                   
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PaymentPlansData;
