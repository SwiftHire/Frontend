import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const PRICE_URL = process.env.REACT_APP_PRICE_URL;
const FRONTEND_URL = process.env.REACT_APP_FRONTEND_URL;

export function useRedirectCheckout(item, checkoutOptions) {
    const [stripe, setStripe] = useState(null);
    const itemToCheckout = item || {
        price: `${PRICE_URL}`,
        quantity: 1
    };
    const checkoutOptionsToUse = checkoutOptions || {
        lineItems: [itemToCheckout],
        mode: 'payment',
        successUrl: `${FRONTEND_URL}/resumai/start-crafting`,
        cancelUrl: `${FRONTEND_URL}/resumai/start-crafting`,
    };

    useEffect(() => {
        const load = async () => {
            const stripe = await loadStripe(process.env.REACT_APP_STRIPE_KEY);
            setStripe(stripe);
        };
        load().catch(console.error);
    }, []);

    const redirectToCheckout = async ({ customerEmail }) => {
        if (customerEmail) checkoutOptionsToUse.customerEmail = customerEmail;
        // https://stripe.com/docs/js/deprecated/redirect_to_checkout
        const result = await stripe.redirectToCheckout(checkoutOptionsToUse);
        // console.log('Checkout error', result?.error);
        return result;
    };

    return redirectToCheckout;
}