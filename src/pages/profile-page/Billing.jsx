import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CgDanger } from 'react-icons/cg';
import { CiCircleRemove } from 'react-icons/ci';
import { Loader } from '../../components/shared/loader/Loader';


import { useUserPlanContext } from '../../contexts/UserPlansContext';
import tokenService from '../../services/token.service';
import coreClient from '../../services/coreApi';
import verifiedIcon from '../../assets/gif/verified.gif'


const Billing = () => {
    const [openDowngradeModal, setOpenDowngradeModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [showReason, setShowReason] = useState(false);
    const [selectedReason, setSelectedReason] = useState('');
    const [reasonText, setReasonText] = useState({ reason:'' })
    const [Loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isDowngraded, setIisDowngraded] = useState(false);

    const user =  tokenService.getUser();
    const { updateUserPlans, userPlans } = useUserPlanContext();

    const { email, name }  = user
    const navigateTo = useNavigate()

    useEffect(()=>{
        updateUserPlans()
    },[userPlans])

    console.log("userPlans", userPlans)

    function getActivePlan(userPlans) {
        let activePlan = null;
    
        for (let i = 0; i < userPlans.length; i++) {
            let plan = userPlans[i];
            if (plan.planName === 'Basic On Demand') {
                activePlan = plan;
                break;
            } else if (plan.planName === 'Free' && !activePlan) {
                activePlan = plan;
            }
        }
    
        return activePlan;
    }
    
    const activePlan = getActivePlan(userPlans);
    

    function toggleDowngradeModal(){
        setOpenDowngradeModal(!openDowngradeModal);
    }
    function toggleDeleteModal(){
        setOpenDeleteModal(!openDeleteModal);
    }
    function toggleIsDowngraded(){
        setIisDowngraded(!isDowngraded);
    }
    function toggleIsSuccess(){
        setIsSuccess(!isSuccess);
    }
    const handleToggleReason = ()=>{
        setShowReason(!showReason);
    }

    const handleSelectedReason = (reason) =>{
        setSelectedReason(reason);
    }
    const handleChange = (e)=>{
        const { name, value} =e.target;
        setReasonText({...reasonText, [name]:value})
    }

    const suggestedReasons = [
                        'Resume creation completed',
                        'General dissatisfaction with the app', 
                        'Found a better alternative', 
                        'Unsatisfied with resume quality', 
                        'Financial constraints',
                    ];

    const handleSubmitDowngradePlan = async() =>{
        const messages = 'Reason: ' + selectedReason + '\n' + 'others: ' + reasonText.reason
        try{
            setLoading(true);
            const response = await coreClient.post('https://majorgen.intellabs.com.br/users/auth/admin-email', {
                name:name,
                subject:"downgrade",
                email: email,
                message:messages
                })
            if(response.status === 201){
                toggleDowngradeModal();
                toggleIsDowngraded();
            }
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }
    }

    const handleSubmitUnsubscribeForm = async() => {
        const messages = 'Reason: ' + selectedReason + '\n' + 'others: ' + reasonText.reason
        try{
            setLoading(true);
            const response = await coreClient.post('https://majorgen.intellabs.com.br/users/auth/admin-email', {
                name:name,
                subject:"delete",
                email: email,
                message:messages
                })
            if(response.status === 201){
                toggleDeleteModal();
                toggleIsSuccess();
            }
        }catch(err){
            console.log(err);
        }finally{
            setLoading(false)
        }

      };

    //   if(showLoader){
    //     return <div className='h-screen w-full absolute left-0 top-0 grid place-items-center bg-body/70'>
    //         <div className='h-auto w-5/12 px-10 rounded-[1rem]'>
    //             <Loader/>
    //         </div>
    //     </div>
    //   }
    return (
        <>
            <div className='md:w-[40vw] md:ml-10'>
                <div className='my-5'>
                    <h2 className='mb-4 font-medium text-sm'>Manage membership</h2>
                    <div className='md:p-7 w-full border border-[#E9ECEF] rounded-[0.5rem] shadow-md'>
                    <div className='flex items-center justify-between'>
    <div className="flex items-center">
        <h3 className='font-bold text-[20px]'>{activePlan?.planName}</h3>
        <small 
        className='bg-[#D6F6DF] ml-2 px-2 py-1 text-[12px] text-[#3C3446] font-light 
        border border-[#8EAE9B] rounded-[0.5rem]'>Active</small>
    </div>
    {activePlan?.planName === 'Free' 
    ? <button onClick={() => navigateTo('/resumai/subscription-plans')}
    className='border border-[#E4E6F1] rounded-[0.5rem] px-5 py-2 text-primary font-light'>Upgrade Account</button>
    : <button onClick={toggleDowngradeModal}
    className='border border-[#E4E6F1] rounded-[0.5rem] px-5 py-2 text-primary font-light'>Downgrade Account</button>
    }
</div>

                        <div className='mt-4'>
                            <h3 className='text-[#17141B] text-[1.9rem] font-medium'>
                                €{activePlan?.planName === 'Free' ? '0' : activePlan?.planName === 'Basic' ? '1' : '1'}
                            <span className='text-[#3C3446] text-sm font-light'>/resume</span></h3>
                            {/* <span className='text-[#756790] text-sm -translate-y-2'>Renews on 04/8/2023</span> */}
                        </div>
                    </div>
                </div>
                <div className='my-5'>
                    <h2 className='mb-4 font-medium text-sm'>Account Settings</h2>
                    <div className='md:p-7 w-full border border-[#E9ECEF] rounded-[0.5rem] shadow-md'>
                        <div className='flex items-center justify-between'>
                            <h3 className='font-medium text-sm relative'>Delete Account</h3>
                         
                            <button onClick={toggleDeleteModal}
                            className='border border-[#E4E6F1] rounded-[0.5rem] px-5 py-2 text-red-500 font-light'>Delete Account</button>
                        </div>
                    </div>
                </div>

                {openDowngradeModal && (
                    <div className='h-screen w-full absolute left-0 top-0 grid place-items-center bg-primary/60'>
                        <div className='h-auto w-5/12 px-10 bg-body rounded-[1rem] relative'>
                            {/* <span onClick={toggleDeleteModal}>x</span>
                            delete information */}
                            <div className='border-b flex justify-between py-6'>
                                <h2 className='font-bold'>Downgrade Account</h2>
                                <span onClick={toggleDowngradeModal} className='cursor-pointer'><CiCircleRemove className='w-7 h-7 text-primary'/></span>
                            </div>
                            <div className='border-b flex items-center gap-5 py-6'>
                                <span><CgDanger className='text-red-500 h-7 w-7'/></span>
                                <p>kindly complete the form below to tell us why you chose to downgrade</p>
                            </div>
                            <div className='py-6'>
                                <div className='w-full grid grid-cols-1 my-1 relative'>
                                    <div>
                                        <h3 className="text-sm font-normal mb-2 ml-1">Select Reason</h3>
                                        <div onClick={handleToggleReason} className=' 
                                        border border-[#E4E6F1] px-4 py-2 rounded-[0.5rem] cursor-pointer'>
                                        <span>{selectedReason ? selectedReason : <span>choose reason</span>}</span> 
                                        </div>
                                        {showReason && (
                                            <div className='w-full rounded-[0.5rem] mt-2 shadow-square py-2 absolute bg-body'>
                                            <ul>
                                                { suggestedReasons.map((reason, index)=>(
                                                    <li onClick={() => {
                                                        handleSelectedReason(reason);
                                                        handleToggleReason();
                                                    }} 
                                                    className='cursor-pointer my-2 font-normal text-xsm font-satoshi px-5 py-1 hover:bg-lavender' key={index}>{reason}</li>
                                                )) }
                                            </ul>
                                        </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full grid grid-cols-1 my-1 py-4">
                                <label htmlFor='reason' className="text-sm font-normal mb-2 ml-1">other reasons</label>
                                <textarea
                                    rows={4}
                                    type="text"
                                    id="reason"
                                    name="reason"
                                    placeholder='choose reason'
                                    value={reasonText.reason}
                                    onChange={handleChange}
                                    className='text-placeholder text-sm font-light py-2 px-2 
                                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                            </div>
                            <div className=' w-full'>
                                <div className='flex items-center justify-between py-3'>
                                    <button 
                                        onClick={toggleDowngradeModal}
                                        className='border border-[#E4E6F1] rounded-[0.5rem] px-5 py-2 font-light text-primary'>
                                        cancel
                                    </button>
                                    <button
                                    onClick={handleSubmitDowngradePlan}
                                    className="border border-[#E4E6F1] rounded-[0.5rem] px-5 py-2 text-primary font-light"
                                >
                                    continue to downgrade
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {openDeleteModal && (
                    <div className='h-screen w-full absolute left-0 top-0 grid place-items-center bg-primary/60'>
                        <div className='h-auto w-5/12 px-10 bg-body rounded-[1rem] relative'>
                            {/* <span onClick={toggleDeleteModal}>x</span>
                            delete information */}
                            <div className='border-b flex justify-between py-6'>
                                <h2 className='font-bold'>Delete Account</h2>
                                <span onClick={toggleDeleteModal} className='cursor-pointer'><CiCircleRemove className='w-7 h-7 text-primary'/></span>
                            </div>
                            <div className='border-b flex items-start gap-5 py-6'>
                                <span><CgDanger className='text-red-500 h-7 w-7'/></span>
                                <p>
                            Be certain before you proceed. After taking the steps to delete the account, <b>it will first be deactivated for 30 days</b> and after that the account will be <b>permanently deleted</b> and <b>can not be undone</b>. You will lose access to all your account data.</p>
                            </div>
                            <div className='py-6'>
                                <div className='w-full grid grid-cols-1 my-1 relative'>
                                    <div>
                                        <h3 className="text-sm font-normal mb-2 ml-1">Select Reason</h3>
                                        <div onClick={handleToggleReason} className=' 
                                        border border-[#E4E6F1] px-4 py-2 rounded-[0.5rem] cursor-pointer'>
                                        <span>{selectedReason ? selectedReason : <span>choose reason</span>}</span> 
                                        </div>
                                        {showReason && (
                                            <div className='w-full rounded-[0.5rem] mt-2 shadow-square py-2 absolute bg-body'>
                                            <ul>
                                                { suggestedReasons.map((reason, index)=>(
                                                    <li onClick={() => {
                                                        handleSelectedReason(reason);
                                                        handleToggleReason();
                                                    }} 
                                                    className='cursor-pointer my-2 font-normal text-xsm font-satoshi px-5 py-1 hover:bg-lavender' key={index}>{reason}</li>
                                                )) }
                                            </ul>
                                        </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full grid grid-cols-1 my-1 py-4">
                                <label htmlFor='reason' className="text-sm font-normal mb-2 ml-1">other reasons</label>
                                <textarea
                                    rows={4}
                                    type="text"
                                    id="reason"
                                    name="reason"
                                    placeholder='choose reason'
                                    value={reasonText.reason}
                                    onChange={handleChange}
                                    className='text-placeholder text-sm font-light py-2 px-2 
                                    outline-0 rounded-[8px] border border-[#E4E6F1] pl-4' />
                            </div>
                            <div className=' w-full'>
                                <div className='flex items-center justify-between py-3'>
                                    <button 
                                        onClick={toggleDeleteModal}
                                        className='border border-[#E4E6F1] rounded-[0.5rem] px-5 py-2 font-light text-primary'>
                                        cancel
                                    </button>
                                    <button
                                    onClick={handleSubmitUnsubscribeForm}
                                    className="border border-[#E4E6F1] rounded-[0.5rem] px-5 py-2 text-red-500 font-light"
                                >
                                    Delete Permanently
                                </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            {isDowngraded && (
                <div className='h-screen w-full absolute left-0 top-0 grid place-items-center bg-body/80'>
                    <div className='h-auto w-4/12 px-10 rounded-[1rem] relative border py-5'>
                        <span 
                            onClick={toggleIsDowngraded}
                            className='absolute right-10 top-5 cursor-pointer'>
                            <CiCircleRemove className='w-7 h-7 text-primary'/>
                        </span>
                        <div className='flex flex-col items-center p-10 text-center'>
                            <h2 className='font-bold text-sm'>Account was downgraded successfully</h2>
                            <img src={verifiedIcon} alt="" className='w-36 h-36' />
                            <p className='text-sm'>Your account will be <b className='border-b'> downgraded to the free plan</b> at the end of your current plan period</p>
                        </div>
                    </div>
                </div>
                )
            }
            {isSuccess && (
                <div className='h-screen w-full absolute left-0 top-0 grid place-items-center bg-body/80'>
                    <div className='h-auto w-4/12 px-10 rounded-[1rem] relative border py-5'>
                        <span 
                            onClick={toggleIsSuccess}
                            className='absolute right-10 top-5 cursor-pointer'>
                            <CiCircleRemove className='w-7 h-7 text-primary'/>
                        </span>
                        <div className='flex flex-col items-center p-10 text-center'>
                            <h2 className='font-bold text-sm'>Account was deleted successfully</h2>
                            <img src={verifiedIcon} alt="" className='w-36 h-36' />
                            <p className='text-sm'>Your account will be <b className='border-b'> deactivated for 30 days</b> and afterwards deleted.</p>
                        </div>
                    </div>
                </div>
                )
            }
        </>
    );
};

export default Billing;