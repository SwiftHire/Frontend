import React from 'react'
import { createContext, useState } from 'react';

const templateContext = createContext(0);

const  TemplateProvider  =  ({ children })  =>  {
    const [template, setTemplate] = useState(0);
    const [activeLink, setActiveLink] = useState(1);
    const [tab, setTab] = useState(0);

    const handleTabSwitch = (event, newValue) => {
        setTab(newValue);
    };

    const handleTabRedirect = (value) => {
        setTab(value);
    };

    const handleActiveLink = (value) => {
        setActiveLink(value)
    }
    const selectTemplate = (templateValue) => {
        setTemplate(templateValue)
    }
return  (
    <templateContext.Provider value={{ template, selectTemplate, handleActiveLink, activeLink, tab, handleTabSwitch, handleTabRedirect }}>
        {children}
    </templateContext.Provider>
    );
};

export  {  templateContext, TemplateProvider  };