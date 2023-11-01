import React from 'react';
import { ListAvailableJobsCard } from '../cards';

const ListApplicantsJobs = () => {
  return (
    <div className='mt-10  grid grid-cols-1 md:grid-cols-2'>
        <ListAvailableJobsCard />
    </div>
  )
}

export default ListApplicantsJobs