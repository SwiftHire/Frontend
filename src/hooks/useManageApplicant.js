import React from 'react'
import coreClient from '../services/coreApi';

export const useManageApplicant = () => {
  return async(userId, jobId, payload)=>{
    console.log('userId: ', userId)
    console.log('jobId: ', jobId)
    console.log('payload: ', payload)
    try {
        const response = await coreClient.patch(`http://localhost:3001/api/jobs/${jobId}/applicants/${userId}`, { status: payload});
        return response;
    } catch (error) {
        console.log(error)
    }
  }
}

