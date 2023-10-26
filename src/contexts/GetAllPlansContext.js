import React, { useState, useEffect, createContext, useContext} from 'react'
import { usePlans } from '../hooks/usePlans';
import { useCreditsCalculator } from '../contexts/CreditsCalculator';


const GetAllPlansContext = createContext();

export const GetAllPlansContextProvider = ({children}) => {
    const [plans, setPlans] = useState([]);
    const userPlanData = useCreditsCalculator();
    const listPlans = usePlans();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);

        listPlans(userPlanData)
            .then(({ status, data }) => {
                if (status !== 200) return;
                setPlans(data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

  return (
    <GetAllPlansContext.Provider value={{ plans, isLoading }}>
        {children}
    </GetAllPlansContext.Provider>
  )
}


export const useGetAllPlansContext = () => useContext(GetAllPlansContext);