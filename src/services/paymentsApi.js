import axios from 'axios';
import { refreshToken } from './usersApi';
import TokenService from './token.service';

const paymentsClient = axios.create({
    baseURL: process.env.REACT_APP_PAYMENTS_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

paymentsClient.interceptors.request.use((config) => {
    const token = TokenService.getLocalAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
},(error) => {
    return Promise.reject(error);
}
);

paymentsClient.interceptors.response.use((res) => {
    return res;
},async (err) => {
    const originalConfig = err.config;

    // Access Token was expired
    if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
            await refreshToken();
            return paymentsClient(originalConfig);
        } catch (error) {
            return Promise.reject(error);
        }
    }

    return Promise.reject(err);
}
);

export default paymentsClient;
