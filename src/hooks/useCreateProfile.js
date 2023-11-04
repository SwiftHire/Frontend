import React from 'react'
import coreClient from '../services/coreApi';

export const useCreateProfile = () => {
  return async(payload)=>{
    try {
        const response = await coreClient.post(`http://localhost:3001/api/profile`, payload);
        return response;
    } catch (error) {
        console.log(error)
    }
  }
}

