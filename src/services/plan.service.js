class PlanService {
    getPlan() {
        return JSON.parse(localStorage.getItem('plan') || '[]');
    }
    setPlan(plan) {
        localStorage.setItem('plan', JSON.stringify(plan));
    }

    removePlan() {
        localStorage.removeItem('plan');
    }
}

const planService = new PlanService();

export default planService;

