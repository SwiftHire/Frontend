import React from 'react'
import coreClient from '../services/coreApi';

export const useListEmployerJobs = () => {
  // .get(http://your-api-url.com/jobs?userId=${userId
  return async(userId)=>{
    try {
        const response = await coreClient.get(`http://localhost:3001/api/jobs/employer/jobs?userId=${userId}`);
        return response;
    } catch (error) {
        console.log(error)
    }
  }
}

