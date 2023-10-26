import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUserCredits } from '../hooks/useUserCredits';
import planService from '../services/plan.service';

const CreditsCalculatorContext = createContext();

export const CreditsCalculatorProvider = ({ children }) => {
    const [userCredits, setUserCredits] = useState(0);
    // the user can have valid credits in the on-demand, but without a subscription plan in case they cancel it, expired, or still are on the free on-demand plan
    const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
    const [isFreeUser, setIsFreeUser] = useState(true);
    const getUserCredits = useUserCredits();

    const updateUserCredits = async () => {
        const { status, data: userCredits } = await getUserCredits();

        if (status === 200 && userCredits !== null) {
            setUserCredits(userCredits.remainingCredits);
            setHasActiveSubscription(userCredits.activeSubscriptionPlan);
            setIsFreeUser(userCredits.isFreeUser);

            // update with plans details
            if (userCredits?.credits?.length) {
                planService.setPlan(userCredits.credits);
            }
        }
    };

    return (
        <CreditsCalculatorContext.Provider value={{ userCredits, hasActiveSubscription, isFreeUser, updateUserCredits }}>
            {children}
        </CreditsCalculatorContext.Provider>
    );
};

export const useCreditsCalculator = () => useContext(CreditsCalculatorContext);
