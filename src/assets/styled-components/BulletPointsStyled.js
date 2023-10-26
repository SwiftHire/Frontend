import styled, { keyframes } from 'styled-components';
import { GrClose } from 'react-icons/gr';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const rotate = keyframes`
    100% {
        transform: rotate(360deg);
    }
`;

export const GenerateLoadingIcon = styled(AiOutlineLoading3Quarters)`
    animation: ${rotate} 1s infinite linear;
`;

export const BulletPointsContainer = styled.div`
    width:10rem;
`;

export const BulletPointsModal = styled.div`
    position:absolute;
    top:115%;
    left:0;
    width: 100%;
    height:10rem;
    display:${props => props.active ? 'block' : 'none'};
    background: #FFFFFF;
    border: 1px solid #F7F7F7;
    box-shadow: 24px 36px 64px -14px rgba(39, 39, 39, 0.24);
    border-radius: 4px;
    z-index:999;
    padding: 1rem 0 1.2rem 0;
    //flex-direction:column;
`;

export const ModalExitIcon = styled(GrClose)`
    cursor:pointer;
    text-align:right;
`;

export const TextAreaContainer = styled.div`
    position: relative;
    width:100%;
`;

export const BulletsContainer = styled.div`
    position: absolute;
    top:0;
    width:94%;
    height: auto;
    background-color:#FAF8FF;
    border:1px solid #EADDFF;
    padding:20px;
    border-radius: 4px;
    display: ${props => props.showBulletPoints ? 'block' : 'none'};
`;

export const BulletPointsContent = styled.div`
    border:1px solid #A8AFB8;
    border-radius:4px;
    background-color: #FFFFFF;
    p{
        padding: 0px 20px 0px 20px;
    }
`;

export const BulletPointContentBtns = styled.div`
    position: relative;
    padding: 0.5rem 2rem 0.5rem 2rem;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 2rem;

    span{
        cursor: pointer;
    }
`;
export const BulletsInnerContainer = styled.div`
    display: flex;
    flex-direction:column;
    gap: 10px;
`;

export const Label = styled.label`
    display: flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:0.9rem;
`;

export const GenerateBtn = styled.button`
    min-width: ${props => props.primary ? '12.8rem' : '9.8rem'};
    display: flex;
    align-items:center;
    justify-content:center;
    gap: 10px;
    background: ${props => props.primary ? 'linear-gradient(101.78deg, #7E3AF2 15.04%, #13C186 143.21%)' : '#FFFFFF'};
    outline:none;
    border:${props => props.primary ? '0' : '1px solid #A8AFB8'};
    border-radius: 4px;
    color:${props => props.primary ? '#FFFFFF' : '#383540'};
    padding: 8px 16px;
    cursor: pointer;
    font-style: normal;
    font-weight: 400;
    font-size: ${props => props.primary ? '14px' : '13px'};
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.02em;
`;

export const BulletPointsBtnContainer = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 1.5rem;
`;