import React, { useState } from 'react';
import tokenService from '../../services/token.service';
import { useListEmployerJobs } from '../../hooks/useListEmployerJobs';
import { ListJobs, CreateJobs, EditJobs } from '../../components/jobs';
import { Candidates } from '../../components/candidates';
import { AiOutlinePlus } from 'react-icons/ai';



const EmployerDashboard = () => {
  const tabs = ['Jobs', 'Profile']
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [showEditJob, setShowEditJob] = useState(false);
  const listEmployerJobs = useListEmployerJobs();
  const user = tokenService.getUser()
  const [employerJobs, setEmployerJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);


  const handleToggleCreateJob = ()=>{
    setShowCreateJob(!showCreateJob);
  }
  const handleToggleEditJob = ()=>{
    setShowEditJob(!showEditJob);
  }

  const handleSelectedJob = (jobId)=>{
    setSelectedJob(jobId)
  }

    const getEmployerJobs = async()=>{
      try {
          setLoading(true)
          const { status, data } = await listEmployerJobs(user.id);
          if(status===200){
              setEmployerJobs(data.jobs)
          }
      } catch (error) {
          console.log(error)
      }finally{
          setLoading(false);
      }
  }

    const renderTabs = ()=>{
        switch(selectedTab){
            case 'Jobs':
                return (<ListJobs 
                  getEmployerJobs={getEmployerJobs}
                  employerJobs={employerJobs}
                  loading={loading}
                  handleToggleEditJob={handleToggleEditJob}
                  handleSelectedJob={handleSelectedJob}
                />)
            // case 'candidates':
            //     return <Candidates />
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
        <div className='w-full md:w-10/12 mt-10'>
            {renderTabs()}
        </div>
        {showCreateJob && (
          <CreateJobs 
            handleToggleCreateJob={handleToggleCreateJob} 
            getEmployerJobs={getEmployerJobs}
          />
        )}

        {
          showEditJob && (
            <EditJobs
              handleToggleEditJob={handleToggleEditJob}
              selectedJob={selectedJob}
              getEmployerJobs={getEmployerJobs}
            />
          )
        }
    </div>
  )
}

export default EmployerDashboard