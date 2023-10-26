import paymentsApi from '../services/paymentsApi';
import TokenService from '../services/token.service';

const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

export function useCustomCheckout() {
    const user = TokenService.getUser();
    return async (planId) => {
        try {
            const validateStatus = () => true;
            const { status, data } =
                await paymentsApi.post('/checkout', {
                    planId,
                    userId: user.id,
                    email: user.email,
                    successUrl: `${FRONTEND_URL}/resumai/start-crafting`,
                    cancelUrl: `${FRONTEND_URL}/resumai/start-crafting`,
                }, { validateStatus });

            return { status, data };
        } catch (error) {
            // any network error will fall under this block
            return { status: 500 , data: null };
        }
    };
}