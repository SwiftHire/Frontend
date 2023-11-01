import React from 'react'
import coreClient from '../services/coreApi';

export const useCreateJobs = () => {
  return async(payload)=>{
    try {
        const response = await coreClient.post('http://localhost:3001/api/jobs', payload);
        return response;
    } catch (error) {
        console.log(error)
    }
  }
}

