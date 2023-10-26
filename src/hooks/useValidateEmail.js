import usersApi from '../services/usersApi';

export function useValidateEmail() {
    return async (token) => {
        try {
            const requestBody = {
                token
            };
            const validateStatus = () => true;
            const { status, data } =
                await usersApi.post('/auth/validate-email', requestBody, { validateStatus });

            return { status, data };
        } catch (error) {
            // any network error will fall under this block
            return { status: 500 , data: null };
        }
    };
}