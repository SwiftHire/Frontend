import React from 'react'
import coreClient from '../services/coreApi';

export const useGetOwnAppliedJobs = () => {
  return async(userId)=>{
    try {
        const response = await coreClient.get(`http://localhost:3001/api/jobs/applied?userId=${userId}`);
        return response;
    } catch (error) {
        console.log(error)
    }
  }
}

