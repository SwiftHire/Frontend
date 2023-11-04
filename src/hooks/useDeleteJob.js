import React from 'react'
import coreClient from '../services/coreApi';

export const useDeleteJob = () => {
  return async(jobId)=>{
    try {
        const response = await coreClient.delete(`http://localhost:3001/api/jobs/${jobId}`);
        return response;
    } catch (error) {
        console.log(error)
    }
  }
}

