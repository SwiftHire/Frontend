// import React, { useEffect, useState } from 'react';
// import { AiOutlineCheck } from 'react-icons/ai'; 
// // import {
// //     CheckoutPageContainer,
// //     CheckoutPageTitle,
// //     CheckoutPlans,
// //     CheckoutPlanDetails,
// //     PlanName,
// //     PlanPrice,
// //     PlanDuration,
// // } from './CheckoutStyled';
// import { usePlans } from '../../hooks/usePlans';
// //import { Button } from '../../../src/components/button/Button';
// import { useCustomCheckout } from '../../hooks/useCustomCheckout';
// import Button from '../../../src/components/button/Button';

// export const Checkout = () => {
//     const [plans, setPlans] = useState([]);
//     const listPlans = usePlans();

//     console.log('plans', plans);
//     console.log('listPlans', listPlans);
//     const rediretToCheckout = useCustomCheckout();
    
//     useEffect(() => {
//         if (plans.length > 0) return;
//         listPlans().then(({ status, data }) => {
//             if (status !== 200) return;
//             setPlans(data);
//         });
//     });
    
//     const redirectToCustomCheckout = (planId) => {
//         rediretToCheckout(planId).then(({ status, data }) => {
//             if (status !== 200) return;
//             const { redirectUrl } = data;
//             window.open(redirectUrl, '_self');
//         });
//     };
    
//     return (
//         <>
//             <div className='my-10'>
//                 <div className='shadow-square p-6 w-6/12'>
//                     <h3 className='text-[2rem] font-bold text-primary'>Upgrade menbership</h3>
//                     <span className='font-light text-sm'>Get unlimited resumes creation !</span>
//                 </div>
//                 <div className=' grid grid-cols-3 gap-4 my-10'>
//                     {plans.map((plan)=>(
//                         <div className='h-[20rem] w-[21.5rem] border border-[#E9ECEF] p-6 rounded-[0.5rem]' key={plan.id}>
//                             <div className=''>
//                                 <h3 className='text-[2rem] font-bold'>{plan.name}</h3>
//                                 <span className='font-light text-sm'>Best for basic access</span>
//                             </div>
//                             <div className='flex items-center justify-between'>
//                                 <h3 className='text-[1.5rem] font-bold'>{plan.currency} {plan.price}
//                                     <span className='font-light text-sm text-[#756790]'>/{plan.interval}</span></h3>
//                                 <span className='font-light text-sm text-[#756790] mt-2'>
//                                     <sup className='text-danger font-bold'>*</sup> billed monthly</span>
//                             </div>
//                             <div className='my-2'>
//                                 <Button onClick={() => redirectToCustomCheckout(plan.id)}>Choose Plan</Button>
//                             </div>
//                             <div className='my-2 flex items-center gap-3'>
//                                 <span className='text-primary'><AiOutlineCheck/></span>
//                                 <span className='text-sm text-[#756790]'>Up to 5 resume creation</span>
//                             </div>
//                             <div className='my-2 flex items-center gap-3'>
//                                 <span className='text-primary'><AiOutlineCheck/></span>
//                                 <span className='text-sm text-[#756790]'>Up to 5 cover letter creation</span>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
                
//             </div>
//             {/* <CheckoutPageContainer>
//                 <CheckoutPageTitle>Choose a plan</CheckoutPageTitle>
//                 <CheckoutPlans>
//                     {plans.map((plan) => (
//                         <CheckoutPlanDetails key={plan.id}>
//                             <img
//                                 src={plan.images?.[0]}
//                                 width="120"
//                                 height="120"
//                             />
//                             <PlanName>{plan.name}</PlanName>
//                             <PlanPrice>{plan.price}{plan.currency}</PlanPrice>
//                             <PlanDuration>per {plan.interval}</PlanDuration>
//                             <Button
//                                 theme='primary'
//                                 onClick={() => redirectToCustomCheckout(plan.id)}
//                                 buttonText='Purchase'
//                             />
//                         </CheckoutPlanDetails>
//                     ))}
//                 </CheckoutPlans>
//             </CheckoutPageContainer> */}
//         </>
//     );
// };

import React, { useEffect, useState } from 'react'; 
import {
    CheckoutPageContainer,
    CheckoutPageTitle,
    CheckoutPlans,
    CheckoutPlanDetails,
    PlanName,
    PlanPrice,
    PlanDuration,
} from './CheckoutStyled';
import { usePlans } from '../../hooks/usePlans';
import Button from '../../../src/components/button/Button';
import { useCustomCheckout } from '../../hooks/useCustomCheckout';

export const Checkout = () => {
    const type = new URL(window.location).searchParams.get('type');

    const [plans, setPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState('');
    const listPlans = usePlans(type);

    const rediretToCheckout = useCustomCheckout();
    
    useEffect(() => {
        const setPurchasePlans = async () => {
            const { status, data } = await listPlans();
        
            if (status === 200 && data?.length) {
                setPlans(data);
                const index = Math.floor(data.length / 2);
                setSelectedPlan(data[index].id);
            }
        };
    
        setPurchasePlans();
    }, []);
    
    const redirectToCustomCheckout = (planId) => {
        rediretToCheckout(planId).then(({ status, data }) => {
            if (status !== 200) return;
            const { redirectUrl } = data;
            window.open(redirectUrl, '_self');
        });
    };
    
    return (
        <CheckoutPageContainer>
            <CheckoutPageTitle>Purchase a plan</CheckoutPageTitle>
            <CheckoutPlans>
                {plans.map((plan) => (
                    <CheckoutPlanDetails key={plan.id} selected={plan.id == selectedPlan}>
                        <img
                            src={plan.image}
                            width="120"
                            height="120"
                        />
                        <PlanName>{plan.name}</PlanName>
                        <PlanPrice>{plan.price}{plan.currency}</PlanPrice>
                        <PlanDuration>{plan.interval ? `per ${plan.interval}` : ''}</PlanDuration>
                        <Button
                            theme='primary'
                            onClick={() => redirectToCustomCheckout(plan.id)}
                            buttonText='Purchase'
                        />
                    </CheckoutPlanDetails>
                ))}
            </CheckoutPlans>
        </CheckoutPageContainer>
    );
};