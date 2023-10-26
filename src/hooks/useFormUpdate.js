import coreClient from '../services/coreApi';

export function useFormUpdate() {
    return async ({ requestId, form }) => {
        try {
            const { status } =
                await coreClient.put(`/request/${requestId}/update`, { form });

            return { status };
        } catch (error) {
            // any network error will fall under this block
            return null;
        }
    };
}