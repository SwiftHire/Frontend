import axios from 'axios'; 
import TokenService from './token.service';

const usersClient = axios.create({
    baseURL: process.env.REACT_APP_USERS_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const refreshToken = async () => {
    const { data } = await usersClient.post('/auth/refresh-token', {
        refreshToken: TokenService.getLocalRefreshToken(),
    });
    // console.log('afasfdsfsadf token refreshed.......................');

    const { accessToken } = data;
    TokenService.updateLocalAccessToken(accessToken);
};

usersClient.interceptors.request.use((config) => {
    // /auth endpoints don't require the Bearer access token
    if (config.url.includes('/auth')) return config;
    const token = TokenService.getLocalAccessToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
},(error) => {
    return Promise.reject(error);
}
);

usersClient.interceptors.response.use((res) => res,async (err) => {
    const originalConfig = err.config;
    // /auth endpoints don't require the Bearer access token, but all others do
    if (!originalConfig?.includes('/auth') && err.response) {
        // Access Token was expired
        if (err.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;

            try {
                const { data } = await usersClient.post('/auth/refresh-token', {
                    refreshToken: TokenService.getLocalRefreshToken(),
                });

                const { accessToken } = data;
                TokenService.updateLocalAccessToken(accessToken);

                return usersClient(originalConfig);
            } catch (error) {
                return Promise.reject(error);
            }
        }
    }

    return Promise.reject(err);
});

export default usersClient;
