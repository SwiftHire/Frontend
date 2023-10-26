import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router';

import tokenService from '../../services/token.service';
// import { useUserCredits } from '../../hooks/useUserCredits';
// import planService from '../../services/plan.service';
import { GiTwoCoins } from 'react-icons/gi';
import userIcon from '../../assets/png/user-icon.png';
import { useUserPlanContext } from '../../contexts/UserPlansContext';

const AccountInfo = () => {

    const user = tokenService.getUser();
    // const [userPlans, setUserPlans] = useState(planService.getPlan());
    const { updateUserPlans, userPlans } = useUserPlanContext();


    const navigateTo = useNavigate();
    // gets only valid credits (grouped by plan in the array field "credits"), either from the last 30 days or from the On Demand plan, which is valid forever
    // const getUserCredits = useUserCredits();

    // if (!user?.email) {
    //     navigateTo('/sign-in');
    //     return;
    // }
    
    // useEffect(() => {
    //     const setPlans = async () => {
    //         const { status, data: userCredits } = await getUserCredits();
        
    //         if (status === 200 && userCredits?.credits?.length) {
    //             setUserPlans(userCredits.credits);
    //             planService.setPlan(userCredits.credits);
    //         }
    //     };
        
    //     if (!userPlans?.length) {
    //         setPlans();
    //     }
    // }, []);
    
    // const mapPlans = (userPlans) => userPlans.map((userPlan) => ({
    //     title: userPlan.planName,
    //     heading: userPlan.planType === 'recurring' ? 'Monthly Subscription' : 'One Time Purchase',
    //     description: userPlan.planDescription,
    //     image: userPlan.planImage,
    //     details: [
    //         {
    //             title: 'Remaining credits',
    //             description: userPlan.remainingCredits,
    //         },
    //         {
    //             title: 'Total valid credits purchased',
    //             description: userPlan.totalCredits,
    //         },
    //         {
    //             title: 'Credits used',
    //             description: userPlan.creditsUsed,
    //         },
    //         {
    //             title: 'Last purchase date',
    //             description: new Date(userPlan.lastPurchase).toLocaleDateString(),
    //         },
    //     ],
    //     history: userPlan.recentGenerationsHistory?.map((history) => ({
    //         title: `${new Date(history.generationDate).toLocaleDateString()}: ${history.generationType}`,
    //         description: history.description,
    //         details: `${history.totalCredits} credits used`,
    //     })),
    // }));


    useEffect(()=>{
        updateUserPlans();
    },[userPlans]);

    function formatDateTime(originalDateTime) {
        const dateTime = new Date(originalDateTime);
      
        const year = dateTime.getFullYear();
        const month = dateTime.toLocaleString("default", { month: "long" });
        const day = dateTime.getDate();
      
        let hour = dateTime.getHours();
        let minute = dateTime.getMinutes();
      
        const period = hour >= 12 ? "PM" : "AM";
        hour = hour % 12 || 12; 
      
        minute = minute < 10 ? "0" + minute : minute;
      
        const formattedDateTime = `${month} ${day}, ${year} at ${hour}:${minute} ${period}`;
      
        return formattedDateTime;
      }
      
      

    return (
        <div className='w-full md:w-[80vw]'>
            <div className='h-[10rem] w-full bg-gradient-to-r 
            from-indigo-500 via-purple-500 to-primary py-5 rounded-5 shadow-square'>
                <h3 className='font-bold text-[2rem] text-body text-center'>{user.name}</h3>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 ml-10'>
                <div className=''>
                    <img src={userIcon} alt="" className='shadow-secondary -translate-y-10 border border-4 rounded-full' />
                        <>
                            <h3><b>current plan:</b> {userPlans[0]?.planName}</h3>
                            <p>{userPlans[0]?.planDescription}</p>
                        </>
                </div>
                <div className='mt-3 md:px-6'>
                    {userPlans[0]?.recentGenerationsHistory.map((plan)=>(
                        <div className='border-b border-primary' key={plan._id}>
                            <h3 className='font-light text-sm shadow-square py-3 pl-3'>
                                {plan.generationType}
                            </h3>
                            <h3 className='font-light text-sm shadow-square py-3 pl-3'>
                                {plan.description}
                            </h3>
                            <h3 className='font-light text-sm shadow-square py-3 pl-3'>
                                {formatDateTime(plan.generationDate)}
                            </h3>
                        </div>
                    ))}
                </div>
                <div className=''>
                    <div className='grid grid-cols-2 gap-4 mt-5'>
                        <div className='border flex flex-col gap-2 justify-center items-center shadow-pill py-3'>
                            <div className='flex items-center gap-1'><GiTwoCoins className='font-bold text-sm'/>
                                <GiTwoCoins className='font-bold text-sm'/></div>
                            <h3 className='font-medium text-sm text-center'>Total credits</h3>
                            <h4 className='font-bold text-[1.5rem] text-primary'>{userPlans[0]?.totalCredits}</h4>
                        </div>
                        <div className='border flex flex-col gap-2 justify-center items-center shadow-pill py-3'>
                            <div className='flex items-center gap-1'><GiTwoCoins className='font-bold text-sm'/>
                                <GiTwoCoins className='font-bold text-sm'/></div>
                            <h3 className='font-medium text-sm text-center'>credits used</h3>
                            <h4 className='font-bold text-[1.5rem] text-primary'>{userPlans[0]?.creditsUsed}</h4>
                        </div>
                        <div className='border flex flex-col gap-2 justify-center items-center shadow-pill py-3'>
                            <div className='flex items-center gap-1'><GiTwoCoins className='font-bold text-sm'/>
                                <GiTwoCoins className='font-bold text-sm'/></div>
                            <h3 className='font-medium text-sm text-center'>remaining credits</h3>
                            <h4 className='font-bold text-[1.5rem] text-primary'>{userPlans[0]?.remainingCredits}</h4>
                        </div>
                        <div className='border flex flex-col gap-2 justify-center items-center shadow-pill py-3'>
                            <div className='flex items-center gap-1'><GiTwoCoins className='font-bold text-sm'/>
                                <GiTwoCoins className='font-bold text-sm'/></div>
                            <h3 className='font-medium text-sm text-center'>last purchased</h3>
                            <h4 className='font-bold text-xsm text-primary'>{formatDateTime(userPlans[0]?.lastPurchase)}</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountInfo;