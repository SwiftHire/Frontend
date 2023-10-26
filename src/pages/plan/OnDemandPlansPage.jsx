import React from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
// import { usePlans } from '../../hooks/usePlans';
import { useCustomCheckout } from '../../hooks/useCustomCheckout';
// import { useCreditsCalculator } from '../../contexts/CreditsCalculator';
import { Loader } from '../../components/shared/loader/Loader';

import { useGetAllPlansContext } from '../../contexts/GetAllPlansContext';

const OnDemandPlansPage = () => {
    // const [plans, setPlans] = useState([]);
    // const userPlanData = useCreditsCalculator();
    // const listPlans = usePlans();
    const rediretToCheckout = useCustomCheckout();
    const { plans, isLoading } = useGetAllPlansContext();
    // const [isLoading, setIsLoading] = useState(true);
   
    // useEffect(() => {
    //     setIsLoading(true); 
    
    //     listPlans(userPlanData)
    //         .then(({ status, data }) => {
    //             if (status !== 200) return;
    //             setPlans(data);
    //         })
    //         .finally(() => {
    //             setIsLoading(false);
    //         });
    // }, []);
    const redirectToCustomCheckout = (planId) => {
        rediretToCheckout(planId).then(({ status, data }) => {
            if (status !== 200) return;
            const { redirectUrl } = data;
            window.open(redirectUrl, '_self');
        });
    };

    if(isLoading){
        return <div className='h-screen absolute w-full left-0 grid grid-cols place-items-center'><div><Loader/></div></div>
    }
  return (
    <>
    <div className='mt-[4rem] md:mt-5 w-[80vw] m-auto grid grid-cols place-items-center font-primary'>
                <div className='md:w-5/12 md:text-center font-bold'>
                    <span className='text-primary'>Pricing</span>
                    <h2 className='text-[2rem] md:text-lg'>Select the pricing that works for you </h2>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 items-center justify-center gap-10 md:gap-4 my-10'>
                    {plans.filter((plan)=>(plan.name==='On Demand')).map((plan)=>(
                        <div className='h-auto w-[21.5rem] border 
                        border-[#E9ECEF] p-6 rounded-[0.9rem] shadow-secondary' key={plan.id}>
                            <div className=''>
                                <span className='text-[#756790] font-light text-xsm'>
                                    {plan.name==='Basic' ? 'Best for basic access' : 'Best for unlimited access'}</span>
                            </div>
                            <div className='flex items-center justify-between'>
                                <h3 className='text-[2.5rem] font-bold'>€{plan.price}</h3>
                            </div>
                            <span className='font-light text-[#756790] text-sm my-1'>{plan.description}</span>
                            <div className='mt-10 mb-4'>
                                <button onClick={() => redirectToCustomCheckout(plan.id)} 
                                    className={`${plan.name==='Pro' ? 'bg-gray-500/20 text-primary' : ''} w-full py-3 text-body mt-4 rounded-[0.5rem]
                                    font-light text-sm flex items-center justify-center gap-5 bg-primary`}>Select plan</button>
                            </div>
                            <div className='mb-2'>
                                {
                                    plan.features.map((feature, index)=>(
                                        <div className='my-2 flex items-center gap-3' key={index}>
                                            <span className='text-primary'><AiOutlineCheck/></span>
                                            <span className='text-sm text-[#756790]'>{feature}</span>
                                        </div>
                                    ))
                                }
                            </div>
                            <div className='border-t'>
                                <h3 className='text-[1.3rem] font-medium font-primary text-[#17141B] mt-5 mb-2'></h3>
                            </div>
                        </div>
                    ))}
                </div>
                
            </div>
    </>
  )
}

export default OnDemandPlansPage