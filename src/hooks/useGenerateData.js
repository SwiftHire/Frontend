/* eslint-disable no-unused-vars */
import { useState } from 'react';
// import axios from 'axios';
// import { baseConfig } from '../utils/constants';
import coreClient from '../services/coreApi';

const API_URL = process.env.REACT_APP_API_URL;

export const useGenerateData =()=>{
    const [loading, setLoading] = useState(false);
    const [apiBulletPoints, setApiBulletPoints] = useState();
    const config = {};
    async function generateNewdata(payload, createTextContent){
        try {
            setLoading(true);
            const { status, data } = await coreClient.post(`${API_URL}/generate`, payload, config);
            if(status===200){
                setApiBulletPoints(data.result.split('\n'));
                createTextContent(data.result);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    return { generateNewdata, loading, apiBulletPoints };
};