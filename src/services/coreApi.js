import axios from 'axios';
import usersApi from './usersApi';
import TokenService from './token.service';

const coreClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

coreClient.interceptors.request.use((config) => {
    const token = TokenService.getLocalAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
},(error) => {
    return Promise.reject(error);
}
);

coreClient.interceptors.response.use((res) => res,async (err) => {
    const originalConfig = err.config;

    // all core endpoints will require the Bearer access token
    if (err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;

            try {
                // this will prevent the usersApi interceptor from running
                const validateStatus = () => true;
                const refreshToken = TokenService.getLocalRefreshToken();

                if (!refreshToken) {
                    // if the refresh token is invalid, the user has to be logged out
                    TokenService.removeUser();
                    return { status: 403, data: 'Login required. Please, sign in again!' };
                }

                const { status, data } = await usersApi.post('/auth/refresh-token', {
                    refreshToken,
                }, {
                    validateStatus,
                });

                if (status !== 200) {
                    // console.log('removing tokens. status: ', status);
                    // if the refresh token is invalid, the user has to be logged out
                    TokenService.removeUser();
                    return { status, data };
                }

                const { accessToken } = data;
                TokenService.updateLocalAccessToken(accessToken);
                // console.log('adding tokens. accessToken: ', accessToken);
                originalConfig.headers.Authorization = `Bearer ${accessToken}`;
                // console.log('-------------', originalConfig);
                return coreClient(originalConfig);
            } catch (error) {
                // console.log('removing tokens. status: ', 500);
                // if the refresh token is invalid, the user has to be logged out
                TokenService.removeUser();
                return { status: 500 };
            }
        }
    }
    return { status: err.response?.status || 500, data: err.response?.data };
});

export default coreClient;
