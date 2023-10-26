import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import { useCustomCheckout } from '../../hooks/useCustomCheckout';
import { Loader } from '../../components/shared/loader/Loader';

import { useGetAllPlansContext } from '../../contexts/GetAllPlansContext';

const SubscriptionPlans = () => {
    const rediretToCheckout = useCustomCheckout();
    const { plans, isLoading } = useGetAllPlansContext();

    const redirectToCustomCheckout = (planId) => {
        rediretToCheckout(planId).then(({ status, data }) => {
            if (status !== 200) return;
            const { redirectUrl } = data;
            window.open(redirectUrl, '_self');
        });
    };

    console.log("################# PLANS #################")
    console.log(plans)

    if(isLoading){
        return <div className='h-screen absolute w-full left-0 grid grid-cols place-items-center'><div><Loader/></div></div>
    }
return (
    <>
        <div className='flex flex-col items-center mt-[4rem] md:mt-5 w-[80vw] mx-auto font-primary'>
            <div className='md:w-5/12 text-center font-bold'>
                <span className='text-primary'>Pricing</span>
                <h2 className='text-[2rem] md:text-lg'>Select the pricing that works for you </h2>
            </div>
            <div className='flex flex-col md:flex-row items-center justify-center gap-10 md:gap-4 my-10'>
                {plans.filter((plan)=>(plan.name==='Basic On Demand')).map((plan)=>(
                    <div className='h-auto w-[21.5rem] border border-[#E9ECEF] p-6 rounded-[0.9rem] shadow-secondary' key={plan.id}>
                        <div className='flex flex-col items-center'>
                            <h3 className='text-[#17141B] text-[1.5rem] font-bold'>{ plan.name }</h3>
                            <span className='text-[#756790] text-sm my-2'>{plan.name==='Basic' ? 'Best for basic access' : 'Best for unlimited access'}</span>
                            <div className='flex justify-between items-end mt-4'>
    <h3 className='text-[#17141B] text-[1.9rem] font-medium'>€{ plan.price }
        <span className='text-[#3C3446] text-sm font-light mr-2'>/resume</span>
    </h3>
    <span className='text-[#756790] text-sm -translate-y-2'><sup className='text-red-500'>*</sup> billed once</span>
</div>

                            <button onClick={() => redirectToCustomCheckout(plan.id)}
                            className= { plans.name === 'Basic On Demand' ? 'w-full py-3 px-5 bg-[#F7F2FF] text-primary rounded-[0.5rem] my-5' 
                            : 'w-full py-3 px-5 bg-primary text-body rounded-[0.5rem] my-5' }>Select Plan</button>
                            {
                                plan.features.map((feature, index)=>(
                                    <div className='my-2 flex items-center gap-3' key={index}>
                                        <span className='text-primary'><AiOutlineCheck/></span>
                                        <span className='text-sm text-[#756790]'>{feature}</span>
                                    </div>
                                ))
                            }
                            <div className='border-t flex flex-col items-center'>
                                <h3 className='text-[1.3rem] font-medium font-primary text-[#17141B] mt-5 mb-2'>
                                    {plan.name === 'Basic' ? '5k AI credits' : '10k AI credits'}</h3>
                                <span className='font-light text-[#756790] text-sm my-1'>{plan.description}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
     </>
)

}

export default SubscriptionPlans