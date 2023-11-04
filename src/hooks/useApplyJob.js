import React from 'react'
import coreClient from '../services/coreApi';

export const useApplyJob = () => {
  return async(jobId, userId)=>{
    try {
        const response = await coreClient.post(`http://localhost:3001/api/jobs/${jobId}/apply`, { userId: userId });
        return response;
    } catch (error) {
        console.log(error)
    }
  }
}

