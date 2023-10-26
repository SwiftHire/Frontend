import usersApi from '../services/usersApi';

export function useResetPassword() {
    return async ({ token, password }) => {
        try {
            const requestBody = {
                token,
                password,
            };
            const validateStatus = () => true;
            const { status, data } =
                await usersApi.post('/auth/reset-password', requestBody, { validateStatus });

            return { status, data };
        } catch (error) {
            // any network error will fall under this block
            return { status: 500 , data: null };
        }
    };
}