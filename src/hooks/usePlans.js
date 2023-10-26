import paymentsApi from '../services/paymentsApi';

function getPlanType(data) {
    const { hasActiveSubscription, isFreeUser, userCredits } = data;
    let planType = '';

    if (hasActiveSubscription && userCredits === 0) planType = 'on-demand';
    // TODO: uncomment this only after adding the logic to upgrade/downgrade plans in the back-end
    // if (hasActiveSubscription && userCredits > 0) planType = 'subscription';

    const expiredCredits = userCredits === 0 && !hasActiveSubscription;
    if (expiredCredits || isFreeUser) {
        // list all subscription plans the user can purchase
        planType = 'subscription';
    }

    return planType;
}

export function usePlans() {
    return async (userPlanData) => {
        if (typeof userPlanData.hasActiveSubscription !== 'boolean' ||
            typeof userPlanData.isFreeUser !== 'boolean' ||
            typeof userPlanData.userCredits !== 'number') {
            throw new Error('Invalid data');
        }
        try {
            const type = getPlanType(userPlanData);
            // const { status, data } =
            //     await paymentsApi.get(`/plans?type=${type}`);
            const subscriptionPlansPromise = paymentsApi.get(`/plans?type=${type}`);
            const onDemandPlansPromise = paymentsApi.get('/plans?type=on-demand');
            const [subscriptionPlans, onDemandPlans] = await Promise.all([subscriptionPlansPromise, onDemandPlansPromise]);
            const status = subscriptionPlans.status === 200 && onDemandPlans.status === 200 ? 200 : 500;
            const data = status === 200 ? [...subscriptionPlans.data, ...onDemandPlans.data] : null

            return { status, data };
        } catch (error) {
            console.log('error in usePlans', error);
            return { status: 500 , data: null };
        }
    };
}