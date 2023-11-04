import React from 'react'
import coreClient from '../services/coreApi';

export const useEditJob = () => {
  return async(jobId, payload)=>{
    try {
        const response = await coreClient.put(`http://localhost:3001/api/jobs/${jobId}`, payload);
        return response;
    } catch (error) {
        console.log(error)
    }
  }
}

