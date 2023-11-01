import React, { useState } from 'react';
import { ListJobs, CreateJobs } from '../../components/jobs';
import { Candidates } from '../../components/candidates';
import { AiOutlinePlus } from 'react-icons/ai';



const EmployerDashboard = () => {
  const tabs = ['Jobs', 'candidates']
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [showCreateJob, setShowCreateJob] = useState(false);


  const handleToggleCreateJob = ()=>{
    setShowCreateJob(!showCreateJob);
  }

    const renderTabs = ()=>{
        switch(selectedTab){
            case 'Jobs':
                return <ListJobs/>
            case 'candidates':
                return <Candidates />
            default:
                null
        }
       
    }
  return (
    <div className='w-full md:w-[80vw] mt-[6rem] md:mt-[8rem] font-Montserrat'>
        <div className='w-full md:w-7/12'>
          <div className='flex items-center gap-10'>
            <div>
              search bar here
            </div>
            <div>
              <button onClick={handleToggleCreateJob} className='flex items-center gap-3 text-primary'>
                <span><AiOutlinePlus className='text-primary' />
                </span> Create New Job
              </button>
            </div>
          </div>
            <ul className='flex items-center gap-7'>
                {tabs.map((tab)=>(
                    <li 
                        key={tab}
                        onClick={()=>setSelectedTab(tab)}
                        className={`px-2 md:px-5 py-2 cursor-pointer font-medium ${selectedTab===tab 
                            ? 'bg-white text-primary border-b border-primary' 
                            : 'bg-[#F8F9FA]'}`}
                    >{tab}</li>
                ))}
            </ul>
        </div>
        <div className='w-full md:w-10/12'>
            {renderTabs()}
        </div>
        {showCreateJob && (
          <CreateJobs handleToggleCreateJob={handleToggleCreateJob}/>
        )}
    </div>
  )
}

export default EmployerDashboard