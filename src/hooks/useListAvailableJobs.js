import React from 'react'
import coreClient from '../services/coreApi';

export const useListAvailableJobs = () => {
  return async(jobId)=>{
    try {
        const response = await coreClient.get(`http://localhost:3001/api/jobs`);
        return response;
    } catch (error) {
        console.log(error)
    }
  }
}

