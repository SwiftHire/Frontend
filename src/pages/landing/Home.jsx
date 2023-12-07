import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDotCircle } from 'react-icons/fa';
import { BsArrowRight } from 'react-icons/bs';
import { HowItWorks } from '../../components/how-it-works';
import globeIcon from '../../assets/jpg/globe.jpg';
import Button from '../../components/button/Button';
import { NavBar } from '../../components/navbar';

const Home = () => {
  const navigateTo = useNavigate();
  return (
    <>
    <NavBar />
      <div className='font-Montserrat mt-[12rem]'>
          <div className='w-full px-5 md:px-0 md:w-8/12 m-auto'>
            <div>
              <h3 className='text-sm md:text-xl text-center font-bold md:leading-[3.5rem] text-[#353535]'>
                The Ultimate Platform for Employers and Job Seekers to Connect</h3>
              <p className='text-center my-10 text-sm'>
                        
        SwiftHire offers a comprehensive platform facilitating seamless connections between employers and job seekers. 
        Employers gain access to a diverse pool of talent through advanced search filters and candidate management tools. 
        
              </p>
              <div className='w-1/2 my-10 m-auto'>
                <Button onClick={()=> navigateTo('/register')}>Get Started <BsArrowRight /></Button>
              </div>
            </div>
            <div className='flex items-center justify-center flex-col md:flex-row'>
                <div className=''>
                  <img src={globeIcon} alt="globe icon" />
                </div>
                <div className='w-2/3'>
                    <h2 className='text-bold text-sm md:text-[3rem]'>over <span className='text-primary'>15K+</span> users <br /> and counting</h2>
                </div>
            </div>
            <div className='my-10'>
              <h3 className='font-bold text-sm md:text-xl text-center text-[#353535]'>How It Works</h3>
              <h3 className='font-bold text-sm text-center text-[#353535]'>Discover an Effortless Way to Find and Fill Job Openings</h3>
            </div>
            <div className=''>
              <HowItWorks/>
            </div>
            <div className='my-10'>
              <h3 className='font-bold text-sm md:text-xl text-center text-[#353535]'>Why Choose Us</h3>
              <ul className=''>
                <li className='flex items-center gap-5 text-sm font-normal'><span><FaDotCircle className='text-primary' /></span> Efficiency and Time Savings" - Streamline your hiring process and find the right candidate faster</li>
                <li className='flex items-center gap-5 text-sm font-normal'><span><FaDotCircle className='text-primary' /></span> Access to a Diverse Pool of Talent" - Connect with a diverse range of skilled professionals</li>
                <li className='flex items-center gap-5 text-sm font-normal'><span><FaDotCircle className='text-primary' /></span> User-Friendly Interface" - Easy navigation for both employers and job seekers.</li>
                <li className='flex items-center gap-5 text-sm font-normal'><span><FaDotCircle className='text-primary' /></span> Secure and Reliable" - Trust in our platform's security measures to protect your data.</li>
              </ul>
            </div>
          </div>
      </div>
    </>
  )
}

export default Home