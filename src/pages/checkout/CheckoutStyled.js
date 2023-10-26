import styled from 'styled-components';

export const CheckoutPageContainer = styled.div`
    background-color: #9061f9;
    //background-color: #d2c0fc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-width: 320px;
    height: auto;
    min-height: 100vh;
    padding: 48px 20px;
    margin-top: 3%;
`;

export const CheckoutPageTitle = styled.h1`
    color: #ffffff;
    font-family: DM Sans, Arial;
    font-weight: 600;
    margin-bottom: 20px;
`;

export const CheckoutPlans = styled.div`
    display: flex;
    box-shadow: 0 2px 5px 0 rgba(60, 66, 87, .08), 0 1px 1px 0 rgba(0, 0, 0, .12);
`;

export const CheckoutPlanDetails = styled.div`
    border-radius: 6px;
    padding: 32px 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 300px;
    background-color: #ffffff;

    &:not(:last-child) {
      border-top-right-radius: 0px;
      border-bottom-right-radius: 0px;
      border-right: 1px solid #efefef;
    }

    &:not(:first-child) {
        border-bottom-left-radius: 0px;
        border-top-left-radius: 0px;
    }
`;

export const PlanName = styled.div`
    color: #7F7F7F;
    font-size: large;
    margin-top: 8px;
    text-align: center;
`;

export const PlanPrice = styled.div`
    color: #000000;
    font-size: xx-large;
    font-weight: 600;
    margin-bottom: 8px;
    margin-top: 8px;
    text-align: center;
`;

export const PlanDuration = styled.div`
    color: #969696;
    font-size: smaller;
    text-align: center;
    margin-bottom: 16px;
`;