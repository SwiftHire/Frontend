import React from 'react'
import coreClient from '../services/coreApi';

export const useListEmployerJobs = () => {
  return async(payload)=>{
    try {
        const response = await coreClient.post('http://localhost:3001/api/jobs/employer', { userId:payload });
        return response;
    } catch (error) {
        console.log(error)
    }
  }
}

