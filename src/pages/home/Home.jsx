/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import { NavBar } from '../../components/navbar';

import LinkedinLanding from '../../components/linkedin-type-landing-page/LinkedinLanding';

const Home = () => {
    return (
        <>
            <NavBar/>
            <section className='mt-[12rem] px-5 md:px-0'>
            <LinkedinLanding/>
            </section>
        </>
    );
};

export default Home;