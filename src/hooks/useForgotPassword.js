import usersApi from '../services/usersApi';

export function useForgotPassword() {
    return async ({ email }) => {
        try {
            const requestBody = {
                email,
            };
            const validateStatus = () => true;
            const { status, data } =
                await usersApi.post('/auth/forgot-password', requestBody, { validateStatus });

            return { status, data };
        } catch (error) {
            // any network error will fall under this block
            return { status: 500 , data: null };
        }
    };
}