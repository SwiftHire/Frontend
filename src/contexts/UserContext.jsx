import React, { createContext, useState } from 'react';
import tokenService from '../services/token.service';

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const user = tokenService.getUser();
    const [userContext, setUserContext] = useState(user);
    
    window.addEventListener(tokenService.USER_CHANGED_EVENT, function() {
        // Code to be executed when the user data in the localStorage changes
        const currentUser = tokenService.getUser();
        setUserContext(currentUser);
    });
    
    return (
        <UserContext.Provider value={{ userContext, setUserContext }}>
            {children}
        </UserContext.Provider>
    );
};
