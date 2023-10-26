import React, { useState, useEffect, createContext, useContext } from 'react'
import { useUserCredits } from '../hooks/useUserCredits';
import planService from '../services/plan.service';


const UserPlansContext = createContext();
export const UserPlansContextProvider = ({ children }) => {
   // const [userPlans, setUserPlans] = useState(planService.getPlan());
    const [userPlans, setUserPlans] = useState([]);
    const getUserCredits = useUserCredits();
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

    const updateUserPlans = () =>{
        const setPlans = async () => {
            const { status, data: userCredits } = await getUserCredits();

            if (status === 200 && userCredits?.credits?.length) {
                setUserPlans(userCredits.credits);
                planService.setPlan(userCredits.credits);
            }
        };

        if (!userPlans?.length) {
            setPlans();
        }
    }

  return (
    <UserPlansContext.Provider value={{ updateUserPlans, userPlans }}>
        { children }
    </UserPlansContext.Provider>
    );
}

export const useUserPlanContext = () => useContext(UserPlansContext);
