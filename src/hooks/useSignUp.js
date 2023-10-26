import usersApi from '../services/usersApi';

export function useSignUp() {
    return async ({ name, email, password }) => {
        try {
            const requestBody = {
                name,
                email,
                password,
            };
            const validateStatus = () => true;
            const { status, data } =
                await usersApi.post('/auth/sign-up', requestBody, { validateStatus });

            return { status, data };
        } catch (error) {
            // any network error will fall under this block
            return { status: 500 , data: null };
        }
    };
}