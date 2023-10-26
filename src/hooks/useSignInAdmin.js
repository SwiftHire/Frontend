import usersApi from '../services/usersApi';

export function useSignInAdmin() {
    return async ({ email, adminKey }) => {
        try {
            const requestBody = {
                email,
                adminKey,
            };
            const validateStatus = () => true;
            const { status, data } =
                await usersApi.post('/auth/sign-in-admin', requestBody, { validateStatus });

            return { status, data };
        } catch (error) {
            // any network error will fall under this block
            return { status: 500 , data: null };
        }
    };
}
