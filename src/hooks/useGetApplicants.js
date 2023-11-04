import React from 'react'
import coreClient from '../services/coreApi';

export const useGetApplicants = () => {
  return async(jobId)=>{
    try {
        const response = await coreClient.get(`http://localhost:3001/api/jobs/${jobId}/applicants`);
        return response;
    } catch (error) {
        console.log(error)
    }
  }
}

