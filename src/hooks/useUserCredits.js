import paymentsApi from '../services/paymentsApi';

export function useUserCredits() {
    return async () => {
        try {
            // the interceptor will add the user access token to the request and refresh it too, if necessary
            const { status, data } = await paymentsApi.get('/user-credits');

            return { status, data };
        } catch (error) {
            // any network error will fall under this block
            return { status: 500 , data: null };
        }
    };
}