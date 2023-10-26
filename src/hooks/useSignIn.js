import usersApi from '../services/usersApi';

export function useSignIn() {
    return async ({ email, password }) => {
        try {
            const requestBody = {
                email,
                password,
            };
            const validateStatus = () => true;
            const { status, data } =
                await usersApi.post('/auth/sign-in', requestBody, { validateStatus });

            return { status, data };
        } catch (error) {
            // any network error will fall under this block
            return { status: 500 , data: null };
        }
    };
}