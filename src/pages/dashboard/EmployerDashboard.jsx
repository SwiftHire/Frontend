import React, { useState, useEffect } from 'react';
import tokenService from '../../services/token.service';
import { useListEmployerJobs } from '../../hooks/useListEmployerJobs';
import { ListJobs, CreateJobs, EditJobs } from '../../components/jobs';
import { Candidates } from '../../components/candidates';
import { AiOutlinePlus } from 'react-icons/ai';



const EmployerDashboard = () => {
  const tabs = ['Jobs', '']
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [showCreateJob, setShowCreateJob] = useState(false);
  const [showEditJob, setShowEditJob] = useState(false);
  const listEmployerJobs = useListEmployerJobs();
  const user = tokenService.getUser()
  const [employerJobs, setEmployerJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const [searchedJob, setSearchedJob] = useState({ job:'' });


  const handleChange = (e)=>{
    const { name, value } = e.target;
    setSearchedJob({ ...searchedJob, [name]:value });
  }
  const handleSubmitSearch = ()=>{
    const searchedJobs = employerJobs.filter((job)=>{
      if(job.title.includes(searchedJob.job)){
        return job;
      }
    });
    setEmployerJobs(searchedJobs)
  }
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
          setTimeout(async () => {
            const { status, data } = await listEmployerJobs(user.id);
            if (status === 200) {
              setEmployerJobs(data.jobs);
            }
            setLoading(false);
          }, 2000); 
      } catch (error) {
          console.log(error)
          setLoading(false);
      }
  }

  useEffect(() => {
    const searchedJobs = employerJobs.filter((job) => {
      return job.title.toLowerCase().includes(searchedJob.job.toLowerCase());
    });
    setEmployerJobs(searchedJobs);
  }, [searchedJob]);

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
        <div className='w-full md:w-10/12'>
          {selectedTab === 'Jobs' && (
            <div className='w-full flex items-center justify-between gap-10 mb-10'>
              <div className='w-3/4 flex items-center'>
                <input 
                  type="text"
                  name="job" 
                  id="job"
                  className='w-full outline-0 border py-2 px-3 text-gray-700 rounded-[8px]'
                  placeholder='search job'
                  value={searchedJob.job}
                  onChange={handleChange}
                />
              <button
              onClick={handleSubmitSearch} 
              className='bg-primary text-white py-2 px-5 rounded-[8px]'>Search</button>
              </div>
              <div>
                <button onClick={handleToggleCreateJob} className='flex items-center gap-3 text-primary border py-2 px-5 rounded-full'>
                  <span><AiOutlinePlus className='text-primary' />
                  </span> Create New Job
                </button>
              </div>
            </div>
          )}
          
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