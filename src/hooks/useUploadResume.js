import React from 'react'
import coreClient from '../services/coreApi';

export const useUploadResume = () => {
    const headers = {
        'Content-Type': 'multipart/form-data',
        
        };
  return async(userId, payload)=>{
    try {
        const response = await coreClient.post(`http://localhost:3001/api/profile/resume?userId=${userId}`, payload, { headers });
        return response;
    } catch (error) {
        console.log(error)
    }
  }
}

